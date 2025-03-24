
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLegalNews } from "@/hooks/useLegalNews";
import { motion } from "framer-motion";

const LegalNewsCorner = () => {
  const { news, isLoading, error } = useLegalNews();
  
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-legal-accent/20 border-t-legal-accent rounded-full mx-auto mb-4"></div>
        <p>Loading latest legal news...</p>
      </div>
    );
  }
  
  if (error || !news.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Newspaper className="h-5 w-5 mr-2" />
            Legal News Corner
          </CardTitle>
          <CardDescription>Latest legal developments and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Unable to load the latest news. Please check back later.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Newspaper className="h-5 w-5 mr-2" />
          Legal News Corner
        </CardTitle>
        <CardDescription>Latest legal developments and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {news.slice(0, 5).map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b last:border-0 pb-4 last:pb-0"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-medium text-base mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span className="mx-2">•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Read more</span>
                  </Button>
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LegalNewsCorner;
