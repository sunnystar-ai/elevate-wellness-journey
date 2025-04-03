
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { saveWellnessScore } from '@/services/supabaseService';
import { toast } from '@/hooks/use-toast';
import CircularProgressChart from '@/components/home/CircularProgressChart';

interface DailyOverviewProps {
  activityDurations?: Record<string, string>;
  mentalScore?: number;
}

const DailyOverview = ({ activityDurations, mentalScore }: DailyOverviewProps) => {
  const [dailyScore, setDailyScore] = useState<number>(0); // Start with 0 instead of 70
  const [scoreBreakdown, setScoreBreakdown] = useState([
    { name: 'Walk', score: 0 },
    { name: 'Sleep', score: 0 },
    { name: 'Meditation', score: 0 },
    { name: 'Mental', score: 0 },
    { name: 'Nutrition', score: 0 }
  ]);
  const [savedToday, setSavedToday] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    // Check if we already saved today's score
    const lastSavedDate = localStorage.getItem('lastWellnessScoreSaveDate');
    const today = new Date().toISOString().split('T')[0];
    
    if (lastSavedDate === today) {
      setSavedToday(true);
    }
  }, []);

  useEffect(() => {
    if (activityDurations) {
      // Check if there's any activity data for today
      const walkDuration = parseFloat(activityDurations["Evening workout"] || "0");
      const sleepDuration = parseFloat(activityDurations["Sleep preparation"] || "0");
      const meditationDuration = parseFloat(activityDurations["Morning meditation"] || "0");
      
      const hasAnyData = walkDuration > 0 || sleepDuration > 0 || meditationDuration > 0;
      setHasData(hasAnyData);
      
      if (!hasAnyData) {
        // No data for today, set everything to zero
        setDailyScore(0);
        setScoreBreakdown([
          { name: 'Walk', score: 0 },
          { name: 'Sleep', score: 0 },
          { name: 'Meditation', score: 0 },
          { name: 'Mental', score: 0 },
          { name: 'Nutrition', score: 0 }
        ]);
        return;
      }
      
      // Calculate scores for each activity
      let walkScore = 0;
      let sleepScore = 0;
      let meditationScore = 0;
      let nutritionScore = 0;
      
      // Walk score calculation (60 minutes = full credit)
      walkScore = Math.min(1, walkDuration / 60);
      
      // Sleep score calculation (7 hours = full credit)
      sleepScore = Math.min(1, sleepDuration / 7);
      
      // Meditation score calculation (30 minutes = full credit)
      meditationScore = Math.min(1, meditationDuration / 30);
      
      // Mental score (from mental wellness analysis)
      const mentalScoreValue = mentalScore !== undefined ? mentalScore : 0;
      
      // Nutrition score - Using meditation as a proxy for now, 
      // in a real app this would be calculated differently
      nutritionScore = Math.min(1, meditationDuration / 30);
      
      // Calculate daily overall score (now includes nutrition)
      const totalScore = walkScore + sleepScore + meditationScore + mentalScoreValue + nutritionScore;
      const percentageScore = Math.round((totalScore / 5) * 100); // Divide by 5 since we have 5 metrics now
      
      setDailyScore(percentageScore);
      
      // Update score breakdown
      setScoreBreakdown([
        { name: 'Walk', score: walkScore },
        { name: 'Sleep', score: sleepScore },
        { name: 'Meditation', score: meditationScore },
        { name: 'Mental', score: mentalScoreValue },
        { name: 'Nutrition', score: nutritionScore }
      ]);

      // If we have activity data and haven't saved today's score yet, save it
      if (!savedToday && hasAnyData) {
        saveScoresToSupabase(percentageScore, walkScore, sleepScore, meditationScore, mentalScoreValue, nutritionScore);
      }
    }
  }, [activityDurations, mentalScore, savedToday]);

  const saveScoresToSupabase = async (
    overallScore: number, 
    physicalScore: number, 
    sleepScore: number, 
    meditationScore: number, 
    mentalScore: number,
    nutritionScore: number
  ) => {
    try {
      await saveWellnessScore({
        mental_score: Math.round(mentalScore * 100),
        physical_score: Math.round(physicalScore * 100),
        sleep_score: Math.round(sleepScore * 100),
        nutrition_score: Math.round(nutritionScore * 100) // Now properly saving nutrition score
      });
      
      // Mark as saved today
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('lastWellnessScoreSaveDate', today);
      setSavedToday(true);
      
      console.log('Wellness scores saved to Supabase');
    } catch (error) {
      console.error('Error saving wellness scores:', error);
    }
  };

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
      
      {!hasData ? (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <p>No activity data recorded for today.</p>
          <p className="text-sm mt-1">Complete your daily activities to see your progress.</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Circular Progress Chart */}
          <div className="flex items-center justify-center">
            <CircularProgressChart percentage={dailyScore} title="Wellness Score" size={180} />
          </div>
          
          {/* Bar Chart */}
          <div className="flex-grow h-64">
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
      )}
    </div>
  );
};

export default DailyOverview;
