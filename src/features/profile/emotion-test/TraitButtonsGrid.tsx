
import { Brain, Heart, Users, Sparkle, AlertTriangle } from 'lucide-react';
import TraitButton from './TraitButton';
import { traitDescriptions } from './trait-descriptions';
import { EmotionData, TraitKey } from './emotion-tendencies-types';

interface TraitButtonsGridProps {
  emotionData: EmotionData;
}

const TraitButtonsGrid = ({ emotionData }: TraitButtonsGridProps) => {
  const getTraitIcon = (trait: TraitKey) => {
    const iconClassName = `h-8 w-8 ${traitDescriptions[trait].color}`;
    
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

  return (
    <div className="grid grid-cols-3 gap-4 mb-5">
      {(Object.keys(emotionData) as TraitKey[]).map(trait => (
        <TraitButton
          key={trait}
          trait={trait}
          icon={getTraitIcon(trait)}
          value={emotionData[trait]}
          traitInfo={traitDescriptions[trait]}
        />
      ))}
    </div>
  );
};

export default TraitButtonsGrid;
