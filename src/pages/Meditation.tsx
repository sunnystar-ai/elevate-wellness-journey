
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, PlayCircle, Heart, BookmarkPlus, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedSection from '@/components/ui/AnimatedSection';

const Meditation = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'stress', name: 'Stress Relief' },
    { id: 'sleep', name: 'Sleep' },
    { id: 'focus', name: 'Focus' },
    { id: 'anxiety', name: 'Anxiety' },
    { id: 'beginners', name: 'Beginners' }
  ];

  const meditations = [
    {
      id: 1,
      title: 'Morning Mindfulness',
      duration: '10 min',
      category: 'focus',
      instructor: 'Emma Wilson',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Deep Sleep Journey',
      duration: '25 min',
      category: 'sleep',
      instructor: 'Michael Chen',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1511295742311-5fae0b99c2b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Anxiety Relief',
      duration: '15 min',
      category: 'anxiety',
      instructor: 'Sarah Johnson',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Breath Awareness',
      duration: '8 min',
      category: 'beginners',
      instructor: 'David Park',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1510457422018-a2a806f6a947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      featured: true
    },
    {
      id: 5,
      title: 'Stress Melt',
      duration: '20 min',
      category: 'stress',
      instructor: 'Lisa Thompson',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1515894045495-6a2c0fac1b54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'Body Scan Relaxation',
      duration: '12 min',
      category: 'stress',
      instructor: 'James Wilson',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1483794344563-d27a8d18014e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredMeditations = selectedCategory === 'all' 
    ? meditations 
    : meditations.filter(meditation => meditation.category === selectedCategory);

  const featuredMeditations = meditations.filter(meditation => meditation.featured);

  return (
    <div className={`page-container page-transition ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero section */}
      <section className="mb-12">
        <AnimatedSection>
          <h1 className="section-heading text-center">Guided Meditations</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Discover peaceful moments with our collection of guided meditations for every mood and need.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search meditations..." 
                className="pl-10 bg-card" 
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="flex overflow-x-auto pb-2 mb-6 gap-2 no-scrollbar">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="rounded-full whitespace-nowrap"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
            <Button variant="outline" className="rounded-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </AnimatedSection>
      </section>

      {/* Featured meditations */}
      {featuredMeditations.length > 0 && (
        <section className="mb-16">
          <AnimatedSection>
            <h2 className="subsection-heading">Featured Meditations</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredMeditations.map((meditation, index) => (
              <AnimatedSection 
                key={meditation.id} 
                animation="scale-in" 
                delay={index * 100}
                className="group"
              >
                <div className="harmony-card overflow-hidden h-full flex flex-col md:flex-row">
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={meditation.image} 
                      alt={meditation.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlayCircle className="h-14 w-14 text-white" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                      {meditation.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4 mr-1" /> 
                      {meditation.duration}
                      <span className="mx-2">•</span>
                      <span>{meditation.instructor}</span>
                    </div>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      A guided journey to help you center your mind and prepare for the day ahead with clarity and purpose.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-medium">{meditation.rating}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm">Play Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      {/* All meditations */}
      <section>
        <AnimatedSection>
          <h2 className="subsection-heading">All Meditations</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredMeditations.map((meditation, index) => (
            <AnimatedSection 
              key={meditation.id} 
              animation="scale-in" 
              delay={index * 100}
              className="group"
            >
              <div className="harmony-card h-full overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={meditation.image} 
                    alt={meditation.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center text-white space-x-3">
                    <div className="flex items-center text-sm">
                      <Clock className="h-3 w-3 mr-1" /> 
                      <span>{meditation.duration}</span>
                    </div>
                  </div>
                  <Button 
                    size="icon" 
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle className="h-14 w-14 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                    {meditation.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    by {meditation.instructor}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{meditation.rating}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/90">
                      <BookmarkPlus className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Meditation;
