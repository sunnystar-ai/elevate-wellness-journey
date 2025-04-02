
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type AnalyticalFramework = 'physical-emotional' | 'personality' | 'belief-mapping' | 'predictive';

interface FrameworkSelectorProps {
  framework: AnalyticalFramework;
  setFramework: (framework: AnalyticalFramework) => void;
}

export const FrameworkSelector = ({ framework, setFramework }: FrameworkSelectorProps) => {
  return (
    <Select 
      value={framework} 
      onValueChange={setFramework}
    >
      <SelectTrigger className="w-[140px] h-8">
        <SelectValue placeholder="Analysis Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="physical-emotional">Physical-Emotional</SelectItem>
        <SelectItem value="personality">Personality-Driven</SelectItem>
        <SelectItem value="belief-mapping">Belief Mapping</SelectItem>
        <SelectItem value="predictive">Predictive Analytics</SelectItem>
      </SelectContent>
    </Select>
  );
};
