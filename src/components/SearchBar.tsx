
import React, { useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const SAMPLE_RESULTS = [
  {
    type: "Article",
    number: 14,
    title: "Equality before law",
    excerpt: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
  },
  {
    type: "Article",
    number: 15,
    title: "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
    excerpt: "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.",
  },
  {
    type: "Article",
    number: 16,
    title: "Equality of opportunity in matters of public employment",
    excerpt: "There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State.",
  },
];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
        setShowResults(true);
      }, 800);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <section id="search-section" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
            <span>Search the Constitution</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-serif">
            Find Articles, Provisions & Amendments
          </h2>
          
          <p className="text-muted-foreground">
            Search the full text of the Constitution of India by keywords, article numbers, or topics.
          </p>
          
          <div className="w-full pt-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for 'fundamental rights', 'article 14', etc."
                  className="pl-10 pr-16 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-14"
                    onClick={clearSearch}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
                <Button
                  type="submit"
                  className="absolute right-1 px-2.5 h-9"
                  disabled={isSearching || !searchQuery.trim()}
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </form>
          </div>
          
          {showResults && (
            <div className="animate-fade-up pt-8">
              <Card className="overflow-hidden border">
                <div className="p-4 border-b bg-muted/50 flex justify-between items-center">
                  <p className="text-sm font-medium">
                    Found {SAMPLE_RESULTS.length} results for "{searchQuery}"
                  </p>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={clearSearch}>
                    Clear results
                  </Button>
                </div>
                
                <div className="divide-y">
                  {SAMPLE_RESULTS.map((result, index) => (
                    <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {result.type} {result.number}
                            </span>
                          </div>
                          <h3 className="font-medium text-base mb-1">{result.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.excerpt}
                          </p>
                        </div>
                        <Button size="icon" variant="ghost" className="shrink-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
