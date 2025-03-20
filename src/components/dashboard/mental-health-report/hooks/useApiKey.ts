
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    let effectiveApiKey: string | undefined = undefined;
    
    if (savedKey && savedKey.trim() !== '') {
      console.log('Using API key from localStorage');
      effectiveApiKey = savedKey;
    } 
    else if (envApiKey && envApiKey.trim() !== '') {
      console.log('Using API key from environment variables');
      effectiveApiKey = envApiKey;
    }
    
    setApiKey(effectiveApiKey);
  }, []);

  const handleApiKeySubmit = (key: string) => {
    if (!key.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }
    
    if (!key.startsWith('sk-')) {
      toast({
        title: "Invalid API Key",
        description: "OpenAI API keys should start with 'sk-'",
        variant: "destructive"
      });
      return;
    }
    
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
    
    toast({
      title: "API Key Updated",
      description: "Your OpenAI API key has been saved and will be used for journal analysis.",
    });
  };

  return {
    apiKey,
    handleApiKeySubmit
  };
};
