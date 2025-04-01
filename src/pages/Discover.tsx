
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNavigation from '@/components/layout/BottomNavigation';

// Import discover components
import MentalWellnessTab from '@/components/discover/tabs/MentalWellnessTab';
import NutritionTab from '@/components/discover/tabs/NutritionTab';

// Import data
import {
  personalGrowthBooks,
} from '@/components/discover/data';

// Import article generator
import { 
  Article,
  generateNutritionArticles, 
  generateMentalWellnessArticles,
} from '@/components/discover/utils/articleGenerator';

const Discover = () => {
  const [activeTab, setActiveTab] = useState('mental');
  const [nutritionArticles, setNutritionArticles] = useState<Article[]>([]);
  const [mentalWellnessArticles, setMentalWellnessArticles] = useState<Article[]>([]);

  useEffect(() => {
    // In a real implementation, this would be an API call to generate content
    const nutritionArticles = generateNutritionArticles();
    const mentalWellnessArticles = generateMentalWellnessArticles();
    
    setNutritionArticles(nutritionArticles);
    setMentalWellnessArticles(mentalWellnessArticles);
  }, []);

  return (
    <div className="pb-24">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList>
            <TabsTrigger value="mental">Mental Wellness</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
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
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Discover;
