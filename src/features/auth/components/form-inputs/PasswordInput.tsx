
import { useState } from "react";
import { Key, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  password: string;
  onChange: (value: string) => void;
  hasMinLength: boolean;
}

const PasswordInput = ({ password, onChange, hasMinLength }: PasswordInputProps) => {
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          className={`pl-10 ${!hasMinLength && password && 'border-red-500 focus-visible:ring-red-500'}`}
          required
          minLength={8}
          aria-invalid={!hasMinLength && password.length > 0}
          aria-describedby="password-requirements"
        />
      </div>
      
      <div id="password-requirements" className="space-y-1 text-sm">
        <div className="flex items-center gap-1.5">
          {hasMinLength ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <span className={`${hasMinLength ? 'text-green-500' : password.length > 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
            Must be at least 8 characters
          </span>
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
