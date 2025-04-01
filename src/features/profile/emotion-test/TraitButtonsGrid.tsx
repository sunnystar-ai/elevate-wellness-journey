
import { Brain, Heart, Users, Sparkle, AlertTriangle } from 'lucide-react';
import TraitButton from './TraitButton';
import { traitDescriptions } from './trait-descriptions';
import { EmotionData, TraitKey } from './emotion-tendencies-types';

interface TraitButtonsGridProps {
  emotionData: EmotionData;
}

const TraitButtonsGrid = ({ emotionData }: TraitButtonsGridProps) => {
  const getTraitIcon = (trait: TraitKey) => {
    // Make sure traitDescriptions[trait] exists before trying to access its color property
    const traitInfo = traitDescriptions[trait];
    if (!traitInfo) return null;
    
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
        return null;
    }
  };

  // Check if emotionData exists and has properties
  const hasData = emotionData && Object.keys(emotionData).length > 0;

  console.log("Emotion data in grid:", emotionData);
  console.log("Has data:", hasData);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
      {hasData ? (
        (Object.keys(emotionData) as TraitKey[]).map(trait => {
          console.log("Rendering trait:", trait);
          return (
            <TraitButton
              key={trait}
              trait={trait}
              icon={getTraitIcon(trait)}
              value={emotionData[trait]}
              traitInfo={traitDescriptions[trait] || {
                title: trait,
                color: 'text-primary',
                description: 'Trait information not found',
                bgColor: 'bg-primary/10'
              }}
            />
          );
        })
      ) : (
        <div className="col-span-full text-center text-muted-foreground">
          No personality data available. Take the assessment to see your results.
        </div>
      )}
    </div>
  );
};

export default TraitButtonsGrid;
