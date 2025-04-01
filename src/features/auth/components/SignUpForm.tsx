
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import NameInput from "./form-inputs/NameInput";
import EmailInput from "./form-inputs/EmailInput";
import PasswordInput from "./form-inputs/PasswordInput";
import { validateSignUpForm } from "../utils/form-validation";

interface SignUpFormProps {
  onSuccess?: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Password validation
  const hasMinLength = password.length >= 8;

  // Clear errors when inputs change
  useEffect(() => {
    if (error) setError(null);
  }, [name, email, password]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateSignUpForm(name, email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    
    try {
      // Clean email (trim and lowercase)
      const cleanEmail = email.trim().toLowerCase();
      
      console.log("Attempting to sign up with email:", cleanEmail);
      
      // Process name properly
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      
      console.log(`Processing name: First name: "${firstName}", Last name: "${lastName}"`);
      
      // Direct Supabase call
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: name.trim()
          }
        }
      });
      
      if (signUpError) {
        console.error("Supabase sign up error:", signUpError);
        setError(signUpError.message);
        return;
      }
      
      console.log("Sign up successful:", data.session ? "Session exists" : "No session");
      
      // Auto-login the user after signup (no email verification required)
      if (data.user) {
        // If we don't immediately have a session, manually sign in
        if (!data.session) {
          console.log("No session after signup, attempting to sign in");
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password
          });
          
          if (signInError) {
            console.error("Error signing in after signup:", signInError);
            setError("Account created but couldn't sign you in automatically. Please sign in manually.");
            navigate("/sign-in", { replace: true });
            return;
          }
          
          // Use the session from sign in
          if (signInData.session) {
            // Ensure profile exists - critical step
            await ensureProfileExists(data.user.id, firstName, lastName);
            
            toast({
              title: "Account created",
              description: "Welcome to Harmony!",
            });
            
            if (onSuccess) {
              onSuccess();
            } else {
              navigate("/profile", { replace: true });
            }
            return;
          }
        } else {
          // We have a session from signup, ensure profile exists
          await ensureProfileExists(data.user.id, firstName, lastName);
          
          toast({
            title: "Account created",
            description: "Welcome to Harmony!",
          });
          
          if (onSuccess) {
            onSuccess();
          } else {
            navigate("/profile", { replace: true });
          }
          return;
        }
      }
      
      // Fallback if something went wrong
      toast({
        title: "Account created",
        description: "Please sign in with your credentials",
      });
      navigate("/sign-in", { replace: true });
    } catch (err) {
      console.error("Unexpected error during sign up:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to ensure profile exists
  const ensureProfileExists = async (userId: string, firstName: string, lastName: string) => {
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

      <form onSubmit={handleSignUp} className="space-y-4">
        <NameInput 
          name={name}
          onChange={setName}
        />

        <EmailInput 
          email={email}
          onChange={setEmail}
        />

        <PasswordInput 
          password={password}
          onChange={setPassword}
          hasMinLength={hasMinLength}
        />

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
