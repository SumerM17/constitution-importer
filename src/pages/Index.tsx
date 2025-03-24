
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArticleViewer from "@/components/ArticleViewer";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import { ChevronDown, BookOpen, Scale, Search, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  // Scroll down function for the hero button
  const scrollToContent = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Scroll down button */}
        <div className="relative flex justify-center -mt-16 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-background shadow-md border-2 animate-bounce"
            onClick={scrollToContent}
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Features section */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-serif">
                Explore India's Constitutional Heritage
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover the document that shapes the world's largest democracy
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <BookOpen className="h-10 w-10 text-india-saffron" />,
                  title: "Complete Text",
                  description: "Access the full, authoritative text of the Constitution of India in multiple languages."
                },
                {
                  icon: <Search className="h-10 w-10 text-india-saffron" />,
                  title: "Powerful Search",
                  description: "Find specific articles, provisions, and amendments with our advanced search functionality."
                },
                {
                  icon: <Scale className="h-10 w-10 text-india-saffron" />,
                  title: "Legal Interpretations",
                  description: "Understand the context and interpretations of constitutional provisions."
                },
                {
                  icon: <History className="h-10 w-10 text-india-saffron" />,
                  title: "Historical Context",
                  description: "Learn about the drafting process and historical background of the Constitution."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="rounded-full bg-india-saffron/10 p-4 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <ArticleViewer />
        
        <SearchBar />
        
        {/* Call to action section */}
        <section className="py-20 px-4 bg-india-navy text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold font-serif">
                Empowering Citizens Through Knowledge
              </h2>
              <p className="text-xl opacity-90">
                The Constitution belongs to every Indian citizen. Our mission is to make it accessible, understandable, and engaging for all.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-india-navy hover:bg-white/90">
                  Start Exploring
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Learn About the Project
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
