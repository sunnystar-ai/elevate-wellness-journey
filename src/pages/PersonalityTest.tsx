
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import StatusBar from '@/components/community/StatusBar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { toast } from '@/hooks/use-toast';

// Import our refactored components
import TestHeader from '@/features/personality-test/TestHeader';
import ProgressIndicator from '@/features/personality-test/ProgressIndicator';
import QuestionCard from '@/features/personality-test/QuestionCard';
import ResultCard from '@/features/personality-test/ResultCard';
import { mbtiQuestions, mbtiDescriptions, FormValues } from '@/features/personality-test/mbti-data';
import { saveMbtiResults } from '@/services/personalityService';

const PersonalityTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mbtiResult, setMbtiResult] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      energy: undefined,
      information: undefined,
      decisions: undefined,
      lifestyle: undefined,
    }
  });

  const onSubmit = async (data: FormValues) => {
    if (currentQuestion < mbtiQuestions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      // Calculate MBTI type
      const result = `${data.energy}${data.information}${data.decisions}${data.lifestyle}`;
      setMbtiResult(result);
      
      // Save to Supabase
      setIsSaving(true);
      try {
        await saveMbtiResults(result);
        
        // Store in local storage to use in profile page as backup
        localStorage.setItem('mbtiType', result);
        localStorage.setItem('mbtiDescription', mbtiDescriptions[result]);
        
        // Show success toast
        toast({
          title: "MBTI Results Saved",
          description: "Your personality type has been saved to your profile."
        });
      } catch (error) {
        console.error("Error saving MBTI results:", error);
        
        toast({
          title: "Failed to Save to Database",
          description: "Your results are saved locally but couldn't be stored in your profile.",
          variant: "destructive"
        });
      } finally {
        setIsSaving(false);
      }
      
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
          <>
            <ResultCard mbtiResult={mbtiResult} />
            {isSaving && <p className="text-center text-sm text-muted-foreground">Saving your results...</p>}
          </>
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
      
      <BottomNavigation />
    </div>
  );
};

export default PersonalityTest;
