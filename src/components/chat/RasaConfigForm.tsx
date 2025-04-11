
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getRasaServerUrl, setRasaServerUrl, hasRasaServerUrl } from "@/utils/rasaUtils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface RasaConfigFormProps {
  onServerSet: () => void;
}

const RasaConfigForm = ({ onServerSet }: RasaConfigFormProps) => {
  const [serverUrl, setServerUrl] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const currentUrl = getRasaServerUrl();
    setServerUrl(currentUrl);
    setIsConfigured(hasRasaServerUrl());
  }, []);

  const handleSave = (e: React.FormEvent) => {
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
      onServerSet();
      toast({
        title: "Rasa Server Connected",
        description: "Successfully connected to Rasa server"
      });
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
          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
        ) : (
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
        )}
        <div className="flex-1">
          <h3 className="text-sm font-medium mb-1">
            {isConfigured ? "Rasa Server Connected" : "Connect to Rasa Server"}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">
            {isConfigured 
              ? "Your chatbot is connected to a Rasa AI backend" 
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
            <Button type="submit" variant="outline" size="sm">
              {isConfigured ? "Update" : "Connect"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RasaConfigForm;
