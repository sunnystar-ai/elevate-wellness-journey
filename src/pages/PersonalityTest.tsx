
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import StatusBar from '@/components/community/StatusBar';
import BottomNav from '@/components/my-journey/BottomNav';

// Import our refactored components
import TestHeader from '@/features/personality-test/TestHeader';
import ProgressIndicator from '@/features/personality-test/ProgressIndicator';
import QuestionCard from '@/features/personality-test/QuestionCard';
import ResultCard from '@/features/personality-test/ResultCard';
import { mbtiQuestions, mbtiDescriptions, FormValues } from '@/features/personality-test/mbti-data';

const PersonalityTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mbtiResult, setMbtiResult] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      energy: undefined,
      information: undefined,
      decisions: undefined,
      lifestyle: undefined,
    }
  });

  const onSubmit = (data: FormValues) => {
    if (currentQuestion < mbtiQuestions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      // Calculate MBTI type
      const result = `${data.energy}${data.information}${data.decisions}${data.lifestyle}`;
      setMbtiResult(result);
      
      // Store in local storage to use in profile page
      localStorage.setItem('mbtiType', result);
      localStorage.setItem('mbtiDescription', mbtiDescriptions[result]);
      
      // Return to profile with a small delay to show result
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prevQuestion => prevQuestion - 1);
    } else {
      navigate('/profile');
    }
  };

  // Get the current question data
  const currentQuestionData = mbtiQuestions[currentQuestion];
  
  return (
    <div className="bg-background min-h-screen pb-24">
      <StatusBar />
      
      <TestHeader goBack={goBack} />
      
      <div className="p-4">
        <ProgressIndicator 
          currentQuestion={currentQuestion} 
          totalQuestions={mbtiQuestions.length} 
        />
        
        {mbtiResult ? (
          <ResultCard mbtiResult={mbtiResult} />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <QuestionCard 
                control={form.control} 
                questionData={currentQuestionData} 
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={!form.getValues()[currentQuestionData.id as keyof FormValues]}
              >
                {currentQuestion < mbtiQuestions.length - 1 ? 'Next Question' : 'See Your Results'}
              </Button>
            </form>
          </Form>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default PersonalityTest;
