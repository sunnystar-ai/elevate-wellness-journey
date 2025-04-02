
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApiKeySetup } from '@/hooks/useApiKeySetup';

// Import discover components
import MentalWellnessTab from '@/components/discover/tabs/MentalWellnessTab';
import NutritionTab from '@/components/discover/tabs/NutritionTab';
import WeeklyPhilosophicalBooks from '@/components/discover/WeeklyPhilosophicalBooks';

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
  const { apiKeySet } = useApiKeySetup();
  const { toast } = useToast();

  useEffect(() => {
    // In a real implementation, this would be an API call to generate content
    const nutritionArticles = generateNutritionArticles();
    const mentalWellnessArticles = generateMentalWellnessArticles();
    
    setNutritionArticles(nutritionArticles);
    setMentalWellnessArticles(mentalWellnessArticles);
  }, []);

  const handleOpenSettings = () => {
    // Redirect to the settings page where user can add API key
    window.location.href = '/profile?tab=settings';
    
    toast({
      title: "Redirecting to Settings",
      description: "You'll be able to add your OpenAI API key in the Settings tab."
    });
  };

  return (
    <div className="pb-24">
      <div className="container mx-auto px-4">
        {!apiKeySet && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Key className="h-5 w-5 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-orange-800">API Key Required</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    Some features like book summaries require an OpenAI API key. 
                    Add your API key in Settings to unlock all functionality.
                  </p>
                  <Button 
                    className="mt-3" 
                    variant="outline"
                    onClick={handleOpenSettings}
                  >
                    Go to Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Weekly Philosophical Books Section */}
        <WeeklyPhilosophicalBooks />
        
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
