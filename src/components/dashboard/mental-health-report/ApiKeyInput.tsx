
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Key } from 'lucide-react';
import ApiKeyStatus from './ApiKeyStatus';
import ApiKeyForm from './ApiKeyForm';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [apiKeyType, setApiKeyType] = useState<'env' | 'localStorage' | 'none'>('none');
  const { toast } = useToast();

  // Check for API keys in order of priority
  useEffect(() => {
    // First check for localStorage (user-provided takes precedence)
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey && savedKey.trim() !== '') {
      console.log('Using API key from localStorage');
      setApiKeyType('localStorage');
      return;
    }
    
    // Then check for environment variable
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (envApiKey && envApiKey.trim() !== '') {
      console.log('Using API key from environment variables');
      setApiKeyType('env');
      return;
    }
    
    // Show input if no key is found
    setApiKeyType('none');
    setIsInputVisible(true);
  }, []);

  const handleSubmit = (submittedApiKey: string) => {
    if (!submittedApiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }
    
    if (!submittedApiKey.startsWith('sk-')) {
      toast({
        title: "Invalid API Key",
        description: "OpenAI API keys should start with 'sk-'",
        variant: "destructive"
      });
      return;
    }
    
    // Save to localStorage and notify parent component
    localStorage.setItem('openai_api_key', submittedApiKey);
    setApiKeyType('localStorage');
    onApiKeySubmit(submittedApiKey);
    setIsInputVisible(false);
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved in your browser's local storage",
    });
  };

  const resetApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setApiKeyType('none');
    setIsInputVisible(true);
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed from browser storage",
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
          <ApiKeyForm 
            apiKey={apiKey} 
            setApiKey={setApiKey} 
            onSubmit={() => handleSubmit(apiKey)} 
          />
        ) : (
          <ApiKeyStatus 
            apiKeyType={apiKeyType} 
            onEditClick={() => setIsInputVisible(true)} 
            onResetClick={resetApiKey} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
