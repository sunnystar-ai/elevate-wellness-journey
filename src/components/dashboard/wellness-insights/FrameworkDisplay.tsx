
import { ReactElement } from 'react';

interface FrameworkDisplayProps {
  icon: ReactElement;
  title: string;
}

export const FrameworkDisplay = ({ icon, title }: FrameworkDisplayProps) => {
  return (
    <div className="flex items-center mb-3">
      {icon}
      <h4 className="font-medium">{title}</h4>
    </div>
  );
};
