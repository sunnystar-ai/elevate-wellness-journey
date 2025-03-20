
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Info, Key } from 'lucide-react';

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
      description: "Your OpenAI API key has been saved in your browser's local storage",
      variant: "default"
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Key className="h-5 w-5" />
          OpenAI Integration
        </CardTitle>
        <CardDescription>
          Required for journal analysis and personalized insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isInputVisible ? (
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-md border border-blue-100 flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">How to get your OpenAI API key:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">platform.openai.com/api-keys</a></li>
                  <li>Sign in or create an account</li>
                  <li>Create a new secret key</li>
                  <li>Copy and paste it below</li>
                </ol>
                <p className="mt-2">Your key will be stored securely in your browser's local storage only.</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                type="password"
                placeholder="sk-..." 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSubmit}>Save Key</Button>
            </div>
            
            <div className="text-xs text-muted-foreground flex flex-col gap-1 mt-2">
              <p>Alternatively, you can set the VITE_OPENAI_API_KEY in your .env file:</p>
              <code className="bg-gray-100 p-2 rounded text-xs font-mono">
                # In your .env file (create in project root if not exists)<br/>
                VITE_OPENAI_API_KEY=sk-your-api-key-here
              </code>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {(import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY.trim() !== '')
                ? "Using OpenAI API key from environment variables" 
                : localStorage.getItem('openai_api_key')
                  ? "Using saved OpenAI API key from browser storage"
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
