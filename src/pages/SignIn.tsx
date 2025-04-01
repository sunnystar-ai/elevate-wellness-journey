
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/features/auth/components/AuthLayout";
import SignInForm from "@/features/auth/components/SignInForm";
import SocialLoginButtons from "@/features/auth/components/SocialLoginButtons";

const SignIn = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/profile";
  
  // If already authenticated, redirect to profile
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

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
