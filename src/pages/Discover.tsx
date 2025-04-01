
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';

// Import discover components
import CategoryFilter from '@/components/discover/CategoryFilter';
import SearchBar from '@/components/discover/SearchBar';
import FilterBar from '@/components/discover/FilterBar';
import FeaturedProgram from '@/components/discover/FeaturedProgram';
import TrendingSection from '@/components/discover/TrendingSection';
import ContentSection from '@/components/discover/ContentSection';
import BooksSection from '@/components/discover/BooksSection';
import CommunitySection from '@/components/discover/CommunitySection';

// Import data - fixed imports
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

// Create trending data from content data
const trendingData = [
  ...mentalWellnessContent.slice(0, 1).map(item => ({ ...item, category: 'mental' })),
  ...physicalWellnessContent.slice(0, 1).map(item => ({ ...item, category: 'physical' })),
  ...nutritionContent.slice(0, 1).map(item => ({ ...item, category: 'nutrition' })),
  ...sleepContent.slice(0, 1).map(item => ({ ...item, category: 'sleep' }))
];

const Discover = () => {
  const [activeTab, setActiveTab] = useState('mental');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter data for each tab
  const mentalWellnessData = trendingData.filter(item => item.category === 'mental');
  const physicalWellnessData = trendingData.filter(item => item.category === 'physical');
  const nutritionData = trendingData.filter(item => item.category === 'nutrition');
  const sleepData = trendingData.filter(item => item.category === 'sleep');

  return (
    <div className="pb-24">
      <div className="container mx-auto px-4">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
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
          </TabsContent>
          <TabsContent value="physical">
            <TrendingSection title="Trending Physical Wellness" items={physicalWellnessData} />
            <ContentSection title="Featured Physical Wellness" items={physicalWellnessContent} />
          </TabsContent>
          <TabsContent value="nutrition">
            <TrendingSection title="Trending Nutrition" items={nutritionData} />
            <ContentSection title="Featured Nutrition" items={nutritionContent} />
            <BooksSection title="Nutrition Books" books={personalGrowthBooks} />
          </TabsContent>
          <TabsContent value="sleep">
            <TrendingSection title="Trending Sleep" items={sleepData} />
            <ContentSection title="Featured Sleep" items={sleepContent} />
          </TabsContent>
          <TabsContent value="community">
            <CommunitySection title="Community Picks" picks={communityPicks} />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Discover;
