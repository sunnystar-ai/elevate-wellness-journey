import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  RefreshCw, 
  UserCircle, 
  Flame, 
  Award, 
  Footprints, 
  Droplet, 
  Clock, 
  CheckCircle2, 
  CalendarCheck, 
  TrendingUp, 
  BarChart3,
  CheckCircle,
  Play
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/my-journey/BottomNav';

const Dashboard = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
  
  // Time formatting for status bar
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  // Goals data
  const goals = [
    { title: "Meditate 10 minutes daily", completed: true, streak: 8, progress: 80 },
    { title: "Walk 10,000 steps", completed: false, streak: 5, progress: 65 },
    { title: "Sleep 7+ hours", completed: true, streak: 3, progress: 100 }
  ];

  // Daily plan data - keep track of completed activities
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({
    "Morning meditation": false,
    "Lunchtime walk": false,
    "Evening workout": false,
    "Sleep preparation": false
  });

  const dailyPlan = [
    { time: "7:00 AM", activity: "Morning meditation", completed: completedActivities["Morning meditation"], icon: <Flame className="h-4 w-4 text-harmony-lavender" /> },
    { time: "12:30 PM", activity: "Lunchtime walk", completed: completedActivities["Lunchtime walk"], icon: <Footprints className="h-4 w-4 text-harmony-blue" /> },
    { time: "6:00 PM", activity: "Evening workout", completed: completedActivities["Evening workout"], icon: <Award className="h-4 w-4 text-harmony-mint" /> },
    { time: "10:00 PM", activity: "Sleep preparation", completed: completedActivities["Sleep preparation"], icon: <Clock className="h-4 w-4 text-harmony-peach" /> }
  ];

  // Function to handle marking activities as done
  const handleMarkDone = (activity: string) => {
    setCompletedActivities(prev => ({
      ...prev,
      [activity]: !prev[activity]
    }));
  };

  // Recommended next steps - modified to keep only the journal prompt
  const recommendations = [
    { title: "Complete Today's Journal Prompt", action: "Open", icon: <CheckCircle2 className="h-4 w-4" />, to: "#" }
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

      {/* Dashboard Header */}
      <div className="sticky top-6 z-40 p-4 flex justify-between items-center bg-background">
        <div>
          <div className="text-lg font-semibold">Your Dashboard</div>
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
        </div>
        <div className="flex items-center gap-3">
          <RefreshCw className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
        </div>
      </div>

      <div className="container px-4 mx-auto relative pt-2">
        {/* User Snapshot */}
        <AnimatedSection animation="fade-in" className="mb-6">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <Flame className="h-4 w-4 text-harmony-peach mr-1" />
                <span className="text-sm font-medium">12 day streak</span>
              </div>
              <div className="text-sm text-muted-foreground">Level 8: Wellness Warrior</div>
            </div>
          </div>
        </AnimatedSection>

        {/* Daily Overview Card */}
        <AnimatedSection animation="scale-in" className="mb-8">
          <h2 className="text-lg font-medium mb-4">Today's Progress</h2>
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-40 h-40 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold">70%</div>
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
                  strokeDashoffset="75.36" 
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <div className="text-sm font-medium mb-1 flex justify-between">
                  <span>Mental</span>
                  <span>3/4</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <div className="text-sm font-medium mb-1 flex justify-between">
                  <span>Physical</span>
                  <span>2/3</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>
              
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <div className="text-sm font-medium mb-1 flex justify-between">
                  <span>Nutrition</span>
                  <span>4/5</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              
              <div className="p-3 rounded-lg bg-white shadow-sm">
                <div className="text-sm font-medium mb-1 flex justify-between">
                  <span>Sleep</span>
                  <span>7.5hrs</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Quick Stats Summary */}
        <AnimatedSection className="mb-8">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Footprints className="h-4 w-4 text-harmony-blue mr-1" />
                  <span className="text-sm font-medium">Steps</span>
                </div>
              </div>
              <div className="text-lg font-bold">6,842</div>
              <div className="text-xs text-muted-foreground">of 10,000 goal</div>
              <Progress value={68} className="h-1 mt-1" />
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 text-harmony-mint mr-1" />
                  <span className="text-sm font-medium">Water</span>
                </div>
              </div>
              <div className="text-lg font-bold">5</div>
              <div className="text-xs text-muted-foreground">of 8 glasses</div>
              <Progress value={62} className="h-1 mt-1" />
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-harmony-peach mr-1" />
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>
              <div className="text-lg font-bold">34</div>
              <div className="text-xs text-muted-foreground">of 45 minutes</div>
              <Progress value={75} className="h-1 mt-1" />
            </div>
          </div>
        </AnimatedSection>

        {/* Goals Tracker */}
        <AnimatedSection className="mb-8">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-lg font-medium">Your Goals</h2>
            <button className="text-primary hover:underline text-sm font-medium">
              See All
            </button>
          </div>
          
          <div className="space-y-3">
            {goals.map((goal, index) => (
              <div 
                key={goal.title}
                className="flex items-center p-3 rounded-lg bg-white shadow-sm"
                style={{ 
                  animationDelay: `${index * 100}ms`, 
                  animation: 'fade-in 0.5s ease-out backwards' 
                }}
              >
                <div className="mr-3">
                  {goal.completed ? (
                    <CheckCircle className="h-6 w-6 text-harmony-mint" />
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-muted" />
                  )}
                </div>
                <div className="flex-grow mr-2">
                  <div className="font-medium">{goal.title}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Flame className="h-3 w-3 text-harmony-peach mr-1" />
                    <span>{goal.streak}-day streak</span>
                  </div>
                </div>
                <Progress value={goal.progress} className="w-16 h-1" />
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Today's Plan - UPDATED HERE */}
        <AnimatedSection className="mb-8">
          <div className="flex justify-between items-baseline mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-medium mr-2">Today's Plan</h2>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-3">
            {dailyPlan.map((item, index) => (
              <div 
                key={item.time}
                className="flex items-center p-3 rounded-lg bg-white shadow-sm"
                style={{ 
                  animationDelay: `${index * 100}ms`, 
                  animation: 'fade-in 0.5s ease-out backwards' 
                }}
              >
                <div className="w-16 text-sm font-medium">{item.time}</div>
                <div className="flex items-center mr-3 p-2 rounded-full bg-white shadow-sm">
                  {item.icon}
                </div>
                <div className="flex-grow mr-2">
                  <div className="font-medium">{item.activity}</div>
                </div>
                <Button 
                  size="sm" 
                  variant={item.completed ? "outline" : "default"}
                  className={item.completed ? "border-harmony-mint text-harmony-mint" : ""}
                  onClick={() => handleMarkDone(item.activity)}
                >
                  {item.completed ? "Done" : "Mark Done"}
                </Button>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Personalized Insights */}
        <AnimatedSection className="mb-8">
          <Card className="p-4 border border-harmony-light-lavender bg-harmony-light-lavender/20">
            <h3 className="font-medium text-lg mb-3">Your Wellness Insights</h3>
            
            <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-harmony-mint mr-2" />
                <h4 className="font-medium">Sleep quality improved 20% this week</h4>
              </div>
              <Progress value={20} className="h-1 mb-2" />
              <p className="text-sm text-muted-foreground">Your consistent bedtime routine is showing results</p>
            </div>
            
            <ul className="text-sm space-y-2 mb-4">
              <li className="flex items-start">
                <span className="bg-harmony-light-mint rounded-full p-1 mr-2 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-harmony-mint" />
                </span>
                <span>Meditation sessions increased by 30% this month</span>
              </li>
              <li className="flex items-start">
                <span className="bg-harmony-light-peach rounded-full p-1 mr-2 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-harmony-peach" />
                </span>
                <span>You're most active between 12-2pm on weekdays</span>
              </li>
            </ul>
            
            <Button className="w-full" variant="outline">See Full Analysis</Button>
          </Card>
        </AnimatedSection>

        {/* Trends Section */}
        <AnimatedSection className="mb-8">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-lg font-medium">Your Trends</h2>
            <div className="flex text-xs font-medium bg-secondary rounded-full overflow-hidden">
              <button className="px-3 py-1 bg-primary text-white">Week</button>
              <button className="px-3 py-1">Month</button>
              <button className="px-3 py-1">Year</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm font-medium mb-2">Physical Activity</div>
              <div className="h-20 flex items-end justify-between">
                {[30, 45, 60, 70, 50, 80, 65].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-2 bg-harmony-blue rounded-full"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <div className="text-sm font-medium mb-2">Mental Wellness</div>
              <div className="h-20 flex items-end justify-between">
                {[50, 55, 60, 65, 70, 75, 80].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-2 bg-harmony-lavender rounded-full"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          <button className="text-primary hover:underline text-sm font-medium w-full text-center mt-1">
            View Detailed Reports
          </button>
        </AnimatedSection>

        {/* Recommended Next Steps */}
        <AnimatedSection className="mb-8">
          <h2 className="text-lg font-medium mb-4">Recommended Next Steps</h2>
          
          <div className="space-y-3">
            {recommendations.map((item, index) => (
              <div 
                key={item.title}
                onClick={() => navigate(item.to)}
                className="flex items-center p-3 rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 100}ms`, 
                  animation: 'fade-in 0.5s ease-out backwards' 
                }}
              >
                <div className="mr-3 p-2 rounded-full bg-harmony-light-lavender">
                  {item.icon}
                </div>
                <div className="flex-grow mr-2">
                  <div className="font-medium">{item.title}</div>
                </div>
                <Button size="sm">
                  {item.action === "Start" && <Play className="h-3 w-3 mr-1" />}
                  {item.action}
                </Button>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Replace custom bottom navigation with the BottomNav component */}
      <BottomNav />
    </div>
  );
};

export default Dashboard;
