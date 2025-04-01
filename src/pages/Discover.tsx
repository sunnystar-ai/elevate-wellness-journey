import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Motion, Badge } from 'lucide-react';
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
  mentalWellnessData,
  physicalWellnessData,
  nutritionData,
  sleepData
} from '@/components/discover/data';

const Discover = () => {
  const [activeTab, setActiveTab] = useState('mental');

  return (
    <div className="pb-24">
      <div className="container mx-auto px-4">
        <SearchBar />
        <CategoryFilter />
        <FilterBar />
        <FeaturedProgram />

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
            <TrendingSection title="Trending Mental Wellness" data={mentalWellnessData} />
            <ContentSection title="Featured Mental Wellness" data={mentalWellnessData} />
          </TabsContent>
          <TabsContent value="physical">
            <TrendingSection title="Trending Physical Wellness" data={physicalWellnessData} />
            <ContentSection title="Featured Physical Wellness" data={physicalWellnessData} />
          </TabsContent>
          <TabsContent value="nutrition">
            <TrendingSection title="Trending Nutrition" data={nutritionData} />
            <ContentSection title="Featured Nutrition" data={nutritionData} />
            <BooksSection title="Nutrition Books" data={nutritionData} />
          </TabsContent>
          <TabsContent value="sleep">
            <TrendingSection title="Trending Sleep" data={sleepData} />
            <ContentSection title="Featured Sleep" data={sleepData} />
          </TabsContent>
          <TabsContent value="community">
            <CommunitySection />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Discover;
