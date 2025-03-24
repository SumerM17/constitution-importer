
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useStateData } from "@/hooks/useStateData";
import { Book, FileText, Scale } from "lucide-react";

interface StateConstitutionViewerProps {
  stateCode: string;
}

const StateConstitutionViewer = ({ stateCode }: StateConstitutionViewerProps) => {
  const { stateData, isLoading, error } = useStateData(stateCode);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-legal-accent/20 border-t-legal-accent rounded-full mx-auto mb-4"></div>
        <p>Loading state constitution...</p>
      </div>
    );
  }

  if (error || !stateData) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive">
          Sorry, we couldn't load the constitution for this state.
        </p>
      </div>
    );
  }

  return (
    <Card className="legal-paper">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{stateData.name} Constitution</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Articles</span>
            </TabsTrigger>
            <TabsTrigger value="laws" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span>State Laws</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="prose max-w-none legal-text">
              <h3>Historical Context</h3>
              <p>{stateData.history || "Historical information coming soon."}</p>
              
              <h3>State Government Structure</h3>
              <p>{stateData.governmentStructure || "Government structure information coming soon."}</p>
              
              <h3>Constitutional Framework</h3>
              <p>{stateData.constitutionalFramework || "Constitutional framework information coming soon."}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="articles">
            <div className="prose max-w-none legal-text">
              <p className="italic text-muted-foreground mb-4">
                The state-specific articles and provisions are displayed below.
              </p>
              
              {stateData.articles && stateData.articles.length > 0 ? (
                <div className="space-y-6">
                  {stateData.articles.map((article, index) => (
                    <div key={index} className="border-b pb-4 mb-4 last:border-0">
                      <h4 className="font-medium mb-2">{article.title}</h4>
                      <p>{article.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Article information coming soon.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="laws">
            <div className="prose max-w-none legal-text">
              <p className="italic text-muted-foreground mb-4">
                Key state-specific laws and legal frameworks.
              </p>
              
              {stateData.laws && stateData.laws.length > 0 ? (
                <div className="space-y-4">
                  {stateData.laws.map((law, index) => (
                    <div key={index} className="border-b pb-4 mb-4 last:border-0">
                      <h4 className="font-medium mb-2">{law.title}</h4>
                      <p>{law.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Law information coming soon.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StateConstitutionViewer;
