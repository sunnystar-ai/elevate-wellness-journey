
import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated on mount
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");
    
    if (authStatus === "true" && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we're using hardcoded credentials
      // In a real app, this would call your API
      if (email === "demo@example.com" && password === "password") {
        const userData = { name: "Demo User", email };
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        toast({
          title: "Signed in successfully",
          description: "Welcome back to Harmony!",
        });
        return; // Success case
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: errorMessage,
      });
      throw error; // Re-throw to handle in the component
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call your API to create a user
      // For demo purposes, we're just setting the authenticated state
      const userData = { name, email };
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      toast({
        title: "Account created",
        description: "Welcome to Harmony!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
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

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ isAuthenticated, user, login, signup, logout, isLoading, error, clearError }}
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
