
import { Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CommunityGuidelines = () => {
  return (
    <div className="px-4 pb-6">
      <Card className="p-3 bg-muted/50">
        <div className="flex items-start gap-2">
          <div className="bg-primary/10 rounded-full p-1 flex-shrink-0">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs mb-2">
              Our community thrives on positivity and support. Remember to be respectful in all interactions.
            </p>
            <Button variant="link" className="h-auto p-0 text-xs">
              Review Community Guidelines
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommunityGuidelines;
