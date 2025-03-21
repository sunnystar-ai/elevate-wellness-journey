
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';

const AchievementsSection = () => {
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <Button variant="link" className="h-auto p-0" size="sm">View All</Button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs font-medium">Early Bird</p>
            <p className="text-[10px] text-muted-foreground">Mar 5</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
