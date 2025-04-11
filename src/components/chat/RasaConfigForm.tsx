
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  getRasaServerUrl, 
  setRasaServerUrl, 
  hasRasaServerUrl,
  testRasaConnection,
  getRasaTroubleshooting
} from "@/utils/rasaUtils";
import { AlertCircle, CheckCircle2, Loader2, ExternalLink, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface RasaConfigFormProps {
  onServerSet: () => void;
}

const RasaConfigForm = ({ onServerSet }: RasaConfigFormProps) => {
  const [serverUrl, setServerUrl] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"untested" | "success" | "failed">("untested");
  const [errorType, setErrorType] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [troubleshootingTips, setTroubleshootingTips] = useState<string[]>([]);
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
      const result = await testRasaConnection();
      
      if (result.success) {
        setConnectionStatus("success");
        setErrorType(undefined);
        setErrorMessage(undefined);
        
        toast({
          title: "Connection Successful",
          description: "Successfully connected to Rasa server"
        });
      } else {
        setConnectionStatus("failed");
        setErrorType(result.errorType);
        setErrorMessage(result.errorMessage);
        setTroubleshootingTips(getRasaTroubleshooting(result.errorType));
        
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: result.errorMessage || "Could not connect to Rasa server"
        });
      }
    } catch (error) {
      setConnectionStatus("failed");
      setErrorType("unknown");
      setErrorMessage("Unexpected error testing connection");
      setTroubleshootingTips(getRasaTroubleshooting());
      
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
      if (connectionStatus === "success") {
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
                ? errorMessage || "Cannot connect to Rasa server. Check if it's running."
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
                <RefreshCw className={`h-3.5 w-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                <span className="sr-only">Test</span>
              </Button>
            )}
          </form>
          
          {connectionStatus === "failed" && (
            <Alert variant="destructive" className="mt-3 py-2">
              <AlertDescription className="text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium mb-1">{errorType === 'timeout' ? 'Connection Timeout' : errorType === 'network' ? 'Network Error' : errorType === 'cors' ? 'CORS Error' : 'Connection Error'}</p>
                    <p className="mb-2">{errorMessage}</p>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-1">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Troubleshooting Guide
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Rasa Connection Troubleshooting</SheetTitle>
                          <SheetDescription>
                            Follow these steps to fix your Rasa server connection
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Possible Solutions:</h4>
                          <ul className="space-y-3">
                            {troubleshootingTips.map((tip, index) => (
                              <li key={index} className="flex gap-2">
                                <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-xs">{index + 1}</span>
                                </div>
                                <p className="text-sm">{tip}</p>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="border-t mt-4 pt-4">
                            <h4 className="text-sm font-medium mb-2">Common Rasa Server Launch Command:</h4>
                            <div className="bg-muted p-2 rounded text-xs font-mono overflow-auto">
                              rasa run --enable-api --cors "*" --debug
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              This command enables the API and allows cross-origin requests, which is needed for web client connections.
                            </p>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default RasaConfigForm;
