
import { useState, useEffect } from 'react';
import { 
  mentalWellnessContent, 
  physicalWellnessContent, 
  nutritionContent, 
  sleepContent
} from '@/components/discover/data/discoverData';

// Define a common interface for all content types
interface ContentItem {
  id: number;
  title: string;
  image: string;
  duration?: string;
  prepTime?: string;
  difficulty?: string;
  intensity?: string;
  equipment?: string;
  tags?: string[];
  recommended?: string;
  type?: string;
  description?: string;
  benefits?: string[];
  creator?: string;
  relatedContent?: ContentItem[];
}

// Helper function to get random related content
function getRandomRelatedContent(excludeId: number, allContentItems: ContentItem[]): ContentItem[] {
  return allContentItems
    .filter(item => item.id !== excludeId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
}

// Combine all content data into one array for easy lookup
const allContent: ContentItem[] = [
  ...mentalWellnessContent,
  ...physicalWellnessContent,
  ...nutritionContent,
  ...sleepContent
].map(content => {
  // Add default benefits and descriptions for demo purposes
  return {
    ...content,
    description: content.description || "Experience a transformative journey through this carefully crafted content designed to enhance your wellbeing.",
    benefits: content.benefits || [
      "Improved mental clarity and focus",
      "Reduced stress and anxiety",
      "Enhanced physical wellbeing",
      "Better sleep quality"
    ],
    creator: content.creator || "Wellness Experts Team",
    // Add some mock related content
    relatedContent: getRandomRelatedContent(content.id, [
      ...mentalWellnessContent,
      ...physicalWellnessContent,
      ...nutritionContent,
      ...sleepContent
    ] as ContentItem[])
  };
});

export function useContentDetail(contentId: string | undefined, contentType?: string | undefined) {
  const [state, setState] = useState<{
    content: ContentItem | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    content: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    if (!contentId) {
      setState({
        content: null,
        isLoading: false,
        error: new Error('Content ID is required')
      });
      return;
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      try {
        const parsedId = parseInt(contentId);
        const foundContent = allContent.find(item => item.id === parsedId);
        
        if (foundContent) {
          setState({
            content: foundContent,
            isLoading: false,
            error: null
          });
        } else {
          setState({
            content: null,
            isLoading: false,
            error: new Error('Content not found')
          });
        }
      } catch (error) {
        setState({
          content: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Unknown error')
        });
      }
    }, 800); // Simulate network delay

    return () => clearTimeout(timer);
  }, [contentId, contentType]);

  return state;
}
