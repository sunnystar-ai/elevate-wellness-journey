
import { useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, User, BookOpen, Tag, DumbBell, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useContentDetail, ContentItem } from '@/hooks/useContentDetail';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
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
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={goBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="mb-2 text-xl font-semibold">Content Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The content you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/discover')}>
            Discover More Content
          </Button>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-24 px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={goBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <AnimatedSection>
        <div className="relative mb-6 h-64 overflow-hidden rounded-xl md:h-80">
          <img
            src={displayContent.image}
            alt={displayContent.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-2xl font-bold text-white md:text-3xl">{displayContent.title}</h1>
          </div>
        </div>
      </AnimatedSection>

      <div className="mb-8 flex flex-wrap gap-4">
        {displayContent.prepTime && (
          <Badge className="flex items-center gap-1.5 px-3 py-1.5">
            <Clock className="h-4 w-4" />
            {displayContent.prepTime} prep time
          </Badge>
        )}
        {displayContent.duration && !displayContent.prepTime && (
          <Badge className="flex items-center gap-1.5 px-3 py-1.5">
            <Clock className="h-4 w-4" />
            {displayContent.duration}
          </Badge>
        )}
        {displayContent.difficulty && (
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
            <Award className="h-4 w-4" />
            {displayContent.difficulty} difficulty
          </Badge>
        )}
        {displayContent.intensity && (
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
            <DumbBell className="h-4 w-4" />
            {displayContent.intensity} intensity
          </Badge>
        )}
        {displayContent.creator && (
          <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
            <User className="h-4 w-4" />
            By {displayContent.creator}
          </Badge>
        )}
      </div>

      <div className="mb-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <AnimatedSection>
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">
                {displayContent.description || 
                  "Experience this transformative content designed to enhance your wellbeing journey."}
              </p>
            </div>
          </AnimatedSection>

          {displayContent.tags && displayContent.tags.length > 0 && (
            <AnimatedSection delay={100}>
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {displayContent.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Recipe-specific content */}
          {displayContent.ingredients && displayContent.ingredients.length > 0 && (
            <AnimatedSection delay={200}>
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Ingredients</h2>
                <ul className="list-inside list-disc space-y-2">
                  {displayContent.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-muted-foreground">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}

          {displayContent.instructions && displayContent.instructions.length > 0 && (
            <AnimatedSection delay={300}>
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Instructions</h2>
                <ol className="list-inside list-decimal space-y-4">
                  {displayContent.instructions.map((instruction, index) => (
                    <li key={index} className="text-muted-foreground">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </AnimatedSection>
          )}

          {displayContent.servingSuggestions && displayContent.servingSuggestions.length > 0 && (
            <AnimatedSection delay={400}>
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Serving Suggestions</h2>
                <ul className="list-inside list-disc space-y-2">
                  {displayContent.servingSuggestions.map((suggestion, index) => (
                    <li key={index} className="text-muted-foreground">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}

          {/* Non-recipe content benefits */}
          {displayContent.benefits && !displayContent.ingredients && (
            <AnimatedSection delay={200}>
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Benefits</h2>
                <ul className="list-inside list-disc space-y-2">
                  {displayContent.benefits.map((benefit, index) => (
                    <li key={index} className="text-muted-foreground">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          )}
        </div>

        <div>
          <AnimatedSection>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 flex items-center text-lg font-medium">
                <BookOpen className="mr-2 h-4 w-4" /> Related Content
              </h3>
              <Separator className="mb-4" />
              
              {displayContent.relatedContent ? (
                <div className="space-y-4">
                  {displayContent.relatedContent.map((item, index) => (
                    <div
                      key={index}
                      className="flex cursor-pointer gap-3 rounded-md p-2 hover:bg-muted"
                      onClick={() => navigate(`/content/${item.type || 'general'}/${item.id}`)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.duration || item.prepTime || '10 min'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No related content found
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

const ContentDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-9 w-20" />
      </div>
      <Skeleton className="mb-6 h-64 w-full rounded-xl md:h-80" />
      <div className="mb-8 flex gap-4">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-32 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Skeleton className="mb-4 h-8 w-40" />
          <Skeleton className="mb-6 h-24 w-full" />
          <Skeleton className="mb-4 h-8 w-40" />
          <div className="mb-6 space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
