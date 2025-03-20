
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Info, Key, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Check for environment variables or fallback to localStorage
  useEffect(() => {
    // First check for environment variable
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

  const copyEnvExample = () => {
    const text = 'VITE_OPENAI_API_KEY=sk-your-api-key-here';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Text Copied",
      description: "Example .env line copied to clipboard",
      variant: "default"
    });
  };

  const resetApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setIsInputVisible(true);
    
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed from browser storage",
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
            <Alert variant="default" className="bg-blue-50 border-blue-200">
              <Info className="h-5 w-5 text-blue-500" />
              <AlertTitle className="text-blue-700">Recommended: Add your API key to .env file</AlertTitle>
              <AlertDescription className="text-blue-600">
                <ol className="list-decimal pl-5 space-y-1 mt-1">
                  <li>Create or open the <code className="bg-blue-100 px-1 rounded">.env</code> file in the project root</li>
                  <li>Add your OpenAI API key: <code className="bg-blue-100 px-1 rounded">VITE_OPENAI_API_KEY=sk-your-api-key-here</code></li>
                  <li>Save the file and restart the application</li>
                </ol>
                <p className="mt-2 text-sm">Need an API key? Get one at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-medium">platform.openai.com/api-keys</a></p>
              </AlertDescription>
            </Alert>
            
            <Alert variant="default" className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-700">Alternative: Temporary browser storage</AlertTitle>
              <AlertDescription className="text-amber-600">
                If you can't modify the .env file, you can temporarily store your API key in browser storage:
              </AlertDescription>
            </Alert>
            
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
            
            <div className="text-xs text-muted-foreground mt-2">
              <p className="mb-1">Copy this line to your .env file:</p>
              <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded text-xs font-mono relative">
                <code>VITE_OPENAI_API_KEY=sk-your-api-key-here</code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 absolute right-2"
                  onClick={copyEnvExample}
                >
                  {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Alert variant={import.meta.env.VITE_OPENAI_API_KEY ? "default" : "default"} className={`${import.meta.env.VITE_OPENAI_API_KEY ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}>
              <CheckCircle2 className={`h-4 w-4 ${import.meta.env.VITE_OPENAI_API_KEY ? "text-green-500" : "text-blue-500"}`} />
              <AlertTitle className={`${import.meta.env.VITE_OPENAI_API_KEY ? "text-green-700" : "text-blue-700"}`}>
                {import.meta.env.VITE_OPENAI_API_KEY 
                  ? "Using API key from .env file" 
                  : "API Key Status"}
              </AlertTitle>
              <AlertDescription className={`${import.meta.env.VITE_OPENAI_API_KEY ? "text-green-600" : "text-blue-600"}`}>
                {import.meta.env.VITE_OPENAI_API_KEY
                  ? "Your OpenAI API key has been loaded from environment variables"
                  : localStorage.getItem('openai_api_key')
                    ? "Using saved OpenAI API key from browser storage (recommend using .env instead)"
                    : "No API key found. Please add one to your .env file or use browser storage."}
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col md:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsInputVisible(true)}
                className="w-full md:w-auto"
              >
                {localStorage.getItem('openai_api_key') ? 'Update API Key' : 'Add API Key Temporarily'}
              </Button>
              
              {localStorage.getItem('openai_api_key') && (
                <Button 
                  variant="destructive" 
                  onClick={resetApiKey}
                  className="w-full md:w-auto"
                >
                  Remove Browser API Key
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
