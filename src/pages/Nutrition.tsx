
import { useState, useEffect } from 'react';
import SearchSection from '@/components/nutrition/SearchSection';
import MealPlanSection from '@/components/nutrition/MealPlanSection';
import FeaturedRecipesSection from '@/components/nutrition/FeaturedRecipesSection';
import RecipesSection from '@/components/nutrition/RecipesSection';
import { Recipe, DayPlan } from '@/types/nutrition';

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

  const recipes: Recipe[] = [
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

  const mealPlan: DayPlan[] = [
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
      {/* Hero section with search */}
      <SearchSection 
        selectedDiet={selectedDiet} 
        setSelectedDiet={setSelectedDiet} 
        dietaryOptions={dietaryOptions} 
      />
      
      {/* Meal planning section */}
      <MealPlanSection mealPlan={mealPlan} />
      
      {/* Featured recipes */}
      <FeaturedRecipesSection featuredRecipes={featuredRecipes} />
      
      {/* All recipes */}
      <RecipesSection recipes={filteredRecipes} />
    </div>
  );
};

export default Nutrition;
