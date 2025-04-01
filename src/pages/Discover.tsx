
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
}

// Sample generated articles (in a real implementation, these would come from an API call)
const generateNutritionArticles = (): Article[] => {
  const articles = [
    {
      title: "Mediterranean Inspired Quinoa Bowl",
      content: [
        "The Mediterranean diet is renowned for its health benefits, particularly for heart health and longevity. This quinoa bowl combines the key elements of this diet with modern convenience.",
        "Start with a base of protein-rich quinoa, which provides all nine essential amino acids. Top with roasted vegetables like bell peppers, zucchini, and eggplant, which are high in antioxidants and fiber.",
        "Add a serving of chickpeas for additional protein and fiber, as well as vitamins and minerals like folate and iron. Sprinkle with feta cheese, which provides calcium and probiotics.",
        "Finish with a drizzle of extra virgin olive oil, a heart-healthy fat rich in monounsaturated fatty acids and antioxidants. Season with fresh herbs like mint and parsley for additional flavor and antioxidants.",
        "This balanced meal provides sustained energy, supports digestive health, and contributes to overall well-being."
      ],
      image: "/placeholder.svg",
      date: new Date().toLocaleDateString()
    },
    {
      title: "Antioxidant-Rich Berry Smoothie Bowl",
      content: [
        "This nutrient-dense smoothie bowl is packed with antioxidants that help combat oxidative stress and inflammation in the body.",
        "Blend frozen mixed berries (blueberries, strawberries, and blackberries) which are rich in anthocyanins and vitamin C. Add a small banana for creaminess and potassium, which helps regulate blood pressure.",
        "Include a handful of spinach, which is virtually tasteless in smoothies but adds iron, calcium, and vitamin K. For protein, add a tablespoon of chia seeds and a scoop of plant-based protein powder.",
        "Top with fresh berries, granola, and a drizzle of almond butter for healthy fats and additional protein. This combination provides a balanced meal with carbohydrates, protein, and healthy fats.",
        "Regular consumption of antioxidant-rich foods like berries may help reduce the risk of chronic diseases and support cognitive function and skin health."
      ],
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
                        <p key={i}>{paragraph}</p>
                      ))}
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
