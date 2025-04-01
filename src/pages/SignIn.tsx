
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthLayout from "@/features/auth/components/AuthLayout";
import SignInForm from "@/features/auth/components/SignInForm";
import SocialLoginButtons from "@/features/auth/components/SocialLoginButtons";

const SignIn = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/profile";
  
  // Check authentication status on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        
        if (event === 'SIGNED_IN') {
          // Use timeout to avoid navigation race conditions
          setTimeout(() => navigate(from, { replace: true }), 100);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, from]);
  
  // If loading, show minimal UI
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  
  // If already authenticated, redirect to profile
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  return (
    <AuthLayout
      title="Sign in to Harmony"
      subtitle="Enter your email and password to access your account"
    >
      <SignInForm />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <SocialLoginButtons redirectTo="/profile" />

      <div className="mt-6 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/sign-up" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
