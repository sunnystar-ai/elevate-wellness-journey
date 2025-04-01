
import { Article } from '../types';

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
