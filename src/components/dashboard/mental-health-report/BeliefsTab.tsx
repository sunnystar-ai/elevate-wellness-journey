
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BeliefData } from './index';

type BeliefsTabProps = {
  beliefData: BeliefData[];
};

const BeliefsTab = ({ beliefData }: BeliefsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Belief System Mapping</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Based on patterns in your journal entries, we've identified these core beliefs that may be influencing your emotions and decisions.
        </p>
        
        <div className="space-y-4 mt-4">
          {beliefData.map((belief, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{belief.belief}</h3>
                  <div className={`text-sm ${belief.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {belief.isPositive ? 'Empowering belief' : 'Limiting belief'}
                  </div>
                </div>
                <div className="bg-muted px-2 py-1 rounded text-sm">
                  {Math.round(belief.confidence * 100)}% confidence
                </div>
              </div>
              
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full ${belief.isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${belief.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-3 text-sm text-muted-foreground">
                {belief.isPositive 
                  ? 'This belief appears to support your well-being and growth.'
                  : 'This belief may be limiting your potential or causing emotional distress.'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BeliefsTab;
