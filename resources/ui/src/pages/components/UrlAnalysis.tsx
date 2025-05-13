import React, { useState } from "react";
import {
  Container,
  SpaceBetween,
  Button,
  FormField,
  Input,
  Alert,
  Header,
  Spinner,
  Tabs,
  ColumnLayout,
  Box,
  Cards,
  TagEditor,
  Icon
} from "@cloudscape-design/components";
import { callAPI } from "../../assets/js/custom";
import { useContext } from "react";
import { DevModeContext, LanguageContext } from "../app";
import customTranslations from "../../assets/i18n/all";

const UrlAnalysis: React.FC = () => {
  const language = useContext(LanguageContext);
  const { devMode } = useContext(DevModeContext);
  const currentTranslations = customTranslations[language];

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
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
      const body = {
        url: url
      };

      const response = await callAPI("analyzeUrl", "POST", body);
      setAnalysisResult(response);
      
      // If no food items but there are tips, switch to tips tab
      if ((!response.foodItems || response.foodItems.length === 0) && 
          response.tips && response.tips.length > 0) {
        setActiveTabId("tips");
      }
    } catch (error) {
      console.error("Error analyzing URL:", error);
      setError("Failed to analyze URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const FoodItemCard = ({ item }) => (
    <Cards.Item>
      <div>
        <Box variant="h3">{item.name}</Box>
        <Box variant="p">{item.description}</Box>
        
        <ColumnLayout columns={2}>
          <div>
            <Box variant="h5">Why recommended</Box>
            <Box variant="p">{item.whyRecommended}</Box>
          </div>
          
          {item.whereToFind && (
            <div>
              <Box variant="h5">Where to find</Box>
              <Box variant="p">{item.whereToFind}</Box>
            </div>
          )}
        </ColumnLayout>
        
        <Box padding={{ top: "s" }}>
          <SpaceBetween direction="horizontal" size="xs">
            {item.attributes.map((attribute, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  background: "#f2f2f2",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  margin: "0 4px 4px 0",
                  fontSize: "12px"
                }}
              >
                {attribute}
              </span>
            ))}
          </SpaceBetween>
        </Box>
        
        <Box padding={{ top: "s" }}>
          <Button variant="link">Add to Shopping List</Button>
          <Button variant="link">Find Similar Products</Button>
        </Box>
      </div>
    </Cards.Item>
  );

  const TipCard = ({ tip }) => (
    <Cards.Item>
      <div>
        <Box variant="h4">
          <Icon name="status-info" />
          <span style={{ marginLeft: "8px" }}>{tip.tip}</span>
        </Box>
        
        <Box padding={{ top: "s" }}>
          <span
            style={{
              display: "inline-block",
              background: "#f0f7ff",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px"
            }}
          >
            {tip.category}
          </span>
        </Box>
        
        {tip.applicableToFoods && tip.applicableToFoods.length > 0 && (
          <Box padding={{ top: "s" }}>
            <Box variant="h5">Applicable to:</Box>
            <SpaceBetween direction="horizontal" size="xs">
              {tip.applicableToFoods.map((food, idx) => (
                <span
                  key={idx}
                  style={{
                    display: "inline-block",
                    background: "#f2f2f2",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    margin: "0 4px 4px 0",
                    fontSize: "12px"
                  }}
                >
                  {food}
                </span>
              ))}
            </SpaceBetween>
          </Box>
        )}
        
        <Box padding={{ top: "s" }}>
          <Button variant="link">Save Tip</Button>
        </Box>
      </div>
    </Cards.Item>
  );

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
      <SpaceBetween direction="vertical" size="l">
        <FormField
          label="Enter URL to analyze"
          description="Provide a URL to a food blog, article, or recipe site"
        >
          <SpaceBetween direction="horizontal" size="xs">
            <Input
              value={url}
              onChange={({ detail }) => setUrl(detail.value)}
              placeholder="https://example.com/best-yogurts-2024"
              style={{ width: "80%" }}
            />
            <Button
              variant="primary"
              onClick={handleUrlAnalysis}
              loading={isLoading}
              disabled={isLoading || !url}
            >
              Analyze URL
            </Button>
          </SpaceBetween>
        </FormField>

        {error && (
          <Alert type="error" header="Error">
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
          <SpaceBetween direction="vertical" size="l">
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
                        <Cards
                          cardDefinition={{
                            header: item => item.name,
                            sections: [
                              {
                                id: "description",
                                content: item => item.description
                              }
                            ]
                          }}
                          items={analysisResult.foodItems}
                          loadingText="Loading food items"
                          variant="full-page"
                          visibleSections={["description"]}
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
                          renderItem={item => <FoodItemCard item={item} />}
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
                        <Cards
                          cardDefinition={{
                            header: item => item.tip,
                            sections: [
                              {
                                id: "category",
                                content: item => item.category
                              }
                            ]
                          }}
                          items={analysisResult.tips}
                          loadingText="Loading tips"
                          variant="full-page"
                          visibleSections={["category"]}
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
                          renderItem={tip => <TipCard tip={tip} />}
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
          </SpaceBetween>
        )}
      </SpaceBetween>
    </Container>
  );
};

export default UrlAnalysis;