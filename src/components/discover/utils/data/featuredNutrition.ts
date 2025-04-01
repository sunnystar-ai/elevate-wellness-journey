
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
      title: "Mediterranean Quinoa Salad",
      prepTime: "20 min",
      tags: ["Vegetarian", "High Fiber"],
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "1 cup cooked quinoa",
        "1 cucumber, diced",
        "1 cup cherry tomatoes, halved",
        "1/2 red onion, finely chopped",
        "1/2 cup kalamata olives, pitted and sliced",
        "1/2 cup feta cheese, crumbled",
        "1/4 cup fresh parsley, chopped",
        "3 tbsp olive oil",
        "2 tbsp lemon juice",
        "1 clove garlic, minced",
        "1 tsp dried oregano",
        "Salt and pepper to taste"
      ],
      instructions: [
        "In a large bowl, combine cooked quinoa, cucumber, tomatoes, red onion, olives, feta cheese, and parsley.",
        "In a small bowl, whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper.",
        "Pour the dressing over the salad and toss gently to combine.",
        "Refrigerate for at least 30 minutes before serving to allow flavors to meld."
      ],
      servingSuggestions: [
        "Serve chilled as a light lunch or side dish.",
        "Add grilled chicken or salmon for a complete protein-rich meal.",
        "Pack in mason jars for an easy grab-and-go lunch option."
      ]
    },
    {
      id: 3,
      title: "Sweet Potato & Black Bean Burrito Bowl",
      prepTime: "30 min",
      tags: ["Vegan", "Gluten-Free"],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "2 medium sweet potatoes, cubed",
        "1 tbsp olive oil",
        "1 tsp cumin",
        "1 tsp smoked paprika",
        "1/2 tsp chili powder",
        "1 can (15 oz) black beans, rinsed and drained",
        "1 cup cooked brown rice",
        "1 avocado, sliced",
        "1/2 cup corn kernels",
        "1/4 cup red onion, diced",
        "1/4 cup cilantro, chopped",
        "Lime wedges for serving"
      ],
      instructions: [
        "Preheat oven to 425°F (220°C). Toss sweet potatoes with olive oil, cumin, smoked paprika, and chili powder.",
        "Spread on a baking sheet and roast for 20-25 minutes until tender and caramelized.",
        "In a small saucepan, heat black beans with a pinch of cumin and salt.",
        "Assemble bowls with brown rice, roasted sweet potatoes, black beans, avocado slices, corn, red onion, and cilantro.",
        "Squeeze fresh lime juice over the top before serving."
      ],
      servingSuggestions: [
        "Add a dollop of Greek yogurt or cashew cream for extra creaminess.",
        "Drizzle with hot sauce for added kick.",
        "For meal prep, store components separately and assemble when ready to eat."
      ]
    },
    {
      id: 4,
      title: "Lemon Herb Baked Salmon",
      prepTime: "25 min",
      tags: ["High Protein", "Omega-3"],
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "4 salmon fillets (6 oz each)",
        "2 tbsp olive oil",
        "2 cloves garlic, minced",
        "1 lemon, thinly sliced + 2 tbsp juice",
        "2 tbsp fresh dill, chopped",
        "1 tbsp fresh parsley, chopped",
        "1 tbsp fresh thyme leaves",
        "Salt and pepper to taste",
        "1 lb asparagus, trimmed"
      ],
      instructions: [
        "Preheat oven to 375°F (190°C). Line a baking sheet with parchment paper.",
        "In a small bowl, mix olive oil, garlic, lemon juice, and herbs.",
        "Place salmon fillets on the prepared baking sheet and season with salt and pepper.",
        "Brush the herb mixture over the salmon and top with lemon slices.",
        "Arrange asparagus around the salmon and drizzle with remaining olive oil.",
        "Bake for 15-18 minutes until salmon flakes easily with a fork."
      ],
      servingSuggestions: [
        "Serve with quinoa or brown rice for a complete meal.",
        "Garnish with additional fresh herbs and lemon wedges.",
        "For a lighter option, serve with a side salad dressed with lemon vinaigrette."
      ]
    },
    {
      id: 5,
      title: "Creamy Coconut Curry Lentil Soup",
      prepTime: "40 min",
      tags: ["Vegan", "One Pot"],
      image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "1 tbsp coconut oil",
        "1 onion, diced",
        "2 carrots, diced",
        "2 celery stalks, diced",
        "3 cloves garlic, minced",
        "1 tbsp fresh ginger, grated",
        "2 tbsp curry powder",
        "1 tsp ground turmeric",
        "1 cup red lentils, rinsed",
        "4 cups vegetable broth",
        "1 can (14 oz) coconut milk",
        "1 can (14 oz) diced tomatoes",
        "2 cups spinach, chopped",
        "Salt and pepper to taste",
        "Fresh cilantro and lime wedges for serving"
      ],
      instructions: [
        "Heat coconut oil in a large pot over medium heat. Add onion, carrots, and celery, and sauté for 5 minutes.",
        "Add garlic, ginger, curry powder, and turmeric. Cook for 1 minute until fragrant.",
        "Stir in lentils, vegetable broth, coconut milk, and tomatoes. Bring to a boil, then reduce heat and simmer for 25 minutes until lentils are tender.",
        "Add spinach and cook for another 2-3 minutes until wilted.",
        "Season with salt and pepper to taste."
      ],
      servingSuggestions: [
        "Serve hot, garnished with fresh cilantro and a squeeze of lime juice.",
        "Pair with naan bread or brown rice for a heartier meal.",
        "Store leftovers in refrigerator for up to 3 days or freeze for up to 3 months."
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
