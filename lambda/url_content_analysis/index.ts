import { APIGatewayProxyEventV2, Handler } from 'aws-lambda';
import { Tracer } from "@aws-lambda-powertools/tracer";
import { Logger } from "@aws-lambda-powertools/logger";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const logger = new Logger();
const tracer = new Tracer();

const bedrock = new BedrockRuntimeClient({ region: process.env.REGION || 'us-east-1' });
const dynamodb = new DynamoDBClient({ region: process.env.REGION || 'us-east-1' });

const FOOD_ITEMS_TABLE = process.env.FOOD_ITEMS_TABLE || 'FoodItemsTable';
const TIPS_TABLE = process.env.TIPS_TABLE || 'FoodTipsTable';
const MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0";

// Function to fetch and extract content from a URL
async function fetchUrlContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Use Cheerio to parse HTML and extract main content
    const $ = cheerio.load(html);
    
    // Remove script tags, ads, and other non-content elements
    $('script, style, iframe, nav, footer, header, aside').remove();
    
    // Extract title
    const title = $('title').text().trim();
    
    // Extract main content (focusing on article body)
    let content = '';
    
    // Try different common content selectors
    const contentSelectors = [
      'article', '.post-content', '.entry-content', 
      '.content', 'main', '#content', '.article-body'
    ];
    
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text().trim();
        break;
      }
    }
    
    // If no content found with selectors, use body text
    if (!content) {
      content = $('body').text().trim();
    }
    
    // Clean up content (remove extra whitespace)
    content = content.replace(/\s+/g, ' ');
    
    return `Title: ${title}\n\nContent: ${content}`;
  } catch (error) {
    logger.error('Error fetching URL content', { error, url });
    throw new Error(`Failed to fetch content from URL: ${error.message}`);
  }
}

// Function to analyze content and extract food items and tips
async function analyzeContent(content: string): Promise<any> {
  try {
    const response = await bedrock.send(new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 4000,
        temperature: 0.2,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this article about food products or recipes and extract:
                
                1. Specific food product recommendations (brands, types, etc.)
                2. Actionable tips for food selection or preparation
                
                Here's the content:
                
                ${content}
                
                Format your response as valid JSON with the following structure:
                {
                  "foodItems": [
                    {
                      "name": "Product name",
                      "description": "Brief description",
                      "attributes": ["attribute1", "attribute2"],
                      "whyRecommended": "Reason for recommendation",
                      "whereToFind": "Where to purchase (if mentioned)"
                    }
                  ],
                  "tips": [
                    {
                      "tip": "The actionable tip",
                      "category": "Selection or Preparation or Storage or Nutrition",
                      "applicableToFoods": ["food1", "food2"]
                    }
                  ],
                  "summary": "Brief summary of the article's main points"
                }
                
                Include ONLY foodItems that are specifically recommended in the article. If no specific food items are recommended, return an empty array.
                For tips, include only concrete, actionable advice that someone could implement.
                If the article doesn't mention any specific food products or tips, provide an appropriate empty array.`
              }
            ]
          }
        ]
      })
    }));

    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const analysisText = responseBody.content[0].text;
    
    // Extract JSON from the response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to extract JSON from response');
  } catch (error) {
    logger.error('Error analyzing content', { error });
    throw error;
  }
}

// Function to save food items to DynamoDB
async function saveFoodItems(foodItems: any[], sourceUrl: string): Promise<string[]> {
  try {
    const itemIds = [];
    
    for (const item of foodItems) {
      const itemId = uuidv4();
      itemIds.push(itemId);
      
      await dynamodb.send(new PutItemCommand({
        TableName: FOOD_ITEMS_TABLE,
        Item: {
          id: { S: itemId },
          sourceUrl: { S: sourceUrl },
          name: { S: item.name || 'Unnamed Item' },
          description: { S: item.description || '' },
          attributes: { SS: item.attributes || [] },
          whyRecommended: { S: item.whyRecommended || '' },
          whereToFind: { S: item.whereToFind || '' },
          createdAt: { S: new Date().toISOString() }
        }
      }));
    }
    
    return itemIds;
  } catch (error) {
    logger.error('Error saving food items to DynamoDB', { error });
    throw error;
  }
}

// Function to save tips to DynamoDB
async function saveTips(tips: any[], sourceUrl: string): Promise<string[]> {
  try {
    const tipIds = [];
    
    for (const tipItem of tips) {
      const tipId = uuidv4();
      tipIds.push(tipId);
      
      await dynamodb.send(new PutItemCommand({
        TableName: TIPS_TABLE,
        Item: {
          id: { S: tipId },
          sourceUrl: { S: sourceUrl },
          tip: { S: tipItem.tip || '' },
          category: { S: tipItem.category || 'General' },
          applicableToFoods: { SS: tipItem.applicableToFoods || [] },
          createdAt: { S: new Date().toISOString() }
        }
      }));
    }
    
    return tipIds;
  } catch (error) {
    logger.error('Error saving tips to DynamoDB', { error });
    throw error;
  }
}

export const handler: Handler = async (event: APIGatewayProxyEventV2) => {
  try {
    logger.info('Event received', { event });
    
    const body = JSON.parse(event.body || '{}');
    const { url } = body;
    
    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
      };
    }
    
    // Fetch content from URL
    const content = await fetchUrlContent(url);
    
    // Analyze content to extract food items and tips
    const analysisResult = await analyzeContent(content);
    
    // Save food items and tips to DynamoDB (if any)
    let foodItemIds = [];
    let tipIds = [];
    
    if (analysisResult.foodItems && analysisResult.foodItems.length > 0) {
      foodItemIds = await saveFoodItems(analysisResult.foodItems, url);
    }
    
    if (analysisResult.tips && analysisResult.tips.length > 0) {
      tipIds = await saveTips(analysisResult.tips, url);
    }
    
    // Return analysis result along with saved item IDs
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...analysisResult,
        foodItemIds,
        tipIds,
        sourceUrl: url
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      }
    };
  } catch (error) {
    logger.error('Error in handler', { error });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', message: error.message }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      }
    };
  }
};