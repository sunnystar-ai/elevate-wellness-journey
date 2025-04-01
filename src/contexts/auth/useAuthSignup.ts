
import { supabase } from "@/integrations/supabase/client";

export const useAuthSignup = (
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setSession: (session: any) => void,
  setUser: (user: any) => void,
  setIsAuthenticated: (auth: boolean) => void,
  toast: any
) => {
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate inputs
      if (!name.trim()) {
        throw new Error("Name is required");
      }
      
      if (!email.trim()) {
        throw new Error("Email is required");
      }
      
      if (!password) {
        throw new Error("Password is required");
      }
      
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }
      
      // Ensure email has no whitespace
      const cleanEmail = email.trim().toLowerCase();
      
      console.log("Attempting signup for:", cleanEmail);
      
      // Create user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            first_name: name.split(' ')[0],
            last_name: name.split(' ').slice(1).join(' ')
          }
        }
      });
      
      if (error) {
        console.error("Supabase signup error:", error);
        throw error;
      }
      
      console.log("Signup successful for:", cleanEmail, "Session:", !!data.session);
      
      // Display success toast
      toast({
        title: "Account created",
        description: "Welcome to Harmony!",
      });
      
      // Important: Immediately update state with the session data
      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        // Note: some Supabase configurations might not return a session immediately after signup
        console.log("No session returned after signup - user may need to verify email");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      console.error("Signup error:", errorMessage);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup };
};
