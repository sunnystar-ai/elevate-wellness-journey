
import { Brain, Heart, Users, Sparkle, AlertTriangle } from 'lucide-react';
import TraitButton from './TraitButton';
import { traitDescriptions } from './trait-descriptions';
import { EmotionData, TraitKey } from './emotion-tendencies-types';

interface TraitButtonsGridProps {
  emotionData: EmotionData;
}

const TraitButtonsGrid = ({ emotionData }: TraitButtonsGridProps) => {
  // Ensure we have valid emotionData, or use a default empty object
  const safeEmotionData = emotionData || {};
  
  // Check if we have valid data with properties
  const hasData = safeEmotionData && Object.keys(safeEmotionData).length > 0;
  
  console.log("Rendering TraitButtonsGrid with data:", safeEmotionData);
  console.log("Has data:", hasData);

  const getTraitIcon = (trait: TraitKey) => {
    // Get the trait description or use a fallback
    const traitInfo = traitDescriptions[trait] || {
      color: 'text-primary'
    };
    
    const iconClassName = `h-8 w-8 ${traitInfo.color}`;
    
    switch(trait) {
      case 'openness':
        return <Sparkle className={iconClassName} />;
      case 'conscientiousness':
        return <Brain className={iconClassName} />;
      case 'extraversion':
        return <Users className={iconClassName} />;
      case 'agreeableness':
        return <Heart className={iconClassName} />;
      case 'neuroticism':
        return <AlertTriangle className={iconClassName} />;
      default:
        return <Sparkle className={iconClassName} />;
    }
  };

  if (!hasData) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        <div className="col-span-full text-center text-muted-foreground p-6">
          No personality data available. Take the assessment to see your results.
        </div>
      </div>
    );
  }

  // Explicitly define the traits we want to display, in the order we want
  const traits: TraitKey[] = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
      {traits.map(trait => {
        // Get the value or default to 50
        const value = safeEmotionData[trait] !== undefined ? safeEmotionData[trait] : 50;
        console.log(`Rendering trait ${trait} with value ${value}`);
        
        return (
          <TraitButton
            key={trait}
            trait={trait}
            icon={getTraitIcon(trait)}
            value={value}
            traitInfo={traitDescriptions[trait] || {
              title: trait.charAt(0).toUpperCase() + trait.slice(1),
              color: 'text-primary',
              description: 'Trait information not found',
              bgColor: 'bg-primary/10'
            }}
          />
        );
      })}
    </div>
  );
};

export default TraitButtonsGrid;
