
import { RecipeCollection } from './types';

export const dinnerRecipes: RecipeCollection = [
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
    ],
    mealType: "dinner"
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
    ],
    mealType: "dinner"
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
    ],
    mealType: "dinner"
  }
];
