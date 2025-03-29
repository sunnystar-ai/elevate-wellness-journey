
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface DailyOverviewProps {
  activityDurations?: Record<string, string>;
  mentalScore?: number;
}

const DailyOverview = ({ activityDurations, mentalScore }: DailyOverviewProps) => {
  const [dailyScore, setDailyScore] = useState<number>(70);
  const [scoreBreakdown, setScoreBreakdown] = useState([
    { name: 'Walk', score: 0.8 },
    { name: 'Sleep', score: 0.7 },
    { name: 'Meditation', score: 0.6 },
    { name: 'Mental', score: 0.7 }
  ]);

  useEffect(() => {
    if (activityDurations) {
      // Calculate scores for each activity
      let walkScore = 0;
      let sleepScore = 0;
      let meditationScore = 0;
      
      // Walk score calculation (60 minutes = full credit)
      const walkDuration = parseFloat(activityDurations["Evening workout"] || "0");
      walkScore = Math.min(1, walkDuration / 60);
      
      // Sleep score calculation (7 hours = full credit)
      const sleepDuration = parseFloat(activityDurations["Sleep preparation"] || "0");
      sleepScore = Math.min(1, sleepDuration / 7);
      
      // Meditation score calculation (30 minutes = full credit)
      const meditationDuration = parseFloat(activityDurations["Morning meditation"] || "0");
      meditationScore = Math.min(1, meditationDuration / 30);
      
      // Mental score (from mental wellness analysis)
      const mentalScoreValue = mentalScore !== undefined ? mentalScore : 0.7;
      
      // Calculate daily overall score
      const totalScore = walkScore + sleepScore + meditationScore + mentalScoreValue;
      const percentageScore = Math.round((totalScore / 4) * 100);
      
      setDailyScore(percentageScore);
      
      // Update score breakdown
      setScoreBreakdown([
        { name: 'Walk', score: walkScore },
        { name: 'Sleep', score: sleepScore },
        { name: 'Meditation', score: meditationScore },
        { name: 'Mental', score: mentalScoreValue }
      ]);
    }
  }, [activityDurations, mentalScore]);

  // Chart data
  const chartData = scoreBreakdown.map(item => ({
    name: item.name,
    score: Math.round(item.score * 100)
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between mb-3">
        <div className="text-lg font-bold">Today's Progress</div>
        <div className="text-xl font-bold text-harmony-lavender">{dailyScore}%</div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="score" 
              fill="#8884d8" 
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyOverview;
