
export interface EmotionData {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface TraitDescription {
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export type TraitKey = keyof EmotionData;
