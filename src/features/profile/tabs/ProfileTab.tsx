
import PersonalInfoSection from '../PersonalInfoSection';
import PersonalitySection from '../PersonalitySection';
import EmotionTendenciesSection from '../EmotionTendenciesSection';
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileTabProps {
  mbtiType: string | null;
  mbtiDescription: string | null;
  isLoading?: boolean;
}

const ProfileTab = ({ mbtiType, mbtiDescription, isLoading = false }: ProfileTabProps) => {
  return (
    <div className="space-y-5">
      <PersonalInfoSection />
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        <PersonalitySection mbtiType={mbtiType} mbtiDescription={mbtiDescription} />
      )}
      
      <EmotionTendenciesSection />
    </div>
  );
};

export default ProfileTab;
