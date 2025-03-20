
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import MentalHealthReport, { JournalEntry } from './mental-health-report';

type TrendsSectionProps = {
  journalEntries?: JournalEntry[];
};

const TrendsSection = ({ journalEntries = [] }: TrendsSectionProps) => {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');
  const [showReport, setShowReport] = useState(false);

  const handleTimeFrameChange = (frame: 'day' | 'week' | 'month') => {
    setTimeFrame(frame);
  };

  return (
    <div>
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-lg font-medium">Your Trends</h2>
        <div className="flex text-xs font-medium bg-secondary rounded-full overflow-hidden">
          <button 
            className={`px-3 py-1 ${timeFrame === 'day' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTimeFrameChange('day')}
          >
            Day
          </button>
          <button 
            className={`px-3 py-1 ${timeFrame === 'week' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTimeFrameChange('week')}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 ${timeFrame === 'month' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTimeFrameChange('month')}
          >
            Month
          </button>
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
      
      <Button 
        variant="link" 
        className="text-primary hover:underline text-sm font-medium w-full text-center mt-1"
        onClick={() => setShowReport(true)}
      >
        View Detailed Reports
      </Button>

      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mental Health Analysis Report</DialogTitle>
            <DialogDescription>
              Analysis based on your journal entries
            </DialogDescription>
          </DialogHeader>
          <MentalHealthReport timeFrame={timeFrame} journalEntries={journalEntries} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrendsSection;
