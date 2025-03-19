
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, TrendingUp } from 'lucide-react';
import { Recommendation, SentimentData } from './index';

type RecommendationsTabProps = {
  recommendations: Recommendation[];
  currentData: SentimentData[];
};

const RecommendationsTab = ({ recommendations, currentData }: RecommendationsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-harmony-peach" />
              Immediate Micro-Actions
            </h3>
            <div className="space-y-3">
              {recommendations.filter(r => r.type === 'short-term').map((rec, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{rec.icon}</div>
                    <div>
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-harmony-blue" />
              Long-Term Growth Opportunities
            </h3>
            <div className="space-y-3">
              {recommendations.filter(r => r.type === 'long-term').map((rec, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{rec.icon}</div>
                    <div>
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-harmony-light-lavender/20 p-4 rounded-lg border border-harmony-light-lavender">
            <h3 className="font-medium mb-2">Your Journaling Impact</h3>
            <p className="text-sm">
              Consistent journaling has shown to improve mental health scores by 15-20% over 8 weeks.
              Your current consistency rate of {Math.round(currentData[currentData.length - 1].consistencyScore * 100)}% is excellent - keep it up!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsTab;
