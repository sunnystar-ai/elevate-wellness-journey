
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { getLatestWellnessInsight, generateAndSaveWellnessInsight } from '@/services/wellnessInsightService';

export type InsightPeriod = 'day' | 'week' | 'month' | 'year';
export type AnalyticalFramework = 'physical-emotional' | 'personality' | 'belief-mapping' | 'predictive';

export const useWellnessInsights = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [period, setPeriod] = useState<InsightPeriod>('day');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyticalFramework, setAnalyticalFramework] = useState<AnalyticalFramework>('physical-emotional');
  const navigate = useNavigate();

  // Fetch the latest wellness insight when component mounts
  useEffect(() => {
    fetchInsight();
  }, []);

  // When period or framework changes, fetch or generate a new insight
  useEffect(() => {
    const handlePeriodOrFrameworkChange = async () => {
      try {
        setLoading(true);
        setError(null);
        // First check if there's an existing insight for this period/framework
        const latestInsight = await getLatestWellnessInsight(period, analyticalFramework);
        
        if (latestInsight) {
          // If we have an insight, just show it
          setInsight(latestInsight.insight_text);
        } else {
          // If no insight exists for this period/framework, generate one automatically
          // but only auto-generate for weekly+ periods to avoid overloading the API
          if (period !== 'day' || analyticalFramework !== 'physical-emotional') {
            try {
              setGenerating(true);
              const newInsight = await generateAndSaveWellnessInsight(period, analyticalFramework);
              if (newInsight) {
                setInsight(newInsight.insight_text);
                toast({
                  title: `${period.charAt(0).toUpperCase() + period.slice(1)} Insight Generated`,
                  description: `Your ${period} insight has been automatically generated.`,
                  variant: "default"
                });
              }
            } catch (genError) {
              console.error('Error auto-generating insight:', genError);
              // Still set the insight to null but don't show an error toast
              // since this is an automatic process
              setInsight(null);
              setError('Could not generate insights automatically. You can try manually generating them.');
            } finally {
              setGenerating(false);
            }
          } else {
            // For daily insights, just set to null and let the user generate manually if needed
            setInsight(null);
          }
        }
      } catch (error) {
        console.error('Error fetching insight:', error);
        setInsight(null);
        if (error instanceof Error && error.message.includes("API key")) {
          setError('API key configuration issue. Please check your OpenAI API key settings.');
        } else {
          setError('Failed to load insights. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    handlePeriodOrFrameworkChange();
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
        
        // For daily insights with physical-emotional framework, we'll auto-generate 
        // since this is the default view
        if (period === 'day' && analyticalFramework === 'physical-emotional') {
          try {
            setGenerating(true);
            const newInsight = await generateAndSaveWellnessInsight(period, analyticalFramework);
            if (newInsight) {
              setInsight(newInsight.insight_text);
              // No need for a toast here since it's part of the initial loading
            }
          } catch (genError) {
            console.error('Error auto-generating default insight:', genError);
            // Don't show an error toast for auto-generation
            setInsight(null);
          } finally {
            setGenerating(false);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching insight:', error);
      setInsight(null);
      if (error instanceof Error && error.message.includes("API key")) {
        setError('API key configuration issue. Please check your OpenAI API key settings.');
      } else {
        setError('Failed to load insights. Please try again later.');
      }
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
        } else if (error.message.includes("AI service configuration") || error.message.includes("OpenAI API key is not configured")) {
          errorMessage = "AI service is not properly configured. Please contact support.";
        } else if (error.message.includes("OpenAI API")) {
          errorMessage = "AI service is temporarily unavailable. Please try again later.";
        } else if (error.message.includes("Edge Function")) {
          errorMessage = "Backend service is temporarily unavailable. Please try again later.";
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

  const navigateToJournalPrompt = () => {
    navigate('/journal-prompt');
  };

  return {
    insight,
    period,
    setPeriod,
    loading,
    generating,
    error,
    analyticalFramework,
    setAnalyticalFramework,
    handleGenerateInsight,
    navigateToJournalPrompt
  };
};
