
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HelpCircle, Bell, Info, ChevronRight } from 'lucide-react';

const HelpSupportSection = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Help & Support</h3>
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 hover:bg-accent rounded-t-md">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <span>FAQs</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span>Contact Support</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent rounded-b-md">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-muted-foreground" />
              <span>Terms & Privacy</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default HelpSupportSection;
