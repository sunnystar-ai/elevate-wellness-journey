
import { RecipeCollection } from './types';

export const snackRecipes: RecipeCollection = [
  {
    id: 8,
    title: "Energy Bites",
    prepTime: "15 min",
    tags: ["No-Bake", "Energy Boost"],
    image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 cup rolled oats",
      "1/2 cup natural peanut butter",
      "1/3 cup honey or maple syrup",
      "1/4 cup ground flaxseed",
      "1/4 cup mini dark chocolate chips",
      "2 tbsp chia seeds",
      "1 tsp vanilla extract",
      "Pinch of salt"
    ],
    instructions: [
      "In a large bowl, mix all ingredients until well combined.",
      "Cover and refrigerate for 30 minutes to make the mixture easier to handle.",
      "Roll into 1-inch balls and place on a baking sheet lined with parchment paper.",
      "Store in an airtight container in the refrigerator for up to a week."
    ],
    servingSuggestions: [
      "Perfect for pre or post-workout energy boosts.",
      "Pack two with fruit for a balanced snack.",
      "Customize with dried cranberries, chopped nuts, or coconut flakes."
    ],
    mealType: "snack"
  },
  {
    id: 9,
    title: "Veggie Hummus Platter",
    prepTime: "20 min",
    tags: ["Plant-Based", "High Fiber"],
    image: "https://images.unsplash.com/photo-1541517079541-883eec228dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "2 cups homemade or store-bought hummus",
      "1 cucumber, sliced",
      "1 bell pepper, sliced",
      "2 carrots, cut into sticks",
      "1 cup cherry tomatoes",
      "1 cup broccoli florets",
      "1/4 cup kalamata olives",
      "2 tbsp olive oil for drizzling",
      "1 tsp za'atar seasoning (optional)",
      "Fresh parsley for garnish",
      "Whole grain pita bread or crackers"
    ],
    instructions: [
      "Spread hummus in a shallow serving bowl, creating a well in the center.",
      "Arrange vegetables and olives around the hummus.",
      "Drizzle olive oil over the hummus and sprinkle with za'atar if using.",
      "Garnish with fresh parsley.",
      "Serve with pita bread or crackers on the side."
    ],
    servingSuggestions: [
      "Perfect for entertaining or as a healthy snack option.",
      "Add falafel for a more substantial appetizer.",
      "For a portable version, pack hummus in small containers with veggie sticks for on-the-go snacking."
    ],
    mealType: "snack"
  }
];
