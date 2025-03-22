import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Star, 
  Clock, 
  Dumbbell, 
  Heart, 
  Bookmark, 
  TrendingUp,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import FeatureCard from '@/components/ui/FeatureCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

const featuredProgram = {
  title: "21-Day Mindfulness Challenge",
  image: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  isNew: true
};

const mentalWellnessContent = [
  {
    id: 1,
    title: "Morning Clarity Meditation",
    duration: "10 min",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "meditation"
  },
  {
    id: 2,
    title: "Anxiety Relief Breathing",
    duration: "5 min",
    difficulty: "All Levels",
    image: "https://images.unsplash.com/photo-1515894045495-6a2c0fac1b54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "breathing"
  },
  {
    id: 3,
    title: "Gratitude Journal Prompts",
    duration: "15 min",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "journal"
  },
  {
    id: 4,
    title: "Evening Wind Down",
    duration: "12 min",
    difficulty: "All Levels",
    image: "https://images.unsplash.com/photo-1510457422018-a2a806f6a947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "meditation"
  }
];

const physicalWellnessContent = [
  {
    id: 1,
    title: "Morning Energy Boost",
    duration: "15 min",
    intensity: "Medium",
    equipment: "None",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Office Stretching Routine",
    duration: "8 min",
    intensity: "Low",
    equipment: "Chair",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Full Body Strength",
    duration: "30 min",
    intensity: "High",
    equipment: "Dumbbells",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Gentle Evening Yoga",
    duration: "20 min",
    intensity: "Low",
    equipment: "Mat",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const nutritionContent = [
  {
    id: 1,
    title: "Energizing Breakfast Bowl",
    prepTime: "15 min",
    tags: ["Vegan", "High Protein"],
    image: "https://images.unsplash.com/photo-1542691457-13c6422c63e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Hydration Habit Guide",
    prepTime: "5 min read",
    tags: ["Guide", "Hydration"],
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Quick Lunch Ideas",
    prepTime: "10 min",
    tags: ["Meal Prep", "Quick"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Healthy Snack Options",
    prepTime: "5 min read",
    tags: ["Snacks", "Low Sugar"],
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const sleepContent = [
  {
    id: 1,
    title: "Deep Sleep Meditation",
    duration: "20 min",
    recommended: "Before bed",
    image: "https://images.unsplash.com/photo-1511295742311-5fae0b99c2b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Rain Sounds",
    duration: "8 hours",
    recommended: "All night",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Evening Wind Down Story",
    duration: "15 min",
    recommended: "30 min before sleep",
    image: "https://images.unsplash.com/photo-1528923859599-539802d835c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Sleep Quality Improvement",
    duration: "10 min read",
    recommended: "Anytime",
    image: "https://images.unsplash.com/photo-1584148371237-9bf649c355cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const personalGrowthBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    reviewCount: 4250,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    rating: 4.6,
    reviewCount: 3184,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    rating: 4.7,
    reviewCount: 5762,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const trendingContent = [
  {
    id: 1,
    title: "5-Minute Focus",
    category: "Mental",
    views: 1452,
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Morning Stretch Routine",
    category: "Physical",
    views: 1287,
    image: "https://images.unsplash.com/photo-1520046413270-9da4a1c63231?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Balanced Meal Guide",
    category: "Nutrition",
    views: 982,
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Bedtime Meditation",
    category: "Sleep",
    views: 856,
    image: "https://images.unsplash.com/photo-1586458132873-c2705a88d288?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const communityPicks = [
  {
    id: 1,
    title: "Body Scan Relaxation",
    user: "Emma W.",
    comment: "This helps me sleep every night!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    title: "10-Min Desk Workout",
    user: "Michael T.",
    comment: "Perfect for my lunch break.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    title: "Anxiety Relief Guide",
    user: "Sarah J.",
    comment: "A life-changing resource!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

const Discover = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoaded(true);
  }, []);

  const categories = [
    { id: "all", name: "All" },
    { id: "mental", name: "Mental Wellness" },
    { id: "physical", name: "Physical Wellness" },
    { id: "nutrition", name: "Nutrition" },
    { id: "sleep", name: "Sleep" }
  ];

  return (
    <div className={`page-container page-transition pb-20 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <section className="mb-6">
        <AnimatedSection>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-medium">Discover</h1>
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for wellness content..." 
              className="pl-10 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </AnimatedSection>
      </section>

      <AnimatedSection delay={100}>
        <div className="overflow-x-auto pb-2 mb-6">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="rounded-full whitespace-nowrap"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200} className="mb-8">
        <div className="relative rounded-xl overflow-hidden h-48">
          <img 
            src={featuredProgram.image} 
            alt={featuredProgram.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            {featuredProgram.isNew && (
              <Badge className="mb-2 self-start bg-primary">NEW</Badge>
            )}
            <h2 className="text-white text-xl font-medium mb-2">{featuredProgram.title}</h2>
            <Button size="sm" className="self-start">Start Program</Button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={300} className="mb-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <div className="flex items-center space-x-4">
            <select className="bg-transparent text-sm border-none focus:outline-none text-muted-foreground">
              <option>Latest</option>
              <option>Popular</option>
              <option>Recommended</option>
            </select>
            
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={400} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Mental Wellness</h2>
          <Link to="/meditation" className="text-primary text-sm flex items-center">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {mentalWellnessContent.map((item, index) => (
              <div 
                key={item.id} 
                className="min-w-[240px] rounded-xl overflow-hidden bg-card shadow-sm flex flex-col"
              >
                <div className="relative h-32">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.duration}
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/30 hover:bg-black/50 text-white"
                  >
                    <Bookmark className="h-3 w-3" />
                  </Button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-base mb-1">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs bg-muted/50">
                      {item.difficulty}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </AnimatedSection>

      <AnimatedSection delay={500} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Physical Wellness</h2>
          <Link to="/workouts" className="text-primary text-sm flex items-center">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {physicalWellnessContent.map((item, index) => (
              <div 
                key={item.id} 
                className="min-w-[240px] rounded-xl overflow-hidden bg-card shadow-sm flex flex-col"
              >
                <div className="relative h-32">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.duration}
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/30 hover:bg-black/50 text-white"
                  >
                    <Bookmark className="h-3 w-3" />
                  </Button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-base mb-1">{item.title}</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs bg-muted/50 mr-2">
                        {item.intensity}
                      </Badge>
                      {item.equipment !== "None" && (
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Dumbbell className="h-3 w-3 mr-1" />
                          {item.equipment}
                        </span>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </AnimatedSection>

      <AnimatedSection delay={600} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Nutrition</h2>
          <Link to="/nutrition" className="text-primary text-sm flex items-center">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {nutritionContent.map((item, index) => (
              <div 
                key={item.id} 
                className="min-w-[240px] rounded-xl overflow-hidden bg-card shadow-sm flex flex-col"
              >
                <div className="relative h-32">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.prepTime}
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/30 hover:bg-black/50 text-white"
                  >
                    <Bookmark className="h-3 w-3" />
                  </Button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-base mb-1">{item.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </AnimatedSection>

      <AnimatedSection delay={700} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Sleep</h2>
          <Link to="/sleep" className="text-primary text-sm flex items-center">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {sleepContent.map((item, index) => (
              <div 
                key={item.id} 
                className="min-w-[240px] rounded-xl overflow-hidden bg-card shadow-sm flex flex-col"
              >
                <div className="relative h-32">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.duration}
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/30 hover:bg-black/50 text-white"
                  >
                    <Bookmark className="h-3 w-3" />
                  </Button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-base mb-1">{item.title}</h3>
                  <div className="text-xs text-muted-foreground">
                    Recommended: {item.recommended}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </AnimatedSection>

      <AnimatedSection delay={800} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Personal Growth Books</h2>
          <Link to="/books" className="text-primary text-sm flex items-center">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {personalGrowthBooks.map((book) => (
            <div 
              key={book.id} 
              className="rounded-xl overflow-hidden bg-card shadow-sm flex"
            >
              <div className="w-1/3 h-24">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium">{book.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    by {book.author}
                  </div>
                </div>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium mr-1">{book.rating}</span>
                    <span className="text-xs text-muted-foreground">({book.reviewCount} reviews)</span>
                  </div>
                  <Button size="sm" variant="ghost" className="ml-auto p-0 h-8 w-8">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={900} className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Trending Now</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {trendingContent.map((item) => (
            <div 
              key={item.id} 
              className="rounded-xl overflow-hidden bg-card shadow-sm flex flex-col"
            >
              <div className="relative h-24">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {item.views}
                </div>
              </div>
              <div className="p-2">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <div className="text-xs text-muted-foreground">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={1000} className="mb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Community Favorites</h2>
        </div>
        
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {communityPicks.map((item) => (
              <div 
                key={item.id} 
                className="min-w-[280px] rounded-xl overflow-hidden bg-card shadow-sm p-4"
              >
                <div className="flex items-center mb-3">
                  <img 
                    src={item.avatar} 
                    alt={item.user} 
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{item.user}</h3>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                <h4 className="font-medium mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground italic">"{item.comment}"</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </AnimatedSection>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t px-6 py-2 flex justify-between items-center">
        <Link to="/" className="flex flex-col items-center">
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <span className="text-xs text-muted-foreground">Home</span>
        </Link>
        <Link to="/discover" className="flex flex-col items-center">
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          </div>
          <span className="text-xs text-primary">Discover</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center">
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
          </div>
          <span className="text-xs text-muted-foreground">My Journey</span>
        </Link>
        <Link to="/community" className="flex flex-col items-center">
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M14 19a6 6 0 0 0-12 0"></path><circle cx="8" cy="9" r="4"></circle><path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"></path></svg>
          </div>
          <span className="text-xs text-muted-foreground">Community</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <div className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 1 0-16 0"></path></svg>
          </div>
          <span className="text-xs text-muted-foreground">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Discover;

