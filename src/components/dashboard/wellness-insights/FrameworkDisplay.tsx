
import { ReactNode } from 'react';

interface FrameworkDisplayProps {
  icon: ReactNode;
  title: string;
}

export const FrameworkDisplay = ({ icon, title }: FrameworkDisplayProps) => {
  return (
    <div className="flex items-center mb-3">
      <div className="mr-2 p-2 rounded-full bg-harmony-lavender">
        {icon}
      </div>
      <h4 className="font-medium">{title}</h4>
    </div>
  );
};
