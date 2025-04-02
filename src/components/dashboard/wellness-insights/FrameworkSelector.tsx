
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { frameworks } from "./frameworks";

interface FrameworkSelectorProps {
  framework: string;
  setFramework: (framework: string) => void;
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
        {frameworks.map((fw) => (
          <SelectItem key={fw.id} value={fw.id}>{fw.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
