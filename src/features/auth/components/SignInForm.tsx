
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSignIn } from "../hooks/useSignIn";
import EmailInput from "./form-inputs/EmailInput";
import PasswordSignInInput from "./form-inputs/PasswordSignInInput";

interface SignInFormProps {
  onSuccess?: () => void;
}

const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSignIn
  } = useSignIn(onSuccess);

  return (
    <>
      {error && (
        <Alert variant="destructive" className="animate-in fade-in-50 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSignIn} className="space-y-4">
        <EmailInput 
          email={email}
          onChange={setEmail}
        />

        <PasswordSignInInput 
          password={password}
          onChange={setPassword}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign in
            </span>
          )}
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
