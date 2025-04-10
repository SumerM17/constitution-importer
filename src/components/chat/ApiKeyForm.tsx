
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet,
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle
} from "@/components/ui/sheet";
import { hasPerplexityApiKey, setPerplexityApiKey, clearPerplexityApiKey } from "@/utils/perplexityUtils";
import { Key, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyFormProps {
  onKeySet: () => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onKeySet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key exists
    setHasKey(hasPerplexityApiKey());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    setPerplexityApiKey(apiKey);
    setHasKey(true);
    setIsOpen(false);
    setApiKey("");
    toast({
      title: "Success",
      description: "API key set successfully",
    });
    onKeySet();
  };

  const handleRemoveKey = () => {
    clearPerplexityApiKey();
    setHasKey(false);
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed"
    });
  };

  return (
    <div>
      {hasKey ? (
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-200 rounded-md">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <p className="text-sm flex-grow">Perplexity API key is set</p>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
            Change
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRemoveKey}>
            Remove
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-200 rounded-md">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <p className="text-sm flex-grow">Set up Perplexity API key to use the AI chatbot</p>
          <Button onClick={() => setIsOpen(true)} className="flex items-center gap-1">
            <Key className="h-4 w-4" />
            <span>Set API Key</span>
          </Button>
        </div>
      )}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Set Perplexity API Key</SheetTitle>
            <SheetDescription>
              Enter your Perplexity API key to enable AI responses.
              You can get an API key from the{" "}
              <a
                href="https://www.perplexity.ai/settings/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-legal-accent underline"
              >
                Perplexity API settings
              </a>.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="pplx-xxxxxxxxxxxxxxxxxxxxxxxx"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save API Key</Button>
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              <p>
                Note: Your API key is stored locally in your browser and is never sent to our servers.
                API calls are made directly from your browser to the Perplexity API.
              </p>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ApiKeyForm;
