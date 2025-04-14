
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/chat/ChatInterface";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { isDeepseekConfigured } from "@/utils/deepseekUtils";

const ChatBot = () => {
  const [usingDeepseek, setUsingDeepseek] = useState(false);
  
  // Check if DeepSeek is configured
  useEffect(() => {
    setUsingDeepseek(isDeepseekConfigured());
    
    // Listen for storage changes (if API key is added/removed in another tab)
    const handleStorageChange = () => {
      setUsingDeepseek(isDeepseekConfigured());
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Hide the floating button when we're on the chat page
  useEffect(() => {
    const floatingButton = document.querySelector('.fixed.bottom-6.right-6');
    if (floatingButton) {
      floatingButton.classList.add('hidden');
    }
    
    return () => {
      if (floatingButton) {
        floatingButton.classList.remove('hidden');
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-8 md:py-12 px-4 bg-legal-black text-legal-white">
          <div className="container mx-auto text-center">
            <motion.div 
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Bot className="h-6 w-6" />
              <h1 className="text-2xl md:text-4xl font-bold">Legal Assistant</h1>
              <Sparkles className="h-5 w-5 text-yellow-300" />
            </motion.div>
            <motion.div 
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="max-w-2xl mx-auto text-sm md:text-base opacity-90 mb-2">
                Ask questions about legal issues and get {usingDeepseek ? "DeepSeek AI-powered" : "AI-powered"} guidance on relevant laws
              </p>
              {usingDeepseek && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-legal-accent/20 text-legal-accent">
                  Using DeepSeek AI
                </span>
              )}
            </motion.div>
          </div>
        </section>
        
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <ChatInterface />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatBot;
