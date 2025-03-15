
import { Battery, Wifi, Signal } from 'lucide-react';

const StatusBar = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="flex justify-between items-center px-4 py-1 text-xs text-foreground/80">
      <div>{currentTime}</div>
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <Battery className="h-3 w-3" />
      </div>
    </div>
  );
};

export default StatusBar;
