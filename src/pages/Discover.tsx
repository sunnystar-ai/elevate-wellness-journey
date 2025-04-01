
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Import discover components
import FeaturedProgram from '@/components/discover/FeaturedProgram';
import ContentSection from '@/components/discover/ContentSection';
import BooksSection from '@/components/discover/BooksSection';
import HorizontalBooksList from '@/components/discover/HorizontalBooksList';
import CommunitySection from '@/components/discover/CommunitySection';

// Import data
import {
  featuredProgram,
  nutritionContent,
  sleepContent,
  personalGrowthBooks,
  communityPicks
} from '@/components/discover/data';

// Interface for the generated articles
interface Article {
  title: string;
  content: string[];
  image: string;
  date: string;
  ingredients?: string[];
  instructions?: string[];
  servingSuggestions?: string[];
}

// Sample generated articles (in a real implementation, these would come from an API call)
const generateNutritionArticles = (): Article[] => {
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

const generateMentalWellnessArticles = (): Article[] => {
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

const Discover = () => {
  const [activeTab, setActiveTab] = useState('mental');
  const [nutritionArticles, setNutritionArticles] = useState<Article[]>([]);
  const [mentalWellnessArticles, setMentalWellnessArticles] = useState<Article[]>([]);

  useEffect(() => {
    // In a real implementation, this would be an API call to generate content
    setNutritionArticles(generateNutritionArticles());
    setMentalWellnessArticles(generateMentalWellnessArticles());
  }, []);

  return (
    <div className="pb-24">
      <div className="container mx-auto px-4">
        <FeaturedProgram 
          title={featuredProgram.title}
          image={featuredProgram.image}
          isNew={featuredProgram.isNew}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mt-6">
            <TabsTrigger value="mental">Mental Wellness</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mental">
            {mentalWellnessArticles.map((article, index) => (
              <Card key={index} className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    {article.title}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">{article.date}</div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-48 object-cover rounded-md" 
                      />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                      {article.content.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <HorizontalBooksList 
              title="Mental Wellness Books" 
              books={personalGrowthBooks} 
              delay={0.2}
            />
          </TabsContent>
          
          <TabsContent value="nutrition">
            {nutritionArticles.map((article, index) => (
              <Card key={index} className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    {article.title}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">{article.date}</div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-48 object-cover rounded-md" 
                      />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                      {article.content.map((paragraph, i) => (
                        <p key={i} className="font-medium text-primary">{paragraph}</p>
                      ))}
                      
                      {article.ingredients && (
                        <div className="mt-4">
                          <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {article.ingredients.map((ingredient, i) => (
                              <li key={i}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {article.instructions && (
                        <div className="mt-4">
                          <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
                          <ol className="list-decimal pl-5 space-y-2">
                            {article.instructions.map((instruction, i) => (
                              <li key={i}>{instruction}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                      
                      {article.servingSuggestions && (
                        <div className="mt-4">
                          <h3 className="font-semibold text-lg mb-2">Serving Suggestions:</h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {article.servingSuggestions.map((suggestion, i) => (
                              <li key={i}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <ContentSection title="Featured Nutrition" items={nutritionContent} />
          </TabsContent>
          
          <TabsContent value="sleep">
            <ContentSection title="Featured Sleep" items={sleepContent} />
            <HorizontalBooksList 
              title="Sleep & Relaxation Books" 
              books={personalGrowthBooks} 
              delay={0.2}
            />
          </TabsContent>
          
          <TabsContent value="community">
            <CommunitySection title="Community Picks" picks={communityPicks} />
            <HorizontalBooksList 
              title="Community Recommended Books" 
              books={personalGrowthBooks} 
              delay={0.2}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Discover;
