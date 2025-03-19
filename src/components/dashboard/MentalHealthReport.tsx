import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend, Tooltip } from 'recharts';
import { Brain, Heart, Star, AlertTriangle, Check, TrendingUp, Lightbulb } from 'lucide-react';

export type JournalEntry = {
  feelings: string;
  thoughtProcess: string;
  gratitude: string;
  date?: string;
};

type MentalHealthReportProps = {
  timeFrame: 'week' | 'month' | 'year';
  journalEntries?: JournalEntry[];
};

type SentimentData = {
  date: string;
  sentimentScore: number;
  gratitudeRatio: number;
  consistencyScore: number;
  overallScore: number;
};

type ThemeData = {
  theme: string;
  count: number;
  color: string;
};

type BeliefData = {
  belief: string;
  confidence: number;
  isPositive: boolean;
};

type CognitiveDistortion = {
  type: string;
  description: string;
  frequency: number;
  example: string;
};

const MentalHealthReport = ({ timeFrame, journalEntries = [] }: MentalHealthReportProps) => {
  // Simulated data - in a real app, this would come from your backend LLM analysis
  const [loading, setLoading] = useState(true);
  
  // Mock sentiment data for different timeframes
  const sentimentData: Record<string, SentimentData[]> = {
    week: [
      { date: 'Mon', sentimentScore: 0.65, gratitudeRatio: 0.4, consistencyScore: 0.8, overallScore: 0.62 },
      { date: 'Tue', sentimentScore: 0.72, gratitudeRatio: 0.5, consistencyScore: 0.8, overallScore: 0.67 },
      { date: 'Wed', sentimentScore: 0.58, gratitudeRatio: 0.3, consistencyScore: 0.8, overallScore: 0.56 },
      { date: 'Thu', sentimentScore: 0.63, gratitudeRatio: 0.4, consistencyScore: 0.8, overallScore: 0.61 },
      { date: 'Fri', sentimentScore: 0.75, gratitudeRatio: 0.6, consistencyScore: 0.8, overallScore: 0.72 },
      { date: 'Sat', sentimentScore: 0.82, gratitudeRatio: 0.7, consistencyScore: 0.8, overallScore: 0.77 },
      { date: 'Sun', sentimentScore: 0.78, gratitudeRatio: 0.6, consistencyScore: 0.8, overallScore: 0.73 },
    ],
    month: [
      // ... mock month data would be here
      { date: 'Week 1', sentimentScore: 0.68, gratitudeRatio: 0.5, consistencyScore: 0.7, overallScore: 0.63 },
      { date: 'Week 2', sentimentScore: 0.72, gratitudeRatio: 0.5, consistencyScore: 0.8, overallScore: 0.67 },
      { date: 'Week 3', sentimentScore: 0.75, gratitudeRatio: 0.6, consistencyScore: 0.8, overallScore: 0.72 },
      { date: 'Week 4', sentimentScore: 0.79, gratitudeRatio: 0.6, consistencyScore: 0.9, overallScore: 0.76 },
    ],
    year: [
      // ... mock year data would be here
      { date: 'Jan', sentimentScore: 0.60, gratitudeRatio: 0.3, consistencyScore: 0.6, overallScore: 0.50 },
      { date: 'Feb', sentimentScore: 0.65, gratitudeRatio: 0.4, consistencyScore: 0.7, overallScore: 0.58 },
      { date: 'Mar', sentimentScore: 0.70, gratitudeRatio: 0.5, consistencyScore: 0.8, overallScore: 0.67 },
      { date: 'Apr', sentimentScore: 0.75, gratitudeRatio: 0.6, consistencyScore: 0.8, overallScore: 0.72 },
    ],
  };

  // Mock theme data
  const themeData: ThemeData[] = [
    { theme: 'Work stress', count: 12, color: '#FFB347' },
    { theme: 'Family relationships', count: 8, color: '#A7C7E7' },
    { theme: 'Personal growth', count: 15, color: '#C3E6CB' },
    { theme: 'Health concerns', count: 6, color: '#F5C6CB' },
    { theme: 'Financial issues', count: 9, color: '#D6C6E1' },
  ];

  // Mock belief system data
  const beliefData: BeliefData[] = [
    { belief: 'I need to be perfect to be accepted', confidence: 0.82, isPositive: false },
    { belief: 'I can grow through challenges', confidence: 0.76, isPositive: true },
    { belief: 'I don\'t deserve success', confidence: 0.68, isPositive: false },
    { belief: 'My contributions are valuable', confidence: 0.71, isPositive: true },
    { belief: 'I have little control over outcomes', confidence: 0.65, isPositive: false },
  ];

  // Mock cognitive distortions
  const cognitiveDistortions: CognitiveDistortion[] = [
    { 
      type: 'Catastrophizing',
      description: 'Expecting the worst possible outcome',
      frequency: 7,
      example: '"If I don\'t get this project perfect, my career is over."'
    },
    { 
      type: 'Overgeneralization',
      description: 'Viewing a single negative event as a never-ending pattern',
      frequency: 5,
      example: '"I always mess up important presentations."'
    },
    { 
      type: 'All-or-nothing thinking',
      description: 'Seeing things in black and white categories',
      frequency: 9,
      example: '"Either I do this perfectly or I\'m a complete failure."'
    },
  ];

  // Mock recommendations based on analysis
  const recommendations = [
    {
      title: 'Practice stress reduction',
      description: 'You mentioned "stress" 12 times this week. Try implementing a 5-minute breathing exercise before work.',
      icon: <Brain className="h-4 w-4 text-harmony-lavender" />,
      type: 'short-term'
    },
    {
      title: 'Challenge negative beliefs',
      description: 'Work on reframing your belief that "you need to be perfect to be accepted" by listing evidence that contradicts this.',
      icon: <Lightbulb className="h-4 w-4 text-harmony-peach" />,
      type: 'long-term'
    },
    {
      title: 'Daily gratitude practice',
      description: 'Increasing your gratitude expressions appears to improve your overall mental health score. Try adding 3 gratitude items each morning.',
      icon: <Star className="h-4 w-4 text-harmony-mint" />,
      type: 'short-term'
    },
  ];

  // Effect to display latest journal entry if available
  useEffect(() => {
    if (journalEntries && journalEntries.length > 0) {
      console.log('Latest journal entry received:', journalEntries[journalEntries.length - 1]);
      // In a real app, here you would analyze the journal entries with an LLM
      // and update the sentiment data, themes, beliefs, etc.
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [journalEntries]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harmony-lavender"></div>
      </div>
    );
  }

  const currentData = sentimentData[timeFrame];

  return (
    <div className="space-y-6">
      {journalEntries && journalEntries.length > 0 && (
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Latest Journal Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Based on your most recent journal entry, we've updated your mental health analysis.
            </p>
            <div className="text-sm">
              <p><strong>Feelings analyzed:</strong> {journalEntries[journalEntries.length - 1].feelings.substring(0, 100)}...</p>
              <p><strong>Thoughts analyzed:</strong> {journalEntries[journalEntries.length - 1].thoughtProcess.substring(0, 100)}...</p>
              <p><strong>Gratitude analyzed:</strong> {journalEntries[journalEntries.length - 1].gratitude.substring(0, 100)}...</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="beliefs">Belief System</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
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
        </TabsContent>
        
        {/* Sentiment Analysis Tab */}
        <TabsContent value="sentiment">
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
                    {Math.round(currentData[currentData.length - 1].sentimentScore * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your entries show generally positive emotional tone with some periods of stress.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 mr-2 text-harmony-mint" />
                    <h3 className="font-medium">Gratitude Ratio</h3>
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    {Math.round(currentData[currentData.length - 1].gratitudeRatio * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Percentage of entries that express thankfulness or appreciation.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <Check className="h-5 w-5 mr-2 text-harmony-blue" />
                    <h3 className="font-medium">Journaling Consistency</h3>
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    {Math.round(currentData[currentData.length - 1].consistencyScore * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You've journaled {Math.round(currentData[currentData.length - 1].consistencyScore * 7)}/7 days this week.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Most Common Themes</h3>
                <div className="space-y-2">
                  {themeData.map((theme, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: theme.color }}
                      ></div>
                      <span className="flex-grow">{theme.theme}</span>
                      <span className="text-sm text-muted-foreground">{theme.count} mentions</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Belief System Tab */}
        <TabsContent value="beliefs">
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
        </TabsContent>
        
        {/* Recommendations Tab */}
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-harmony-peach" />
                    Immediate Micro-Actions
                  </h3>
                  <div className="space-y-3">
                    {recommendations.filter(r => r.type === 'short-term').map((rec, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">{rec.icon}</div>
                          <div>
                            <h4 className="font-medium">{rec.title}</h4>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-harmony-blue" />
                    Long-Term Growth Opportunities
                  </h3>
                  <div className="space-y-3">
                    {recommendations.filter(r => r.type === 'long-term').map((rec, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">{rec.icon}</div>
                          <div>
                            <h4 className="font-medium">{rec.title}</h4>
                            <p className="text-sm text-muted-foreground">{rec.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-harmony-light-lavender/20 p-4 rounded-lg border border-harmony-light-lavender">
                  <h3 className="font-medium mb-2">Your Journaling Impact</h3>
                  <p className="text-sm">
                    Consistent journaling has shown to improve mental health scores by 15-20% over 8 weeks.
                    Your current consistency rate of {Math.round(currentData[currentData.length - 1].consistencyScore * 100)}% is excellent - keep it up!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MentalHealthReport;
