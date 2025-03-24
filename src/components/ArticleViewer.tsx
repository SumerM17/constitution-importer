
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, BookOpen, ListTree, FileText, Share2 } from "lucide-react";

const SAMPLE_ARTICLE = {
  number: 1,
  title: "Name and territory of the Union",
  content: `(1) India, that is Bharat, shall be a Union of States.
(2) The States and the territories thereof shall be as specified in the First Schedule.
(3) The territory of India shall comprise —
(a) the territories of the States;
(b) the Union territories specified in the First Schedule; and
(c) such other territories as may be acquired.`
};

const SAMPLE_ARTICLES = [
  {
    number: 1,
    title: "Name and territory of the Union",
    part: "I",
  },
  {
    number: 2,
    title: "Admission or establishment of new States",
    part: "I",
  },
  {
    number: 3,
    title: "Formation of new States and alteration of areas, boundaries or names of existing States",
    part: "I",
  },
  {
    number: 4,
    title: "Laws made under articles 2 and 3 to provide for the amendment of the First and the Fourth Schedules and supplemental, incidental and consequential matters",
    part: "I",
  },
  {
    number: 5,
    title: "Citizenship at the commencement of the Constitution",
    part: "II",
  },
  {
    number: 6,
    title: "Rights of citizenship of certain persons who have migrated to India from Pakistan",
    part: "II",
  },
];

const ArticleViewer = () => {
  const [activeView, setActiveView] = useState<string>("read");
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              Explore the Articles
            </h2>
            <p className="text-muted-foreground">
              Browse through the complete text of the Constitution of India, organized by parts, chapters, and articles.
            </p>
          </div>
          
          <Tabs defaultValue="read" className="w-full" onValueChange={setActiveView}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="read" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Read</span>
                </TabsTrigger>
                <TabsTrigger value="browse" className="flex items-center gap-2">
                  <ListTree className="h-4 w-4" />
                  <span>Browse</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="read" className="mt-0">
              <Card className="max-w-4xl mx-auto">
                <CardHeader className="pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Article {SAMPLE_ARTICLE.number}
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-serif">
                      {SAMPLE_ARTICLE.title}
                    </CardTitle>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="prose prose-zinc max-w-none">
                    <pre className="font-sans whitespace-pre-wrap text-base leading-relaxed p-0 m-0 bg-transparent border-none">
                      {SAMPLE_ARTICLE.content}
                    </pre>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <Button variant="outline" size="sm" className="gap-1">
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Article {SAMPLE_ARTICLE.number} of 448
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="browse" className="mt-0">
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="font-serif">Articles by Part</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4 scroll-shadow">
                    <div className="space-y-4">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Part I - The Union and its Territory</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {SAMPLE_ARTICLES.slice(0, 4).map((article) => (
                            <Button 
                              key={article.number}
                              variant="outline" 
                              className="justify-start h-auto py-3 px-4"
                            >
                              <div className="flex items-start text-left gap-3">
                                <div className="bg-primary/10 text-primary font-medium rounded-full w-7 h-7 flex items-center justify-center shrink-0">
                                  {article.number}
                                </div>
                                <div className="text-sm">{article.title}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Part II - Citizenship</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {SAMPLE_ARTICLES.slice(4, 6).map((article) => (
                            <Button 
                              key={article.number}
                              variant="outline" 
                              className="justify-start h-auto py-3 px-4"
                            >
                              <div className="flex items-start text-left gap-3">
                                <div className="bg-primary/10 text-primary font-medium rounded-full w-7 h-7 flex items-center justify-center shrink-0">
                                  {article.number}
                                </div>
                                <div className="text-sm">{article.title}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ArticleViewer;
