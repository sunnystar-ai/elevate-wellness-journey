
import { useState } from 'react';
import { TimeFrame, JournalEntry } from './types';
import ApiKeyInput from './ApiKeyInput';
import ReportContent from './ReportContent';
import { useJournalAnalysis } from './hooks/useJournalAnalysis';
import { hasEnoughData } from './utils';

// Re-export types for backward compatibility
export type {
  JournalEntry,
  SentimentData,
  ThemeData,
  BeliefData,
  CognitiveDistortion,
  Recommendation
} from './types';

type MentalHealthReportProps = {
  timeFrame: TimeFrame;
  journalEntries?: JournalEntry[];
};

const MentalHealthReport = ({ timeFrame, journalEntries = [] }: MentalHealthReportProps) => {
  const {
    loading,
    apiKey,
    analysisError,
    recommendations,
    themeData,
    beliefData,
    cognitiveDistortions,
    sentimentData,
    handleApiKeySubmit
  } = useJournalAnalysis(journalEntries);

  // Only show data for the day view when there's only one journal entry
  const currentData = hasEnoughData(journalEntries, timeFrame) ? sentimentData[timeFrame] : [];
  const hasData = hasEnoughData(journalEntries, timeFrame);

  return (
    <div className="space-y-6">
      {/* API Key Input Component */}
      <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
      
      <ReportContent
        timeFrame={timeFrame}
        journalEntries={journalEntries}
        loading={loading}
        apiKey={apiKey}
        analysisError={analysisError}
        currentData={currentData}
        hasEnoughData={hasData}
        themeData={themeData}
        cognitiveDistortions={cognitiveDistortions}
        beliefData={beliefData}
        recommendations={recommendations}
      />
    </div>
  );
};

export default MentalHealthReport;
