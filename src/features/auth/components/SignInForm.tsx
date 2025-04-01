
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Key, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SignInFormProps {
  onSuccess?: () => void;
}

const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Clear errors when inputs change
  useEffect(() => {
    if (error) setError(null);
  }, [email, password]);

  const validateForm = () => {
    setError(null);

    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!password) {
      setError("Password is required");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Clean email (trim and lowercase)
      const cleanEmail = email.trim().toLowerCase();
      
      console.log("Attempting to sign in with email:", cleanEmail);
      
      // Direct Supabase call - bypassing context
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      
      if (signInError) {
        console.error("Supabase sign in error:", signInError);
        
        // Handle specific error cases
        if (signInError.message.includes("Invalid login")) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(signInError.message);
        }
        
        return;
      }
      
      console.log("Sign in successful:", data.session ? "Session exists" : "No session");
      
      if (data.session) {
        toast({
          title: "Signed in successfully",
          description: "Welcome back to Harmony!",
        });
        
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/profile", { replace: true });
        }
      } else {
        setError("Successfully authenticated but no session was created. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error during sign in:", err);
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

      <form onSubmit={handleSignIn} className="space-y-4">
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
              aria-describedby="email-error"
            />
          </div>
        </div>

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
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
              aria-describedby="password-error"
              minLength={8}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign in
            </span>
          )}
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
