
import { SentimentData, ThemeData, BeliefData, CognitiveDistortion, Recommendation } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './OverviewTab';
import SentimentTab from './SentimentTab';
import BeliefsTab from './BeliefsTab';
import RecommendationsTab from './RecommendationsTab';

interface ReportTabsProps {
  currentData: SentimentData[];
  themeData: ThemeData[];
  beliefData: BeliefData[];
  cognitiveDistortions: CognitiveDistortion[];
  recommendations: Recommendation[];
}

const ReportTabs = ({
  currentData,
  themeData,
  beliefData,
  cognitiveDistortions,
  recommendations
}: ReportTabsProps) => {
  return (
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
  );
};

export default ReportTabs;
