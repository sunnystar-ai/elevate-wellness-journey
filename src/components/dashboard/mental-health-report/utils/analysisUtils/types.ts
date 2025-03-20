
export interface SentimentResult {
  positive: string[];
  negative: string[];
  sentiment: 'positive' | 'negative';
  positiveRatio: number;
}
