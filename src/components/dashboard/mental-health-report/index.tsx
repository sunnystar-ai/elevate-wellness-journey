
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  timeFrame: 'week' | 'month' | 'year';
  journalEntries?: JournalEntry[];
};

const MentalHealthReport = ({ timeFrame, journalEntries = [] }: MentalHealthReportProps) => {
  // Mock sentiment data for different timeframes
  const [loading, setLoading] = useState(true);
  
  // Mock sentiment data for different timeframes
  const sentimentData: Record<string, SentimentData[]> = {
    week: [
      { date: 'Mon', sentimentScore: 0.65, gratitudeRatio: 0.4, consistencyScore: 0.8, overallScore: 0.62 },
      { date: 'Tue', sentimentScore: 0.72, gratitudeRatio: 0.5, consistencyScore: 0.8, overallScore: 0.67 },
      { date: 'Wed', sentimentScore: 0.58, gratitudeRatio: 0.3, consistencyScore: 0.8, overallScore: 0.56 },
      { date: 'Thu', sentimentScore: 0.63, gratitudeRatio: 0.4, consistencyScore: 0.8, overallScore: 0.61 },
      { date: 'Fri', sentimentScore: 0.75, gratitudeRatio: 0.6, consistencyScore: 0.8, overallScore: 0.72 },
      { date: 'Sat', sentimentScore: 0.82, gratitudeRatio: 0.7, consistencyScore: 0.8, overallScore: 0.77 },
      { date: 'Sun', sentimentScore: 0.78, gratitudeRatio: 0.6, consistencyScore: 0.8, overallScore: 0.73 },
    ],
    month: [
      { date: 'Week 1', sentimentScore: 0.68, gratitudeRatio: 0.5, consistencyScore: 0.7, overallScore: 0.63 },
      { date: 'Week 2', sentimentScore: 0.72, gratitudeRatio: 0.5, consistencyScore: 0.8, overallScore: 0.67 },
      { date: 'Week 3', sentimentScore: 0.75, gratitudeRatio: 0.6, consistencyScore: 0.8, overallScore: 0.72 },
      { date: 'Week 4', sentimentScore: 0.79, gratitudeRatio: 0.6, consistencyScore: 0.9, overallScore: 0.76 },
    ],
    year: [
      { date: 'Jan', sentimentScore: 0.60, gratitudeRatio: 0.3, consistencyScore: 0.6, overallScore: 0.50 },
      { date: 'Feb', sentimentScore: 0.65, gratitudeRatio: 0.4, consistencyScore: 0.7, overallScore: 0.58 },
      { date: 'Mar', sentimentScore: 0.70, gratitudeRatio: 0.5, consistencyScore: 0.8, overallScore: 0.67 },
      { date: 'Apr', sentimentScore: 0.75, gratitudeRatio: 0.6, consistencyScore: 0.8, overallScore: 0.72 },
    ],
  };

  // Mock theme data
  const themeData: ThemeData[] = [
    { theme: 'Work stress', count: 12, color: '#FFB347' },
    { theme: 'Family relationships', count: 8, color: '#A7C7E7' },
    { theme: 'Personal growth', count: 15, color: '#C3E6CB' },
    { theme: 'Health concerns', count: 6, color: '#F5C6CB' },
    { theme: 'Financial issues', count: 9, color: '#D6C6E1' },
  ];

  // Mock belief system data
  const beliefData: BeliefData[] = [
    { belief: 'I need to be perfect to be accepted', confidence: 0.82, isPositive: false },
    { belief: 'I can grow through challenges', confidence: 0.76, isPositive: true },
    { belief: 'I don\'t deserve success', confidence: 0.68, isPositive: false },
    { belief: 'My contributions are valuable', confidence: 0.71, isPositive: true },
    { belief: 'I have little control over outcomes', confidence: 0.65, isPositive: false },
  ];

  // Mock cognitive distortions
  const cognitiveDistortions: CognitiveDistortion[] = [
    { 
      type: 'Catastrophizing',
      description: 'Expecting the worst possible outcome',
      frequency: 7,
      example: '"If I don\'t get this project perfect, my career is over."'
    },
    { 
      type: 'Overgeneralization',
      description: 'Viewing a single negative event as a never-ending pattern',
      frequency: 5,
      example: '"I always mess up important presentations."'
    },
    { 
      type: 'All-or-nothing thinking',
      description: 'Seeing things in black and white categories',
      frequency: 9,
      example: '"Either I do this perfectly or I\'m a complete failure."'
    },
  ];

  // Mock recommendations based on analysis
  const recommendations: Recommendation[] = [
    {
      title: 'Practice stress reduction',
      description: 'You mentioned "stress" 12 times this week. Try implementing a 5-minute breathing exercise before work.',
      icon: <div className="h-4 w-4 text-harmony-lavender" />,
      type: 'short-term'
    },
    {
      title: 'Challenge negative beliefs',
      description: 'Work on reframing your belief that "you need to be perfect to be accepted" by listing evidence that contradicts this.',
      icon: <div className="h-4 w-4 text-harmony-peach" />,
      type: 'long-term'
    },
    {
      title: 'Daily gratitude practice',
      description: 'Increasing your gratitude expressions appears to improve your overall mental health score. Try adding 3 gratitude items each morning.',
      icon: <div className="h-4 w-4 text-harmony-mint" />,
      type: 'short-term'
    },
  ];

  // Effect to display latest journal entry if available
  useEffect(() => {
    if (journalEntries && journalEntries.length > 0) {
      console.log('Latest journal entry received:', journalEntries[journalEntries.length - 1]);
      // In a real app, here you would analyze the journal entries with an LLM
      // and update the sentiment data, themes, beliefs, etc.
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [journalEntries]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harmony-lavender"></div>
      </div>
    );
  }

  const currentData = sentimentData[timeFrame];

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
    </div>
  );
};

export default MentalHealthReport;
