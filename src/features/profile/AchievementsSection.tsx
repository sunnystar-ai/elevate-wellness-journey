
import { Button } from '@/components/ui/button';
import { Heart, Smile, Brain, TrendingUp, TrendingDown } from 'lucide-react';

const EmotionTendenciesSection = () => {
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Emotion Tendencies</h3>
        <Button variant="link" className="h-auto p-0" size="sm">View Details</Button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
            <Smile className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs font-medium">Happiness</p>
          <p className="text-[10px] text-muted-foreground">75%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs font-medium">Empathy</p>
          <p className="text-[10px] text-muted-foreground">82%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-1">
            <TrendingUp className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-xs font-medium">Optimism</p>
          <p className="text-[10px] text-muted-foreground">68%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-1">
            <Smile className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-xs font-medium">Calmness</p>
          <p className="text-[10px] text-muted-foreground">61%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-1">
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-xs font-medium">Stress</p>
          <p className="text-[10px] text-muted-foreground">42%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-1">
            <Brain className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-xs font-medium">Resilience</p>
          <p className="text-[10px] text-muted-foreground">79%</p>
        </div>
      </div>
    </section>
  );
};

export default EmotionTendenciesSection;
