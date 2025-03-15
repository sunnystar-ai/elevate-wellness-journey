
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  to?: string;
  color?: string;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  to, 
  color = 'from-harmony-light-blue to-harmony-blue',
  delay = 0,
  className = '',
  children,
  onClick
}: FeatureCardProps) => {
  const cardContent = (
    <>
      {icon && (
        <div className={`flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${color}`}>
          {icon}
        </div>
      )}
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      {description && <p className="text-muted-foreground flex-grow mb-4">{description}</p>}
      {children}
      {to && (
        <div className="mt-auto">
          <span className="inline-flex items-center text-primary font-medium hover:underline group">
            Explore
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      )}
    </>
  );

  const cardClasses = `harmony-card p-6 flex flex-col h-full ${className}`;
  
  if (to) {
    return (
      <Link 
        to={to}
        className={cardClasses}
        style={{ 
          animationDelay: `${delay}ms`, 
          animation: 'scale-in 0.5s ease-out backwards' 
        }}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div 
      className={cardClasses}
      style={{ 
        animationDelay: `${delay}ms`, 
        animation: 'scale-in 0.5s ease-out backwards',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      {cardContent}
    </div>
  );
};

export default FeatureCard;
