
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface SearchSectionProps {
  selectedDiet: string;
  setSelectedDiet: (diet: string) => void;
  dietaryOptions: Array<{ id: string; name: string }>;
}

const SearchSection = ({ selectedDiet, setSelectedDiet, dietaryOptions }: SearchSectionProps) => {
  return (
    <section className="mb-12">
      <AnimatedSection>
        <h1 className="section-heading text-center">Nutrition & Recipes</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Discover delicious, nutritious recipes to fuel your body and support your wellness goals.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search recipes..." 
              className="pl-10 bg-card" 
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={300}>
        <div className="flex overflow-x-auto pb-2 mb-6 gap-2 no-scrollbar">
          {dietaryOptions.map((option) => (
            <Button
              key={option.id}
              variant={selectedDiet === option.id ? "default" : "outline"}
              className="rounded-full whitespace-nowrap"
              onClick={() => setSelectedDiet(option.id)}
            >
              {option.name}
            </Button>
          ))}
          <Button variant="outline" className="rounded-full">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default SearchSection;
