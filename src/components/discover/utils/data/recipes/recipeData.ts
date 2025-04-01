
import { RecipeCollection } from './types';

// Collection of recipe data
export const recipes: RecipeCollection = [
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
  }
];
