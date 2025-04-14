
import { toast } from "@/hooks/use-toast";

// Store API key in sessionStorage for temporary persistence
const DEEPSEEK_API_KEY_STORAGE = "deepseek_api_key";

// Get the stored API key
export const getDeepseekApiKey = (): string | null => {
  return sessionStorage.getItem(DEEPSEEK_API_KEY_STORAGE);
};

// Set the API key
export const setDeepseekApiKey = (apiKey: string): void => {
  sessionStorage.setItem(DEEPSEEK_API_KEY_STORAGE, apiKey);
};

// Clear the API key
export const clearDeepseekApiKey = (): void => {
  sessionStorage.removeItem(DEEPSEEK_API_KEY_STORAGE);
};

// Check if API key is configured
export const isDeepseekConfigured = (): boolean => {
  return !!getDeepseekApiKey();
};

// Test DeepSeek connection with a simple query
export const testDeepseekConnection = async (): Promise<boolean> => {
  const apiKey = getDeepseekApiKey();
  if (!apiKey) return false;
  
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: "Hello" }],
        temperature: 0.7,
        max_tokens: 50
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Unknown API error");
    }
    
    return true;
  } catch (error) {
    console.error("DeepSeek connection test failed:", error);
    return false;
  }
};

// Get response from DeepSeek API
export const getDeepseekResponse = async (messages: { role: string; content: string }[]): Promise<string> => {
  const apiKey = getDeepseekApiKey();
  if (!apiKey) {
    throw new Error("DeepSeek API key is not configured");
  }
  
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to get response from DeepSeek API");
    }
    
    const data = await response.json();
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
