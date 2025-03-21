
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { EmotionTendenciesTestProps, FormValues } from './types';
import QuestionForm from './QuestionForm';
import { questions } from './questions';
import { calculateResults } from './calculate-results';

const EmotionTendenciesTest = ({ open, onOpenChange, onTestComplete }: EmotionTendenciesTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

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
    } else {
      // Calculate results
      completeTest();
    }
  };

  const completeTest = () => {
    // Calculate results
    const results = calculateResults(questions, answers);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Emotion Tendencies Test</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <QuestionForm 
            question={questions[currentQuestion]}
            onSubmit={handleNext}
            currentQuestionIndex={currentQuestion}
            totalQuestions={questions.length}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmotionTendenciesTest;
