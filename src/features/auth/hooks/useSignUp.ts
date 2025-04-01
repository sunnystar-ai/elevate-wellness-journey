
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ensureProfileExists } from "../utils/ensure-profile";
import { validateSignUpForm } from "../utils/form-validation";

export const useSignUp = (onSuccess?: () => void) => {
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
      
      if (data.user) {
        // Try to ensure profile exists using service role
        try {
          // First check if profile exists
          const { data: existingProfile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', data.user.id)
            .maybeSingle();
          
          // If no profile exists, create one
          if (!existingProfile && (!profileError || profileError.message.includes('No rows found'))) {
            console.log("No profile found, creating one...");
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                first_name: firstName,
                last_name: lastName
              });
            
            if (insertError) {
              console.error("Error creating profile:", insertError);
            } else {
              console.log("Profile created successfully");
            }
          }
        } catch (profileErr) {
          console.error("Error checking/creating profile:", profileErr);
        }
        
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

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    hasMinLength,
    handleSignUp
  };
};
