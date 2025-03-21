
import PersonalInfoSection from '../PersonalInfoSection';
import PersonalitySection from '../PersonalitySection';
import AchievementsSection from '../AchievementsSection';

interface ProfileTabProps {
  mbtiType: string | null;
  mbtiDescription: string | null;
}

const ProfileTab = ({ mbtiType, mbtiDescription }: ProfileTabProps) => {
  return (
    <div className="space-y-5">
      <PersonalInfoSection />
      <PersonalitySection mbtiType={mbtiType} mbtiDescription={mbtiDescription} />
      <AchievementsSection />
    </div>
  );
};

export default ProfileTab;
