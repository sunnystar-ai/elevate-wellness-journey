
import { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle2, RefreshCw, Calendar } from 'lucide-react';
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
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Fetch the latest wellness insight when component mounts or period changes
  useEffect(() => {
    fetchInsight();
  }, [period]);

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
      const newInsight = await generateAndSaveWellnessInsight(period);
      
      if (newInsight) {
        setInsight(newInsight.insight_text);
        toast({
          title: "Insight Generated",
          description: "Your new wellness insight has been generated successfully.",
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
        <Select value={period} onValueChange={(value: 'day' | 'week' | 'month' | 'year') => setPeriod(value)}>
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Daily</SelectItem>
            <SelectItem value="week">Weekly</SelectItem>
            <SelectItem value="month">Monthly</SelectItem>
            <SelectItem value="year">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <TrendingUp className="h-5 w-5 text-harmony-mint mr-2" />
          <h4 className="font-medium">Physical Activity & Mental Wellness Connection</h4>
        </div>
        
        {loading ? (
          <div className="py-6 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-harmony-lavender"></div>
          </div>
        ) : insight ? (
          <p className="text-sm text-muted-foreground whitespace-pre-line">{insight}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic py-2">
            No insights available for this period. Generate an insight based on your data or log more activities.
          </p>
        )}
      </div>
      
      <ul className="text-sm space-y-2 mb-4">
        <li className="flex items-start">
          <span className="bg-harmony-light-mint rounded-full p-1 mr-2 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-harmony-mint" />
          </span>
          <span>Regular exercise correlates with improved mood scores</span>
        </li>
        <li className="flex items-start">
          <span className="bg-harmony-light-lavender rounded-full p-1 mr-2 mt-0.5">
            <Calendar className="h-3 w-3 text-harmony-lavender" />
          </span>
          <span>Insights are based on your {period === 'day' ? 'daily' : period + 'ly'} activity patterns</span>
        </li>
      </ul>
      
      <Button 
        className="w-full" 
        variant="outline"
        onClick={handleGenerateInsight}
        disabled={generating}
      >
        {generating ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Generating Insight...
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate New Insight
          </>
        )}
      </Button>
    </Card>
  );
};

export default WellnessInsights;
