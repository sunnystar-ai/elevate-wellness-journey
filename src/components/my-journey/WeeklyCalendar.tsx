
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'weekly' | 'monthly';
type WeekDay = {
  date: Date;
  dayOfMonth: number;
  dayName: string;
  isToday: boolean;
  completionPercentage: number;
  fillColor: string;
};

const WeeklyCalendar = () => {
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

  const generateWeekDays = (): WeekDay[] => {
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

  const weekDays = generateWeekDays();

  return (
    <div>
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
    </div>
  );
};

export default WeeklyCalendar;
