
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  getDeepseekApiKey, 
  setDeepseekApiKey,
  clearDeepseekApiKey,
  testDeepseekConnection
} from "@/utils/deepseekUtils";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const DeepseekConfigForm: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"untested" | "success" | "error">("untested");
  const { toast } = useToast();

  useEffect(() => {
    const storedKey = getDeepseekApiKey();
    if (storedKey) {
      setApiKey(storedKey);
      setIsConfigured(true);
    }
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    setDeepseekApiKey(apiKey.trim());
    setIsConfigured(true);
    
    toast({
      title: "Success",
      description: "DeepSeek API key saved",
    });
    
    // Test the connection after saving
    await testConnection();
  };

  const handleClear = () => {
    clearDeepseekApiKey();
    setApiKey("");
    setIsConfigured(false);
    setConnectionStatus("untested");
    
    toast({
      title: "API Key Removed",
      description: "DeepSeek API key has been removed",
    });
  };

  const testConnection = async () => {
    setIsTesting(true);
    setConnectionStatus("untested");
    
    try {
      const result = await testDeepseekConnection();
      if (result) {
        setConnectionStatus("success");
        toast({
          title: "Connection Successful",
          description: "Successfully connected to DeepSeek API",
        });
      } else {
        setConnectionStatus("error");
        toast({
          title: "Connection Failed",
          description: "Could not connect to DeepSeek API. Please check your API key.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setConnectionStatus("error");
      toast({
        title: "Connection Error",
        description: "An error occurred while testing the connection",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background/50 mb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">DeepSeek AI Integration</h3>
        {isConfigured && (
          <div className="flex items-center">
            {connectionStatus === "success" && (
              <div className="flex items-center text-green-500 text-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>Connected</span>
              </div>
            )}
            {connectionStatus === "error" && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>Connection Error</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="apiKey">DeepSeek API Key</Label>
        <div className="flex gap-2">
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your DeepSeek API key"
            className="flex-1"
          />
        </div>
        
        <div className="flex justify-between pt-2">
          <div className="space-x-2">
            <Button onClick={handleSave} disabled={!apiKey.trim() || isTesting}>
              Save
            </Button>
            {isConfigured && (
              <Button 
                variant="outline" 
                onClick={testConnection}
                disabled={isTesting}
              >
                {isTesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test Connection'
                )}
              </Button>
            )}
          </div>
          
          {isConfigured && (
            <Button variant="destructive" onClick={handleClear} disabled={isTesting}>
              Clear API Key
            </Button>
          )}
        </div>
      </div>
      
      {!isConfigured && (
        <div className="text-sm text-muted-foreground mt-2">
          <p>You need a DeepSeek API key to use this integration.</p>
          <p>Once configured, the chat will use DeepSeek's AI to generate responses.</p>
        </div>
      )}
      
      {connectionStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800 mt-2">
          <h4 className="font-semibold mb-1">Troubleshooting:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Verify your API key is correct</li>
            <li>Check if your account has active DeepSeek API access</li>
            <li>Ensure you have sufficient API credits</li>
            <li>Check your internet connection</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeepseekConfigForm;
