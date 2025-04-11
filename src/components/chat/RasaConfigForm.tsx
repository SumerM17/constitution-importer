
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  getRasaServerUrl, 
  setRasaServerUrl, 
  hasRasaServerUrl,
  testRasaConnection
} from "@/utils/rasaUtils";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RasaConfigFormProps {
  onServerSet: () => void;
}

const RasaConfigForm = ({ onServerSet }: RasaConfigFormProps) => {
  const [serverUrl, setServerUrl] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"untested" | "success" | "failed">("untested");
  const { toast } = useToast();

  useEffect(() => {
    const currentUrl = getRasaServerUrl();
    setServerUrl(currentUrl);
    setIsConfigured(hasRasaServerUrl());
    
    // If we have a URL configured, test the connection on load
    if (hasRasaServerUrl()) {
      testConnection();
    }
  }, []);

  const testConnection = async () => {
    setIsTesting(true);
    setConnectionStatus("untested");
    
    try {
      const isConnected = await testRasaConnection();
      
      if (isConnected) {
        setConnectionStatus("success");
        toast({
          title: "Connection Successful",
          description: "Successfully connected to Rasa server"
        });
      } else {
        setConnectionStatus("failed");
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: "Could not connect to Rasa server. Check if it's running."
        });
      }
    } catch (error) {
      setConnectionStatus("failed");
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Error connecting to Rasa server"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serverUrl) {
      toast({
        variant: "destructive",
        title: "Server URL Required",
        description: "Please enter a valid Rasa server URL"
      });
      return;
    }

    try {
      // Simple URL validation
      new URL(serverUrl);
      setRasaServerUrl(serverUrl);
      setIsConfigured(true);
      
      // Test the connection after setting the URL
      await testConnection();
      
      // Only trigger the callback if connection is successful
      if (connectionStatus !== "failed") {
        onServerSet();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., http://localhost:5005)"
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        {isConfigured ? (
          connectionStatus === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          ) : connectionStatus === "failed" ? (
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
          )
        ) : (
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
        )}
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-1">
            {isConfigured 
              ? connectionStatus === "success"
                ? "Rasa Server Connected"
                : "Rasa Server Configuration" 
              : "Connect to Rasa Server"}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">
            {isConfigured 
              ? connectionStatus === "success"
                ? "Your chatbot is connected to a Rasa AI backend"
                : connectionStatus === "failed"
                ? "Cannot connect to Rasa server. Check if it's running."
                : "Enter your Rasa server URL to enable advanced AI capabilities"
              : "Enter your Rasa server URL to enable advanced AI capabilities"}
          </p>
          
          <form onSubmit={handleSave} className="flex gap-2">
            <Input
              type="text"
              placeholder="http://localhost:5005"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              className="flex-1 text-xs h-8"
            />
            <Button 
              type="submit" 
              variant="outline" 
              size="sm"
              disabled={isTesting}
            >
              {isTesting ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Testing
                </>
              ) : (
                isConfigured ? "Update" : "Connect"
              )}
            </Button>
            {isConfigured && (
              <Button
                type="button"
                variant="ghost" 
                size="sm"
                onClick={testConnection}
                disabled={isTesting}
              >
                Test
              </Button>
            )}
          </form>
          
          {connectionStatus === "failed" && (
            <Alert variant="destructive" className="mt-3 py-2">
              <AlertDescription className="text-xs">
                Could not connect to the Rasa server. Please check:
                <ul className="list-disc pl-5 mt-1">
                  <li>Rasa server is running</li>
                  <li>URL is correct (e.g., http://localhost:5005)</li>
                  <li>No firewall or network issues are blocking the connection</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default RasaConfigForm;
