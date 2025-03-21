
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface TestHeaderProps {
  goBack: () => void;
}

const TestHeader = ({ goBack }: TestHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <Button variant="ghost" size="sm" onClick={goBack}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-bold">Personality Test</h1>
      <div className="w-8" /> {/* Empty div for spacing */}
    </div>
  );
};

export default TestHeader;
