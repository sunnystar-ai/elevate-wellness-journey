
import React from 'react';
import { Star } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface CommunityPick {
  id: number;
  title: string;
  user: string;
  comment: string;
  avatar: string;
}

interface CommunitySectionProps {
  title: string;
  picks: CommunityPick[];
  delay?: number;
}

const CommunitySection = ({ title, picks, delay = 0 }: CommunitySectionProps) => {
  return (
    <AnimatedSection delay={delay} className="mb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {picks.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[280px] rounded-xl overflow-hidden bg-card shadow-sm p-4"
            >
              <div className="flex items-center mb-3">
                <img 
                  src={item.avatar} 
                  alt={item.user} 
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-medium text-sm">{item.user}</h3>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>
              <h4 className="font-medium mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground italic">"{item.comment}"</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </AnimatedSection>
  );
};

export default CommunitySection;
