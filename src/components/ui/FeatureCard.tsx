
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color?: string;
  delay?: number;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  to, 
  color = 'from-harmony-light-blue to-harmony-blue',
  delay = 0 
}: FeatureCardProps) => {
  return (
    <div 
      className="harmony-card p-6 flex flex-col h-full"
      style={{ 
        animationDelay: `${delay}ms`, 
        animation: 'scale-in 0.5s ease-out backwards' 
      }}
    >
      <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground flex-grow mb-4">{description}</p>
      <Link 
        to={to} 
        className="inline-flex items-center text-primary font-medium hover:underline group"
      >
        Explore
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default FeatureCard;
