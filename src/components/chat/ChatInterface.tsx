import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, ChatState } from "@/types/chat-types";
import { generateUniqueId } from "@/utils/chatUtils";
import { getAIResponse, hasPerplexityApiKey } from "@/utils/perplexityUtils";
import { sendMessageToRasa, hasRasaServerUrl } from "@/utils/rasaUtils";
import { Send, Bot, User, Cpu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LawSuggestion from "./LawSuggestion";
import ApiKeyForm from "./ApiKeyForm";
import RasaConfigForm from "./RasaConfigForm";
import { motion } from "framer-motion";

type AIBackendType = "perplexity" | "rasa";

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
  const [hasApiKey, setHasApiKey] = useState(false);
  const [activeBackend, setActiveBackend] = useState<AIBackendType>("perplexity");
  const [hasRasaServer, setHasRasaServer] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef<string>(generateUniqueId());
  
  // Predefined prompts to help users get started
  const suggestedPrompts = [
    "What are the penalties for traffic signal violations?",
    "What should I do after a road accident?",
    "What laws protect women from workplace harassment?",
    "What are my rights in a domestic violence situation?",
    "What compensation can I claim for a workplace injury?"
  ];
  
  // Check if API keys exist on mount
  useEffect(() => {
    setHasApiKey(hasPerplexityApiKey());
    setHasRasaServer(hasRasaServerUrl());
  }, []);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatState.messages]);
  
  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
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
    
    try {
      let botResponse: string = "";
      let laws: any[] = [];
      
      // Use appropriate AI backend based on user selection
      if (activeBackend === "rasa" && hasRasaServer) {
        // Get response from Rasa API
        botResponse = await sendMessageToRasa(userMessage.content, sessionId.current);
      } else {
        // Get response from Perplexity API or fallback
        const response = await getAIResponse(userMessage.content);
        botResponse = response.message;
        laws = response.laws;
      }
      
      const botMessage: ChatMessage = {
        id: generateUniqueId(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false
      }));
      
      // Only store laws for display if using Perplexity
      if (activeBackend === "perplexity" && laws.length > 0) {
        sessionStorage.setItem("suggestedLaws", JSON.stringify(laws));
      }
      
      // If no laws found with Perplexity, provide helpful feedback after a moment
      if (activeBackend === "perplexity" && laws.length === 0 && userMessage.content.length < 10) {
        setTimeout(() => {
          const helpfulTip: ChatMessage = {
            id: generateUniqueId(),
            content: "Try providing more details in your question to help me find relevant laws for your situation.",
            sender: "bot",
            timestamp: new Date()
          };
          
          setChatState(prev => ({
            ...prev,
            messages: [...prev.messages, helpfulTip]
          }));
        }, 1500);
      }
    } catch (error) {
      console.error("Error getting response:", error);
      
      const errorMessage: ChatMessage = {
        id: generateUniqueId(),
        content: "I'm having trouble processing your request. Please check your connection to the AI backend.",
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
  
  const handleApiKeySet = () => {
    setHasApiKey(true);
    toast({
      title: "Perplexity AI Integration Active",
      description: "Your chatbot is now powered by Perplexity AI"
    });
  };
  
  const handleRasaServerSet = () => {
    setHasRasaServer(true);
    toast({
      title: "Rasa Integration Active",
      description: "Your chatbot is now connected to Rasa"
    });
  };
  
  const handleBackendChange = (backend: string) => {
    setActiveBackend(backend as AIBackendType);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto border rounded-lg overflow-hidden bg-background">
      <div className="bg-legal-black text-legal-white p-4 flex items-center gap-2 border-b">
        <Bot className="h-5 w-5" />
        <h3 className="font-semibold">Legal Assistant</h3>
      </div>
      
      <div className="p-4 border-b">
        <Tabs defaultValue="perplexity" onValueChange={handleBackendChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="perplexity">Perplexity AI</TabsTrigger>
            <TabsTrigger value="rasa">Rasa AI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="perplexity">
            <ApiKeyForm onKeySet={handleApiKeySet} />
          </TabsContent>
          
          <TabsContent value="rasa">
            <RasaConfigForm onServerSet={handleRasaServerSet} />
          </TabsContent>
        </Tabs>
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
                    activeBackend === "rasa" ? 
                    <Cpu className="h-4 w-4" /> : 
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
                  {activeBackend === "rasa" ? (
                    <Cpu className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
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
      
      {activeBackend === "perplexity" && <LawSuggestion />}
      
      {/* Suggested prompts */}
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
            placeholder={`Ask about your legal question... (using ${activeBackend === "rasa" ? "Rasa" : "Perplexity"} AI)`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={chatState.isLoading}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={chatState.isLoading || !inputValue.trim() || 
              (activeBackend === "rasa" && !hasRasaServer) || 
              (activeBackend === "perplexity" && !hasPerplexityApiKey() && inputValue.length > 50)}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
