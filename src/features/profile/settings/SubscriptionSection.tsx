
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

const SubscriptionSection = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Your Subscription</h3>
      <Card className="mb-3">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium">Premium Plan</span>
            <Badge>Active</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Renews on Apr 15, 2024</p>
          <ul className="text-sm space-y-1 mb-3">
            <li className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>Unlimited access to all wellness programs</span>
            </li>
            <li className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>Personalized wellness recommendations</span>
            </li>
            <li className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>Advanced analytics and insights</span>
            </li>
          </ul>
          <div className="space-y-2">
            <Button className="w-full" variant="outline">Manage Subscription</Button>
            <Button className="w-full" variant="link">View Billing History</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SubscriptionSection;
