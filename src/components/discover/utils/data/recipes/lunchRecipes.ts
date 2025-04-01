
import { RecipeCollection } from './types';

export const lunchRecipes: RecipeCollection = [
  {
    id: 2,
    title: "Rainbow Vegetable Stir-Fry",
    prepTime: "20 min",
    tags: ["Vegan", "Gluten-Free"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "2 tbsp sesame oil",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "1 cup broccoli florets",
      "1 cup snap peas",
      "1 carrot, julienned",
      "1 cup mushrooms, sliced",
      "2 cloves garlic, minced",
      "1 tbsp fresh ginger, grated",
      "3 tbsp low-sodium soy sauce or tamari",
      "1 tbsp maple syrup or honey",
      "1 tsp cornstarch mixed with 2 tbsp water",
      "1/4 cup green onions, chopped",
      "1 tbsp sesame seeds"
    ],
    instructions: [
      "Heat sesame oil in a large wok or skillet over high heat.",
      "Add garlic and ginger, stir-fry for 30 seconds until fragrant.",
      "Add vegetables in order of cooking time: carrots first, followed by bell peppers, broccoli, and mushrooms.",
      "Stir-fry for 5-7 minutes until vegetables are crisp-tender.",
      "In a small bowl, whisk together soy sauce, maple syrup, and cornstarch mixture.",
      "Pour sauce over vegetables and cook for 1-2 minutes until sauce thickens.",
      "Toss in snap peas and cook for 1 minute more.",
      "Garnish with green onions and sesame seeds before serving."
    ],
    servingSuggestions: [
      "Serve over brown rice or quinoa for a complete meal.",
      "Add tofu, tempeh, or edamame for extra protein.",
      "Wrap in lettuce leaves for a low-carb option.",
      "Store leftovers in an airtight container for up to 3 days."
    ],
    mealType: "lunch"
  },
  {
    id: 4,
    title: "Hearty Lentil and Vegetable Soup",
    prepTime: "45 min",
    tags: ["Vegan", "High Fiber"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "2 tbsp olive oil",
      "1 large onion, diced",
      "2 carrots, diced",
      "2 celery stalks, diced",
      "3 cloves garlic, minced",
      "1 tbsp tomato paste",
      "1 cup green or brown lentils, rinsed",
      "1 can (14 oz) diced tomatoes",
      "6 cups vegetable broth",
      "1 bay leaf",
      "1 tsp ground cumin",
      "1 tsp smoked paprika",
      "1/2 tsp dried thyme",
      "2 cups chopped kale or spinach",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat. Add onion, carrots, and celery, sauté for 5 minutes.",
      "Add garlic and tomato paste, cook for 1 minute until fragrant.",
      "Stir in lentils, diced tomatoes, vegetable broth, bay leaf, cumin, paprika, and thyme.",
      "Bring to a boil, then reduce heat and simmer covered for 25-30 minutes until lentils are tender.",
      "Add kale or spinach and cook for another 5 minutes until greens are wilted.",
      "Stir in lemon juice and season with salt and pepper to taste.",
      "Remove bay leaf before serving and garnish with fresh parsley."
    ],
    servingSuggestions: [
      "Serve with a slice of crusty whole grain bread for dipping.",
      "Top with a dollop of plain yogurt or a sprinkle of nutritional yeast for extra flavor.",
      "Prepare in large batches and freeze in individual portions for quick meals.",
      "For a heartier version, add diced sweet potatoes or butternut squash."
    ],
    mealType: "lunch"
  }
];
