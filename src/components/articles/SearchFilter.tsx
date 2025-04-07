
import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import CategoryFilter from "./CategoryFilter";
import { LawCategory } from "@/types/law-types";

type SearchFilterProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  lawCategories: LawCategory[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
}

const SearchFilter = ({ 
  searchTerm, 
  onSearchChange, 
  lawCategories, 
  selectedCategories, 
  onCategoryChange 
}: SearchFilterProps) => {
  return (
    <section className="py-8 px-4 bg-secondary">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for laws by keyword..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <CategoryFilter 
            lawCategories={lawCategories} 
            selectedCategories={selectedCategories}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
