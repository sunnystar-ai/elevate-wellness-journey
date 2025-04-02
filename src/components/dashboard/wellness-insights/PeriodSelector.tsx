
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type Period = 'day' | 'week' | 'month' | 'year';

interface PeriodSelectorProps {
  period: Period;
  setPeriod: (period: Period) => void;
}

export const PeriodSelector = ({ period, setPeriod }: PeriodSelectorProps) => {
  return (
    <Select value={period} onValueChange={(value: Period) => setPeriod(value)}>
      <SelectTrigger className="w-[100px] h-8">
        <SelectValue placeholder="Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="day">Daily</SelectItem>
        <SelectItem value="week">Weekly</SelectItem>
        <SelectItem value="month">Monthly</SelectItem>
        <SelectItem value="year">Yearly</SelectItem>
      </SelectContent>
    </Select>
  );
};
