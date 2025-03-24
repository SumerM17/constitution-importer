
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SearchIcon, Filter, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const articleCategories = [
  { id: "fundamental-rights", name: "Fundamental Rights (Articles 12-35)" },
  { id: "dpsp", name: "Directive Principles (Articles 36-51)" },
  { id: "fundamental-duties", name: "Fundamental Duties (Article 51A)" },
  { id: "president", name: "President of India (Articles 52-62)" },
  { id: "parliament", name: "Parliament (Articles 79-122)" },
  { id: "judiciary", name: "Judiciary (Articles 124-147)" },
  { id: "states", name: "The States (Articles 152-237)" },
  { id: "elections", name: "Elections (Articles 324-329)" },
];

// Sample articles data
const articlesData = [
  {
    number: "Article 14",
    title: "Equality before law",
    category: "fundamental-rights",
    content: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India."
  },
  {
    number: "Article 19",
    title: "Protection of certain rights regarding freedom of speech, etc.",
    category: "fundamental-rights",
    content: "All citizens shall have the right to freedom of speech and expression, to assemble peaceably and without arms, to form associations or unions, to move freely throughout the territory of India, to reside and settle in any part of the territory of India, and to practice any profession, or to carry on any occupation, trade or business."
  },
  {
    number: "Article 21",
    title: "Protection of life and personal liberty",
    category: "fundamental-rights",
    content: "No person shall be deprived of his life or personal liberty except according to procedure established by law."
  },
  {
    number: "Article 38",
    title: "State to secure a social order for the promotion of welfare of the people",
    category: "dpsp",
    content: "The State shall strive to promote the welfare of the people by securing and protecting as effectively as it may a social order in which justice, social, economic and political, shall inform all the institutions of the national life."
  },
  {
    number: "Article 51A",
    title: "Fundamental duties",
    category: "fundamental-duties",
    content: "It shall be the duty of every citizen of India to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem."
  },
  {
    number: "Article 54",
    title: "Election of President",
    category: "president",
    content: "The President shall be elected by the members of an electoral college consisting of the elected members of both Houses of Parliament and the elected members of the Legislative Assemblies of the States."
  },
];

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
  
  const filteredArticles = articlesData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(article.category);
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="py-12 md:py-20 px-4 bg-legal-black text-legal-white">
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Articles of the Constitution
            </motion.h1>
            <motion.p 
              className="max-w-3xl mx-auto text-lg opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore the 448 Articles that form the framework of Indian governance
            </motion.p>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="py-8 px-4 bg-secondary">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search articles by number or keyword..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Collapsible className="w-full md:w-auto">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter by Category
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-4 bg-card rounded-md shadow-md">
                  <div className="space-y-2">
                    {articleCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={category.id} 
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                        />
                        <label 
                          htmlFor={category.id} 
                          className="text-sm font-medium cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>
        
        {/* Articles List */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="mb-4">
                <p className="text-muted-foreground">
                  Showing {filteredArticles.length} of {articlesData.length} articles
                </p>
              </div>
              
              <div className="space-y-6">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <motion.div 
                      key={article.number}
                      className="border border-border rounded-md overflow-hidden hover-lift"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div 
                        className="p-4 bg-muted flex justify-between items-center cursor-pointer"
                        onClick={() => setExpandedArticle(expandedArticle === article.number ? null : article.number)}
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-accent" />
                          <div>
                            <h3 className="font-medium">{article.number}</h3>
                            <p className="text-sm text-muted-foreground">{article.title}</p>
                          </div>
                        </div>
                        {expandedArticle === article.number ? 
                          <ChevronUp className="h-5 w-5" /> : 
                          <ChevronDown className="h-5 w-5" />
                        }
                      </div>
                      
                      {expandedArticle === article.number && (
                        <div className="p-4 legal-text">
                          <p>{article.content}</p>
                          <div className="mt-4 pt-4 border-t border-border flex justify-end gap-2">
                            <Button variant="outline" size="sm">Share</Button>
                            <Button size="sm">Read more</Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No articles found matching your criteria.</p>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
