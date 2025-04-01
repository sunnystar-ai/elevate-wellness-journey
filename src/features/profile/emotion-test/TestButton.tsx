
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

interface TestButtonProps {
  onClick: () => void;
}

const TestButton = ({ onClick }: TestButtonProps) => {
  return (
    <Button className="w-full font-medium flex items-center justify-center gap-2" onClick={onClick}>
      <Brain className="h-4 w-4" /> 
      Take Big Five Assessment
    </Button>
  );
};

export default TestButton;
