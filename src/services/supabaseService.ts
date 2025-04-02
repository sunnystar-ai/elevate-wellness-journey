
// Re-export all service functions
export { saveJournalEntry, getJournalEntries } from './journalService';
export { saveDailyActivity, getDailyActivities } from './activityService';
export { saveWellnessScore, getWellnessScores } from './wellnessScoreService';
export { generateAndSaveWellnessInsight, getLatestWellnessInsight } from './wellnessInsightService';

// Re-export types
export type { ActivityInput } from './activityService';
export type { WellnessScoreInput } from './wellnessScoreService';
