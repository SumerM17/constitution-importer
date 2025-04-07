
import React from "react";
import { Button } from "@/components/ui/button";
import LawCard from "./LawCard";
import { Law } from "@/types/law-types";

type LawsListProps = {
  filteredLaws: Law[];
  expandedArticle: string | null;
  setExpandedArticle: (id: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  totalLawsCount: number;
}

const LawsList = ({
  filteredLaws,
  expandedArticle,
  setExpandedArticle,
  searchTerm,
  setSearchTerm,
  setSelectedCategories,
  totalLawsCount
}: LawsListProps) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="bg-card rounded-lg shadow-md p-6">
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing {filteredLaws.length} of {totalLawsCount} laws
            </p>
          </div>
          
          <div className="space-y-6">
            {filteredLaws.length > 0 ? (
              filteredLaws.map((law) => (
                <LawCard 
                  key={law.id}
                  law={law}
                  isExpanded={expandedArticle === law.id}
                  onToggleExpand={() => setExpandedArticle(expandedArticle === law.id ? null : law.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No laws found matching your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategories([]);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawsList;
