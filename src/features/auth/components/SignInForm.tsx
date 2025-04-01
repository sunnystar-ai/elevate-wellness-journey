
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
        // Verify the user's profile data exists
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          
          // If profile doesn't exist, create it
          if (profileError.message.includes('No rows found')) {
            console.log("No profile found, creating one...");
            
            // Create a basic profile for the user
            const { error: createProfileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                first_name: data.user.user_metadata.first_name || '',
                last_name: data.user.user_metadata.last_name || ''
              });
              
            if (createProfileError) {
              console.error("Error creating profile:", createProfileError);
            } else {
              console.log("Profile created successfully");
            }
          }
        } else {
          console.log("User profile retrieved:", profileData ? "Profile exists" : "No profile found");
        }
        
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
