
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/chat/ChatInterface";
import { motion } from "framer-motion";
import FloatingChatButton from "@/components/FloatingChatButton";

const ChatBot = () => {
  // Hide the floating button when we're on the chat page
  React.useEffect(() => {
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
            <motion.h1 
              className="text-2xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Legal Assistant
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-sm md:text-base opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ask questions about legal issues and get guidance on relevant laws
            </motion.p>
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
