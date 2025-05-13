import React, { useState } from "react";
import {
  Container,
  Button,
  FormField,
  Input,
  Alert,
  Header,
  Spinner,
  Tabs,
  Box,
  Cards,
} from "@cloudscape-design/components";
import { callAPI } from "../../assets/js/custom";
import { useContext } from "react";
import { DevModeContext, LanguageContext } from "../app";
import customTranslations from "../../assets/i18n/all";

const UrlAnalysis = () => {
  const language = useContext(LanguageContext);
  const { devMode } = useContext(DevModeContext);
  const currentTranslations = customTranslations[language];

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTabId, setActiveTabId] = useState("foodItems");

  const handleUrlAnalysis = async () => {
    if (!url) {
      setError("Please enter a URL to analyze");
      return;
    }

    setIsLoading(true);
    setError("");
    setAnalysisResult(null);

    try {
      // Use your standard API calling pattern with correct path
      const body = { url };
      
      // Note: You're using "/urlAnalysis" as the CloudFront behavior pattern
      const response = await callAPI("urlAnalysis", "POST", body);
      
      if (response && !response.error) {
        setAnalysisResult(response);
        
        if ((!response.foodItems || response.foodItems.length === 0) && 
            response.tips && response.tips.length > 0) {
          setActiveTabId("tips");
        }
      } else {
        throw new Error(response?.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error analyzing URL:", error);
      
      // Fix the TypeScript error by checking the error type
      if (error instanceof Error) {
        setError(`Failed to analyze URL: ${error.message}`);
      } else {
        setError("Failed to analyze URL. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      header={
        <Header
          variant="h1"
          description="Extract food recommendations and tips from articles, blogs, and websites"
        >
          URL Food Analysis
        </Header>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormField
          label="Enter URL to analyze"
          description="Provide a URL to a food blog, article, or recipe site"
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ width: '80%' }}>
              <Input
                value={url}
                onChange={({ detail }) => setUrl(detail.value)}
                placeholder="https://example.com/best-yogurts-2024"
              />
            </div>
            <Button
              variant="primary"
              onClick={handleUrlAnalysis}
              loading={isLoading}
              disabled={isLoading || !url}
            >
              Analyze URL
            </Button>
          </div>
        </FormField>

        {error && (
          <Alert 
            type="error" 
            header="Error"
          >
            {error}
          </Alert>
        )}

        {isLoading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spinner size="large" />
            <div style={{ marginTop: "10px" }}>
              Analyzing URL content... This may take a minute.
            </div>
          </div>
        )}

        {analysisResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {analysisResult.summary && (
              <Container
                header={<Header variant="h2">Summary</Header>}
              >
                <Box variant="p">{analysisResult.summary}</Box>
              </Container>
            )}

            <Tabs
              activeTabId={activeTabId}
              onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
              tabs={[
                {
                  id: "foodItems",
                  label: `Recommended Food Items (${analysisResult.foodItems?.length || 0})`,
                  content: (
                    <div>
                      {analysisResult.foodItems && analysisResult.foodItems.length > 0 ? (
                        <Cards<FoodItem>
                          cardDefinition={{
                            header: item => item.name,
                            sections: [
                              {
                                id: "description",
                                header: "Description",
                                content: item => (
                                  <div>
                                    <Box variant="p">{item.description}</Box>
                                    {item.whyRecommended && (
                                      <div style={{ marginTop: '16px' }}>
                                        <Box variant="h5">Why recommended</Box>
                                        <Box variant="p">{item.whyRecommended}</Box>
                                      </div>
                                    )}
                                    
                                    {item.whereToFind && (
                                      <div style={{ marginTop: '16px' }}>
                                        <Box variant="h5">Where to find</Box>
                                        <Box variant="p">{item.whereToFind}</Box>
                                      </div>
                                    )}
                                    
                                    {item.attributes && item.attributes.length > 0 && (
                                      <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {item.attributes.map((attribute, idx) => (
                                          <span
                                            key={`attr-${idx}`}
                                            style={{
                                              display: "inline-block",
                                              background: "#f2f2f2",
                                              padding: "4px 8px",
                                              borderRadius: "4px",
                                              fontSize: "12px"
                                            }}
                                          >
                                            {attribute}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                    
                                    <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
                                      <Button variant="link">Add to Shopping List</Button>
                                      <Button variant="link">Find Similar Products</Button>
                                    </div>
                                  </div>
                                )
                              }
                            ]
                          }}
                          items={analysisResult.foodItems || []}
                          loadingText="Loading food items"
                          variant="full-page"
                          stickyHeader={true}
                          empty={
                            <Box textAlign="center" color="inherit">
                              <b>No food items</b>
                              <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                                No specific food items were recommended in this article.
                              </Box>
                            </Box>
                          }
                          cardsPerRow={[
                            { cards: 1 },
                            { minWidth: 500, cards: 2 }
                          ]}
                        />
                      ) : (
                        <Alert type="info">
                          No specific food item recommendations were found in this article.
                        </Alert>
                      )}
                    </div>
                  )
                },
                {
                  id: "tips",
                  label: `Actionable Tips (${analysisResult.tips?.length || 0})`,
                  content: (
                    <div>
                      {analysisResult.tips && analysisResult.tips.length > 0 ? (
                        <Cards<Tip>
                          cardDefinition={{
                            header: item => item.tip,
                            sections: [
                              {
                                id: "category",
                                header: "Category",
                                content: item => item.category
                              },
                              {
                                id: "applicableTo",
                                header: "Applicable to",
                                content: item => (
                                  item.applicableToFoods && item.applicableToFoods.length > 0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                      {item.applicableToFoods.map((food, idx) => (
                                        <span
                                          key={`food-${idx}`}
                                          style={{
                                            display: "inline-block",
                                            background: "#f2f2f2",
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            fontSize: "12px"
                                          }}
                                        >
                                          {food}
                                        </span>
                                      ))}
                                    </div>
                                  ) : null
                                )
                              },
                              {
                                id: "actions",
                                content: () => (
                                  <Button variant="link">Save Tip</Button>
                                )
                              }
                            ]
                          }}
                          items={analysisResult.tips || []}
                          loadingText="Loading tips"
                          variant="full-page"
                          visibleSections={["category", "applicableTo", "actions"]}
                          stickyHeader={true}
                          empty={
                            <Box textAlign="center" color="inherit">
                              <b>No tips</b>
                              <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                                No actionable tips were found in this article.
                              </Box>
                            </Box>
                          }
                          cardsPerRow={[
                            { cards: 1 },
                            { minWidth: 500, cards: 2 }
                          ]}
                        />
                      ) : (
                        <Alert type="info">
                          No actionable tips were found in this article.
                        </Alert>
                      )}
                    </div>
                  )
                }
              ]}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default UrlAnalysis;

interface AnalysisResult {
  summary?: string;
  foodItems?: FoodItem[];
  tips?: Tip[];
}

interface FoodItem {
  id: string;
  name: string;
  description: string;
  attributes?: string[];
  whyRecommended?: string;
  whereToFind?: string;
}

interface Tip {
  id: string;
  tip: string;
  category: string;
  applicableToFoods?: string[];
}