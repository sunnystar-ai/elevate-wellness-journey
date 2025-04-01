
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface Meal {
  type: string;
  name: string;
}

interface DayPlan {
  day: string;
  meals: Meal[];
}

interface MealPlanSectionProps {
  mealPlan: DayPlan[];
}

const MealPlanSection = ({ mealPlan }: MealPlanSectionProps) => {
  return (
    <section className="mb-16">
      <AnimatedSection>
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="subsection-heading">Your Meal Plan</h2>
          <Button variant="outline" size="sm">View Full Plan</Button>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealPlan.map((day, index) => (
            <div 
              key={day.day} 
              className="harmony-card overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-harmony-light-mint p-4 border-b border-border">
                <h3 className="font-medium">{day.day}</h3>
              </div>
              <div className="p-4">
                {day.meals.map((meal, mealIndex) => (
                  <div key={meal.type} className="mb-3 last:mb-0">
                    <span className="text-xs font-medium text-muted-foreground block mb-1">{meal.type}</span>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{meal.name}</span>
                      <Button variant="ghost" size="sm" className="h-7 px-2">View</Button>
                    </div>
                    {mealIndex < day.meals.length - 1 && <div className="my-3 border-t border-border/50"></div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default MealPlanSection;
