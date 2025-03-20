
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ApiKeyFormProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  onSubmit: () => void;
}

const ApiKeyForm = ({ apiKey, setApiKey, onSubmit }: ApiKeyFormProps) => {
  return (
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
            <Button onClick={onSubmit}>Save Key</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiKeyForm;
