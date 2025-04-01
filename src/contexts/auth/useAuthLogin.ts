
import { supabase } from "@/integrations/supabase/client";

export const useAuthLogin = (
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setSession: (session: any) => void,
  setUser: (user: any) => void,
  setIsAuthenticated: (auth: boolean) => void,
  toast: any
) => {
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Attempting login for:", email);
      
      // Validate inputs
      if (!email.trim()) {
        throw new Error("Email is required");
      }
      
      if (!password) {
        throw new Error("Password is required");
      }
      
      // Ensure email has no whitespace
      const cleanEmail = email.trim().toLowerCase();
      
      console.log("Sending login request with email:", cleanEmail);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      
      if (error) {
        console.error("Supabase login error:", error);
        throw error;
      }
      
      console.log("Login successful for:", cleanEmail, "Session:", !!data.session);
      
      // Important: Immediately update state with the session data
      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        setIsAuthenticated(true);
        
        // Show success toast
        setTimeout(() => {
          toast({
            title: "Signed in successfully",
            description: "Welcome back to Harmony!",
          });
        }, 0);
      } else {
        throw new Error("Authentication successful but no session returned");
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Invalid login credentials. Please check your email and password.";
      
      console.error("Login error:", errorMessage);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login };
};
