
import { JournalEntry, SentimentData } from '../types';
import { generateSentimentScores } from './sentimentAnalysis';

// Generate data for the time frames (day, week, month)
export function generateTimeFrameData(entry: JournalEntry, journalEntries: JournalEntry[] = []) {
  const { sentimentScore, gratitudeRatio } = generateSentimentScores(entry);
  
  // Calculate consistency based on actual journal entries
  const totalDays = 7; // Assuming we're tracking weekly consistency
  const consistencyScore = journalEntries.length > 0 ? Math.min(1.0, journalEntries.length / totalDays) : 0.14;
  
  // Generate sentiment data for day view
  const daySentiment: SentimentData[] = [{
    date: 'Today',
    sentimentScore: sentimentScore,
    gratitudeRatio: gratitudeRatio,
    consistencyScore: consistencyScore,
    overallScore: (sentimentScore + gratitudeRatio + consistencyScore) / 3
  }];
  
  // Generate week view
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday
  
  const weekSentiment: SentimentData[] = Array(7).fill(0).map((_, i) => {
    if (i === todayIndex) {
      return {
        date: dayNames[i],
        sentimentScore: sentimentScore,
        gratitudeRatio: gratitudeRatio,
        consistencyScore: 1.0, // Today's entry exists
        overallScore: (sentimentScore + gratitudeRatio + 1.0) / 3
      };
    } else {
      // For other days, check if we have entries in our journalEntries array
      // This is a simplification - in a real app, you'd match dates properly
      const hasEntryForThisDay = journalEntries.length > (6 - i);
      return {
        date: dayNames[i],
        sentimentScore: hasEntryForThisDay ? 0.6 + Math.random() * 0.2 : 0,
        gratitudeRatio: hasEntryForThisDay ? 0.5 + Math.random() * 0.3 : 0,
        consistencyScore: hasEntryForThisDay ? 1 : 0,
        overallScore: hasEntryForThisDay ? (0.6 + Math.random() * 0.2 + 0.5 + Math.random() * 0.3 + 1) / 3 : 0
      };
    }
  });
  
  // Generate month view
  const monthSentiment: SentimentData[] = Array(4).fill(0).map((_, i) => {
    const isCurrentWeek = i === 3;
    
    // For current week, use actual data; for past weeks, simulate some data if we have entries
    const hasEntriesForThisWeek = journalEntries.length > (3 - i) * 2;
    
    return {
      date: `Week ${i+1}`,
      sentimentScore: isCurrentWeek ? sentimentScore : (hasEntriesForThisWeek ? 0.5 + Math.random() * 0.3 : 0),
      gratitudeRatio: isCurrentWeek ? gratitudeRatio : (hasEntriesForThisWeek ? 0.4 + Math.random() * 0.4 : 0),
      consistencyScore: isCurrentWeek ? consistencyScore : (hasEntriesForThisWeek ? 0.3 + Math.random() * 0.6 : 0),
      overallScore: isCurrentWeek ? (sentimentScore + gratitudeRatio + consistencyScore) / 3 : 
        (hasEntriesForThisWeek ? (0.5 + Math.random() * 0.3 + 0.4 + Math.random() * 0.4 + 0.3 + Math.random() * 0.6) / 3 : 0)
    };
  });

  return {
    day: daySentiment,
    week: weekSentiment,
    month: monthSentiment
  };
}
