
import { AlertCircle, CheckCircle2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ApiKeyStatusProps {
  apiKeyType: 'env' | 'localStorage' | 'none';
  onEditClick: () => void;
  onResetClick: () => void;
}

const ApiKeyStatus = ({ apiKeyType, onEditClick, onResetClick }: ApiKeyStatusProps) => {
  return (
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
          onClick={onEditClick}
          className="w-full md:w-auto"
        >
          <Edit className="h-4 w-4 mr-2" />
          {apiKeyType === 'localStorage' ? 'Update API Key' : 'Add API Key'}
        </Button>
        
        {apiKeyType === 'localStorage' && (
          <Button 
            variant="destructive" 
            onClick={onResetClick}
            className="w-full md:w-auto"
          >
            Remove API Key
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApiKeyStatus;
