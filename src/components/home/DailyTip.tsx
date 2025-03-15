
import { Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

const tips = [
  "Take a moment to breathe deeply and center yourself when feeling overwhelmed.",
  "Stay hydrated! Aim for at least 8 glasses of water daily.",
  "Practice gratitude by noting three things you're thankful for each morning.",
  "Incorporate a 10-minute stretching routine into your morning to energize your body.",
  "Schedule short breaks during work to rest your eyes and mind.",
  "Try the 4-7-8 breathing technique to reduce stress: inhale for 4, hold for 7, exhale for 8.",
  "Add colorful vegetables to each meal for a boost of nutrients.",
  "Prioritize 7-9 hours of quality sleep for optimal mental and physical function.",
  "Take a short walk after meals to aid digestion and clear your mind.",
  "Set boundaries with technology by designating screen-free zones or times."
];

const DailyTip = () => {
  const [tip, setTip] = useState("");
  
  useEffect(() => {
    // Get today's date as string to use as seed
    const today = new Date().toDateString();
    
    // Simple hash function to get deterministic but changing index
    const hash = Array.from(today).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = hash % tips.length;
    
    setTip(tips[index]);
  }, []);
  
  return (
    <div className="glass-panel p-5 rounded-lg bg-background/80 border border-border flex items-start space-x-4">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-harmony-light-peach p-2 rounded-lg">
          <Lightbulb size={20} className="text-harmony-peach" />
        </div>
      </div>
      <div>
        <h3 className="font-medium text-lg mb-1">Daily Wellness Tip</h3>
        <p className="text-muted-foreground">{tip}</p>
      </div>
    </div>
  );
};

export default DailyTip;
