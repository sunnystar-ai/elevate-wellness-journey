
import { Button } from '@/components/ui/button';

interface TestButtonProps {
  onClick: () => void;
}

const TestButton = ({ onClick }: TestButtonProps) => {
  return (
    <Button className="w-full" onClick={onClick}>
      Take Big Five Assessment
    </Button>
  );
};

export default TestButton;
