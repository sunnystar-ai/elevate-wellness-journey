
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
        // Create profile directly (with retry logic)
        try {
          let profileCreated = false;
          let retryCount = 0;
          const maxRetries = 3;
          
          while (!profileCreated && retryCount < maxRetries) {
            console.log(`Attempt ${retryCount + 1} to create profile for user ${data.user.id}`);
            
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                first_name: firstName,
                last_name: lastName
              });
            
            if (profileError) {
              console.error(`Error creating profile (attempt ${retryCount + 1}):`, profileError);
              retryCount++;
              if (retryCount < maxRetries) {
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
              }
            } else {
              console.log("Profile created successfully");
              profileCreated = true;
            }
          }
          
          if (!profileCreated) {
            console.warn("Could not create profile after maximum retries");
          }
        } catch (profileErr) {
          console.error("Unexpected error creating profile:", profileErr);
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
