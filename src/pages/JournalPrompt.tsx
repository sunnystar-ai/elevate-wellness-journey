
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Heart, Brain, Star, CheckCircle, Send } from 'lucide-react';
import BottomNav from '@/components/my-journey/BottomNav';
import { useToast } from '@/hooks/use-toast';

const JournalPrompt = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [journalEntry, setJournalEntry] = useState({
    feelings: '',
    thoughtProcess: '',
    gratitude: ''
  });

  const handleInputChange = (section: 'feelings' | 'thoughtProcess' | 'gratitude', value: string) => {
    setJournalEntry(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleSubmit = () => {
    // Check if all fields have content
    if (!journalEntry.feelings || !journalEntry.thoughtProcess || !journalEntry.gratitude) {
      toast({
        title: "Incomplete Entry",
        description: "Please fill out all three sections of your journal entry.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save the journal entry to your backend
    console.log('Journal entry submitted:', journalEntry);
    
    // Show success message
    toast({
      title: "Journal Entry Saved",
      description: "Your journal entry has been saved successfully.",
      variant: "default"
    });
    
    // Navigate back to the dashboard or journal list
    navigate('/dashboard');
  };

  return (
    <div className="page-transition pb-20">
      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 p-2 bg-background/80 backdrop-blur-sm border-b border-border flex justify-between items-center text-xs">
        <span>{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
        <div className="flex items-center gap-2">
          <span>100%</span>
        </div>
      </div>

      <div className="sticky top-6 z-40 p-4 flex justify-between items-center bg-background">
        <div>
          <div className="text-lg font-semibold">Today's Journal Prompt</div>
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="container px-4 mx-auto relative pt-2 space-y-6">
        {/* Feelings Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-harmony-peach" />
            <h2 className="text-lg font-medium">How are you feeling today?</h2>
          </div>
          <Textarea 
            placeholder="Express your feelings and emotions..." 
            value={journalEntry.feelings}
            onChange={(e) => handleInputChange('feelings', e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Thought Process Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-harmony-lavender" />
            <h2 className="text-lg font-medium">What's on your mind?</h2>
          </div>
          <Textarea 
            placeholder="Share your thoughts, ideas, or reflections..." 
            value={journalEntry.thoughtProcess}
            onChange={(e) => handleInputChange('thoughtProcess', e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Gratitude Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-harmony-mint" />
            <h2 className="text-lg font-medium">What are you grateful for today?</h2>
          </div>
          <Textarea 
            placeholder="List things you're thankful for..." 
            value={journalEntry.gratitude}
            onChange={(e) => handleInputChange('gratitude', e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSubmit}
            className="w-full md:w-auto"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Journal Entry
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default JournalPrompt;
