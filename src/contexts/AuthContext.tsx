
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  session: Session | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: "Welcome to Harmony!",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully",
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const clearError = () => {
    setError(null);
  };

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

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        signup, 
        logout, 
        isLoading, 
        error, 
        clearError,
        session 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
