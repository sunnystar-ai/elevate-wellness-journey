
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSignIn = (onSuccess?: () => void) => {
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
      
      if (data.session && data.user) {
        // Check if profile exists and create if needed
        try {
          // First check if profile exists
          const { data: existingProfile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', data.user.id)
            .maybeSingle();
          
          // If no profile exists, create one
          if (!existingProfile && (!profileError || profileError.message.includes('No rows found'))) {
            console.log("No profile found for signed-in user, creating one...");
            
            // Get name parts from metadata
            const firstName = data.user.user_metadata?.first_name || '';
            const lastName = data.user.user_metadata?.last_name || '';
            
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                first_name: firstName,
                last_name: lastName
              });
            
            if (insertError) {
              console.error("Error creating profile during sign-in:", insertError);
            } else {
              console.log("Profile created successfully during sign-in");
            }
          } else {
            console.log("Profile already exists for user");
          }
        } catch (profileErr) {
          console.error("Error checking/creating profile during sign-in:", profileErr);
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSignIn
  };
};
