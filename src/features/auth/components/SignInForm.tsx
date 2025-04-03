
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useState } from "react";
import EmailInput from "./form-inputs/EmailInput";
import PasswordSignInInput from "./form-inputs/PasswordSignInInput";
import { validateSignInForm } from "../utils/form-validation";
import { useNavigate, useLocation } from "react-router-dom";

interface SignInFormProps {
  onSuccess?: () => void;
}

const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to profile
  const from = (location.state as any)?.from?.pathname || "/profile";

  // Clear errors when inputs change
  const handleEmailChange = (value: string) => {
    if (error) setError(null);
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    if (error) setError(null);
    setPassword(value);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateSignInForm(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await login(email, password);
      console.log("Login successful, redirecting to:", from);
      
      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate to the redirect path
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("Sign in error:", err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Invalid email or password. Please try again.";
      
      setError(errorMessage);
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
        <EmailInput 
          email={email}
          onChange={handleEmailChange}
        />

        <PasswordSignInInput 
          password={password}
          onChange={handlePasswordChange}
        />

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
