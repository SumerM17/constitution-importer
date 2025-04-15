
import { toast } from "@/hooks/use-toast";

// Using a hard-coded API key for DeepSeek
// Using a valid DeepSeek API key with proper permissions
const DEEPSEEK_API_KEY = "sk-d900g0e9-7119-4d59-9465-1c53bc708242";

// Get the API key (now returns the hardcoded key)
export const getDeepseekApiKey = (): string => {
  return DEEPSEEK_API_KEY;
};

// These functions are maintained for backward compatibility but now just return true
export const setDeepseekApiKey = (apiKey: string): void => {
  // No-op as we're using a hardcoded key
  return;
};

export const clearDeepseekApiKey = (): void => {
  // No-op as we're using a hardcoded key
  return;
};

// Check if API key is configured (always true now)
export const isDeepseekConfigured = (): boolean => {
  return true;
};

// Test DeepSeek connection with a simple query
export const testDeepseekConnection = async (): Promise<boolean> => {
  try {
    console.log("Testing DeepSeek connection with API key:", DEEPSEEK_API_KEY.slice(0, 10) + "...");
    
    const response = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-coder",
        messages: [{ role: "user", content: "Hello" }],
        temperature: 0.7,
        max_tokens: 50
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error("DeepSeek API error:", error);
      const errorMessage = error.detail || error.error?.message || "Unknown API error";
      console.error("Error message:", errorMessage);
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log("Test connection successful:", data);
    return true;
  } catch (error) {
    console.error("DeepSeek connection test failed:", error);
    return false;
  }
};

// Get response from DeepSeek API
export const getDeepseekResponse = async (messages: { role: string; content: string }[]): Promise<string> => {
  try {
    // Check if we have valid messages to send
    if (!messages || messages.length === 0) {
      throw new Error("No messages provided for DeepSeek API");
    }
    
    // Log the request being sent to help with debugging
    console.log("Sending request to DeepSeek API:", { 
      model: "deepseek-coder",
      messages: messages.slice(0, 2).concat([{...messages[messages.length - 1], content: "..."}]), // Log first messages and truncate content for readability
      temperature: 0.7
    });
    
    const response = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-coder", // Using the correct model name
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    // Log the raw response for debugging
    console.log("DeepSeek API response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      let error;
      try {
        error = JSON.parse(errorText);
      } catch (e) {
        error = { detail: errorText };
      }
      
      console.error("DeepSeek API error:", error);
      // Provide more detailed error message
      const errorMsg = error.detail || error.error?.message || `HTTP Error ${response.status}: Failed to get response from DeepSeek API`;
      toast({
        title: "API Error",
        description: errorMsg,
        variant: "destructive"
      });
      throw new Error(errorMsg);
    }
    
    const data = await response.json();
    console.log("Received response from DeepSeek:", data); // Log the successful response
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from DeepSeek API");
    }
    
    return data.choices[0].message.content;
  } catch (error: any) {
    console.error("Error getting DeepSeek response:", error);
    toast({
      title: "API Error",
      description: error.message || "Failed to get response from DeepSeek API",
      variant: "destructive"
    });
    throw error;
  }
};
