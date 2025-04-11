
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

// Mocked AI responses for when no API key is provided
const mockResponses = [
  "Based on your query, here are some relevant laws that might help: The Labor Law of 2022 provides specific protections for employees against unfair dismissal. According to Section 18, an employer must provide valid reasons and follow proper procedures before terminating employment.",
  "Based on your query, here are some relevant laws that might help: Traffic regulation 45B states that all vehicles must come to a complete stop at intersections with stop signs. Failure to do so can result in penalties including fines and points on your driving record.",
  "Based on your query, here are some relevant laws that might help: The Consumer Protection Act provides remedies for defective products. Under Section 24, consumers can seek replacement, repair, or refund for goods that don't meet quality standards.",
  "Based on your query, here are some relevant laws that might help: Housing regulations require landlords to maintain safe living conditions. Code 56.3 specifically mandates functional heating, plumbing, and electrical systems in all rental properties.",
  "Based on your query, here are some relevant laws that might help: Family law statutes establish child custody guidelines prioritizing the best interests of the child. Courts consider factors such as parental capability, home stability, and the child's relationship with each parent."
];

// Function to call the Perplexity API or use mock responses
export const getAIResponse = async (userQuery: string): Promise<{ message: string; laws: Law[] }> => {
  const key = getPerplexityApiKey();
  
  try {
    // Find relevant laws using our existing function
    const relevantLaws = findRelevantLaws(userQuery);
    
    // If we have an API key, use the real Perplexity API
    if (key) {
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
    } else {
      // If no API key, use mock responses but still provide relevant laws
      // Select a random mock response
      const mockIndex = Math.floor(Math.random() * mockResponses.length);
      
      // Generate a simulated delay to mimic API call (between 500-1500ms)
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      return {
        message: mockResponses[mockIndex],
        laws: relevantLaws
      };
    }
    
  } catch (error) {
    console.error("Error with AI response:", error);
    
    // Fallback to our current implementation
    const relevantLaws = findRelevantLaws(userQuery);
    return {
      message: "Based on your query, here are some relevant laws that might help: I found some potentially relevant laws for you to consider. While I can't provide specific legal advice, these statutes may address your situation.",
      laws: relevantLaws
    };
  }
};
