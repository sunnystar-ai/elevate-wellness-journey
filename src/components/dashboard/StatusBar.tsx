
type StatusBarProps = {
  formattedTime: string;
};

const StatusBar = ({ formattedTime }: StatusBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-2 bg-background/80 backdrop-blur-sm border-b border-border flex justify-between items-center text-xs">
      <span>{formattedTime}</span>
      <div className="flex items-center gap-2">
        <span>100%</span>
      </div>
    </div>
  );
};

export default StatusBar;
