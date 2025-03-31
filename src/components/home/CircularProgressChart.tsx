
import { CirclePercent } from "lucide-react";
import { cn } from "@/lib/utils";

interface CircularProgressChartProps {
  percentage: number;
  title?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const CircularProgressChart = ({
  percentage,
  title = "Daily Score",
  size = 150,
  strokeWidth = 8,
  className,
}: CircularProgressChartProps) => {
  // Calculate stroke properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-3xl font-bold">{percentage}%</div>
        </div>
      </div>
      {title && <div className="text-sm font-medium mt-2">{title}</div>}
    </div>
  );
};

export default CircularProgressChart;
