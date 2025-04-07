
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LawCategory } from "@/types/law-types";

type CategoryFilterProps = {
  lawCategories: LawCategory[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter = ({ lawCategories, selectedCategories, onCategoryChange }: CategoryFilterProps) => {
  return (
    <Collapsible className="w-full md:w-auto">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter by Category
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 p-4 bg-card rounded-md shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {lawCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox 
                id={category.id} 
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onCategoryChange(category.id)}
              />
              <label 
                htmlFor={category.id} 
                className="text-sm font-medium cursor-pointer flex items-center"
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CategoryFilter;
