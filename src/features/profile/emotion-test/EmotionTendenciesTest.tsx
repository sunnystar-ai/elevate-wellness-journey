
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { EmotionTendenciesTestProps, FormValues } from './types';
import QuestionForm from './QuestionForm';
import { questions } from './questions';
import { calculateResults } from './calculate-results';

const EmotionTendenciesTest = ({ open, onOpenChange, onTestComplete }: EmotionTendenciesTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleNext = (data: FormValues) => {
    const questionId = questions[currentQuestion].id;
    const value = parseInt(data[`question-${questionId}`]);
    
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
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
    
    // Notify user
    toast({
      title: "Test Completed",
      description: "Your emotion tendencies results have been updated."
    });
    
    // Pass results to parent component
    onTestComplete(results);
    
    // Close the dialog
    onOpenChange(false);
    
    // Reset the test for next time
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers({});
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Reset the test when closing without completing
      if (!newOpen) {
        setTimeout(() => {
          setCurrentQuestion(0);
          setAnswers({});
        }, 500);
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Emotion Tendencies Test</DialogTitle>
          <DialogDescription>
            Answer honestly to get the most accurate results about your emotional tendencies.
          </DialogDescription>
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
