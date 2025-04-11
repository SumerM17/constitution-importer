
// Configuration for Rasa server
export const RASA_SERVER_URL = "http://localhost:5005"; // Default Rasa server URL

// Store Rasa server URL in memory during the session
let serverUrl: string | null = null;

// Set the Rasa server URL
export const setRasaServerUrl = (url: string) => {
  serverUrl = url;
  // Also store in localStorage for persistence
  localStorage.setItem('rasa_server_url', url);
};

// Get the Rasa server URL (from memory or localStorage)
export const getRasaServerUrl = (): string => {
  if (serverUrl) return serverUrl;
  
  const storedUrl = localStorage.getItem('rasa_server_url');
  if (storedUrl) {
    serverUrl = storedUrl;
    return storedUrl;
  }
  
  return RASA_SERVER_URL; // Default URL if not set
};

// Check if Rasa server URL is set and valid
export const hasRasaServerUrl = (): boolean => {
  const url = getRasaServerUrl();
  return !!url && url.startsWith('http');
};

// Test connection to Rasa server
export const testRasaConnection = async (): Promise<boolean> => {
  try {
    // Send a simple request to check if server is reachable
    const response = await fetch(`${getRasaServerUrl()}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Set a timeout to prevent long waiting times
      signal: AbortSignal.timeout(5000),
    });
    
    return response.ok;
  } catch (error) {
    console.error("Failed to connect to Rasa server:", error);
    return false;
  }
};

// Provide a fallback response when Rasa is unavailable
const getFallbackResponse = (error: any): string => {
  if (error.name === "AbortError") {
    return "The Rasa server took too long to respond. Please check if it's running correctly.";
  } else if (error.message.includes("NetworkError")) {
    return "Unable to reach the Rasa server. Please verify the server URL and ensure it's running.";
  } else if (error.message.includes("Failed to fetch")) {
    return "Network error connecting to Rasa. Check your internet connection and server URL.";
  }
  return "I'm having trouble connecting to my AI backend. Please check the Rasa server connection.";
};

// Send message to Rasa server and get response
export const sendMessageToRasa = async (message: string, sender_id: string = "user"): Promise<string> => {
  try {
    const controller = new AbortController();
    // Set a timeout to prevent waiting too long for a response
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${getRasaServerUrl()}/webhooks/rest/webhook`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: sender_id,
        message
      }),
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Rasa server returned ${response.status}`);
    }

    const data = await response.json();
    
    // Rasa returns an array of message objects
    if (data.length > 0) {
      // Combine all text responses
      const messages = data.map((msg: any) => msg.text || "").filter(Boolean);
      return messages.join('\n');
    }
    
    // If no valid response from Rasa
    return "I'm sorry, I didn't understand that. Could you rephrase?";
  } catch (error) {
    console.error("Error communicating with Rasa:", error);
    return getFallbackResponse(error);
  }
};
