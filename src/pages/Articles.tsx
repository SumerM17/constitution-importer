
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticlesHeader from "@/components/articles/ArticlesHeader";
import SearchFilter from "@/components/articles/SearchFilter";
import LawsList from "@/components/articles/LawsList";
import GuidanceSection from "@/components/articles/GuidanceSection";
import { practicalLawsData } from "@/data/lawsData";
import { lawCategories } from "@/data/categoryData";

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  
  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  const filteredLaws = practicalLawsData.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (law.summary && law.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (law.content && law.content.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(law.category);
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <ArticlesHeader />
        
        <SearchFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          lawCategories={lawCategories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        
        <LawsList 
          filteredLaws={filteredLaws}
          expandedArticle={expandedArticle}
          setExpandedArticle={setExpandedArticle}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelectedCategories={setSelectedCategories}
          totalLawsCount={practicalLawsData.length}
        />
        
        <GuidanceSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
