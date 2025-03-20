
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Star, Check } from 'lucide-react';
import { SentimentData, ThemeData } from './types';

type SentimentTabProps = {
  currentData: SentimentData[];
  themeData: ThemeData[];
};

const SentimentTab = ({ currentData, themeData }: SentimentTabProps) => {
  // Get the latest data point
  const latestData = currentData.length > 0 ? currentData[currentData.length - 1] : null;
  
  // Calculate journaling days
  const journalingDays = latestData ? Math.round(latestData.consistencyScore * 7) : 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment & Theme Extraction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Heart className="h-5 w-5 mr-2 text-harmony-peach" />
              <h3 className="font-medium">Emotional Valence</h3>
            </div>
            <div className="text-2xl font-bold mb-2">
              {latestData ? Math.round(latestData.sentimentScore * 100) : 0}%
            </div>
            <p className="text-sm text-muted-foreground">
              {latestData && latestData.sentimentScore > 0.6 
                ? "Your entries show a positive emotional tone." 
                : latestData && latestData.sentimentScore > 0.4
                ? "Your entries show a neutral emotional tone with some stress." 
                : "Your entries indicate some challenging emotions to work through."}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Star className="h-5 w-5 mr-2 text-harmony-mint" />
              <h3 className="font-medium">Gratitude Ratio</h3>
            </div>
            <div className="text-2xl font-bold mb-2">
              {latestData ? Math.round(latestData.gratitudeRatio * 100) : 0}%
            </div>
            <p className="text-sm text-muted-foreground">
              {latestData && latestData.gratitudeRatio > 0.6
                ? "Your entries frequently express thankfulness and appreciation."
                : "Percentage of content expressing thankfulness or appreciation."}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Check className="h-5 w-5 mr-2 text-harmony-blue" />
              <h3 className="font-medium">Journaling Consistency</h3>
            </div>
            <div className="text-2xl font-bold mb-2">
              {latestData ? Math.round(latestData.consistencyScore * 100) : 0}%
            </div>
            <p className="text-sm text-muted-foreground">
              You've journaled {journalingDays}/7 days this week.
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-3">Most Common Themes</h3>
          <div className="space-y-2">
            {themeData.length > 0 ? (
              themeData.map((theme, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: theme.color }}
                  ></div>
                  <span className="flex-grow">{theme.theme}</span>
                  <span className="text-sm text-muted-foreground">{theme.count} {theme.count === 1 ? 'mention' : 'mentions'}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Continue journaling to reveal theme patterns.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentTab;
