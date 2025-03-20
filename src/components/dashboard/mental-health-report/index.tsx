
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './OverviewTab';
import SentimentTab from './SentimentTab';
import BeliefsTab from './BeliefsTab';
import RecommendationsTab from './RecommendationsTab';
import LatestJournalAnalysis from './LatestJournalAnalysis';
import InsufficientDataMessage from './InsufficientDataMessage';
import { 
  analyzeJournalEntry, 
  generateTimeFrameData 
} from './utils';
import {
  JournalEntry,
  SentimentData,
  ThemeData,
  BeliefData,
  CognitiveDistortion,
  Recommendation,
  TimeFrame
} from './types';

// Re-export types for backward compatibility
export type {
  JournalEntry,
  SentimentData,
  ThemeData,
  BeliefData,
  CognitiveDistortion,
  Recommendation
};

type MentalHealthReportProps = {
  timeFrame: TimeFrame;
  journalEntries?: JournalEntry[];
};

const MentalHealthReport = ({ timeFrame, journalEntries = [] }: MentalHealthReportProps) => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [themeData, setThemeData] = useState<ThemeData[]>([]);
  const [beliefData, setBeliefData] = useState<BeliefData[]>([]);
  const [cognitiveDistortions, setCognitiveDistortions] = useState<CognitiveDistortion[]>([]);
  const [sentimentData, setSentimentData] = useState<Record<TimeFrame, SentimentData[]>>({
    day: [],
    week: [],
    month: []
  });

  // Analyze journal entries and generate insights
  useEffect(() => {
    if (journalEntries && journalEntries.length > 0) {
      const latestEntry = journalEntries[journalEntries.length - 1];
      
      // Analyze the journal entry to extract insights
      const { 
        recommendations: newRecommendations, 
        keyThemes, 
        extractedBeliefs, 
        extractedDistortions 
      } = analyzeJournalEntry(latestEntry);
      
      // Generate sentiment data based on the entry and all journal entries
      const newSentimentData = generateTimeFrameData(latestEntry, journalEntries);
      
      // Update state with the extracted insights
      setRecommendations(newRecommendations);
      setThemeData(keyThemes.slice(0, 5)); // Top 5 themes
      setSentimentData(newSentimentData);
      setBeliefData(extractedBeliefs);
      setCognitiveDistortions(extractedDistortions);
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [journalEntries]);

  // Check if we have enough data for the selected time frame
  const hasEnoughData = () => {
    if (timeFrame === 'day') {
      return journalEntries.length > 0;
    }
    if (timeFrame === 'week') {
      return journalEntries.length >= 1; // Show weekly view even with just one entry
    }
    if (timeFrame === 'month') {
      return journalEntries.length >= 1; // Show monthly view even with just one entry
    }
    return false;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harmony-lavender"></div>
      </div>
    );
  }

  // Only show data for the day view when there's only one journal entry
  const currentData = hasEnoughData() ? sentimentData[timeFrame] : [];
  const showInsufficientDataMessage = !hasEnoughData() && timeFrame !== 'day';

  return (
    <div className="space-y-6">
      {journalEntries && journalEntries.length > 0 && (
        <LatestJournalAnalysis latestEntry={journalEntries[journalEntries.length - 1]} />
      )}
      
      {showInsufficientDataMessage ? (
        <InsufficientDataMessage timeFrame={timeFrame} />
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="beliefs">Belief System</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab 
              currentData={currentData} 
              themeData={themeData} 
              cognitiveDistortions={cognitiveDistortions} 
            />
          </TabsContent>
          
          <TabsContent value="sentiment">
            <SentimentTab 
              currentData={currentData} 
              themeData={themeData} 
            />
          </TabsContent>
          
          <TabsContent value="beliefs">
            <BeliefsTab beliefData={beliefData} />
          </TabsContent>
          
          <TabsContent value="recommendations">
            <RecommendationsTab 
              recommendations={recommendations} 
              currentData={currentData} 
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default MentalHealthReport;
