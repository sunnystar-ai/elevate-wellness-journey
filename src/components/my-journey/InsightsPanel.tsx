
import { useState, useEffect } from 'react';
import { Activity, Brain, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { getLatestWellnessInsight } from '@/services/wellnessInsightService';

const InsightsPanel = () => {
  const [insights, setInsights] = useState<Array<{ icon: JSX.Element, text: string }>>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        
        // Fetch recent insights from different frameworks
        const physicalInsight = await getLatestWellnessInsight('week', 'physical-emotional');
        const personalityInsight = await getLatestWellnessInsight('week', 'personality');
        const beliefsInsight = await getLatestWellnessInsight('week', 'belief-mapping');
        
        const insightArray = [];
        
        if (physicalInsight?.insight_text) {
          // Extract a shorter snippet from the full insight
          const snippet = extractSnippet(physicalInsight.insight_text);
          insightArray.push({
            icon: <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
            text: snippet
          });
        }
        
        if (personalityInsight?.insight_text) {
          const snippet = extractSnippet(personalityInsight.insight_text);
          insightArray.push({
            icon: <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
            text: snippet
          });
        }
        
        if (beliefsInsight?.insight_text) {
          const snippet = extractSnippet(beliefsInsight.insight_text);
          insightArray.push({
            icon: <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />,
            text: snippet
          });
        }
        
        // If no insights were found, use default ones
        if (insightArray.length === 0) {
          insightArray.push(
            {
              icon: <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
              text: "You're most active on Tuesdays, completing 86% of your daily goals."
            },
            {
              icon: <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
              text: "Morning meditation improves your daily mood score by 15%."
            }
          );
        }
        
        setInsights(insightArray);
      } catch (error) {
        console.error("Error fetching insights:", error);
        // Fall back to default insights
        setInsights([
          {
            icon: <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
            text: "You're most active on Tuesdays, completing 86% of your daily goals."
          },
          {
            icon: <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
            text: "Morning meditation improves your daily mood score by 15%."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInsights();
  }, []);
  
  // Helper function to extract a shorter snippet from a longer insight
  const extractSnippet = (fullText: string): string => {
    // Find a good sentence to use
    const sentences = fullText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length === 0) return fullText.substring(0, 100);
    
    // Return first sentence if it's not too long, otherwise truncate
    const firstSentence = sentences[0].trim();
    return firstSentence.length > 120 ? firstSentence.substring(0, 120) + '...' : firstSentence + '.';
  };
  
  const handleViewFullAnalysis = () => {
    navigate('/dashboard'); // Navigate to the dashboard where full insights are available
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Your Insights</h2>
      </div>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardContent className="p-4 space-y-3">
          {loading ? (
            <>
              <div className="flex items-start space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-start space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </>
          ) : (
            insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  {insight.icon}
                </div>
                <p className="text-sm">{insight.text}</p>
              </div>
            ))
          )}
          
          <Button variant="secondary" className="w-full mt-2" onClick={handleViewFullAnalysis}>
            View Full Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;
