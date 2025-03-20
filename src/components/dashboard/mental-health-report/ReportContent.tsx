
import { JournalEntry, SentimentData, TimeFrame } from './types';
import LatestJournalAnalysis from './LatestJournalAnalysis';
import InsufficientDataMessage from './InsufficientDataMessage';
import ReportTabs from './ReportTabs';

interface ReportContentProps {
  timeFrame: TimeFrame;
  journalEntries: JournalEntry[];
  loading: boolean;
  apiKey: string | undefined;
  analysisError: string | null;
  currentData: SentimentData[];
  hasEnoughData: boolean;
  themeData: any[];
  cognitiveDistortions: any[];
  beliefData: any[];
  recommendations: any[];
}

const ReportContent = ({
  timeFrame,
  journalEntries,
  loading,
  apiKey,
  analysisError,
  currentData,
  hasEnoughData,
  themeData,
  cognitiveDistortions,
  beliefData,
  recommendations
}: ReportContentProps) => {
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harmony-lavender"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {analysisError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {analysisError}
        </div>
      )}
      
      {journalEntries && journalEntries.length > 0 && (
        <LatestJournalAnalysis latestEntry={journalEntries[journalEntries.length - 1]} />
      )}
      
      {!hasEnoughData && timeFrame !== 'day' ? (
        <InsufficientDataMessage timeFrame={timeFrame} />
      ) : (
        <ReportTabs
          currentData={currentData}
          themeData={themeData}
          beliefData={beliefData}
          cognitiveDistortions={cognitiveDistortions}
          recommendations={recommendations}
        />
      )}
    </div>
  );
};

export default ReportContent;
