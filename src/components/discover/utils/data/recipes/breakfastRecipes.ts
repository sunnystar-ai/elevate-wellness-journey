
import { RecipeCollection } from './types';

export const breakfastRecipes: RecipeCollection = [
  {
    id: 5,
    title: "Quinoa Power Bowl with Avocado Dressing",
    prepTime: "25 min",
    tags: ["Vegetarian", "High Protein"],
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 cup quinoa, rinsed",
      "2 cups water or vegetable broth",
      "1 can (15 oz) black beans, drained and rinsed",
      "1 cup cherry tomatoes, halved",
      "1 yellow bell pepper, diced",
      "1 cup cucumber, diced",
      "1/4 cup red onion, finely chopped",
      "1/4 cup fresh cilantro, chopped",
      "1 avocado, divided (half for dressing, half for topping)",
      "2 tbsp lime juice",
      "1 clove garlic, minced",
      "2 tbsp olive oil",
      "1/4 cup plain Greek yogurt (optional)",
      "Salt and pepper to taste",
      "1/4 cup pumpkin seeds or sunflower seeds"
    ],
    instructions: [
      "Combine quinoa and water or broth in a saucepan. Bring to a boil, then reduce heat and simmer covered for 15 minutes until liquid is absorbed.",
      "While quinoa cooks, prepare the vegetables and beans in a large bowl.",
      "For the dressing, blend half an avocado, lime juice, garlic, olive oil, Greek yogurt (if using), salt, and pepper until smooth.",
      "Fluff the cooked quinoa with a fork and let cool slightly.",
      "Add quinoa to the bowl with vegetables and beans, toss gently to combine.",
      "Drizzle with avocado dressing and top with diced avocado, seeds, and additional cilantro."
    ],
    servingSuggestions: [
      "Serve warm or cold – perfect for meal prep and leftovers.",
      "Add grilled chicken or tofu for additional protein.",
      "For a spicy kick, add jalapeño to the dressing or top with hot sauce.",
      "Pack in mason jars for convenient lunches on the go."
    ],
    mealType: "breakfast"
  },
  {
    id: 7,
    title: "Berry Greek Yogurt Parfait",
    prepTime: "10 min",
    tags: ["High Protein", "Antioxidants"],
    image: "https://images.unsplash.com/photo-1542691457-cbe9756511df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "2 cups Greek yogurt",
      "1 cup mixed berries (strawberries, blueberries, raspberries)",
      "1/4 cup granola",
      "2 tbsp honey or maple syrup",
      "1 tbsp chia seeds",
      "Fresh mint leaves for garnish"
    ],
    instructions: [
      "In two serving glasses or bowls, layer Greek yogurt, berries, and granola.",
      "Repeat layers until all ingredients are used, finishing with berries on top.",
      "Drizzle with honey or maple syrup.",
      "Sprinkle with chia seeds and garnish with mint leaves.",
      "Serve immediately or refrigerate for up to 2 hours."
    ],
    servingSuggestions: [
      "Add a dollop of nut butter for extra protein and healthy fats.",
      "Substitute granola with toasted nuts and seeds for a lower-carb option.",
      "Use coconut yogurt for a dairy-free alternative."
    ],
    mealType: "breakfast"
  }
];
