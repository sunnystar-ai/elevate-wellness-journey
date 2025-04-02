
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Brain, Star, Send } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useToast } from '@/hooks/use-toast';
import { JournalEntry } from '@/components/dashboard/mental-health-report/types';
import { saveJournalEntry } from '@/services/supabaseService';
import { generateAndSaveWellnessInsight } from '@/services/wellnessInsightService';

const JournalPrompt = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [journalEntry, setJournalEntry] = useState<JournalEntry>({
    feelings: '',
    thoughtProcess: '',
    gratitude: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (section: 'feelings' | 'thoughtProcess' | 'gratitude', value: string) => {
    setJournalEntry(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleSubmit = async () => {
    // Check if all fields have content
    if (!journalEntry.feelings || !journalEntry.thoughtProcess || !journalEntry.gratitude) {
      toast({
        title: "Incomplete Entry",
        description: "Please fill out all three sections of your journal entry.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);

      // Save to Supabase
      await saveJournalEntry(journalEntry);
      
      // After saving the journal entry, trigger wellness insight generation
      // We'll use 'day' as the default period
      try {
        await generateAndSaveWellnessInsight('day', 'physical-emotional');
        console.log('Daily wellness insight generated automatically');
      } catch (insightError) {
        console.error('Error auto-generating wellness insight:', insightError);
        // We don't show this error to the user since it's a background process
      }
      
      toast({
        title: "Journal Entry Saved",
        description: "Your journal entry has been saved successfully and your insights have been updated.",
        variant: "default"
      });
      
      // Navigate to dashboard which will display the updated insights
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving journal entry:', error);
      
      toast({
        title: "Save Failed",
        description: "There was an error saving your journal entry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-transition pb-20">
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

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSubmit}
            className="w-full md:w-auto"
            disabled={submitting}
          >
            <Send className="h-4 w-4 mr-2" />
            {submitting ? 'Saving...' : 'Submit Journal Entry'}
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default JournalPrompt;
