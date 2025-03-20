
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, BarChart, Bar } from 'recharts';
import { Heart, AlertTriangle } from 'lucide-react';
import { SentimentData, ThemeData, CognitiveDistortion } from './types';

type OverviewTabProps = {
  currentData: SentimentData[];
  themeData: ThemeData[];
  cognitiveDistortions: CognitiveDistortion[];
};

const OverviewTab = ({ currentData, themeData, cognitiveDistortions }: OverviewTabProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Mental Health Score: {Math.round(currentData[currentData.length - 1].overallScore * 100)}/100</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This score is a composite of your sentiment, gratitude expression, and journaling consistency.
          </p>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 1]} tickFormatter={(value) => `${value * 100}`} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-md p-2 shadow-md">
                          <p className="font-medium">{payload[0].payload.date}</p>
                          <p className="text-sm">Mental Health Score: {Math.round(payload[0].payload.overallScore * 100)}</p>
                          <p className="text-sm">Sentiment: {Math.round(payload[0].payload.sentimentScore * 100)}</p>
                          <p className="text-sm">Gratitude: {Math.round(payload[0].payload.gratitudeRatio * 100)}</p>
                          <p className="text-sm">Consistency: {Math.round(payload[0].payload.consistencyScore * 100)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="overallScore" 
                  name="Mental Health Score"
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" /> 
              Emotional Themes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={themeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="theme" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" name="Mentions" fill="#8884d8">
                    {themeData.map((entry, index) => (
                      <rect key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" /> 
              Cognitive Distortions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cognitiveDistortions.map((distortion, index) => (
                <div key={index} className="border-b pb-2 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium">{distortion.type}</span>
                    <span className="text-sm text-muted-foreground">{distortion.frequency}x detected</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{distortion.description}</p>
                  <p className="text-xs italic mt-1">Example: {distortion.example}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
