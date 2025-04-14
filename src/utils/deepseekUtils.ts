
import { toast } from "@/hooks/use-toast";

// Using a hard-coded API key for DeepSeek
const DEEPSEEK_API_KEY = "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";

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
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
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
  try {
    // Updated to use the official DeepSeek API endpoint
    const response = await fetch("https://api.deepinfra.com/v1/openai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
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
