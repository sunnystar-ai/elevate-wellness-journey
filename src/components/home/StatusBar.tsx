
import { Wifi, Battery } from 'lucide-react';

const StatusBar = ({ formattedTime }: { formattedTime: string }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-2 bg-background/80 backdrop-blur-sm border-b border-border flex justify-between items-center text-xs">
      <span>{formattedTime}</span>
      <div className="flex items-center gap-2">
        <Wifi className="h-3.5 w-3.5" />
        <div className="flex items-center">
          <Battery className="h-3.5 w-3.5" />
          <span className="ml-1">100%</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
