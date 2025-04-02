
import { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle2, RefreshCw, Calendar, Brain, Activity, AlertTriangle } from 'lucide-react';
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
import { getLatestWellnessInsight, generateAndSaveWellnessInsight } from '@/services/wellnessInsightService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const WellnessInsights = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyticalFramework, setAnalyticalFramework] = useState<string>('physical-emotional');

  // Fetch the latest wellness insight when component mounts or period changes
  useEffect(() => {
    fetchInsight();
  }, [period, analyticalFramework]);

  const fetchInsight = async () => {
    try {
      setLoading(true);
      setError(null);
      const latestInsight = await getLatestWellnessInsight(period, analyticalFramework);
      
      if (latestInsight) {
        setInsight(latestInsight.insight_text);
      } else {
        setInsight(null);
      }
    } catch (error) {
      console.error('Error fetching insight:', error);
      setInsight(null);
      setError('Failed to load insights. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInsight = async () => {
    try {
      setGenerating(true);
      setError(null);
      
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
      if (error instanceof Error) {
        if (error.message === "Not enough data to generate insights") {
          errorMessage = "Not enough data available. Log more activities and journal entries.";
        } else if (error.message.includes("OpenAI API")) {
          errorMessage = "AI service is temporarily unavailable. Please try again later.";
        }
      }
      
      setError(errorMessage);
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const renderFrameworkIcon = () => {
    switch (analyticalFramework) {
      case 'physical-emotional':
        return <Activity className="h-5 w-5 text-harmony-mint mr-2" />;
      case 'personality':
        return <Brain className="h-5 w-5 text-harmony-lavender mr-2" />;
      case 'belief-mapping':
        return <TrendingUp className="h-5 w-5 text-harmony-peach mr-2" />;
      case 'predictive':
        return <RefreshCw className="h-5 w-5 text-harmony-blue mr-2" />;
      default:
        return <Activity className="h-5 w-5 text-harmony-mint mr-2" />;
    }
  };

  const getFrameworkTitle = () => {
    switch (analyticalFramework) {
      case 'physical-emotional':
        return 'Physical Activity & Emotional Well-being';
      case 'personality':
        return 'Personality-Driven Patterns';
      case 'belief-mapping':
        return 'Core Beliefs & Journal Analysis';
      case 'predictive':
        return 'Predictive Recommendations';
      default:
        return 'Wellness Analysis';
    }
  };

  const getFrameworkDescription = () => {
    switch (analyticalFramework) {
      case 'physical-emotional':
        return 'Correlating your physical activities with emotional states from your journal entries to identify patterns and triggers.';
      case 'personality':
        return 'Analyzing how your personality traits (Big 5 and MBTI) influence your wellness patterns and response to activities.';
      case 'belief-mapping':
        return 'Extracting recurring themes and core beliefs from your journal entries to identify limiting beliefs and growth opportunities.';
      case 'predictive':
        return 'Using machine learning to forecast emotional trends and provide personalized, data-driven recommendations.';
      default:
        return 'Analyzing your wellness data to provide personalized insights and recommendations.';
    }
  };

  const renderInsightContent = () => {
    if (loading) {
      return (
        <div className="py-6 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-harmony-lavender"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <Alert variant="destructive" className="bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }
    
    if (insight) {
      return (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground whitespace-pre-line">{insight}</p>
          <div className="text-xs text-muted-foreground italic mt-2">
            Analyzed using GPT-4 advanced pattern recognition
          </div>
        </div>
      );
    }
    
    return (
      <p className="text-sm text-muted-foreground italic py-2">
        No insights available for this period and framework. Generate an insight based on your data or log more activities.
      </p>
    );
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
          {renderFrameworkIcon()}
          <h4 className="font-medium">{getFrameworkTitle()}</h4>
        </div>
        
        {renderInsightContent()}
      </div>
      
      <div className="text-sm space-y-3 mb-4">
        <div className="p-3 bg-white rounded-lg">
          <h5 className="font-medium mb-1">Current Analysis Framework:</h5>
          <p className="text-xs text-muted-foreground">{getFrameworkDescription()}</p>
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
