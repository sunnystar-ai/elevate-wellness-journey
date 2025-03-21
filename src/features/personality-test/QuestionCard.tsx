
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Control } from 'react-hook-form';
import { FormValues } from './mbti-data';

interface QuestionCardProps {
  control: Control<FormValues>;
  questionData: {
    id: string;
    label: string;
    description: string;
    options: {
      value: string;
      label: string;
      icon: React.ReactNode;
    }[];
  };
}

const QuestionCard = ({ control, questionData }: QuestionCardProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-2">{questionData.label}</h2>
        <p className="text-muted-foreground mb-4">{questionData.description}</p>
        
        <FormField
          control={control}
          name={questionData.id as keyof FormValues}
          render={({ field }) => (
            <FormItem className="space-y-4">
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col gap-4"
              >
                {questionData.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`${questionData.id}-${option.value}`} />
                    <Label htmlFor={`${questionData.id}-${option.value}`} className="cursor-pointer">
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
  );
};

export default QuestionCard;
