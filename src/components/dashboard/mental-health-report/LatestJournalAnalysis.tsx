
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { JournalEntry } from './types';

type LatestJournalAnalysisProps = {
  latestEntry: JournalEntry;
};

const LatestJournalAnalysis = ({ latestEntry }: LatestJournalAnalysisProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Latest Journal Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          Based on your most recent journal entry, we've updated your mental health analysis.
        </p>
        <div className="text-sm">
          <p><strong>Feelings analyzed:</strong> {latestEntry.feelings.substring(0, 100)}...</p>
          <p><strong>Thoughts analyzed:</strong> {latestEntry.thoughtProcess.substring(0, 100)}...</p>
          <p><strong>Gratitude analyzed:</strong> {latestEntry.gratitude.substring(0, 100)}...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestJournalAnalysis;
