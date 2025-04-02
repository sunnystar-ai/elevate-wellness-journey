
import { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle2, RefreshCw, Calendar, Brain, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { getLatestWellnessInsight, generateAndSaveWellnessInsight } from '@/services/supabaseService';

const WellnessInsights = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [analyticalFramework, setAnalyticalFramework] = useState<string>('physical-emotional');

  // Fetch the latest wellness insight when component mounts or period changes
  useEffect(() => {
    fetchInsight();
  }, [period, analyticalFramework]);

  const fetchInsight = async () => {
    try {
      setLoading(true);
      const latestInsight = await getLatestWellnessInsight(period);
      
      if (latestInsight) {
        setInsight(latestInsight.insight_text);
      } else {
        setInsight(null);
      }
    } catch (error) {
      console.error('Error fetching insight:', error);
      setInsight(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInsight = async () => {
    try {
      setGenerating(true);
      // Pass the analytical framework to the insight generation function
      const newInsight = await generateAndSaveWellnessInsight(period, analyticalFramework);
      
      if (newInsight) {
        setInsight(newInsight.insight_text);
        toast({
          title: "Insight Generated",
          description: "Your new personalized wellness insight has been generated successfully.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error generating insight:', error);
      
      let errorMessage = "There was an error generating your insight.";
      if (error instanceof Error && error.message === "Not enough data to generate insights") {
        errorMessage = "Not enough data available. Log more activities and journal entries.";
      }
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card className="p-4 border border-harmony-light-lavender bg-harmony-light-lavender/20">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">Your Wellness Insights</h3>
        <div className="flex space-x-2">
          <Select value={period} onValueChange={(value: 'day' | 'week' | 'month' | 'year') => setPeriod(value)}>
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={analyticalFramework} 
            onValueChange={setAnalyticalFramework}
          >
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Analysis Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physical-emotional">Physical-Emotional</SelectItem>
              <SelectItem value="personality">Personality-Driven</SelectItem>
              <SelectItem value="belief-mapping">Belief Mapping</SelectItem>
              <SelectItem value="predictive">Predictive Analytics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center mb-3">
          {analyticalFramework === 'physical-emotional' && (
            <Activity className="h-5 w-5 text-harmony-mint mr-2" />
          )}
          {analyticalFramework === 'personality' && (
            <Brain className="h-5 w-5 text-harmony-lavender mr-2" />
          )}
          {analyticalFramework === 'belief-mapping' && (
            <TrendingUp className="h-5 w-5 text-harmony-peach mr-2" />
          )}
          {analyticalFramework === 'predictive' && (
            <RefreshCw className="h-5 w-5 text-harmony-blue mr-2" />
          )}
          
          <h4 className="font-medium">
            {analyticalFramework === 'physical-emotional' && 'Physical Activity & Emotional Well-being'}
            {analyticalFramework === 'personality' && 'Personality-Driven Patterns'}
            {analyticalFramework === 'belief-mapping' && 'Core Beliefs & Journal Analysis'}
            {analyticalFramework === 'predictive' && 'Predictive Recommendations'}
          </h4>
        </div>
        
        {loading ? (
          <div className="py-6 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-harmony-lavender"></div>
          </div>
        ) : insight ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground whitespace-pre-line">{insight}</p>
            <div className="text-xs text-muted-foreground italic mt-2">
              Analyzed using GPT-4 advanced pattern recognition
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic py-2">
            No insights available for this period and framework. Generate an insight based on your data or log more activities.
          </p>
        )}
      </div>
      
      <div className="text-sm space-y-3 mb-4">
        <div className="p-3 bg-white rounded-lg">
          <h5 className="font-medium mb-1">Current Analysis Framework:</h5>
          {analyticalFramework === 'physical-emotional' && (
            <p className="text-xs text-muted-foreground">
              Correlating your physical activities with emotional states from your journal entries to identify patterns and triggers.
            </p>
          )}
          {analyticalFramework === 'personality' && (
            <p className="text-xs text-muted-foreground">
              Analyzing how your personality traits (Big 5 and MBTI) influence your wellness patterns and response to activities.
            </p>
          )}
          {analyticalFramework === 'belief-mapping' && (
            <p className="text-xs text-muted-foreground">
              Extracting recurring themes and core beliefs from your journal entries to identify limiting beliefs and growth opportunities.
            </p>
          )}
          {analyticalFramework === 'predictive' && (
            <p className="text-xs text-muted-foreground">
              Using machine learning to forecast emotional trends and provide personalized, data-driven recommendations.
            </p>
          )}
        </div>
      </div>
      
      <Button 
        className="w-full" 
        variant="outline"
        onClick={handleGenerateInsight}
        disabled={generating}
      >
        {generating ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Generating Advanced Insight...
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate New {period === 'day' ? 'Daily' : period === 'week' ? 'Weekly' : period === 'month' ? 'Monthly' : 'Yearly'} Insight
          </>
        )}
      </Button>
    </Card>
  );
};

export default WellnessInsights;
