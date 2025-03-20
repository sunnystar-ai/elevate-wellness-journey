
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Info, Key, Copy, CheckCircle2, AlertCircle, Edit } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiKeyType, setApiKeyType] = useState<'env' | 'localStorage' | 'none'>('none');
  const { toast } = useToast();

  // Check for environment variables or fallback to localStorage
  useEffect(() => {
    // First check for environment variable
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (envApiKey && envApiKey.trim() !== '') {
      console.log('Using API key from environment variables');
      setApiKeyType('env');
      onApiKeySubmit(envApiKey);
      return;
    }
    
    // Fallback to localStorage if no env variable
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      console.log('Using API key from localStorage');
      setApiKeyType('localStorage');
      onApiKeySubmit(savedKey);
    } else {
      // Show input if no key is found
      setApiKeyType('none');
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
    setApiKeyType('localStorage');
    onApiKeySubmit(apiKey);
    setIsInputVisible(false);
    
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
          <div className="space-y-3">
            <Tabs defaultValue="browser">
              <TabsList className="w-full mb-2">
                <TabsTrigger value="browser" className="flex-1">Browser Storage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="browser" className="space-y-3">
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertTitle className="text-blue-700">Add your OpenAI API key</AlertTitle>
                  <AlertDescription className="text-blue-600">
                    <p>Your key will be stored in your browser's local storage.</p>
                    <p className="mt-1 text-sm">Need an API key? Get one at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-medium">platform.openai.com/api-keys</a></p>
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
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-3">
            <Alert className={`${apiKeyType === 'env' ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}>
              <CheckCircle2 className={`h-4 w-4 ${apiKeyType === 'env' ? "text-green-500" : "text-blue-500"}`} />
              <AlertTitle className={`${apiKeyType === 'env' ? "text-green-700" : "text-blue-700"}`}>
                {apiKeyType === 'env' 
                  ? "Using API key from environment" 
                  : "Using API key from browser storage"}
              </AlertTitle>
              <AlertDescription className={`${apiKeyType === 'env' ? "text-green-600" : "text-blue-600"}`}>
                {apiKeyType === 'env'
                  ? "Your OpenAI API key has been loaded from environment variables"
                  : "Your OpenAI API key is stored in your browser's local storage"}
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col md:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsInputVisible(true)}
                className="w-full md:w-auto"
              >
                <Edit className="h-4 w-4 mr-2" />
                {apiKeyType === 'localStorage' ? 'Update API Key' : 'Add API Key'}
              </Button>
              
              {apiKeyType === 'localStorage' && (
                <Button 
                  variant="destructive" 
                  onClick={resetApiKey}
                  className="w-full md:w-auto"
                >
                  Remove API Key
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
