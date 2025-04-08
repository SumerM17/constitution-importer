
import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, ChatState } from "@/types/chat-types";
import { generateUniqueId, generateBotResponse } from "@/utils/chatUtils";
import { Send, Bot, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import LawSuggestion from "./LawSuggestion";
import { motion } from "framer-motion";

const ChatInterface = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: "welcome",
        content: "Welcome to Legal Assistant! How can I help you with legal information today?",
        sender: "bot",
        timestamp: new Date()
      }
    ],
    isLoading: false
  });
  
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatState.messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: generateUniqueId(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));
    
    setInputValue("");
    
    // Simulate API call delay
    setTimeout(() => {
      const { message, laws } = generateBotResponse(userMessage.content);
      
      const botMessage: ChatMessage = {
        id: generateUniqueId(),
        content: message,
        sender: "bot",
        timestamp: new Date()
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false
      }));
      
      // If we found laws, add them as a special message
      if (laws.length > 0) {
        // Store laws in sessionStorage for display in suggestions
        sessionStorage.setItem("suggestedLaws", JSON.stringify(laws));
      }
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto border rounded-lg overflow-hidden bg-background">
      <div className="bg-legal-black text-legal-white p-4 flex items-center gap-2 border-b">
        <Bot className="h-5 w-5" />
        <h3 className="font-semibold">Legal Assistant</h3>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {chatState.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  msg.sender === "user"
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === "user"
                      ? "bg-legal-accent text-white"
                      : "bg-muted"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    msg.sender === "user"
                      ? "bg-legal-accent text-white"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {chatState.isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "200ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "400ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      
      <LawSuggestion />
      
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your legal question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={chatState.isLoading}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={chatState.isLoading || !inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
