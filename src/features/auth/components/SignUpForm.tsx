
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSignUp } from "../hooks/useSignUp";
import NameInput from "./form-inputs/NameInput";
import EmailInput from "./form-inputs/EmailInput";
import PasswordInput from "./form-inputs/PasswordInput";

interface SignUpFormProps {
  onSuccess?: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    hasMinLength,
    handleSignUp
  } = useSignUp(onSuccess);

  return (
    <>
      {error && (
        <Alert variant="destructive" className="animate-in fade-in-50 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <NameInput 
          name={name}
          onChange={setName}
        />

        <EmailInput 
          email={email}
          onChange={setEmail}
        />

        <PasswordInput 
          password={password}
          onChange={setPassword}
          hasMinLength={hasMinLength}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || (password.length > 0 && !hasMinLength)}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Creating account...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Create account
            </span>
          )}
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
