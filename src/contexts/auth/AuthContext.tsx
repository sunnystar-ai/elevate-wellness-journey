
import React, { createContext, useContext, useEffect } from "react";
import { AuthContextType } from "./auth-types";
import { useAuthState } from "./useAuthState";
import { useAuthLogin } from "./useAuthLogin";
import { useAuthSignup } from "./useAuthSignup";
import { useAuthLogout } from "./useAuthLogout";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const {
    isAuthenticated,
    user,
    session,
    isLoading,
    error,
    setError,
    setIsLoading,
    setSession,
    setUser,
    setIsAuthenticated,
    clearError,
    setupAuthListener,
    toast
  } = useAuthState();

  const { login } = useAuthLogin(
    setIsLoading,
    setError,
    setSession,
    setUser,
    setIsAuthenticated,
    toast
  );

  const { signup } = useAuthSignup(
    setIsLoading,
    setError,
    setSession,
    setUser,
    setIsAuthenticated,
    toast
  );

  const { logout } = useAuthLogout(
    setIsLoading,
    setSession,
    setUser,
    setIsAuthenticated,
    toast
  );

  useEffect(() => {
    const subscription = setupAuthListener();
    return () => subscription.unsubscribe();
  }, []);

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
