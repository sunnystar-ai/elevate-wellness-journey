
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

// Define the questions
const questions = [
  {
    id: 1,
    text: "I stay optimistic even in tough situations.",
    trait: "extraversion",
    reverse: false,
  },
  {
    id: 2,
    text: "I get irritated easily.",
    trait: "neuroticism",
    reverse: false,
  },
  {
    id: 3,
    text: "I trust people until they give me a reason not to.",
    trait: "agreeableness",
    reverse: false,
  },
  {
    id: 4,
    text: "I enjoy trying new foods or activities.",
    trait: "openness",
    reverse: false,
  },
  {
    id: 5,
    text: "I often forget to return borrowed items.",
    trait: "conscientiousness",
    reverse: true,
  },
  {
    id: 6,
    text: "I feel others' emotions deeply.",
    trait: "agreeableness",
    reverse: false,
  },
  {
    id: 7,
    text: "I prefer routine over spontaneity.",
    trait: "openness",
    reverse: true,
  },
  {
    id: 8,
    text: "I panic under pressure.",
    trait: "neuroticism",
    reverse: false,
  },
  {
    id: 9,
    text: "I make friends quickly.",
    trait: "extraversion",
    reverse: false,
  },
  {
    id: 10,
    text: "I plan tasks carefully.",
    trait: "conscientiousness",
    reverse: false,
  },
];

interface FormValues {
  [key: string]: string;
}

interface EmotionTendenciesTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTestComplete: (results: Record<string, number>) => void;
}

const EmotionTendenciesTest = ({ open, onOpenChange, onTestComplete }: EmotionTendenciesTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const form = useForm<FormValues>({
    defaultValues: {},
  });

  const handleNext = (data: FormValues) => {
    const value = parseInt(data[`question-${questions[currentQuestion].id}`]);
    
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      // Move to next question
      setCurrentQuestion(prev => prev + 1);
      form.reset({});
    } else {
      // Calculate results
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Initialize trait scores
    const traitScores = {
      extraversion: 0,
      neuroticism: 0,
      agreeableness: 0,
      openness: 0,
      conscientiousness: 0
    };
    
    // Count questions per trait for averaging
    const traitCounts = {
      extraversion: 0,
      neuroticism: 0,
      agreeableness: 0,
      openness: 0,
      conscientiousness: 0
    };

    // Calculate scores
    questions.forEach(question => {
      const answer = answers[question.id];
      const score = question.reverse ? 6 - answer : answer; // Reverse scoring if needed
      
      traitScores[question.trait as keyof typeof traitScores] += score;
      traitCounts[question.trait as keyof typeof traitCounts]++;
    });

    // Calculate averages and convert to percentages (1-5 scale to 0-100%)
    const results = {
      happiness: Math.round((traitScores.extraversion / (traitCounts.extraversion * 5)) * 100),
      empathy: Math.round((traitScores.agreeableness / (traitCounts.agreeableness * 5)) * 100),
      optimism: Math.round((traitScores.openness / (traitCounts.openness * 5)) * 100),
      calmness: Math.round((100 - (traitScores.neuroticism / (traitCounts.neuroticism * 5)) * 100)),
      stress: Math.round((traitScores.neuroticism / (traitCounts.neuroticism * 5)) * 100),
      resilience: Math.round((traitScores.conscientiousness / (traitCounts.conscientiousness * 5)) * 100)
    };

    // Save results
    localStorage.setItem('emotionTendencies', JSON.stringify(results));
    
    // Notify user
    toast({
      title: "Test Completed",
      description: "Your emotion tendencies results have been updated."
    });
    
    // Close the dialog and pass results to parent
    onTestComplete(results);
    onOpenChange(false);
    
    // Reset the test
    setCurrentQuestion(0);
    setAnswers({});
  };

  const getCurrentQuestion = () => questions[currentQuestion];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Emotion Tendencies Test</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4 text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          
          <Card className="p-4 mb-4">
            <p className="font-medium mb-4">{getCurrentQuestion().text}</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleNext)} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`question-${getCurrentQuestion().id}`}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="font-normal">Strongly Disagree</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2" />
                            </FormControl>
                            <FormLabel className="font-normal">Disagree</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="3" />
                            </FormControl>
                            <FormLabel className="font-normal">Neutral</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="4" />
                            </FormControl>
                            <FormLabel className="font-normal">Agree</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="5" />
                            </FormControl>
                            <FormLabel className="font-normal">Strongly Agree</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Test"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmotionTendenciesTest;
