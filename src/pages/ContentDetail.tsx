
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Bookmark, Heart, Play, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useContentDetail } from '@/hooks/useContentDetail';

const ContentDetail = () => {
  const { contentId, contentType } = useParams();
  const { content, isLoading, error } = useContentDetail(contentId, contentType);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast(isSaved ? "Removed from bookmarks" : "Saved to bookmarks");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    // In a real app, this would use the Web Share API or a custom share dialog
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied to clipboard");
  };

  const handleStart = () => {
    toast(`Starting ${content?.title}`);
    // In a real app, this would navigate to the content player or start the program
  };

  if (isLoading) {
    return (
      <div className="page-container page-transition py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/discover" className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="h-64 w-full bg-muted animate-pulse rounded-xl mb-6"></div>
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-1/4 bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="page-container page-transition py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/discover" className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-medium">Content not found</h1>
        </div>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the content you're looking for. 
          <Link to="/discover" className="text-primary ml-1">
            Return to Discover
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page-container page-transition pb-20">
      <AnimatedSection>
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/discover" className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-medium">{content.title}</h1>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <div className="relative rounded-xl overflow-hidden h-64 md:h-80 mb-6">
          <img 
            src={content.image} 
            alt={content.title} 
            className="w-full h-full object-cover"
          />
          {content.duration && (
            <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              {content.duration || content.prepTime}
            </div>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200} className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {content.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
          {content.difficulty && (
            <Badge variant="outline">{content.difficulty}</Badge>
          )}
          {content.intensity && (
            <Badge variant="outline">{content.intensity}</Badge>
          )}
          {content.equipment && content.equipment !== "None" && (
            <Badge variant="outline">{content.equipment}</Badge>
          )}
        </div>

        <p className="text-lg mb-2">
          {content.description || "Begin your wellness journey with this carefully crafted content designed to enhance your wellbeing. This program offers a balanced approach to health and mindfulness."}
        </p>
        
        {content.benefits && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Benefits</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {content.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        {content.creator && (
          <p className="text-sm text-muted-foreground mb-6">
            Created by {content.creator}
          </p>
        )}

        {content.recommended && (
          <p className="text-sm bg-muted/50 p-3 rounded-lg mb-6">
            <span className="font-medium">Recommended:</span> {content.recommended}
          </p>
        )}
        
        <div className="flex flex-col space-y-4 mt-8">
          <Button 
            size="lg" 
            className="w-full"
            onClick={handleStart}
          >
            <Play className="mr-2 h-4 w-4" />
            Start {content.type || "Content"}
          </Button>
          
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleSave}
            >
              <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-primary' : ''}`} />
              Save
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLike}
            >
              <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              Like
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {content.relatedContent && content.relatedContent.length > 0 && (
        <AnimatedSection delay={300} className="mb-8">
          <h2 className="text-lg font-medium mb-4">You might also like</h2>
          <div className="grid grid-cols-2 gap-4">
            {content.relatedContent.map((item) => (
              <div key={item.id} className="bg-card rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-24 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">{item.duration}</span>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
};

export default ContentDetail;
