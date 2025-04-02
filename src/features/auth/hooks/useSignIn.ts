
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { validateSignInForm } from "../utils/form-validation";

export const useSignIn = (onSuccess?: () => void) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Clear errors when inputs change
  useEffect(() => {
    if (error) setError(null);
  }, [email, password]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateSignInForm(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Sign in error:", err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Invalid email or password. Please try again.";
      
      setError(errorMessage);
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
