
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import StatusBar from '@/components/community/StatusBar';
import BottomNav from '@/components/my-journey/BottomNav';
import { ArrowLeft, Brain, User, PenTool, Compass } from 'lucide-react';

// Define the MBTI dichotomies and questions
const mbtiQuestions = [
  {
    id: 'energy',
    label: 'Energy Source',
    description: 'How you gain energy and interact with the world',
    options: [
      { value: 'I', label: 'I prefer quiet, reflective environments and need time alone to recharge.', icon: <User className="h-5 w-5 text-primary" /> },
      { value: 'E', label: 'I feel energized by social interaction and prefer being around people.', icon: <User className="h-5 w-5 text-primary" /> }
    ]
  },
  {
    id: 'information',
    label: 'Information Processing',
    description: 'How you perceive and gather information',
    options: [
      { value: 'S', label: 'I focus on concrete details and practical applications.', icon: <Compass className="h-5 w-5 text-primary" /> },
      { value: 'N', label: 'I focus on patterns, possibilities, and the bigger picture.', icon: <Compass className="h-5 w-5 text-primary" /> }
    ]
  },
  {
    id: 'decisions',
    label: 'Decision-Making',
    description: 'How you make decisions',
    options: [
      { value: 'T', label: 'I make decisions based on logic, analysis, and objective criteria.', icon: <Brain className="h-5 w-5 text-primary" /> },
      { value: 'F', label: 'I make decisions based on personal values and how they affect others.', icon: <Brain className="h-5 w-5 text-primary" /> }
    ]
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    description: 'How you organize your world',
    options: [
      { value: 'J', label: 'I prefer structure, planning, and resolving matters decisively.', icon: <PenTool className="h-5 w-5 text-primary" /> },
      { value: 'P', label: 'I prefer flexibility, spontaneity, and keeping options open.', icon: <PenTool className="h-5 w-5 text-primary" /> }
    ]
  }
];

// MBTI type descriptions
const mbtiDescriptions = {
  'ISTJ': 'Responsible, thorough, and dependable. You value tradition and organization.',
  'ISFJ': 'Warm, considerate, and dedicated to helping others. You are loyal and practical.',
  'INFJ': 'Idealistic, organized, and insightful. You seek meaning and connection in ideas and relationships.',
  'INTJ': 'Strategic, logical, and innovative. You have a clear vision of possibilities and how to achieve them.',
  'ISTP': 'Practical problem-solver with a focus on efficiency. You enjoy understanding how things work.',
  'ISFP': 'Gentle, sensitive, and in tune with your surroundings. You value personal connection and authenticity.',
  'INFP': 'Idealistic, empathetic, and driven by personal values. You seek to understand people and help them fulfill their potential.',
  'INTP': 'Logical, original thinker. You enjoy theoretical and abstract concepts and seek to understand the world.',
  'ESTP': 'Energetic, action-oriented problem-solver. You are adaptable and focus on immediate results.',
  'ESFP': 'Enthusiastic, friendly, and spontaneous. You enjoy bringing others together and creating enjoyable experiences.',
  'ENFP': 'Enthusiastic, creative, and sociable. You see possibilities in everything and value meaningful connections.',
  'ENTP': 'Quick, ingenious, and stimulating. You enjoy new challenges and creative problem-solving.',
  'ESTJ': 'Efficient, logical, and dedicated to tradition. You value clarity and structure in all aspects of life.',
  'ESFJ': 'Warm-hearted, conscientious, and cooperative. You value harmony and are attentive to others\' needs.',
  'ENFJ': 'Charismatic, empathetic leader. You inspire others and are driven to help them develop and improve.',
  'ENTJ': 'Strategic, logical, and efficient leader. You have a clear vision of possibilities and mobilize others toward goals.'
};

type FormValues = {
  energy: 'I' | 'E';
  information: 'S' | 'N';
  decisions: 'T' | 'F';
  lifestyle: 'J' | 'P';
};

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
      localStorage.setItem('mbtiDescription', mbtiDescriptions[result as keyof typeof mbtiDescriptions]);
      
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

  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;

  // Get the current question data
  const currentQuestionData = mbtiQuestions[currentQuestion];
  
  return (
    <div className="bg-background min-h-screen pb-24">
      <StatusBar />
      
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" onClick={goBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Personality Test</h1>
        <div className="w-8" /> {/* Empty div for spacing */}
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {mbtiQuestions.length}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {mbtiResult ? (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Your Result: {mbtiResult}</h2>
              <Badge className="mb-4 text-lg px-3 py-1">{mbtiResult}</Badge>
              <p className="text-muted-foreground mb-4">{mbtiDescriptions[mbtiResult as keyof typeof mbtiDescriptions]}</p>
              <Brain className="h-16 w-16 mx-auto text-primary mb-4" />
              <p>Redirecting to your profile...</p>
            </CardContent>
          </Card>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">{currentQuestionData.label}</h2>
                  <p className="text-muted-foreground mb-4">{currentQuestionData.description}</p>
                  
                  <FormField
                    control={form.control}
                    name={currentQuestionData.id as keyof FormValues}
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col gap-4"
                        >
                          {currentQuestionData.options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`${currentQuestionData.id}-${option.value}`} />
                              <Label htmlFor={`${currentQuestionData.id}-${option.value}`} className="cursor-pointer">
                                <div className="flex items-start gap-3">
                                  <div className="mt-1">{option.icon}</div>
                                  <div>{option.label}</div>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
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
