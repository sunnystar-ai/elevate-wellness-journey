
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameInputProps {
  name: string;
  onChange: (value: string) => void;
}

const NameInput = ({ name, onChange }: NameInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Full Name</Label>
      <div className="relative">
        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
          required
        />
      </div>
    </div>
  );
};

export default NameInput;
