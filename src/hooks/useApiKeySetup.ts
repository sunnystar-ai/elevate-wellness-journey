
import { useState, useEffect } from 'react';

export const useApiKeySetup = () => {
  const [apiKeySet, setApiKeySet] = useState(false);
  
  useEffect(() => {
    const checkApiKey = () => {
      const localStorageKey = localStorage.getItem('openai_api_key');
      const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      setApiKeySet(
        (!!localStorageKey && localStorageKey.length > 0) || 
        (!!envApiKey && envApiKey.length > 0)
      );
    };
    
    checkApiKey();
    
    // Re-check when localStorage changes
    const handleStorageChange = () => {
      checkApiKey();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return { apiKeySet };
};
