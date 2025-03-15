
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  User, 
  ArrowRight, 
  Flower2, 
  Dumbbell, 
  Smile, 
  Droplet, 
  BookOpen,
  Clock, 
  Utensils, 
  Moon, 
  Users, 
  Flame,
  Home,
  Compass,
  Map,
  UserCircle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FeatureCard from '@/components/ui/FeatureCard';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [userName, setUserName] = useState('Alex');
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
    
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Date formatting
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Time formatting for status bar
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  // Determine greeting based on time of day
  const getGreeting = () => {
    const hours = today.getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Inspirational quotes
  const quotes = [
    "Wellness is the complete integration of body, mind, and spirit.",
    "The part can never be well unless the whole is well.",
    "Take care of your body. It's the only place you have to live.",
    "Health is a state of complete harmony of the body, mind, and spirit."
  ];
  
  // Get a deterministic quote based on the day
  const getDailyQuote = () => {
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return quotes[dayOfYear % quotes.length];
  };

  // Quick action buttons
  const quickActions = [
    { name: 'Meditation', icon: <Flower2 className="h-6 w-6 text-white" />, to: '/meditation', color: 'from-harmony-light-lavender to-harmony-lavender' },
    { name: 'Workout', icon: <Dumbbell className="h-6 w-6 text-white" />, to: '/workouts', color: 'from-harmony-light-blue to-harmony-blue' },
    { name: 'Mood', icon: <Smile className="h-6 w-6 text-white" />, to: '#', color: 'from-harmony-light-peach to-harmony-peach' },
    { name: 'Water', icon: <Droplet className="h-6 w-6 text-white" />, to: '#', color: 'from-harmony-light-mint to-harmony-mint' },
    { name: 'Journal', icon: <BookOpen className="h-6 w-6 text-white" />, to: '#', color: 'from-harmony-light-lavender to-harmony-lavender' }
  ];

  // Timeline items for "Coming Up Today"
  const timelineItems = [
    { 
      title: 'Morning Meditation', 
      time: '9:00 AM', 
      description: '10 min Mindfulness', 
      icon: <Flower2 className="h-4 w-4 text-harmony-lavender" />,
      to: '/meditation'
    },
    { 
      title: 'HIIT Workout', 
      time: '12:30 PM', 
      description: '20 min High Intensity', 
      icon: <Dumbbell className="h-4 w-4 text-harmony-blue" />,
      to: '/workouts'
    },
    { 
      title: 'Lunch Reminder', 
      time: '1:00 PM', 
      description: 'Balanced meal', 
      icon: <Utensils className="h-4 w-4 text-harmony-mint" />,
      to: '/nutrition'
    },
    { 
      title: 'Bedtime Routine', 
      time: '10:30 PM', 
      description: 'Wind down ritual', 
      icon: <Moon className="h-4 w-4 text-harmony-peach" />,
      to: '#'
    }
  ];

  // Recommended content
  const recommendations = [
    {
      title: "Stress Relief Meditation",
      category: "Meditation",
      duration: "15 min",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      to: "/meditation",
      color: "bg-harmony-light-lavender"
    },
    {
      title: "Quick Morning Yoga",
      category: "Workout",
      duration: "10 min",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      to: "/workouts",
      color: "bg-harmony-light-blue"
    },
    {
      title: "Healthy Smoothie Recipes",
      category: "Nutrition",
      duration: "3 recipes",
      image: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      to: "/nutrition",
      color: "bg-harmony-light-mint"
    },
    {
      title: "Sleep Sounds Collection",
      category: "Sleep",
      duration: "8 hours",
      image: "https://images.unsplash.com/photo-1517898717281-8e4385a41802?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      to: "#",
      color: "bg-harmony-light-peach"
    }
  ];

  return (
    <div className={`page-transition ${loaded ? 'opacity-100' : 'opacity-0'} pb-20`}>
      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 p-2 bg-background/80 backdrop-blur-sm border-b border-border flex justify-between items-center text-xs">
        <span>{formattedTime}</span>
        <div className="flex items-center gap-2">
          <span>100%</span>
        </div>
      </div>

      {/* App Header Bar */}
      <div className="sticky top-6 z-40 p-4 flex justify-between items-center bg-background">
        <div className="text-lg font-semibold">Daily Wellness</div>
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="container px-4 mx-auto relative pt-4">
        {/* Greeting Card */}
        <AnimatedSection animation="fade-in" className="mb-6">
          <div className="harmony-card p-5">
            <h1 className="text-2xl font-medium font-display mb-1">
              {getGreeting()}, {userName}
            </h1>
            <p className="text-muted-foreground">{formattedDate}</p>
          </div>
        </AnimatedSection>

        {/* Daily Quote */}
        <AnimatedSection animation="fade-in" delay={100} className="mb-8">
          <div className="glass-panel p-4">
            <p className="text-sm italic">"{getDailyQuote()}"</p>
          </div>
        </AnimatedSection>

        {/* Quick Actions Row */}
        <AnimatedSection className="mb-10">
          <div className="flex overflow-x-auto pb-2 gap-4 scrollbar-hide">
            {quickActions.map((action, index) => (
              <div 
                key={action.name}
                className="flex flex-col items-center flex-shrink-0"
                style={{ 
                  animationDelay: `${index * 100}ms`, 
                  animation: 'scale-in 0.5s ease-out backwards' 
                }}
              >
                <div 
                  onClick={() => navigate(action.to)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 bg-gradient-to-br ${action.color} cursor-pointer hover:shadow-md transition-all duration-300`}
                >
                  {action.icon}
                </div>
                <span className="text-xs font-medium">{action.name}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Today's Progress */}
        <AnimatedSection animation="scale-in" className="mb-10">
          <h2 className="text-lg font-medium mb-4">Today's Progress</h2>
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-40 h-40 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold">72%</div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" 
                  stroke="hsl(var(--muted))" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="70.336" 
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <div className="text-sm font-medium mb-1 flex justify-between">
                  <span>Mental</span>
                  <span>2/3</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <div className="text-sm font-medium mb-1 flex justify-between">
                  <span>Physical</span>
                  <span>1/2</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <div className="text-sm font-medium mb-1 flex justify-between">
                  <span>Nutrition</span>
                  <span>2/3</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <div className="text-sm font-medium mb-1 flex justify-between">
                  <span>Sleep</span>
                  <span>1/1</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Coming Up Today */}
        <AnimatedSection className="mb-10">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-lg font-medium">Coming Up Today</h2>
          </div>
          
          <div className="space-y-3">
            {timelineItems.map((item, index) => (
              <div 
                key={item.title}
                className="flex items-center p-3 rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                onClick={() => navigate(item.to)}
                style={{ 
                  animationDelay: `${index * 100}ms`, 
                  animation: 'fade-in 0.5s ease-out backwards' 
                }}
              >
                <div className="mr-3 p-2 rounded-full bg-white shadow-sm">
                  {item.icon}
                </div>
                <div className="flex-grow mr-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.title}</h3>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* For You / Recommended Content */}
        <AnimatedSection className="mb-10">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-lg font-medium">Recommended For You</h2>
            <button className="text-primary hover:underline text-sm font-medium">
              View all
            </button>
          </div>
          
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {recommendations.map((item, index) => (
              <div 
                key={item.title}
                className="flex-shrink-0 w-60 overflow-hidden rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 100}ms`, 
                  animation: 'scale-in 0.5s ease-out backwards' 
                }}
                onClick={() => navigate(item.to)}
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
                </div>
                <div className="p-3">
                  <h3 className="font-medium line-clamp-1">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Community Glimpse */}
        <AnimatedSection className="mb-10">
          <h2 className="text-lg font-medium mb-4">Community</h2>
          
          <div className="harmony-card p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">30-Day Meditation Challenge</h3>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-1" />
                <span>245 participants</span>
              </div>
            </div>
            <div className="mb-2">
              <Progress value={40} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">12 days remaining</p>
          </div>
          
          <div className="flex items-center">
            <div className="flex -space-x-3 mr-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Recently active in your network
            </span>
          </div>
        </AnimatedSection>

        {/* Wellness Streak */}
        <AnimatedSection className="mb-10">
          <div className="harmony-card p-4 flex items-center">
            <div className="mr-4 p-3 rounded-full bg-harmony-light-peach">
              <Flame className="h-6 w-6 text-harmony-peach" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium mb-1">7-Day Streak!</h3>
              <p className="text-sm text-muted-foreground">Keep going, you're building great habits!</p>
            </div>
            
            <div className="w-20 h-12 flex items-end justify-between">
              {[30, 45, 60, 70, 50, 80, 65].map((height, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-primary rounded-full"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around p-3 z-50">
        <Link to="/" className="flex flex-col items-center justify-center text-primary">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/discover" className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Compass className="h-6 w-6" />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Map className="h-6 w-6" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link to="/community" className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Community</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <UserCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Index;
