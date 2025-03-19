
import { RefreshCw } from 'lucide-react';

type DashboardHeaderProps = {
  formattedDate: string;
};

const DashboardHeader = ({ formattedDate }: DashboardHeaderProps) => {
  return (
    <div className="sticky top-6 z-40 p-4 flex justify-between items-center bg-background">
      <div>
        <div className="text-lg font-semibold">Your Dashboard</div>
        <div className="text-sm text-muted-foreground">{formattedDate}</div>
      </div>
      <div className="flex items-center gap-3">
        <RefreshCw className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
      </div>
    </div>
  );
};

export default DashboardHeader;
