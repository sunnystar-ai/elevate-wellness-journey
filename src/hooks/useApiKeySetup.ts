
import { useState, useEffect } from 'react';

export const useApiKeySetup = () => {
  const [apiKeySet, setApiKeySet] = useState(false);
  
  useEffect(() => {
    const checkApiKey = () => {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      setApiKeySet(!!apiKey && apiKey.length > 0);
    };
    
    checkApiKey();
  }, []);
  
  return { apiKeySet };
};
