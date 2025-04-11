
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

// Test connection to Rasa server with detailed error information
export const testRasaConnection = async (): Promise<{ success: boolean; errorType?: string; errorMessage?: string }> => {
  try {
    // Create a timeout controller to prevent long waiting times
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    // Send a simple request to check if server is reachable
    const response = await fetch(`${getRasaServerUrl()}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });
    
    // Clear the timeout since we got a response
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return { 
        success: false, 
        errorType: 'server_error', 
        errorMessage: `Server returned status ${response.status}: ${response.statusText}` 
      };
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to connect to Rasa server:", error);
    
    // Provide detailed error information based on error type
    if (error.name === "AbortError") {
      return { 
        success: false, 
        errorType: 'timeout', 
        errorMessage: "Connection timed out. The server may be slow or unreachable." 
      };
    } else if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
      return { 
        success: false, 
        errorType: 'network', 
        errorMessage: "Network error. The server may be down or the URL may be incorrect." 
      };
    } else if (error.message?.includes("NetworkError")) {
      return { 
        success: false, 
        errorType: 'cors', 
        errorMessage: "CORS error. The Rasa server may not allow requests from this origin." 
      };
    }
    
    return { 
      success: false, 
      errorType: 'unknown', 
      errorMessage: error.message || "Unknown error occurred" 
    };
  }
};

// Get specific troubleshooting instructions based on error type
export const getRasaTroubleshooting = (errorType?: string): string[] => {
  const commonInstructions = [
    "Ensure the Rasa server is running on the specified URL.",
    "Check if the URL is correct (e.g., http://localhost:5005).",
    "Verify no firewall or network issues are blocking the connection."
  ];
  
  switch (errorType) {
    case 'timeout':
      return [
        "The connection to the Rasa server timed out.",
        "Check if the server is overloaded or slow to respond.",
        "Try increasing the timeout or restarting the server.",
        ...commonInstructions
      ];
    case 'network':
      return [
        "Failed to establish a network connection to the Rasa server.",
        "Verify the server is running and accessible from your network.",
        "Double-check the URL is correct and includes http:// or https://.",
        "Try using 'localhost' instead of an IP address, or vice versa.",
        ...commonInstructions
      ];
    case 'cors':
      return [
        "CORS policy is preventing connection to the Rasa server.",
        "Run Rasa with the '--cors \"*\"' flag to allow cross-origin requests.",
        "Example: rasa run --cors \"*\" --enable-api",
        ...commonInstructions
      ];
    case 'server_error':
      return [
        "The Rasa server returned an error status.",
        "Check the server logs for more information.",
        "Verify that the server endpoints are configured correctly.",
        ...commonInstructions
      ];
    default:
      return commonInstructions;
  }
};

// Provide a fallback response when Rasa is unavailable
const getFallbackResponse = (error: any): string => {
  if (error.name === "AbortError") {
    return "The Rasa server took too long to respond. Please check if it's running correctly.";
  } else if (error.message?.includes("NetworkError")) {
    return "Unable to reach the Rasa server. Please verify the server URL and ensure it's running.";
  } else if (error.message?.includes("Failed to fetch")) {
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
