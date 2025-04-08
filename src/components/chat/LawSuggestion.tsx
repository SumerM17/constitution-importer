
import React, { useEffect, useState } from "react";
import { Law } from "@/types/law-types";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Scale, AlertTriangle, BookOpenCheck, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LawSuggestion = () => {
  const [suggestedLaws, setSuggestedLaws] = useState<Law[]>([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const lawsData = sessionStorage.getItem("suggestedLaws");
      if (lawsData) {
        try {
          setSuggestedLaws(JSON.parse(lawsData));
          // Clear after reading to prevent displaying on page refresh
          sessionStorage.removeItem("suggestedLaws");
        } catch (e) {
          console.error("Error parsing suggested laws", e);
        }
      }
    };

    // Check on mount and listen for changes
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (suggestedLaws.length === 0) return null;

  return (
    <div className="p-4 bg-legal-accent/5 border-t">
      <div className="mb-2">
        <p className="text-sm font-medium flex items-center gap-2">
          <Scale className="w-4 h-4" />
          Relevant Laws
        </p>
      </div>
      <div className="space-y-2">
        {suggestedLaws.map((law) => (
          <motion.div
            key={law.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-3 bg-background hover:bg-muted/50 transition-colors cursor-pointer">
              <h4 className="text-sm font-medium">{law.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {law.summary}
              </p>
              {law.penalty && (
                <div className="flex gap-1 items-center mt-2">
                  <AlertTriangle className="h-3 w-3 text-destructive" />
                  <span className="text-xs text-destructive">{law.penalty}</span>
                </div>
              )}
              {law.helpline && (
                <div className="flex gap-1 items-center mt-2">
                  <Phone className="h-3 w-3 text-legal-accent" />
                  <span className="text-xs">{law.helpline}</span>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LawSuggestion;
