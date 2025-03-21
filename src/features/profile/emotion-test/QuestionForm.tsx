
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Question, FormValues } from './types';

interface QuestionFormProps {
  question: Question;
  onSubmit: (data: FormValues) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuestionForm = ({ question, onSubmit, currentQuestionIndex, totalQuestions }: QuestionFormProps) => {
  const form = useForm<FormValues>({
    defaultValues: {},
  });

  return (
    <>
      <div className="mb-4 text-sm text-muted-foreground">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      
      <Card className="p-4 mb-4">
        <p className="font-medium mb-4">{question.text}</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name={`question-${question.id}`}
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
              {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Complete Test"}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default QuestionForm;
