
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecommendedNextSteps = () => {
  const navigate = useNavigate();
  
  const recommendations = [
    { title: "Complete Today's Journal Prompt", action: "Open", icon: <CheckCircle2 className="h-4 w-4" />, to: "/journal-prompt" }
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Recommended Next Steps</h2>
      
      <div className="space-y-3">
        {recommendations.map((item, index) => (
          <div 
            key={item.title}
            onClick={() => navigate(item.to)}
            className="flex items-center p-3 rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
            style={{ 
              animationDelay: `${index * 100}ms`, 
              animation: 'fade-in 0.5s ease-out backwards' 
            }}
          >
            <div className="mr-3 p-2 rounded-full bg-harmony-light-lavender">
              {item.icon}
            </div>
            <div className="flex-grow mr-2">
              <div className="font-medium">{item.title}</div>
            </div>
            <Button size="sm">
              {item.action}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedNextSteps;
