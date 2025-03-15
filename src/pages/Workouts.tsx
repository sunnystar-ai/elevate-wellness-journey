
import { useState, useEffect } from 'react';
import { Search, Filter, Clock, Dumbbell, Heart, Play, Zap, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedSection from '@/components/ui/AnimatedSection';

const Workouts = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'flexibility', name: 'Flexibility' }
  ];

  const workouts = [
    {
      id: 1,
      title: 'Full Body HIIT',
      duration: '25 min',
      level: 'Intermediate',
      category: 'hiit',
      trainer: 'Alex Rivera',
      equipment: 'None',
      calories: 280,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Core Power Yoga',
      duration: '35 min',
      level: 'All Levels',
      category: 'yoga',
      trainer: 'Maya Patel',
      equipment: 'Yoga mat',
      calories: 180,
      image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Upper Body Strength',
      duration: '40 min',
      level: 'Advanced',
      category: 'strength',
      trainer: 'Chris Johnson',
      equipment: 'Dumbbells',
      calories: 320,
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Cardio Kickboxing',
      duration: '30 min',
      level: 'Intermediate',
      category: 'cardio',
      trainer: 'Sophia Rodriguez',
      equipment: 'None',
      calories: 350,
      image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      featured: true
    },
    {
      id: 5,
      title: 'Full Body Flexibility',
      duration: '20 min',
      level: 'Beginner',
      category: 'flexibility',
      trainer: 'Emma Wilson',
      equipment: 'Yoga mat',
      calories: 120,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'Lower Body Strength',
      duration: '35 min',
      level: 'Intermediate',
      category: 'strength',
      trainer: 'David Kim',
      equipment: 'Dumbbells, Resistance bands',
      calories: 300,
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredWorkouts = selectedCategory === 'all' 
    ? workouts 
    : workouts.filter(workout => workout.category === selectedCategory);

  const featuredWorkouts = workouts.filter(workout => workout.featured);

  const weeklySchedule = [
    { day: 'Mon', workout: 'Full Body HIIT', duration: '25 min' },
    { day: 'Tue', workout: 'Upper Body', duration: '40 min' },
    { day: 'Wed', workout: 'Rest Day', duration: '', isRest: true },
    { day: 'Thu', workout: 'Core Power Yoga', duration: '35 min' },
    { day: 'Fri', workout: 'Cardio', duration: '30 min' },
    { day: 'Sat', workout: 'Lower Body', duration: '35 min' },
    { day: 'Sun', workout: 'Active Recovery', duration: '20 min' }
  ];

  return (
    <div className={`page-container page-transition ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero section */}
      <section className="mb-12">
        <AnimatedSection>
          <h1 className="section-heading text-center">Workouts & Training</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Find the perfect workout for your fitness level and goals, with expert-led training sessions.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search workouts..." 
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

      {/* Weekly Schedule */}
      <section className="mb-16">
        <AnimatedSection>
          <h2 className="subsection-heading">Your Weekly Schedule</h2>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weeklySchedule.map((day, index) => (
              <div 
                key={day.day} 
                className={`rounded-xl p-4 text-center ${
                  day.isRest 
                    ? 'bg-secondary dark:bg-secondary/40' 
                    : 'bg-white dark:bg-card shadow-card'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="block text-sm font-medium mb-2">{day.day}</span>
                {day.isRest ? (
                  <span className="block text-muted-foreground text-xs mt-1">{day.workout}</span>
                ) : (
                  <>
                    <span className="block text-xs font-medium">{day.workout}</span>
                    <span className="block text-muted-foreground text-xs mt-1">{day.duration}</span>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              View Full Calendar
            </Button>
          </div>
        </AnimatedSection>
      </section>

      {/* Featured workouts */}
      {featuredWorkouts.length > 0 && (
        <section className="mb-16">
          <AnimatedSection>
            <h2 className="subsection-heading">Featured Workouts</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6">
            {featuredWorkouts.map((workout, index) => (
              <AnimatedSection 
                key={workout.id} 
                animation="scale-in" 
                delay={index * 100}
                className="group"
              >
                <div className="harmony-card overflow-hidden flex flex-col md:flex-row">
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                    <img 
                      src={workout.image} 
                      alt={workout.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="rounded-full" size="lg">
                        <Play className="h-5 w-5 mr-1" />
                        Start Workout
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-harmony-light-blue text-xs font-medium px-2.5 py-1 rounded">
                        {workout.category.charAt(0).toUpperCase() + workout.category.slice(1)}
                      </span>
                      <span className="bg-harmony-light-mint text-xs font-medium px-2.5 py-1 rounded">
                        {workout.level}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                      {workout.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      A high-intensity workout designed to build strength and endurance through dynamic exercises.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Duration</span>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1 text-harmony-blue" /> 
                          <span className="font-medium">{workout.duration}</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Trainer</span>
                        <span className="font-medium mt-1">{workout.trainer}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Equipment</span>
                        <span className="font-medium mt-1">{workout.equipment}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Calories</span>
                        <div className="flex items-center mt-1">
                          <Zap className="h-4 w-4 mr-1 text-harmony-peach" /> 
                          <span className="font-medium">{workout.calories}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" className="rounded-full" size="sm">
                        <Dumbbell className="h-4 w-4 mr-1" />
                        Add to My Workouts
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      {/* All workouts */}
      <section>
        <AnimatedSection>
          <h2 className="subsection-heading">All Workouts</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout, index) => (
            <AnimatedSection 
              key={workout.id} 
              animation="scale-in" 
              delay={index * 100}
              className="group"
            >
              <div className="harmony-card h-full overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={workout.image} 
                    alt={workout.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-harmony-light-blue/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded">
                      {workout.category.charAt(0).toUpperCase() + workout.category.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center text-white space-x-3">
                    <div className="flex items-center text-sm">
                      <Clock className="h-3 w-3 mr-1" /> 
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Zap className="h-3 w-3 mr-1" /> 
                      <span>{workout.calories} cal</span>
                    </div>
                  </div>
                  <Button 
                    size="icon" 
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="default" size="sm" className="rounded-full">
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                    {workout.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <span>{workout.level}</span>
                    <span className="mx-2">•</span>
                    <span>with {workout.trainer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs bg-secondary px-2 py-1 rounded">
                      {workout.equipment}
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/90">
                      <Dumbbell className="h-4 w-4 mr-1" /> Add
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

export default Workouts;
