
import { NutritionContent } from '../types';

// Generate featured nutrition content with recipes
export const generateFeaturedNutrition = (): NutritionContent[] => {
  const recipes = [
    {
      id: 1,
      title: "Energizing Breakfast Bowl",
      prepTime: "15 min",
      tags: ["Vegan", "High Protein"],
      image: "https://images.unsplash.com/photo-1542691457-13c6422c63e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "1 cup rolled oats",
        "2 cups plant-based milk",
        "1 tbsp chia seeds",
        "1 tbsp maple syrup",
        "1/2 tsp cinnamon",
        "1 banana, sliced",
        "1/4 cup mixed berries",
        "2 tbsp almond butter",
        "1 tbsp hemp seeds"
      ],
      instructions: [
        "Combine oats, plant milk, chia seeds, maple syrup, and cinnamon in a saucepan. Bring to a simmer over medium heat.",
        "Cook for 5-7 minutes, stirring occasionally until creamy.",
        "Pour into a bowl and top with sliced banana, berries, a dollop of almond butter, and hemp seeds."
      ],
      servingSuggestions: [
        "Serve warm for a comforting breakfast or prepare overnight and enjoy cold.",
        "Add a sprinkle of granola for extra crunch.",
        "For extra protein, mix in a scoop of your favorite protein powder while cooking."
      ]
    },
    {
      id: 2,
      title: "Hydration Habit Guide",
      prepTime: "5 min prep",
      tags: ["Guide", "Hydration"],
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "1 large pitcher (64 oz)",
        "2 lemons, sliced",
        "1 cucumber, sliced",
        "10 mint leaves",
        "1/4 cup fresh berries (optional)",
        "Ice cubes"
      ],
      instructions: [
        "Fill the pitcher with filtered water.",
        "Add sliced lemons, cucumber, mint leaves, and berries.",
        "Refrigerate for at least 1 hour to infuse flavors.",
        "Aim to drink the entire pitcher throughout the day."
      ],
      servingSuggestions: [
        "Keep a reusable water bottle filled with this infused water for on-the-go hydration.",
        "Refill the pitcher once during the day, reusing the same ingredients.",
        "For variety, try different combinations like strawberry-basil or orange-rosemary."
      ]
    },
    {
      id: 3,
      title: "Quick Lunch Ideas",
      prepTime: "10 min",
      tags: ["Meal Prep", "Quick"],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "2 cups mixed greens",
        "1 cup cooked quinoa",
        "1/2 cup chickpeas, rinsed and drained",
        "1/4 avocado, sliced",
        "1/4 cup cherry tomatoes, halved",
        "1/4 cucumber, diced",
        "2 tbsp olive oil",
        "1 tbsp lemon juice",
        "1 tsp Dijon mustard",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Arrange mixed greens in a bowl or container.",
        "Top with quinoa, chickpeas, avocado, tomatoes, and cucumber.",
        "Whisk together olive oil, lemon juice, Dijon mustard, salt, and pepper.",
        "Drizzle dressing over salad just before eating."
      ],
      servingSuggestions: [
        "For meal prep, keep dressing separate until ready to eat.",
        "Add grilled chicken or tofu for extra protein.",
        "Pack in a mason jar with dressing at the bottom, hearty vegetables next, and greens on top for a portable lunch."
      ]
    },
    {
      id: 4,
      title: "Healthy Snack Options",
      prepTime: "5 min",
      tags: ["Snacks", "Low Sugar"],
      image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "1 apple, sliced",
        "2 tbsp almond butter",
        "1 tbsp hemp seeds",
        "1/2 tsp cinnamon",
        "1 tbsp honey (optional)"
      ],
      instructions: [
        "Arrange apple slices on a plate.",
        "Spread almond butter over each slice.",
        "Sprinkle with hemp seeds and cinnamon.",
        "Drizzle with honey if desired."
      ],
      servingSuggestions: [
        "Perfect for afternoon energy slumps or post-workout recovery.",
        "Substitute with pear or banana if preferred.",
        "Pack in a small container with a squeeze of lemon juice to prevent browning for an on-the-go snack."
      ]
    },
    {
      id: 5,
      title: "Dinner Veggie Stir-Fry",
      prepTime: "20 min",
      tags: ["Dinner", "Plant-Based"],
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "2 cups mixed vegetables (bell peppers, broccoli, carrots, snow peas)",
        "1 block extra-firm tofu, cubed",
        "2 tbsp olive oil",
        "2 cloves garlic, minced",
        "1 tbsp ginger, grated",
        "3 tbsp tamari or soy sauce",
        "1 tbsp maple syrup",
        "1 tsp sriracha (optional)",
        "1 cup cooked brown rice"
      ],
      instructions: [
        "Press tofu between paper towels to remove excess moisture, then cube.",
        "Heat 1 tbsp oil in a wok or large pan. Add tofu and cook until golden on all sides. Remove and set aside.",
        "Heat remaining oil and add garlic and ginger. Sauté for 30 seconds.",
        "Add vegetables and stir-fry for 3-4 minutes until crisp-tender.",
        "Return tofu to the pan. Mix tamari, maple syrup, and sriracha, then pour over the stir-fry.",
        "Toss to coat and cook for another minute."
      ],
      servingSuggestions: [
        "Serve over brown rice or cauliflower rice.",
        "Garnish with sliced green onions and sesame seeds.",
        "Store leftovers in an airtight container for up to 3 days for easy meal prep."
      ]
    }
  ];

  // Use the current date to determine which recipes to show
  const today = new Date();
  const offset = today.getDate() % recipes.length;
  
  // Create a rotating selection of recipes based on the day
  const result = [];
  for (let i = 0; i < 5; i++) {
    const index = (offset + i) % recipes.length;
    result.push(recipes[index]);
  }
  
  return result;
};
