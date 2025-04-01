
// Interface for the generated articles
export interface Article {
  title: string;
  content: string[];
  image: string;
  date: string;
  ingredients?: string[];
  instructions?: string[];
  servingSuggestions?: string[];
}

// Generate nutrition articles
export const generateNutritionArticles = (): Article[] => {
  const articles = [
    {
      title: "Mediterranean Inspired Quinoa Bowl",
      content: [
        "This nutrient-dense Mediterranean-inspired bowl combines protein-rich quinoa with roasted vegetables and heart-healthy olive oil for a balanced meal that supports overall wellbeing."
      ],
      ingredients: [
        "1 cup quinoa, rinsed",
        "2 cups vegetable broth",
        "1 red bell pepper, diced",
        "1 zucchini, diced",
        "1 small eggplant, diced",
        "1 cup cherry tomatoes, halved",
        "1 can (15 oz) chickpeas, drained and rinsed",
        "1/4 cup crumbled feta cheese",
        "1/4 cup kalamata olives, pitted and halved",
        "2 tbsp extra virgin olive oil",
        "1 tbsp balsamic vinegar",
        "2 cloves garlic, minced",
        "1 tsp dried oregano",
        "Fresh mint and parsley, chopped",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Preheat oven to 425°F (220°C). Line a baking sheet with parchment paper.",
        "In a medium saucepan, combine quinoa and vegetable broth. Bring to a boil, then reduce heat to low, cover, and simmer for 15 minutes until all liquid is absorbed. Remove from heat and let stand covered for 5 minutes, then fluff with a fork.",
        "Meanwhile, toss bell pepper, zucchini, eggplant, and cherry tomatoes with 1 tablespoon olive oil, garlic, oregano, salt, and pepper. Spread on the prepared baking sheet and roast for 20-25 minutes, stirring halfway through, until vegetables are tender and slightly caramelized.",
        "In a small bowl, whisk together remaining olive oil, balsamic vinegar, and a pinch of salt and pepper to make the dressing.",
        "In a large bowl, combine cooked quinoa, roasted vegetables, and chickpeas. Drizzle with the dressing and toss gently to combine."
      ],
      servingSuggestions: [
        "Divide the quinoa mixture among bowls. Top each bowl with feta cheese, olives, and fresh herbs.",
        "Serve warm or at room temperature for a complete meal rich in protein, fiber, and antioxidants.",
        "Store any leftovers in an airtight container in the refrigerator for up to 3 days. This bowl tastes great as a cold lunch the next day!"
      ],
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: new Date().toLocaleDateString()
    },
    {
      title: "Antioxidant-Rich Berry Smoothie Bowl",
      content: [
        "Start your day with this nutrient-packed smoothie bowl that's loaded with antioxidants, vitamins, and minerals to support your immune system and provide sustained energy."
      ],
      ingredients: [
        "1 cup mixed frozen berries (blueberries, strawberries, blackberries)",
        "1 small ripe banana (fresh or frozen)",
        "1 cup fresh spinach (doesn't affect taste)",
        "1/4 cup plain Greek yogurt (or plant-based alternative)",
        "1/4 cup unsweetened almond milk (or milk of choice)",
        "1 tbsp chia seeds",
        "1 scoop protein powder (optional)",
        "1/2 tsp vanilla extract",
        "1 tsp honey or maple syrup (optional, for sweetness)",
        "Toppings: fresh berries, granola, sliced banana, almond butter, hemp seeds, coconut flakes"
      ],
      instructions: [
        "Place frozen berries, banana, spinach, Greek yogurt, almond milk, chia seeds, protein powder (if using), vanilla extract, and sweetener (if using) in a high-speed blender.",
        "Blend on low speed initially, then gradually increase to high speed until the mixture is smooth but still thick. If needed, add a splash more liquid, but keep the consistency thick enough to eat with a spoon.",
        "Stop the blender occasionally to scrape down the sides with a spatula to ensure everything is well blended.",
        "If the mixture is too thin, add more frozen fruit. If too thick, add a small amount of liquid."
      ],
      servingSuggestions: [
        "Pour the smoothie mixture into a bowl. The consistency should be thicker than a drinkable smoothie.",
        "Arrange toppings in sections or sprinkle across the bowl: fresh berries, sliced banana, a sprinkle of granola, and a drizzle of almond butter.",
        "Add additional toppings as desired: hemp seeds, coconut flakes, or cacao nibs for extra nutrients and texture.",
        "Enjoy immediately with a spoon. For a firmer texture, you can freeze the bowl for 5-10 minutes before adding toppings."
      ],
      image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: new Date().toLocaleDateString()
    }
  ];

  // Return a random article each day
  const today = new Date().toDateString();
  const randomIndex = Math.floor(
    (new Date(today).getTime() / 86400000) % articles.length
  );
  
  return [articles[randomIndex]];
};

// Generate mental wellness articles
export const generateMentalWellnessArticles = (): Article[] => {
  const articles = [
    {
      title: "Stoic Principles for Modern Well-being",
      content: [
        "Stoicism, an ancient Greek philosophy, offers timeless wisdom for navigating life's challenges with resilience and equanimity.",
        "The dichotomy of control, a core Stoic principle, encourages us to focus our energy on what we can influence and accept what we cannot. This perspective reduces anxiety and fosters a sense of peace amidst uncertainty.",
        "Negative visualization, or premeditatio malorum, involves contemplating potential adversities. Rather than promoting pessimism, this practice enhances gratitude for the present and prepares us mentally for challenges.",
        "The Stoic view of emotions emphasizes that our distress stems not from events themselves but from our judgments about them. By examining our interpretations, we can transform our emotional responses.",
        "Incorporating these principles into daily life might involve morning reflection, mindful responses to triggering situations, and evening reviews of our adherence to our values—creating a framework for psychological resilience."
      ],
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: new Date().toLocaleDateString()
    },
    {
      title: "Buddhist Mindfulness Practices for Emotional Regulation",
      content: [
        "Buddhist mindfulness traditions offer practical techniques for managing emotions and cultivating inner peace in our busy modern lives.",
        "The practice of mindful breathing (ānāpānasati) anchors awareness to the present moment through attention to the breath. This simple technique can interrupt rumination and anxiety cycles, activating the parasympathetic nervous system.",
        "Loving-kindness meditation (mettā bhāvanā) cultivates compassion toward oneself and others, counteracting negative emotional patterns of anger and resentment that contribute to psychological distress.",
        "Buddhist philosophy suggests that emotional suffering arises from attachment to impermanent phenomena. By observing the transient nature of emotions through vipassanā (insight meditation), we develop a more balanced relationship with our emotional experiences.",
        "Integrating even brief periods of these practices into daily routines can significantly improve emotional regulation, reduce stress reactivity, and enhance overall psychological well-being."
      ],
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: new Date().toLocaleDateString()
    }
  ];

  // Return a random article each day
  const today = new Date().toDateString();
  const randomIndex = Math.floor(
    (new Date(today).getTime() / 86400000) % articles.length
  );
  
  return [articles[randomIndex]];
};

// Interface for the nutrition content items
export interface NutritionContent {
  id: number;
  title: string;
  prepTime: string;
  tags: string[];
  image: string;
  ingredients: string[];
  instructions: string[];
  servingSuggestions: string[];
}

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
