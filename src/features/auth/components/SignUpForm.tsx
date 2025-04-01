
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Key, User, LogIn, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SignUpFormProps {
  onSuccess?: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Password validation
  const hasMinLength = password.length >= 8;

  // Clear errors when inputs change
  useEffect(() => {
    if (error) setError(null);
  }, [name, email, password]);

  const validateForm = () => {
    setError(null);

    if (!name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    }

    if (!hasMinLength) {
      setError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Clean email (trim and lowercase)
      const cleanEmail = email.trim().toLowerCase();
      
      console.log("Attempting to sign up with email:", cleanEmail);
      
      // Direct Supabase call - bypassing context
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            first_name: name.split(' ')[0],
            last_name: name.split(' ').slice(1).join(' ')
          }
        }
      });
      
      if (signUpError) {
        console.error("Supabase sign up error:", signUpError);
        setError(signUpError.message);
        return;
      }
      
      console.log("Sign up successful:", data.session ? "Session exists" : "No session");
      
      toast({
        title: "Account created",
        description: "Welcome to Harmony!",
      });
      
      if (data.session) {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/profile", { replace: true });
        }
      } else {
        // Some Supabase configurations might not return a session immediately
        toast({
          title: "Verification required",
          description: "Please check your email to verify your account",
        });
        
        // Still navigate to profile as the auth listener will handle redirects if needed
        setTimeout(() => navigate("/profile", { replace: true }), 1000);
      }
    } catch (err) {
      console.error("Unexpected error during sign up:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="animate-in fade-in-50 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || (password.length > 0 && !hasMinLength)}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Creating account...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Create account
            </span>
          )}
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
