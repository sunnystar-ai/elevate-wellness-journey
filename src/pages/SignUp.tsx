
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/features/auth/components/AuthLayout";
import SignUpForm from "@/features/auth/components/SignUpForm";
import SocialLoginButtons from "@/features/auth/components/SocialLoginButtons";

const SignUp = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // If already authenticated, redirect to profile
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your details to get started with Harmony"
    >
      <SignUpForm />

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
        Already have an account?{" "}
        <Link to="/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
