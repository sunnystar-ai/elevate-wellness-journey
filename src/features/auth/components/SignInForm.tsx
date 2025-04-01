
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EmailInput from "./form-inputs/EmailInput";
import PasswordSignInInput from "./form-inputs/PasswordSignInInput";

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
      
      // Direct Supabase call
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
        // Ensure profile exists for the signed-in user
        await ensureProfileExists(data.user.id, data.user);
        
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

  // Helper function to ensure profile exists
  const ensureProfileExists = async (userId: string, user: any) => {
    try {
      // First check if profile exists
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();
      
      // If no profile OR error is "no rows found", create profile
      if (!existingProfile || (profileError && profileError.message.includes('No rows found'))) {
        console.log("No profile found, creating one...");
        
        // Extract name parts from metadata if available
        const firstName = user.user_metadata?.first_name || '';
        const lastName = user.user_metadata?.last_name || '';
        
        // Retry logic for creating profile (attempt 3 times)
        let profileCreated = false;
        let attempts = 0;
        
        while (!profileCreated && attempts < 3) {
          attempts++;
          console.log(`Creating profile attempt ${attempts}`);
          
          const { error: createError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              first_name: firstName,
              last_name: lastName
            });
          
          if (!createError) {
            console.log("Profile created successfully");
            profileCreated = true;
          } else {
            console.error(`Error creating profile (attempt ${attempts}):`, createError);
            // Wait a brief moment before retrying
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
      } else {
        console.log("Profile already exists:", existingProfile);
      }
    } catch (error) {
      console.error("Error in ensureProfileExists:", error);
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
          onChange={setEmail}
        />

        <PasswordSignInInput 
          password={password}
          onChange={setPassword}
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
