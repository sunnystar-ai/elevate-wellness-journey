
import { Article } from '../types';

// Generate mental wellness articles
export const generateMentalWellnessArticles = (): Article[] => {
  const articles = [
    {
      title: "Stoic Principles for Modern Well-being",
      content: [
        "Stoicism, an ancient Greek philosophy, offers timeless wisdom for navigating life's challenges with resilience and equanimity.",
        "The dichotomy of control, a core Stoic principle, encourages us to focus our energy on what we can influence and accept what we cannot. This perspective reduces anxiety and fosters a sense of peace amidst uncertainty.",
        "Negative visualization, or premeditatio malorum, involves contemplating potential adversities. Rather than promoting pessimism, this practice enhances gratitude for the present and prepares us mentally for challenges.",
        "The Stoic view of emotions emphasizes that our distress stems not from events themselves but from our judgments about them. By examining our interpretations, we can transform our emotional responses.",
        "Incorporating these principles into daily life might involve morning reflection, mindful responses to triggering situations, and evening reviews of our adherence to our values—creating a framework for psychological resilience."
      ],
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: new Date().toLocaleDateString()
    },
    {
      title: "Buddhist Mindfulness Practices for Emotional Regulation",
      content: [
        "Buddhist mindfulness traditions offer practical techniques for managing emotions and cultivating inner peace in our busy modern lives.",
        "The practice of mindful breathing (ānāpānasati) anchors awareness to the present moment through attention to the breath. This simple technique can interrupt rumination and anxiety cycles, activating the parasympathetic nervous system.",
        "Loving-kindness meditation (mettā bhāvanā) cultivates compassion toward oneself and others, counteracting negative emotional patterns of anger and resentment that contribute to psychological distress.",
        "Buddhist philosophy suggests that emotional suffering arises from attachment to impermanent phenomena. By observing the transient nature of emotions through vipassanā (insight meditation), we develop a more balanced relationship with our emotional experiences.",
        "Integrating even brief periods of these practices into daily routines can significantly improve emotional regulation, reduce stress reactivity, and enhance overall psychological well-being."
      ],
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: new Date().toLocaleDateString()
    }
  ];

  // Return a random article each day
  const today = new Date().toDateString();
  const randomIndex = Math.floor(
    (new Date(today).getTime() / 86400000) % articles.length
  );
  
  return [articles[randomIndex]];
};
