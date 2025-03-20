
import { useState } from 'react';
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

  // Load from localStorage if available
  useState(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      onApiKeySubmit(savedKey);
    }
  });

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
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Use OpenAI's advanced AI to analyze your journal entries for deeper insights.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setIsInputVisible(true)}
              className="w-full"
            >
              {localStorage.getItem('openai_api_key') ? 'Update OpenAI API Key' : 'Enter OpenAI API Key'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
