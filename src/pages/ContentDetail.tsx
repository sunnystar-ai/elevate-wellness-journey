
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContentDetail } from '@/hooks/useContentDetail';
import ContentDetailSkeleton from '@/components/content/ContentDetailSkeleton';
import ContentDetailHeader from '@/components/content/ContentDetailHeader';
import ContentMetadataBadges from '@/components/content/ContentMetadataBadges';
import ContentDescription from '@/components/content/ContentDescription';
import RecipeSpecificContent from '@/components/content/RecipeSpecificContent';
import NonRecipeContent from '@/components/content/NonRecipeContent';
import RelatedContent from '@/components/content/RelatedContent';
import ContentNotFound from '@/components/content/ContentNotFound';
import BottomNavigation from '@/components/layout/BottomNavigation';

const ContentDetail = () => {
  const { contentType, contentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { content, isLoading, error } = useContentDetail(contentId, contentType);

  // Extract recipe data from location state if available (for recipes from featured nutrition)
  const recipeData = location.state?.recipeData;
  
  // Combine data from location state and fetched content, prioritizing location state
  const displayContent = recipeData || content;
  
  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <ContentDetailSkeleton />;
  }

  if (error || !displayContent) {
    return <ContentNotFound goBack={goBack} />;
  }

  return (
    <div className="container mx-auto mb-24 px-4 py-8">
      <ContentDetailHeader displayContent={displayContent} goBack={goBack} />
      <ContentMetadataBadges displayContent={displayContent} />

      <div className="mb-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <ContentDescription displayContent={displayContent} />
          <RecipeSpecificContent displayContent={displayContent} />
          <NonRecipeContent displayContent={displayContent} />
        </div>

        <div>
          <RelatedContent displayContent={displayContent} />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ContentDetail;
