
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { toast } = useToast();

  // Check for environment variables or fallback to localStorage
  useEffect(() => {
    // First check for environment variable (Vite exposes env vars with VITE_ prefix)
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (envApiKey && envApiKey.trim() !== '') {
      console.log('Using API key from environment variables');
      onApiKeySubmit(envApiKey);
      return;
    }
    
    // Fallback to localStorage if no env variable
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      console.log('Using API key from localStorage');
      onApiKeySubmit(savedKey);
    } else {
      // Show input if no key is found
      setIsInputVisible(true);
    }
  }, [onApiKeySubmit]);

  const handleSubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }
    
    if (!apiKey.startsWith('sk-')) {
      toast({
        title: "Invalid API Key",
        description: "OpenAI API keys should start with 'sk-'",
        variant: "destructive"
      });
      return;
    }
    
    // Save to localStorage and notify parent component
    localStorage.setItem('openai_api_key', apiKey);
    onApiKeySubmit(apiKey);
    setIsInputVisible(false);
    
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved for this session",
      variant: "default"
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">OpenAI Integration</CardTitle>
      </CardHeader>
      <CardContent>
        {isInputVisible ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-2">
              Enter your OpenAI API key for personalized journal analysis.
              This key will be stored in your browser's local storage only.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="password"
                placeholder="sk-..." 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSubmit}>Save Key</Button>
              <Button variant="outline" onClick={() => setIsInputVisible(false)}>Cancel</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Set the VITE_OPENAI_API_KEY in your .env file to avoid entering it here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {(import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY.trim() !== '')
                ? "Using OpenAI API key from environment variables" 
                : localStorage.getItem('openai_api_key')
                  ? "Using saved OpenAI API key"
                  : "Use OpenAI's advanced AI to analyze your journal entries for deeper insights."}
            </p>
            {(!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY.trim() === '') && (
              <Button 
                variant="outline" 
                onClick={() => setIsInputVisible(true)}
                className="w-full md:w-auto"
              >
                {localStorage.getItem('openai_api_key') ? 'Update OpenAI API Key' : 'Enter OpenAI API Key'}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
