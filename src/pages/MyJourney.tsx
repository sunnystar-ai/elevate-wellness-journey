import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Home, 
  Compass, 
  Map, 
  Users, 
  UserCircle, 
  ArrowLeft, 
  ArrowRight, 
  Edit, 
  Camera, 
  Plus,
  Activity,
  Check
} from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardHeader
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

type ViewMode = 'weekly' | 'monthly';

const MyJourney = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('weekly');
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDateRangeText = () => {
    if (viewMode === 'weekly') {
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - currentDate.getDay());
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      
      return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}-${endDate.getDate()}, ${endDate.getFullYear()}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const navigatePeriod = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'weekly') {
      const days = direction === 'prev' ? -7 : 7;
      newDate.setDate(newDate.getDate() + days);
    } else {
      const months = direction === 'prev' ? -1 : 1;
      newDate.setMonth(newDate.getMonth() + months);
    }
    setCurrentDate(newDate);
  };

  const generateWeekDays = () => {
    const days = [];
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      
      const isToday = day.toDateString() === new Date().toDateString();
      
      const completionPercentage = Math.floor(Math.random() * 101);
      
      let fillColor = 'bg-gray-200';
      if (completionPercentage > 80) fillColor = 'bg-green-500';
      else if (completionPercentage > 50) fillColor = 'bg-green-300';
      else if (completionPercentage > 30) fillColor = 'bg-gray-300';
      
      days.push({
        date: day,
        dayOfMonth: day.getDate(),
        dayName: day.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday,
        completionPercentage,
        fillColor
      });
    }
    
    return days;
  };

  const habits = [
    { name: 'Meditation', completionDays: [true, true, false, true, true, false, true], rate: 72 },
    { name: 'Exercise', completionDays: [true, false, true, true, false, true, true], rate: 68 },
    { name: 'Water Intake', completionDays: [true, true, true, true, true, false, false], rate: 86 },
    { name: 'Sleep 8hrs', completionDays: [false, true, true, false, true, true, false], rate: 57 },
    { name: 'Healthy Meals', completionDays: [true, true, false, true, true, true, true], rate: 92 }
  ];

  const journalEntries = [
    { date: 'March 15, 2025', mood: 'Happy', preview: 'Today was incredibly productive. I managed to...', hasAttachments: true },
    { date: 'March 14, 2025', mood: 'Calm', preview: 'Morning meditation really helped center me today...', hasAttachments: false },
    { date: 'March 11, 2025', mood: 'Energetic', preview: 'After trying that new workout routine, I feel...', hasAttachments: true }
  ];

  const activities = [
    { icon: 'meditation', name: 'Morning Meditation', dateTime: 'Today, 7:30 AM', duration: '15 minutes', category: 'Mental' },
    { icon: 'run', name: 'Outdoor Run', dateTime: 'Today, 6:15 PM', duration: '3.2 miles', category: 'Cardio' },
    { icon: 'yoga', name: 'Evening Yoga', dateTime: 'Yesterday, 8:00 PM', duration: '30 minutes', category: 'Flexibility' },
    { icon: 'weights', name: 'Strength Training', dateTime: 'March 13, 10:00 AM', duration: '45 minutes', category: 'Strength' }
  ];

  const goals = [
    { name: 'Meditate 10 minutes daily', startDate: 'Feb 28', targetDate: 'Apr 28', progress: 65, status: 'on track' },
    { name: 'Run 20 miles per week', startDate: 'Mar 1', targetDate: 'May 30', progress: 45, status: 'behind' },
    { name: 'Drink 2L water daily', startDate: 'Mar 5', targetDate: 'Jun 5', progress: 88, status: 'ahead' }
  ];

  const weekDays = generateWeekDays();

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2 px-4 border-b">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold">My Journey</h1>
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex bg-muted rounded-full p-1">
            <button 
              className={`py-1 px-4 rounded-full text-sm ${viewMode === 'weekly' ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`py-1 px-4 rounded-full text-sm ${viewMode === 'monthly' ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-1">
          <Button variant="ghost" size="icon" onClick={() => navigatePeriod('prev')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="mx-2 text-sm font-medium">{getDateRangeText()}</span>
          <Button variant="ghost" size="icon" onClick={() => navigatePeriod('next')}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-3">
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Active Days</span>
                <span className="text-lg font-semibold">5/7</span>
                <div className="w-full h-1 bg-primary/20 rounded-full mt-1">
                  <div className="h-full w-[71%] bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Avg Score</span>
                <span className="text-lg font-semibold">82%</span>
                <div className="w-full h-1 bg-primary/20 rounded-full mt-1">
                  <div className="h-full w-[82%] bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Streak</span>
                <span className="text-lg font-semibold">16d</span>
                <div className="w-full h-1 bg-primary/20 rounded-full mt-1">
                  <div className="h-full w-[90%] bg-primary rounded-full"></div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">Points</span>
                <span className="text-lg font-semibold">340</span>
                <div className="w-full h-1 bg-primary/20 rounded-full mt-1">
                  <div className="h-full w-[65%] bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="flex justify-center space-x-2 mb-1">
            {weekDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">{day.dayName}</span>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 ${
                    day.isToday ? 'border-2 border-primary' : ''
                  } ${day.fillColor}`}
                >
                  <span className={`text-sm ${day.completionPercentage > 50 ? 'text-white' : 'text-foreground'}`}>
                    {day.dayOfMonth}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground mt-1">Tap a day for details</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Recent Achievements</h2>
          </div>
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex space-x-3 p-1">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-xl">🔥</span>
                </div>
                <span className="text-xs mt-1">7-Day Streak</span>
                <span className="text-[10px] text-muted-foreground">Mar 10</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-xl">🏃</span>
                </div>
                <span className="text-xs mt-1">50 Miles</span>
                <span className="text-[10px] text-muted-foreground">Mar 12</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xl">💧</span>
                </div>
                <span className="text-xs mt-1">Hydration Pro</span>
                <span className="text-[10px] text-muted-foreground">Mar 14</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl">🧘</span>
                </div>
                <span className="text-xs mt-1">Zen Master</span>
                <span className="text-[10px] text-muted-foreground">Locked</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl">🍎</span>
                </div>
                <span className="text-xs mt-1">Nutrition Guru</span>
                <span className="text-[10px] text-muted-foreground">Locked</span>
              </div>
            </div>
          </ScrollArea>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Your Habits</h2>
            <Button variant="ghost" size="sm" className="h-8">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {habits.map((habit, habitIndex) => (
                  <div key={habitIndex}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{habit.name}</span>
                      <span className="text-xs text-muted-foreground">{habit.rate}%</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      {habit.completionDays.map((completed, dayIndex) => (
                        <div 
                          key={dayIndex} 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            completed ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-muted-foreground'
                          }`}
                        >
                          {completed && <Check className="h-4 w-4" />}
                        </div>
                      ))}
                    </div>
                    <Progress value={habit.rate} className="h-1.5 mb-3" />
                    {habitIndex < habits.length - 1 && <Separator className="mt-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Journal Entries</h2>
            <Button variant="outline" size="sm" className="h-8">
              <Plus className="h-4 w-4 mr-1" />
              New Entry
            </Button>
          </div>
          <div className="space-y-3">
            {journalEntries.map((entry, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{entry.date}</span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{entry.mood}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{entry.preview}</p>
                    </div>
                    {entry.hasAttachments && (
                      <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                        <Camera className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Your Wellness Journey</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex space-x-3 p-1">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="relative">
                  <div className="h-24 w-24 bg-muted rounded-md"></div>
                  <span className="absolute bottom-1 left-1 text-[10px] bg-black/50 text-white px-1 rounded">Mar {10 + item}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Recent Activities</h2>
            <Button variant="link" size="sm" className="h-8 px-0">
              See All
            </Button>
          </div>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <Card key={index}>
                <CardContent className="p-3 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{activity.name}</span>
                      <span className="text-xs text-muted-foreground">{activity.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">{activity.dateTime}</span>
                      <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">{activity.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Your Insights</h2>
          </div>
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm">You're most active on Tuesdays, completing 86% of your daily goals.</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                  <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-sm">Morning meditation improves your daily mood score by 15%.</p>
              </div>
              
              <Button variant="secondary" className="w-full mt-2">View Full Analysis</Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-md font-semibold">Goals Progress</h2>
            <Button variant="outline" size="sm" className="h-8">
              Adjust Goals
            </Button>
          </div>
          <div className="space-y-3">
            {goals.map((goal, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{goal.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      goal.status === 'on track' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                      goal.status === 'behind' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                    }`}>
                      {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2 mb-2" />
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Started: {goal.startDate}</span>
                    <span className="text-xs text-muted-foreground">Target: {goal.targetDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around p-3 z-50">
        <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/discover" className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Compass className="h-6 w-6" />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        <Link to="/my-journey" className="flex flex-col items-center justify-center text-primary">
          <Map className="h-6 w-6" />
          <span className="text-xs mt-1">My Journey</span>
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

export default MyJourney;
