
import { supabase } from "@/integrations/supabase/client";

export const useAuthLogout = (
  setIsLoading: (loading: boolean) => void,
  setSession: (session: any) => void,
  setUser: (user: any) => void,
  setIsAuthenticated: (auth: boolean) => void,
  toast: any
) => {
  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Reset state immediately instead of waiting for auth listener
      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { logout };
};
