
import PersonalInfoSection from '../PersonalInfoSection';
import PersonalitySection from '../PersonalitySection';
import EmotionTendenciesSection from '../AchievementsSection';

interface ProfileTabProps {
  mbtiType: string | null;
  mbtiDescription: string | null;
}

const ProfileTab = ({ mbtiType, mbtiDescription }: ProfileTabProps) => {
  return (
    <div className="space-y-5">
      <PersonalInfoSection />
      <PersonalitySection mbtiType={mbtiType} mbtiDescription={mbtiDescription} />
      <EmotionTendenciesSection />
    </div>
  );
};

export default ProfileTab;
