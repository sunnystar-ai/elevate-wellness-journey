
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TimeFrame } from './types';

type InsufficientDataMessageProps = {
  timeFrame: TimeFrame;
};

const InsufficientDataMessage = ({ timeFrame }: InsufficientDataMessageProps) => {
  return (
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
  );
};

export default InsufficientDataMessage;
