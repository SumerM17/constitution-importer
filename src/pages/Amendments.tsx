
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileEdit, Calendar, Info, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Sample amendments data
const amendmentsData = [
  {
    number: "1",
    year: "1951",
    title: "First Amendment",
    description: "Added Ninth Schedule to protect land reform and other laws from judicial review. Also amended Article 19 to impose reasonable restrictions on free speech.",
    articles: ["Article 15", "Article 19", "Article 31"],
    link: "https://legislative.gov.in/constitution-first-amendment-act-1951/"
  },
  {
    number: "7",
    year: "1956",
    title: "Seventh Amendment",
    description: "Reorganized states on linguistic lines and abolished Class A, B, C, D states.",
    articles: ["Article 1", "Article 3"],
    link: "https://legislative.gov.in/constitution-seventh-amendment-act-1956/"
  },
  {
    number: "42",
    year: "1976",
    title: "Forty-Second Amendment",
    description: "Amended the Preamble, changing 'sovereign democratic republic' to 'sovereign socialist secular democratic republic'. Also changed 'unity of the nation' to 'unity and integrity of the nation'.",
    articles: ["Preamble", "Article 31C", "Article 39", "Article 51A"],
    link: "https://legislative.gov.in/constitution-forty-second-amendment-act-1976/"
  },
  {
    number: "73",
    year: "1992",
    title: "Seventy-Third Amendment",
    description: "Added Part IX to the Constitution for establishing Panchayati Raj institutions at the village level.",
    articles: ["Article 243", "Article 243A-243O"],
    link: "https://legislative.gov.in/constitution-seventy-third-amendment-act-1992/"
  },
  {
    number: "86",
    year: "2002",
    title: "Eighty-Sixth Amendment",
    description: "Made education a fundamental right for children between 6-14 years by adding Article 21A.",
    articles: ["Article 21A", "Article 45", "Article 51A"],
    link: "https://legislative.gov.in/constitution-eighty-sixth-amendment-act-2002/"
  },
  {
    number: "101",
    year: "2016",
    title: "One Hundred and First Amendment",
    description: "Introduced the Goods and Services Tax (GST) regime in India.",
    articles: ["Article 246A", "Article 269A", "Article 279A"],
    link: "https://legislative.gov.in/constitution-one-hundred-and-first-amendment-act-2016/"
  }
];

const Amendments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  
  const years = Array.from(new Set(amendmentsData.map(a => a.year))).sort();
  
  const filteredAmendments = amendmentsData.filter(amendment => {
    const matchesSearch = amendment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         amendment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         amendment.number.includes(searchTerm);
    
    const matchesYear = !selectedYear || amendment.year === selectedYear;
    
    return matchesSearch && matchesYear;
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
              Constitutional Amendments
            </motion.h1>
            <motion.p 
              className="max-w-3xl mx-auto text-lg opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore how the Constitution has evolved through 105+ amendments since its adoption
            </motion.p>
          </div>
        </section>
        
        {/* Search and Filter */}
        <section className="py-8 px-4 bg-secondary">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Input 
                  placeholder="Search amendments..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <select
                className="h-10 rounded-md border border-input bg-background px-3 py-2"
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(e.target.value || null)}
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </section>
        
        {/* Timeline */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-legal-gray/30 transform md:translate-x-px"></div>
              
              {/* Amendments */}
              <div className="space-y-12">
                {filteredAmendments.map((amendment, index) => (
                  <motion.div 
                    key={amendment.number}
                    className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-legal-accent border-4 border-background transform -translate-x-2.5 md:-translate-x-3 mt-2.5"></div>
                    
                    {/* Content */}
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} pl-8 md:pl-0`}>
                      <div className="bg-card p-6 rounded-lg shadow-md hover-lift">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold flex items-center">
                            <FileEdit className="mr-2 h-5 w-5 text-legal-accent" />
                            {amendment.title}
                          </h3>
                          <span className="text-sm font-medium bg-legal-accent/10 text-legal-accent px-2 py-1 rounded-md flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {amendment.year}
                          </span>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">
                          {amendment.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Articles Affected:</h4>
                          <div className="flex flex-wrap gap-2">
                            {amendment.articles.map(article => (
                              <span 
                                key={article} 
                                className="bg-secondary text-xs px-2 py-1 rounded-md"
                              >
                                {article}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <a 
                            href={amendment.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-legal-accent hover:underline flex items-center"
                          >
                            View Official Document
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Empty state */}
              {filteredAmendments.length === 0 && (
                <div className="py-20 text-center">
                  <Info className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No amendments found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedYear(null);
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Amendments;
