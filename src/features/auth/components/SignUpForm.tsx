
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
      
      // Verify profile creation
      if (data.user) {
        try {
          // Wait a moment for the database trigger to create the profile
          setTimeout(async () => {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user!.id)
              .single();
            
            if (profileError) {
              console.log("Profile check error:", profileError.message);
            } else {
              console.log("Profile created successfully:", profileData);
            }
          }, 1000);
        } catch (profileCheckError) {
          console.error("Error checking profile:", profileCheckError);
        }
      }
      
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
