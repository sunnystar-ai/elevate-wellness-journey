
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SearchBar from '@/components/discover/SearchBar';
import CategoryFilter from '@/components/discover/CategoryFilter';
import FeaturedProgram from '@/components/discover/FeaturedProgram';
import FilterBar from '@/components/discover/FilterBar';
import ContentSection from '@/components/discover/ContentSection';
import HorizontalBooksList from '@/components/discover/HorizontalBooksList';
import BottomNavbar from '@/components/discover/BottomNavbar';

import {
  featuredProgram,
  mentalWellnessContent,
  physicalWellnessContent,
  personalGrowthBooks,
  categories
} from '@/components/discover/data';

const Discover = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`page-container page-transition pb-20 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <section className="mb-6">
        <AnimatedSection>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-medium">Discover</h1>
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </AnimatedSection>
      </section>

      <AnimatedSection delay={100}>
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </AnimatedSection>

      <AnimatedSection delay={200} className="mb-8">
        <FeaturedProgram 
          title={featuredProgram.title}
          image={featuredProgram.image}
          isNew={featuredProgram.isNew}
        />
      </AnimatedSection>

      <AnimatedSection delay={300} className="mb-6">
        <FilterBar />
      </AnimatedSection>

      <ContentSection 
        title="Mental Wellness"
        items={mentalWellnessContent}
        linkTo="/meditation"
        delay={400}
      />

      <ContentSection 
        title="Physical Wellness"
        items={physicalWellnessContent}
        linkTo="/workouts"
        delay={500}
      />

      <HorizontalBooksList
        title="Personal Growth Books"
        books={personalGrowthBooks}
        linkTo="/books"
        delay={600}
      />

      <BottomNavbar />
    </div>
  );
};

export default Discover;
