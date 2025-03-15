
import { useState, useEffect } from 'react';
import { Search, Filter, Clock, Utensils, BookmarkPlus, ChefHat, Leaf, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedSection from '@/components/ui/AnimatedSection';

const Nutrition = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState('all');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const dietaryOptions = [
    { id: 'all', name: 'All' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'gluten-free', name: 'Gluten-Free' },
    { id: 'paleo', name: 'Paleo' },
    { id: 'keto', name: 'Keto' }
  ];

  const recipes = [
    {
      id: 1,
      title: 'Balanced Breakfast Bowl',
      prepTime: '15 min',
      cookTime: '5 min',
      servings: 2,
      calories: 380,
      category: 'breakfast',
      dietaryTags: ['vegetarian', 'gluten-free'],
      image: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Mediterranean Quinoa Salad',
      prepTime: '20 min',
      cookTime: '15 min',
      servings: 4,
      calories: 320,
      category: 'lunch',
      dietaryTags: ['vegetarian', 'vegan', 'gluten-free'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Grilled Salmon with Avocado Salsa',
      prepTime: '15 min',
      cookTime: '20 min',
      servings: 2,
      calories: 450,
      category: 'dinner',
      dietaryTags: ['paleo', 'keto', 'gluten-free'],
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Green Smoothie Bowl',
      prepTime: '10 min',
      cookTime: '0 min',
      servings: 1,
      calories: 290,
      category: 'breakfast',
      dietaryTags: ['vegetarian', 'vegan', 'gluten-free'],
      image: 'https://images.unsplash.com/photo-1638362567846-de8780fc8b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      featured: true
    },
    {
      id: 5,
      title: 'Cauliflower Crust Pizza',
      prepTime: '25 min',
      cookTime: '20 min',
      servings: 4,
      calories: 320,
      category: 'dinner',
      dietaryTags: ['vegetarian', 'gluten-free', 'keto'],
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'Protein Energy Balls',
      prepTime: '15 min',
      cookTime: '0 min',
      servings: 12,
      calories: 120,
      category: 'snack',
      dietaryTags: ['vegetarian', 'vegan', 'gluten-free'],
      image: 'https://images.unsplash.com/photo-1604496470896-41d4c96674c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredRecipes = selectedDiet === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.dietaryTags.includes(selectedDiet));

  const featuredRecipes = recipes.filter(recipe => recipe.featured);

  const mealPlan = [
    {
      day: 'Monday',
      meals: [
        { type: 'Breakfast', name: 'Green Smoothie Bowl' },
        { type: 'Lunch', name: 'Mediterranean Quinoa Salad' },
        { type: 'Dinner', name: 'Grilled Salmon with Avocado Salsa' }
      ]
    },
    {
      day: 'Tuesday',
      meals: [
        { type: 'Breakfast', name: 'Balanced Breakfast Bowl' },
        { type: 'Lunch', name: 'Lentil Soup & Whole Grain Bread' },
        { type: 'Dinner', name: 'Cauliflower Crust Pizza' }
      ]
    }
  ];

  return (
    <div className={`page-container page-transition ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero section */}
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

      {/* Meal planning section */}
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

      {/* Featured recipes */}
      {featuredRecipes.length > 0 && (
        <section className="mb-16">
          <AnimatedSection>
            <h2 className="subsection-heading">Featured Recipes</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredRecipes.map((recipe, index) => (
              <AnimatedSection 
                key={recipe.id} 
                animation="scale-in" 
                delay={index * 100}
                className="group"
              >
                <div className="harmony-card overflow-hidden h-full flex flex-col md:flex-row">
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-harmony-mint/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded">
                        {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {recipe.dietaryTags.map(tag => (
                        <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded bg-harmony-light-sand">
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                      {recipe.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      A nutritious and delicious recipe packed with essential nutrients to fuel your day.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Prep Time</span>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1 text-harmony-blue" /> 
                          <span className="font-medium">{recipe.prepTime}</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Cook Time</span>
                        <div className="flex items-center mt-1">
                          <ChefHat className="h-4 w-4 mr-1 text-harmony-peach" /> 
                          <span className="font-medium">{recipe.cookTime}</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Servings</span>
                        <div className="flex items-center mt-1">
                          <Utensils className="h-4 w-4 mr-1 text-harmony-mint" /> 
                          <span className="font-medium">{recipe.servings}</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Calories</span>
                        <div className="flex items-center mt-1">
                          <Info className="h-4 w-4 mr-1 text-harmony-lavender" /> 
                          <span className="font-medium">{recipe.calories} kcal</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button>View Recipe</Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      {/* All recipes */}
      <section>
        <AnimatedSection>
          <h2 className="subsection-heading">Browse All Recipes</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <AnimatedSection 
              key={recipe.id} 
              animation="scale-in" 
              delay={index * 100}
              className="group"
            >
              <div className="harmony-card h-full overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-harmony-mint/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded">
                      {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center text-white space-x-3">
                    <div className="flex items-center text-sm">
                      <Clock className="h-3 w-3 mr-1" /> 
                      <span>{recipe.prepTime} prep</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Info className="h-3 w-3 mr-1" /> 
                      <span>{recipe.calories} kcal</span>
                    </div>
                  </div>
                  <Button 
                    size="icon" 
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8"
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-lg mb-3 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.dietaryTags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded bg-harmony-light-sand">
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <Utensils className="h-4 w-4 mr-1 text-harmony-mint" /> 
                      <span>{recipe.servings} servings</span>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/90">
                      <Leaf className="h-4 w-4 mr-1" /> View
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Nutrition;
