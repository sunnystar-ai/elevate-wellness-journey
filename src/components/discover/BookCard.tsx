
import React, { useState } from 'react';
import { BookOpen, Star, BookAudio, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  image: string;
  audioSample?: string;
}

const BookCard = ({ title, author, rating, reviewCount, image, audioSample }: BookCardProps) => {
  const [audioOpen, setAudioOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl overflow-hidden bg-card shadow-sm flex">
        <div className="w-1/3 h-24">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-medium">{title}</h3>
            <div className="text-xs text-muted-foreground mt-1">
              by {author}
            </div>
          </div>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-medium mr-1">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
            </div>
            <div className="ml-auto flex space-x-1">
              {audioSample && (
                <Button size="sm" variant="ghost" className="p-0 h-8 w-8" onClick={() => setAudioOpen(true)}>
                  <BookAudio className="h-4 w-4" />
                </Button>
              )}
              <Button size="sm" variant="ghost" className="p-0 h-8 w-8">
                <BookOpen className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {audioSample && (
        <Dialog open={audioOpen} onOpenChange={setAudioOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{title} - Audio Sample</span>
                <DialogClose className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <audio controls className="w-full">
                <source src={audioSample} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <p className="text-sm text-muted-foreground mt-2">
                Listening to an excerpt from "{title}" by {author}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default BookCard;
