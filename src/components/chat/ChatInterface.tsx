import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, ChatState } from "@/types/chat-types";
import { generateUniqueId, generateBotResponse } from "@/utils/chatUtils";
import { Send, Bot, User, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import LawSuggestion from "./LawSuggestion";
import { motion } from "framer-motion";
import { getDeepseekResponse, isDeepseekConfigured } from "@/utils/deepseekUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeepseekConfigForm from "./DeepseekConfigForm";

const ChatInterface = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: "welcome",
        content: "Welcome to Legal Assistant! How can I help you with legal information today? You can ask about traffic laws, workplace rights, domestic issues, or other legal concerns.",
        sender: "bot",
        timestamp: new Date()
      }
    ],
    isLoading: false
  });
  
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isConfigured, setIsConfigured] = useState(isDeepseekConfigured());
  
  useEffect(() => {
    setIsConfigured(isDeepseekConfigured());
    
    if (!isDeepseekConfigured()) {
      toast({
        title: "API Key Required",
        description: "Please configure your DeepSeek API key to use the AI assistant",
      });
    }
  }, [toast]);
  
  const suggestedPrompts = [
    "What are the penalties for traffic signal violations?",
    "What should I do after a road accident?",
    "What laws protect women from workplace harassment?",
    "What are my rights in a domestic violence situation?",
    "What compensation can I claim for a workplace injury?"
  ];
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatState.messages]);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
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
    
    try {
      let botResponse = "";
      
      if (isDeepseekConfigured()) {
        const messageHistory = chatState.messages.map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.content
        }));
        
        messageHistory.push({
          role: "user",
          content: userMessage.content
        });
        
        messageHistory.unshift({
          role: "system",
          content: "You are a legal assistant AI specializing in legal information and guidance. Provide helpful, accurate information about laws, legal procedures, and rights. Do not provide specific legal advice that would require a licensed attorney."
        });
        
        botResponse = await getDeepseekResponse(messageHistory);
      } else {
        const localResponse = generateBotResponse(userMessage.content);
        botResponse = "To use AI features, please configure your DeepSeek API key. For now, here's some basic information: " + localResponse.message;
      }
      
      const localResponse = generateBotResponse(userMessage.content);
      const relevantLaws = localResponse.laws;
      
      const botMessage: ChatMessage = {
        id: generateUniqueId(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, botMessage],
          isLoading: false
        }));
        
        if (relevantLaws.length > 0) {
          sessionStorage.setItem("suggestedLaws", JSON.stringify(relevantLaws));
        }
      }, 500);
      
    } catch (error) {
      console.error("Error getting response:", error);
      
      const errorMessage: ChatMessage = {
        id: generateUniqueId(),
        content: "I'm having trouble processing your request. Please try again later.",
        sender: "bot",
        timestamp: new Date()
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false
      }));
    }
  };
  
  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };
  
  const handleApiKeyUpdate = () => {
    setIsConfigured(isDeepseekConfigured());
    
    if (isDeepseekConfigured()) {
      toast({
        title: "API Key Configured",
        description: "DeepSeek API key has been successfully configured."
      });
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto border rounded-lg overflow-hidden bg-background">
      <div className="bg-legal-black text-legal-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-semibold">Legal Assistant</h3>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-legal-black/90">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI Assistant Settings</DialogTitle>
            </DialogHeader>
            <DeepseekConfigForm onUpdate={handleApiKeyUpdate} />
          </DialogContent>
        </Dialog>
      </div>
      
      {!isConfigured && (
        <div className="bg-yellow-50 border-b border-yellow-200 p-3">
          <p className="text-sm text-yellow-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>DeepSeek API key not configured. Click the settings icon to add your API key.</span>
          </p>
        </div>
      )}
      
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
      
      {chatState.messages.length < 3 && (
        <div className="p-3 border-t">
          <p className="text-xs text-muted-foreground mb-2">Try asking about:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <button 
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full text-foreground transition-colors"
              >
                {prompt.length > 30 ? `${prompt.substring(0, 30)}...` : prompt}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
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
