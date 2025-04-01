
import { useState } from "react";
import { Key, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface PasswordSignInInputProps {
  password: string;
  onChange: (value: string) => void;
}

const PasswordSignInInput = ({ password, onChange }: PasswordSignInInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Password</Label>
        <Link 
          to="/forgot-password" 
          className="text-xs text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      <div className="relative">
        <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10"
          required
          minLength={8}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        Must be at least 8 characters
      </p>
    </div>
  );
};

export default PasswordSignInInput;
