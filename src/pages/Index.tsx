
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArticleViewer from "@/components/ArticleViewer";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import { ChevronDown, BookOpen, Scale, Search, History, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LegalNewsCorner from "@/components/LegalNewsCorner";

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-background shadow-md border-2 animate-bounce"
              onClick={scrollToContent}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        
        {/* Features section */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center space-y-3 max-w-3xl mx-auto mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold font-serif"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Explore India's Constitutional Heritage
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Discover the document that shapes the world's largest democracy
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <BookOpen className="h-10 w-10 text-legal-accent" />,
                  title: "Complete Text",
                  description: "Access the full, authoritative text of the Constitution of India in multiple languages.",
                  link: "/articles"
                },
                {
                  icon: <Search className="h-10 w-10 text-legal-accent" />,
                  title: "Powerful Search",
                  description: "Find specific articles, provisions, and amendments with our advanced search functionality.",
                  link: "/articles"
                },
                {
                  icon: <Scale className="h-10 w-10 text-legal-accent" />,
                  title: "Legal Interpretations",
                  description: "Understand the context and interpretations of constitutional provisions.",
                  link: "/preamble"
                },
                {
                  icon: <MessageSquare className="h-10 w-10 text-legal-accent" />,
                  title: "Legal Assistant",
                  description: "Chat with our AI legal assistant to get guidance on laws relevant to your situation.",
                  link: "/chatbot"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover-lift hover-glow"
                >
                  <div className="rounded-full bg-legal-accent/10 p-4 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                  <Link to={feature.link} className="text-legal-accent hover:underline text-sm mt-auto flex items-center">
                    Explore 
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Legal News Corner */}
        <section className="py-12 px-4 bg-muted/20">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <h2 className="text-3xl font-bold font-serif mb-4">Today's Legal Updates</h2>
              <p className="text-muted-foreground">Stay informed with the latest legal developments and constitutional matters.</p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <LegalNewsCorner />
            </div>
          </div>
        </section>
        
        <ArticleViewer />
        
        <SearchBar />
        
        {/* Call to action section */}
        <section className="py-20 px-4 bg-legal-black text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold font-serif"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Empowering Citizens Through Knowledge
              </motion.h2>
              <motion.p 
                className="text-xl opacity-90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                The Constitution belongs to every Indian citizen. Our mission is to make it accessible, understandable, and engaging for all.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link to="/articles">
                  <Button size="lg" className="bg-white text-legal-black hover:bg-white/90 hover-lift">
                    Start Exploring
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover-lift">
                    Learn About the Project
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
