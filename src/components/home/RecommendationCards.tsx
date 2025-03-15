
import { ExternalLink } from 'lucide-react';
import { Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const RecommendationCards = () => {
  const recommendations = [
    {
      title: "Stress Relief Meditation",
      category: "Meditation",
      duration: "15 min",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
      color: "bg-harmony-light-lavender"
    },
    {
      title: "Quick Morning Yoga",
      category: "Workout",
      duration: "10 min",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=UEEsdXn8oG8",
      color: "bg-harmony-light-blue"
    },
    {
      title: "Healthy Smoothie Recipes",
      category: "Nutrition",
      duration: "3 recipes",
      image: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=H4uDVMpQG0E", 
      color: "bg-harmony-light-mint"
    },
    {
      title: "Sleep Sounds Collection",
      category: "Sleep",
      duration: "8 hours",
      image: "https://images.unsplash.com/photo-1517898717281-8e4385a41802?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      youtubeUrl: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
      color: "bg-harmony-light-peach"
    }
  ];

  const handleCardClick = (url: string, title: string) => {
    try {
      // Open YouTube video in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');
      
      // Show toast notification
      toast({
        title: "Opening YouTube",
        description: `Loading video: ${title}`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to open URL:", error);
      toast({
        title: "Error Opening Link",
        description: "Could not open the video. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
      {recommendations.map((item, index) => (
        <div 
          key={item.title}
          className="flex-shrink-0 w-60 overflow-hidden rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
          style={{ 
            animationDelay: `${index * 100}ms`, 
            animation: 'scale-in 0.5s ease-out backwards' 
          }}
          onClick={() => handleCardClick(item.youtubeUrl, item.title)}
        >
          <div className="relative h-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className={`absolute top-2 left-2 ${item.color} text-foreground px-2 py-1 rounded-full text-xs font-medium z-20`}>
              {item.category}
            </div>
            <div className="absolute bottom-2 left-2 flex items-center text-white text-xs space-x-2 z-20">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" /> 
                <span>{item.duration}</span>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 z-20">
              <ExternalLink className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-medium line-clamp-1">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationCards;
