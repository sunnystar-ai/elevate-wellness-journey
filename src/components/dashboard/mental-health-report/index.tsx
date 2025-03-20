
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import OverviewTab from './OverviewTab';
import SentimentTab from './SentimentTab';
import BeliefsTab from './BeliefsTab';
import RecommendationsTab from './RecommendationsTab';

export type JournalEntry = {
  feelings: string;
  thoughtProcess: string;
  gratitude: string;
  date?: string;
};

export type SentimentData = {
  date: string;
  sentimentScore: number;
  gratitudeRatio: number;
  consistencyScore: number;
  overallScore: number;
};

export type ThemeData = {
  theme: string;
  count: number;
  color: string;
};

export type BeliefData = {
  belief: string;
  confidence: number;
  isPositive: boolean;
};

export type CognitiveDistortion = {
  type: string;
  description: string;
  frequency: number;
  example: string;
};

export type Recommendation = {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'short-term' | 'long-term';
};

type MentalHealthReportProps = {
  timeFrame: 'day' | 'week' | 'month';
  journalEntries?: JournalEntry[];
};

const MentalHealthReport = ({ timeFrame, journalEntries = [] }: MentalHealthReportProps) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [themeData, setThemeData] = useState<ThemeData[]>([]);
  const [beliefData, setBeliefData] = useState<BeliefData[]>([]);
  const [cognitiveDistortions, setCognitiveDistortions] = useState<CognitiveDistortion[]>([]);
  
  // Generate sentiment data based on timeFrame and actual entries
  const [sentimentData, setSentimentData] = useState<Record<string, SentimentData[]>>({
    day: [],
    week: [],
    month: []
  });

  // Analyze journal entries and generate insights
  useEffect(() => {
    if (journalEntries && journalEntries.length > 0) {
      console.log('Latest journal entry received:', journalEntries[journalEntries.length - 1]);
      
      // Generate personalized recommendations based on actual journal content
      const latestEntry = journalEntries[journalEntries.length - 1];
      const newRecommendations: Recommendation[] = [];
      
      // Extract key themes from the journal entry
      const keyThemes: ThemeData[] = [];
      const extractedBeliefs: BeliefData[] = [];
      const extractedDistortions: CognitiveDistortion[] = [];
      
      // Very simple analysis (in a real app this would use NLP/LLM)
      // For demonstration purposes only
      const wordsMap: Record<string, number> = {};
      const allText = `${latestEntry.feelings} ${latestEntry.thoughtProcess} ${latestEntry.gratitude}`.toLowerCase();
      
      // Count word frequencies
      const words = allText.split(/\s+/);
      words.forEach(word => {
        if (word.length > 3) { // Only count words with more than 3 characters
          wordsMap[word] = (wordsMap[word] || 0) + 1;
        }
      });
      
      // Check for frequent emotion words
      const emotionWords = ["happy", "sad", "anxious", "stress", "worry", "grateful", "thankful", "motivate", "friend", "value"];
      
      emotionWords.forEach(emotion => {
        const count = (allText.match(new RegExp(`${emotion}`, 'gi')) || []).length;
        if (count > 0) {
          keyThemes.push({
            theme: emotion.charAt(0).toUpperCase() + emotion.slice(1),
            count: count,
            color: getColorForEmotion(emotion)
          });
        }
      });
      
      // Sort themes by count
      keyThemes.sort((a, b) => b.count - a.count);
      
      // Create recommendations based on journal content
      if (allText.includes('stress') || allText.includes('anxious') || allText.includes('worry')) {
        newRecommendations.push({
          title: 'Practice mindfulness',
          description: `Your entry mentions feelings of ${keyThemes.find(t => ['Stress', 'Anxious', 'Worry'].includes(t.theme))?.theme.toLowerCase() || 'stress'}. Try a 5-minute breathing exercise before work.`,
          icon: <div className="h-4 w-4 text-harmony-lavender" />,
          type: 'short-term'
        });
      }
      
      if (allText.includes('friend') || allText.includes('collaboration') || allText.includes('social')) {
        newRecommendations.push({
          title: 'Nurture social connections',
          description: 'Your entry highlights the importance of relationships. Schedule time this week to connect with a friend.',
          icon: <div className="h-4 w-4 text-harmony-blue" />,
          type: 'short-term'
        });
      }
      
      if (allText.includes('grateful') || allText.includes('thankful') || allText.includes('appreciation')) {
        newRecommendations.push({
          title: 'Daily gratitude practice',
          description: 'Continue expressing gratitude in your journal. Consider noting 3 specific things each morning.',
          icon: <div className="h-4 w-4 text-harmony-mint" />,
          type: 'short-term'
        });
      }

      // Add at least one long-term recommendation
      if (allText.includes('value') || allText.includes('worth') || allText.includes('contribute')) {
        newRecommendations.push({
          title: 'Recognize your contributions',
          description: 'Work on acknowledging the value you bring to your collaborations and projects.',
          icon: <div className="h-4 w-4 text-harmony-peach" />,
          type: 'long-term'
        });
      } else {
        newRecommendations.push({
          title: 'Develop self-reflection practice',
          description: 'Set aside time weekly to reflect on your personal growth and learning experiences.',
          icon: <div className="h-4 w-4 text-harmony-peach" />,
          type: 'long-term'
        });
      }
      
      // Create simple sentiment scores based on the entry
      const positiveWords = ['happy', 'grateful', 'thankful', 'motivated', 'value', 'growth', 'learn'];
      const negativeWords = ['sad', 'anxious', 'stress', 'worry', 'fear', 'doubt'];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      positiveWords.forEach(word => {
        positiveCount += (allText.match(new RegExp(word, 'gi')) || []).length;
      });
      
      negativeWords.forEach(word => {
        negativeCount += (allText.match(new RegExp(word, 'gi')) || []).length;
      });
      
      const totalEmotionWords = positiveCount + negativeCount;
      const sentimentScore = totalEmotionWords > 0 ? 
        (0.5 + 0.5 * (positiveCount - negativeCount) / totalEmotionWords) : 0.5;
      
      const gratitudeRatio = allText.includes('grateful') || allText.includes('thankful') ? 0.7 : 0.3;
      
      // Generate sentiment data for day view
      const daySentiment: SentimentData[] = [{
        date: 'Today',
        sentimentScore: sentimentScore,
        gratitudeRatio: gratitudeRatio,
        consistencyScore: 1.0,
        overallScore: (sentimentScore + gratitudeRatio + 1.0) / 3
      }];
      
      // Only use real data for the day view, mock data for others
      const newSentimentData = {
        day: daySentiment,
        week: Array(7).fill(0).map((_, i) => ({
          date: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
          sentimentScore: i === 6 ? sentimentScore : 0,
          gratitudeRatio: i === 6 ? gratitudeRatio : 0,
          consistencyScore: i === 6 ? 1.0 : 0,
          overallScore: i === 6 ? (sentimentScore + gratitudeRatio + 1.0) / 3 : 0
        })),
        month: Array(4).fill(0).map((_, i) => ({
          date: [`Week ${i+1}`],
          sentimentScore: i === 3 ? sentimentScore : 0,
          gratitudeRatio: i === 3 ? gratitudeRatio : 0,
          consistencyScore: i === 3 ? 0.25 : 0,
          overallScore: i === 3 ? (sentimentScore + gratitudeRatio + 0.25) / 3 : 0
        }))
      };
      
      // Extract beliefs from latest entry
      if (allText.includes('value') && allText.includes('contribute')) {
        extractedBeliefs.push({
          belief: 'My contributions are valuable',
          confidence: 0.75,
          isPositive: true
        });
      }
      
      if (allText.includes('learn') || allText.includes('growth')) {
        extractedBeliefs.push({
          belief: 'I can grow through challenges',
          confidence: 0.82,
          isPositive: true
        });
      }
      
      if (extractedBeliefs.length === 0) {
        // Default beliefs if none detected
        extractedBeliefs.push({
          belief: 'I can grow through journaling',
          confidence: 0.70,
          isPositive: true
        });
      }
      
      // Set the extracted data
      setRecommendations(newRecommendations);
      setThemeData(keyThemes.slice(0, 5)); // Top 5 themes
      setSentimentData(newSentimentData);
      setBeliefData(extractedBeliefs);
      setCognitiveDistortions([
        { 
          type: 'All-or-nothing thinking',
          description: 'Seeing things in black and white categories',
          frequency: 2,
          example: '"Either I contribute perfectly or I\'m not valuable."'
        }
      ]);
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [journalEntries]);

  // Helper function to assign colors to emotions
  function getColorForEmotion(emotion: string): string {
    const colorMap: Record<string, string> = {
      happy: '#C3E6CB', // Mint green
      sad: '#F5C6CB', // Light red
      anxious: '#FFB347', // Orange
      stress: '#FFB347', // Orange
      worry: '#FFB347', // Orange
      grateful: '#A7C7E7', // Light blue
      thankful: '#A7C7E7', // Light blue
      friend: '#D6C6E1', // Lavender
      value: '#C3E6CB', // Mint green
      motivate: '#C3E6CB' // Mint green
    };
    
    return colorMap[emotion] || '#A7C7E7'; // Default to light blue
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harmony-lavender"></div>
      </div>
    );
  }

  // Check if we have enough data for the selected time frame
  const hasEnoughData = () => {
    if (timeFrame === 'day') {
      return journalEntries.length > 0;
    }
    if (timeFrame === 'week') {
      return journalEntries.length >= 7; // Need at least a week of data for weekly view
    }
    if (timeFrame === 'month') {
      return journalEntries.length >= 30; // Need at least a month of data for monthly view
    }
    return false;
  };

  // Only show data for the day view when there's only one journal entry
  const currentData = hasEnoughData() ? sentimentData[timeFrame] : [];
  const showInsufficientDataMessage = !hasEnoughData() && timeFrame !== 'day';

  return (
    <div className="space-y-6">
      {journalEntries && journalEntries.length > 0 && (
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Latest Journal Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Based on your most recent journal entry, we've updated your mental health analysis.
            </p>
            <div className="text-sm">
              <p><strong>Feelings analyzed:</strong> {journalEntries[journalEntries.length - 1].feelings.substring(0, 100)}...</p>
              <p><strong>Thoughts analyzed:</strong> {journalEntries[journalEntries.length - 1].thoughtProcess.substring(0, 100)}...</p>
              <p><strong>Gratitude analyzed:</strong> {journalEntries[journalEntries.length - 1].gratitude.substring(0, 100)}...</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {showInsufficientDataMessage ? (
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Insufficient Data</h3>
              <p className="text-muted-foreground max-w-md">
                {timeFrame === 'week' 
                  ? "We need at least 7 days of journal entries to generate a weekly report." 
                  : "We need at least 30 days of journal entries to generate a monthly report."}
              </p>
              <p className="text-muted-foreground mt-4">
                Continue your journaling practice to unlock more insights over time!
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="beliefs">Belief System</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab currentData={currentData} themeData={themeData} cognitiveDistortions={cognitiveDistortions} />
          </TabsContent>
          
          <TabsContent value="sentiment">
            <SentimentTab currentData={currentData} themeData={themeData} />
          </TabsContent>
          
          <TabsContent value="beliefs">
            <BeliefsTab beliefData={beliefData} />
          </TabsContent>
          
          <TabsContent value="recommendations">
            <RecommendationsTab recommendations={recommendations} currentData={currentData} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default MentalHealthReport;
