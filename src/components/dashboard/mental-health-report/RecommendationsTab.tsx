
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, TrendingUp } from 'lucide-react';
import { Recommendation, SentimentData } from './types';

type RecommendationsTabProps = {
  recommendations: Recommendation[];
  currentData: SentimentData[];
};

const RecommendationsTab = ({ recommendations, currentData }: RecommendationsTabProps) => {
  // Filter short-term and long-term recommendations
  const shortTermRecs = recommendations.filter(r => r.type === 'short-term');
  const longTermRecs = recommendations.filter(r => r.type === 'long-term');
  
  // If we have no recommendations, show a default message
  const hasRecommendations = recommendations.length > 0;
  const latestData = currentData.length > 0 ? currentData[currentData.length - 1] : null;
  const consistency = latestData ? Math.round(latestData.consistencyScore * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Short-term recommendations */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-harmony-peach" />
              Immediate Micro-Actions
            </h3>
            
            {shortTermRecs.length > 0 ? (
              <div className="space-y-3">
                {shortTermRecs.map((rec, index) => (
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
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">
                  Continue journaling to receive personalized micro-action recommendations.
                </p>
              </div>
            )}
          </div>
          
          {/* Long-term recommendations */}
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-harmony-blue" />
              Long-Term Growth Opportunities
            </h3>
            
            {longTermRecs.length > 0 ? (
              <div className="space-y-3">
                {longTermRecs.map((rec, index) => (
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
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">
                  Continue journaling to receive personalized long-term growth recommendations.
                </p>
              </div>
            )}
          </div>
          
          {/* Journaling impact */}
          <div className="bg-harmony-light-lavender/20 p-4 rounded-lg border border-harmony-light-lavender">
            <h3 className="font-medium mb-2">Your Journaling Impact</h3>
            <p className="text-sm">
              Consistent journaling has shown to improve mental health scores by 15-20% over 8 weeks.
              {hasRecommendations ? (
                consistency > 50 ? 
                <> Your current consistency rate of {consistency}% is excellent - keep it up!</> :
                <> Your consistency rate of {consistency}% is a good start. Try to journal more regularly for better insights.</>
              ) : (
                <> Keep journaling regularly to build a habit and unlock more personalized insights.</>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsTab;
