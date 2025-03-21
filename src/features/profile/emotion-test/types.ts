
export interface Question {
  id: number;
  text: string;
  trait: string;
  reverse: boolean;
}

export interface EmotionTendenciesTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTestComplete: (results: Record<string, number>) => void;
}

export interface FormValues {
  [key: string]: string;
}
