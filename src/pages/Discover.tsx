import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';

// Import discover components
import CategoryFilter from '@/components/discover/CategoryFilter';
import FilterBar from '@/components/discover/FilterBar';
import FeaturedProgram from '@/components/discover/FeaturedProgram';
import TrendingSection from '@/components/discover/TrendingSection';
import ContentSection from '@/components/discover/ContentSection';
import BooksSection from '@/components/discover/BooksSection';
import HorizontalBooksList from '@/components/discover/HorizontalBooksList';
import CommunitySection from '@/components/discover/CommunitySection';

// Import data
import {
  categories,
  featuredProgram,
  mentalWellnessContent,
  physicalWellnessContent,
  nutritionContent,
  sleepContent,
  personalGrowthBooks,
  communityPicks
} from '@/components/discover/data';

// Define the TrendingItem interface
interface TrendingItem {
  id: number;
  title: string;
  category: string;
  image: string;
  duration: string; // Required property for TrendingItem
  views: number;
  // Other optional properties
  difficulty?: string;
  type?: string;
  intensity?: string;
  equipment?: string;
  tags?: string[];
  prepTime?: string;
}

// Create trending data with views property and ensuring all items have duration
const trendingData: TrendingItem[] = [
  ...mentalWellnessContent.slice(0, 1).map(item => ({ 
    ...item, 
    category: 'mental',
    views: 1200 + Math.floor(Math.random() * 800) // Add random views
  })),
  ...physicalWellnessContent.slice(0, 1).map(item => ({ 
    ...item, 
    category: 'physical',
    views: 1200 + Math.floor(Math.random() * 800)
  })),
  ...nutritionContent.slice(0, 1).map(item => ({ 
    ...item, 
    category: 'nutrition',
    views: 1200 + Math.floor(Math.random() * 800),
    duration: item.prepTime // Ensure nutrition items have duration property
  })),
  ...sleepContent.slice(0, 1).map(item => ({ 
    ...item, 
    category: 'sleep',
    views: 1200 + Math.floor(Math.random() * 800)
  }))
];

const Discover = () => {
  const [activeTab, setActiveTab] = useState('mental');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter data for each tab and ensure they have the views property
  const mentalWellnessData: TrendingItem[] = trendingData.filter(item => item.category === 'mental');
  const physicalWellnessData: TrendingItem[] = trendingData.filter(item => item.category === 'physical');
  const nutritionData: TrendingItem[] = trendingData.filter(item => item.category === 'nutrition');
  const sleepData: TrendingItem[] = trendingData.filter(item => item.category === 'sleep');

  // Make sure we're using all 9 books from personalGrowthBooks
  console.log('Total books available:', personalGrowthBooks.length);

  return (
    <div className="pb-24">
      <div className="container mx-auto px-4">
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        <FilterBar />
        <FeaturedProgram 
          title={featuredProgram.title}
          image={featuredProgram.image}
          isNew={featuredProgram.isNew}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mt-6">
            <TabsTrigger value="mental">
              Mental Wellness <Badge className="ml-2">5</Badge>
            </TabsTrigger>
            <TabsTrigger value="physical">Physical Wellness</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mental">
            <TrendingSection title="Trending Mental Wellness" items={mentalWellnessData} />
            <ContentSection title="Featured Mental Wellness" items={mentalWellnessContent} />
            <HorizontalBooksList 
              title="Mental Wellness Books" 
              books={personalGrowthBooks} 
              delay={0.2}
            />
          </TabsContent>
          
          <TabsContent value="physical">
            <TrendingSection title="Trending Physical Wellness" items={physicalWellnessData} />
            <ContentSection title="Featured Physical Wellness" items={physicalWellnessContent} />
            <HorizontalBooksList 
              title="Physical Wellness Books" 
              books={personalGrowthBooks} 
              delay={0.2}
            />
          </TabsContent>
          
          <TabsContent value="nutrition">
            <TrendingSection title="Trending Nutrition" items={nutritionData} />
            <ContentSection title="Featured Nutrition" items={nutritionContent} />
            <BooksSection title="Nutrition Books" books={personalGrowthBooks} />
          </TabsContent>
          
          <TabsContent value="sleep">
            <TrendingSection title="Trending Sleep" items={sleepData} />
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
