
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth?: boolean; // Make authentication optional
};

const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // For debugging
  console.log("Protected Route:", { isAuthenticated, isLoading, path: location.pathname });

  // While checking auth status, show a loading spinner
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="ml-2 text-primary">Verifying authentication...</span>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    // Redirect to the login page with the return URL
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
