
import { Law } from "@/types/law-types";
import { findRelevantLaws } from "@/utils/chatUtils";

// Store the API key in memory during the session
let apiKey: string | null = null;

// Set the API key for Perplexity
export const setPerplexityApiKey = (key: string) => {
  apiKey = key;
  // Also store in localStorage for persistence
  localStorage.setItem('perplexity_api_key', key);
};

// Get the API key (from memory or localStorage)
export const getPerplexityApiKey = (): string | null => {
  if (apiKey) return apiKey;
  
  const storedKey = localStorage.getItem('perplexity_api_key');
  if (storedKey) {
    apiKey = storedKey;
    return storedKey;
  }
  
  return null;
};

// Check if API key exists
export const hasPerplexityApiKey = (): boolean => {
  return getPerplexityApiKey() !== null;
};

// Clear the API key
export const clearPerplexityApiKey = () => {
  apiKey = null;
  localStorage.removeItem('perplexity_api_key');
};

// Function to call the Perplexity API
export const getAIResponse = async (userQuery: string): Promise<{ message: string; laws: Law[] }> => {
  const key = getPerplexityApiKey();
  
  if (!key) {
    throw new Error("API key is not set");
  }
  
  try {
    // Find relevant laws using our existing function
    const relevantLaws = findRelevantLaws(userQuery);
    
    // Only call API if we have a key
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful legal assistant bot that provides information about laws and legal matters. Be precise, informative, and concise. Always start your response with "Based on your query, here are some relevant laws that might help:" followed by your answer.'
          },
          {
            role: 'user',
            content: userQuery
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 300,
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;
    
    // Always make sure the message starts with our required prefix
    const formattedMessage = aiMessage.startsWith("Based on your query") 
      ? aiMessage 
      : `Based on your query, here are some relevant laws that might help: ${aiMessage}`;

    return {
      message: formattedMessage,
      laws: relevantLaws
    };
    
  } catch (error) {
    console.error("Error calling Perplexity API:", error);
    
    // Fallback to our current implementation
    const relevantLaws = findRelevantLaws(userQuery);
    return {
      message: "Based on your query, here are some relevant laws that might help:",
      laws: relevantLaws
    };
  }
};
