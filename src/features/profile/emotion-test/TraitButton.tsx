
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
  const displayName = trait === 'agreeableness' ? 'Empathy' : trait.charAt(0).toUpperCase() + trait.slice(1);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
          <div className={`h-16 w-16 rounded-full ${traitInfo.bgColor} flex items-center justify-center mb-1`}>
            {icon}
          </div>
          <p className="text-xs font-medium">{displayName}</p>
          <p className="text-sm font-medium">{value}%</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-2">
          <h4 className="font-medium">{traitInfo.title}</h4>
          <p className="text-sm text-muted-foreground">{traitInfo.description}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TraitButton;
