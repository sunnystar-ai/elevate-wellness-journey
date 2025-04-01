
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

// Import data
import {
  categoriesData,
  featuredProgramData,
  trendingData,
  communityData
} from '@/components/discover/data';

const Discover = () => {
  const [activeTab, setActiveTab] = useState('mental');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock data for each tab
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
          categories={categoriesData} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        <FilterBar />
        <FeaturedProgram 
          title={featuredProgramData.title}
          image={featuredProgramData.image}
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
            <ContentSection title="Featured Mental Wellness" items={mentalWellnessData} />
          </TabsContent>
          <TabsContent value="physical">
            <TrendingSection title="Trending Physical Wellness" items={physicalWellnessData} />
            <ContentSection title="Featured Physical Wellness" items={physicalWellnessData} />
          </TabsContent>
          <TabsContent value="nutrition">
            <TrendingSection title="Trending Nutrition" items={nutritionData} />
            <ContentSection title="Featured Nutrition" items={nutritionData} />
            <BooksSection title="Nutrition Books" items={nutritionData} />
          </TabsContent>
          <TabsContent value="sleep">
            <TrendingSection title="Trending Sleep" items={sleepData} />
            <ContentSection title="Featured Sleep" items={sleepData} />
          </TabsContent>
          <TabsContent value="community">
            <CommunitySection title="Community Picks" picks={communityData} />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Discover;
