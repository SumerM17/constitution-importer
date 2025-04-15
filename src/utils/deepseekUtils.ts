
import { toast } from "@/hooks/use-toast";

// Storage key for API key in localStorage
const DEEPSEEK_API_KEY_STORAGE = "DEEPSEEK_API_KEY";

// Get the API key from localStorage with a fallback to a default (demo) value
export const getDeepseekApiKey = (): string => {
  // Try to get the API key from localStorage
  const storedKey = localStorage.getItem(DEEPSEEK_API_KEY_STORAGE);
  return storedKey || "";
};

// Set the API key in localStorage
export const setDeepseekApiKey = (apiKey: string): void => {
  localStorage.setItem(DEEPSEEK_API_KEY_STORAGE, apiKey);
};

// Clear the API key from localStorage
export const clearDeepseekApiKey = (): void => {
  localStorage.removeItem(DEEPSEEK_API_KEY_STORAGE);
};

// Check if API key is configured
export const isDeepseekConfigured = (): boolean => {
  const apiKey = getDeepseekApiKey();
  return !!apiKey && apiKey.length > 10; // Basic validation that it's not empty and has some length
};

// Test DeepSeek connection with a simple query
export const testDeepseekConnection = async (): Promise<boolean> => {
  try {
    const apiKey = getDeepseekApiKey();
    if (!apiKey) {
      throw new Error("API key not configured");
    }
    
    console.log("Testing DeepSeek connection with API key:", apiKey.slice(0, 10) + "...");
    
    const response = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
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

// Get response from DeepSeek API with fallback to local processing
export const getDeepseekResponse = async (messages: { role: string; content: string }[]): Promise<string> => {
  try {
    // Check if API key is configured
    const apiKey = getDeepseekApiKey();
    if (!apiKey) {
      throw new Error("API key not configured. Please configure your DeepSeek API key in Settings.");
    }
    
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
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-coder",
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
      let errorMsg = error.detail || error.error?.message || `HTTP Error ${response.status}: Failed to get response from DeepSeek API`;
      
      // Add helpful instructions for common error codes
      if (response.status === 401) {
        errorMsg = "Authentication error: Your API key is invalid or expired. Please update your DeepSeek API key.";
      } else if (response.status === 403) {
        errorMsg = "Authorization error: Your API key doesn't have permission to use this model. Please check your API key permissions.";
      } else if (response.status === 429) {
        errorMsg = "Rate limit exceeded: You've made too many requests. Please try again later.";
      }
      
      toast({
        title: "API Error",
        description: errorMsg,
        variant: "destructive"
      });
      
      // Provide a more helpful response when API fails
      return "I'm having trouble connecting to my AI services. Please check your API key configuration or try again later.";
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
    
    // Return a helpful message instead of throwing error
    return "I'm having trouble processing your request. Please check your API key configuration or try again later.";
  }
};
