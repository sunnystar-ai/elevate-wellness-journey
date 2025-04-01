
import { NutritionContent } from '../types';

// Generate featured nutrition content with meal recipes
export const generateFeaturedNutrition = (): NutritionContent[] => {
  const recipes = [
    {
      id: 1,
      title: "Spinach and Feta Stuffed Chicken Breast",
      prepTime: "25 min",
      tags: ["High Protein", "Low Carb"],
      image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "4 boneless, skinless chicken breasts",
        "2 cups fresh spinach, chopped",
        "1/2 cup feta cheese, crumbled",
        "2 cloves garlic, minced",
        "1 tbsp olive oil",
        "1 tsp dried oregano",
        "Salt and pepper to taste",
        "1 tbsp lemon juice",
        "2 tbsp fresh parsley, chopped"
      ],
      instructions: [
        "Preheat oven to 375°F (190°C).",
        "Cut a pocket into each chicken breast horizontally, being careful not to cut all the way through.",
        "In a bowl, mix spinach, feta cheese, garlic, oregano, and a pinch of salt and pepper.",
        "Stuff each chicken breast with the spinach mixture and secure with toothpicks if needed.",
        "Heat olive oil in an oven-safe skillet over medium-high heat.",
        "Sear chicken breasts for 3-4 minutes per side until golden.",
        "Transfer skillet to oven and bake for 15-20 minutes until chicken is cooked through.",
        "Drizzle with lemon juice and garnish with fresh parsley before serving."
      ],
      servingSuggestions: [
        "Serve with roasted vegetables or a side salad for a complete meal.",
        "Pair with quinoa or brown rice for additional fiber and nutrients.",
        "For a lighter option, serve with steamed asparagus and cherry tomatoes."
      ]
    },
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
      ]
    },
    {
      id: 3,
      title: "Mediterranean Baked Salmon",
      prepTime: "30 min",
      tags: ["Omega-3", "Paleo"],
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "4 salmon fillets (6 oz each)",
        "2 tbsp olive oil",
        "2 lemons (1 sliced, 1 for juice)",
        "3 cloves garlic, minced",
        "1 tbsp fresh dill, chopped",
        "1 tbsp fresh oregano, chopped",
        "1 cup cherry tomatoes, halved",
        "1/2 cup kalamata olives, pitted",
        "1/4 cup red onion, thinly sliced",
        "1/4 cup feta cheese, crumbled",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.",
        "Place salmon fillets on the prepared baking sheet and drizzle with olive oil.",
        "Season salmon with salt, pepper, and garlic. Top with lemon slices.",
        "In a bowl, combine tomatoes, olives, red onion, dill, and oregano.",
        "Arrange vegetable mixture around the salmon fillets.",
        "Bake for 15-18 minutes until salmon flakes easily with a fork.",
        "Squeeze fresh lemon juice over the salmon and sprinkle with feta cheese before serving."
      ],
      servingSuggestions: [
        "Serve with a side of roasted new potatoes or steamed green beans.",
        "Pair with a Greek salad for a complete Mediterranean meal.",
        "For a grain option, serve with couscous or orzo pasta tossed with olive oil and herbs."
      ]
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
      ]
    },
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
      ]
    },
    {
      id: 6,
      title: "One-Pan Herb Roasted Chicken and Vegetables",
      prepTime: "1 hour",
      tags: ["Paleo", "One-Pan Meal"],
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "4 chicken thighs, bone-in and skin-on",
        "1 lb baby potatoes, halved",
        "2 carrots, cut into chunks",
        "1 red onion, cut into wedges",
        "1 zucchini, cut into thick slices",
        "2 tbsp olive oil",
        "2 tbsp fresh rosemary, chopped",
        "2 tbsp fresh thyme, chopped",
        "3 cloves garlic, minced",
        "1 lemon, zested and juiced",
        "1 tsp paprika",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Preheat oven to 425°F (220°C).",
        "In a small bowl, mix olive oil, herbs, garlic, lemon zest, paprika, salt, and pepper.",
        "Place chicken and vegetables on a large baking sheet.",
        "Pour herb mixture over chicken and vegetables, tossing to coat evenly.",
        "Arrange in a single layer with chicken skin-side up.",
        "Roast for 35-40 minutes until chicken is golden and cooked through and vegetables are tender.",
        "Drizzle with fresh lemon juice before serving."
      ],
      servingSuggestions: [
        "Serve with a simple green salad dressed with olive oil and lemon.",
        "Add a crusty whole grain bread on the side to soak up the flavorful juices.",
        "For meal prep, divide into individual containers for easy weekday lunches or dinners."
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
