
import { useState, useEffect } from 'react';
import { ArrowRight, Heart, Clock, Calendar, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DailyTip from '@/components/home/DailyTip';
import QuickAccess from '@/components/home/QuickAccess';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FeatureCard from '@/components/ui/FeatureCard';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const featuredContent = [
    {
      title: "Morning Mindfulness",
      category: "Meditation",
      duration: "10 min",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      to: "/meditation",
      color: "bg-harmony-light-lavender"
    },
    {
      title: "Full Body HIIT",
      category: "Workout",
      duration: "25 min",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      to: "/workouts",
      color: "bg-harmony-light-blue"
    },
    {
      title: "Balanced Breakfast Ideas",
      category: "Nutrition",
      duration: "5 recipes",
      image: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      to: "/nutrition",
      color: "bg-harmony-light-mint"
    }
  ];

  return (
    <div className={`page-transition ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-harmony-light-blue rounded-full mix-blend-multiply blur-3xl opacity-40 animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-harmony-light-mint rounded-full mix-blend-multiply blur-3xl opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-harmony-light-lavender rounded-full mix-blend-multiply blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection animation="fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-6">
                Your journey to holistic wellness starts here
              </h1>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-in" delay={200}>
              <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Balance your mind, body, and spirit with guided practices, expert insights, and a supportive community.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-in" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Your Journey
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Daily tip and quick access */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1">
            <DailyTip />
          </div>
          <div className="md:col-span-2">
            <QuickAccess />
          </div>
        </div>
      </section>

      {/* Featured content */}
      <section className="container mx-auto px-4 mb-16">
        <AnimatedSection>
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="section-heading">Featured Content</h2>
            <Link to="#" className="text-primary hover:underline flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredContent.map((item, index) => (
            <AnimatedSection 
              key={item.title} 
              animation="scale-in" 
              delay={index * 100}
              className="group"
            >
              <Link to={item.to} className="block h-full">
                <div className="harmony-card h-full overflow-hidden group-hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute top-4 left-4 ${item.color} text-foreground px-3 py-1 rounded-full text-xs font-medium z-20`}>
                      {item.category}
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center text-white space-x-3 z-20">
                      <div className="flex items-center text-sm">
                        <Clock className="h-3 w-3 mr-1" /> 
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      Discover essential practices to enhance your wellbeing and create lasting healthy habits.
                    </p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Benefits section */}
      <section className="container mx-auto px-4 mb-16">
        <AnimatedSection>
          <h2 className="section-heading text-center mb-12">Why Choose Harmony</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-6">
          <FeatureCard
            title="Holistic Approach"
            description="Harmony addresses mental, emotional, and physical wellness for complete balance."
            icon={<Heart className="h-5 w-5 text-white" />}
            to="#"
            color="from-harmony-light-peach to-harmony-peach"
            delay={100}
          />
          <FeatureCard
            title="Expert Guidance"
            description="Access world-class wellness experts and their proven techniques."
            icon={<Award className="h-5 w-5 text-white" />}
            to="#"
            color="from-harmony-light-mint to-harmony-mint"
            delay={200}
          />
          <FeatureCard
            title="Personalized Journey"
            description="Tailored recommendations based on your unique wellness goals."
            icon={<BookOpen className="h-5 w-5 text-white" />}
            to="#"
            color="from-harmony-light-lavender to-harmony-lavender"
            delay={300}
          />
          <FeatureCard
            title="Consistent Progress"
            description="Track your wellness habits and celebrate your achievements."
            icon={<Calendar className="h-5 w-5 text-white" />}
            to="#"
            color="from-harmony-light-blue to-harmony-blue"
            delay={400}
          />
        </div>
      </section>

      {/* CTA section */}
      <section className="container mx-auto px-4 mb-16">
        <AnimatedSection>
          <div className="rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-harmony-blue to-harmony-lavender opacity-90"></div>
            <div className="relative z-10 py-16 px-6 md:px-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-medium mb-4 font-display text-white">Ready to transform your wellness journey?</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
                Join thousands of people who have discovered a better way to take care of their mind, body, and spirit.
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Started Today
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Index;
