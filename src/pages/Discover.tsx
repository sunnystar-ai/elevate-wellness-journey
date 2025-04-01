
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNavigation from '@/components/layout/BottomNavigation';

// Import discover components
import FeaturedProgram from '@/components/discover/FeaturedProgram';
import MentalWellnessTab from '@/components/discover/tabs/MentalWellnessTab';
import NutritionTab from '@/components/discover/tabs/NutritionTab';
import SleepTab from '@/components/discover/tabs/SleepTab';
import CommunityTab from '@/components/discover/tabs/CommunityTab';

// Import data
import {
  featuredProgram,
  sleepContent,
  personalGrowthBooks,
  communityPicks
} from '@/components/discover/data';

// Import article generator
import { 
  Article, 
  NutritionContent,
  generateNutritionArticles, 
  generateMentalWellnessArticles,
  generateFeaturedNutrition,
  getAllRecipes
} from '@/components/discover/utils/articleGenerator';

const Discover = () => {
  const [activeTab, setActiveTab] = useState('mental');
  const [nutritionArticles, setNutritionArticles] = useState<Article[]>([]);
  const [mentalWellnessArticles, setMentalWellnessArticles] = useState<Article[]>([]);
  const [featuredNutritionContent, setFeaturedNutritionContent] = useState<NutritionContent[]>([]);

  useEffect(() => {
    // In a real implementation, this would be an API call to generate content
    const nutritionArticles = generateNutritionArticles();
    const mentalWellnessArticles = generateMentalWellnessArticles();
    const featuredNutrition = generateFeaturedNutrition();
    
    console.log("Featured nutrition content:", featuredNutrition);
    
    setNutritionArticles(nutritionArticles);
    setMentalWellnessArticles(mentalWellnessArticles);
    setFeaturedNutritionContent(featuredNutrition);
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
            <MentalWellnessTab 
              articles={mentalWellnessArticles}
              books={personalGrowthBooks}
            />
          </TabsContent>
          
          <TabsContent value="nutrition">
            <NutritionTab 
              articles={nutritionArticles}
              nutritionContent={featuredNutritionContent}
            />
          </TabsContent>
          
          <TabsContent value="sleep">
            <SleepTab 
              sleepContent={sleepContent}
              books={personalGrowthBooks}
            />
          </TabsContent>
          
          <TabsContent value="community">
            <CommunityTab 
              communityPicks={communityPicks}
              books={personalGrowthBooks}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Discover;
