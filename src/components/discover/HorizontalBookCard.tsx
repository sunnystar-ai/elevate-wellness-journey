
import React, { useState } from 'react';
import { Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface HorizontalBookCardProps {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  image: string;
  audioSample?: string;
}

const HorizontalBookCard = ({ id, title, author, rating, image }: HorizontalBookCardProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();

  const generateSummary = async () => {
    // Get API key from localStorage or environment variable
    const apiKey = localStorage.getItem('openai_api_key') || import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key in Settings to use this feature.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setSummary(null);
    setIsDialogOpen(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that generates concise book summaries."
            },
            {
              role: "user",
              content: `Generate a brief summary (3-4 paragraphs) of "${title}" by ${author}. Include the main ideas and key takeaways from the book.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setSummary(result.choices[0].message.content);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Summary Generation Failed",
        description: "There was an error generating the book summary. Please try again later.",
        variant: "destructive"
      });
      setSummary("Failed to generate summary. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className="flex-shrink-0 w-36 mr-4">
        <div className="rounded-lg overflow-hidden bg-card shadow-sm h-full flex flex-col">
          <div className="h-52 w-full relative">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground p-2 text-center">
                <BookOpen className="h-8 w-8 mb-1" />
                <p className="text-xs">{title}</p>
              </div>
            ) : (
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            )}
          </div>
          <div className="p-3 flex-1 flex flex-col">
            <h3 className="font-medium line-clamp-1 text-sm">{title}</h3>
            <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
              by {author}
            </div>
            
            <div className="flex items-center mt-auto pt-2 justify-between">
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-xs">{rating}</span>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                className="p-0 h-6 w-6"
                onClick={generateSummary}
              >
                <BookOpen className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription className="text-sm">by {author}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Generating summary...</p>
              </div>
            ) : (
              <div className="whitespace-pre-line">
                <h3 className="text-lg font-medium mb-2">Book Summary</h3>
                <p className="text-sm leading-relaxed">{summary}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HorizontalBookCard;
