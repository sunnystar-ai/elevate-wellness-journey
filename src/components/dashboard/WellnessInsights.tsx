
import { Card } from '@/components/ui/card';
import { useWellnessInsights } from './wellness-insights/useWellnessInsights';
import { PeriodSelector } from './wellness-insights/PeriodSelector';
import { FrameworkSelector } from './wellness-insights/FrameworkSelector';
import { InsightContent } from './wellness-insights/InsightContent';
import { FrameworkDisplay } from './wellness-insights/FrameworkDisplay';
import { GenerateButton } from './wellness-insights/GenerateButton';
import { getFrameworkInfo } from './wellness-insights/frameworks';

const WellnessInsights = () => {
  const {
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
  } = useWellnessInsights();

  const frameworkInfo = getFrameworkInfo(analyticalFramework);

  return (
    <Card className="p-4 border border-harmony-light-lavender bg-harmony-light-lavender/20">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">Your Wellness Insights</h3>
        <div className="flex space-x-2">
          <PeriodSelector period={period} setPeriod={setPeriod} />
          <FrameworkSelector framework={analyticalFramework} setFramework={setAnalyticalFramework} />
        </div>
      </div>
      
      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
        <FrameworkDisplay icon={frameworkInfo.icon} title={frameworkInfo.title} />
        
        <InsightContent 
          loading={loading}
          error={error}
          insight={insight}
          navigateToJournalPrompt={navigateToJournalPrompt}
        />
      </div>
      
      <div className="text-sm space-y-3 mb-4">
        <div className="p-3 bg-white rounded-lg">
          <h5 className="font-medium mb-1">Current Analysis Framework:</h5>
          <p className="text-xs text-muted-foreground">{frameworkInfo.description}</p>
        </div>
      </div>
      
      <GenerateButton 
        period={period}
        generating={generating}
        onClick={handleGenerateInsight}
      />
    </Card>
  );
};

export default WellnessInsights;
