
import { ReactNode } from 'react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { TraitDescription } from './emotion-tendencies-types';

interface TraitButtonProps {
  trait: string;
  icon: ReactNode;
  value: number;
  traitInfo: TraitDescription;
}

const TraitButton = ({ trait, icon, value, traitInfo }: TraitButtonProps) => {
  // Format the display name
  const getDisplayName = (trait: string) => {
    if (trait === 'agreeableness') return 'Empathy';
    if (trait === 'conscientiousness') return 'Conscient.';
    return trait.charAt(0).toUpperCase() + trait.slice(1);
  };
  
  const displayName = getDisplayName(trait);
  
  console.log(`TraitButton: ${trait}, value: ${value}, icon:`, icon ? 'Icon present' : 'No icon');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
          <div className={`h-16 w-16 rounded-full ${traitInfo.bgColor || 'bg-primary/10'} flex items-center justify-center mb-1 shadow-sm`}>
            {icon || <div className="h-8 w-8 bg-primary/20 rounded-full" />}
          </div>
          <p className="text-xs font-medium mt-1">{displayName}</p>
          <p className="text-sm font-medium">{value}%</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-2">
          <h4 className="font-medium">{traitInfo.title || displayName}</h4>
          <p className="text-sm text-muted-foreground">{traitInfo.description || `This represents your ${trait} score.`}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TraitButton;
