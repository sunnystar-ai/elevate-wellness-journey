
import { useState } from 'react';
import { Heart, Brain, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { JournalEntry } from '../mental-health-report/types';
import { saveJournalEntry } from '@/services/supabaseService';
import { generateAndSaveWellnessInsight } from '@/services/wellnessInsightService';
import { useNavigate } from 'react-router-dom';

interface JournalEntryFormProps {
  onSave: (entry: JournalEntry) => void;
}

const JournalEntryForm = ({ onSave }: JournalEntryFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
      
      // Show success message
      toast({
        title: "Journal Entry Saved",
        description: "Your journal entry has been saved successfully and your insights have been updated.",
        variant: "default"
      });
      
      // Notify parent component to update the list
      onSave(journalEntry);
      
      // Reset the form
      setJournalEntry({
        feelings: '',
        thoughtProcess: '',
        gratitude: ''
      });

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

  const navigateToJournalPrompt = () => {
    navigate('/journal-prompt');
  };

  return (
    <div className="p-4 space-y-4 border-t border-gray-100">
      {/* Feelings Section */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Heart className="h-4 w-4 text-harmony-peach" />
          <h3 className="text-sm font-medium">How are you feeling today?</h3>
        </div>
        <Textarea 
          placeholder="Express your feelings and emotions..." 
          value={journalEntry.feelings}
          onChange={(e) => handleInputChange('feelings', e.target.value)}
          className="min-h-[60px]"
        />
      </div>

      {/* Thought Process Section */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Brain className="h-4 w-4 text-harmony-lavender" />
          <h3 className="text-sm font-medium">What's on your mind?</h3>
        </div>
        <Textarea 
          placeholder="Share your thoughts, ideas, or reflections..." 
          value={journalEntry.thoughtProcess}
          onChange={(e) => handleInputChange('thoughtProcess', e.target.value)}
          className="min-h-[60px]"
        />
      </div>

      {/* Gratitude Section */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-harmony-mint" />
          <h3 className="text-sm font-medium">What are you grateful for today?</h3>
        </div>
        <Textarea 
          placeholder="List things you're thankful for..." 
          value={journalEntry.gratitude}
          onChange={(e) => handleInputChange('gratitude', e.target.value)}
          className="min-h-[60px]"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-between pt-2">
        <Button 
          variant="outline"
          onClick={navigateToJournalPrompt}
        >
          Open Full Journal
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={submitting}
        >
          <Send className="h-4 w-4 mr-2" />
          {submitting ? 'Saving...' : 'Submit Entry'}
        </Button>
      </div>
    </div>
  );
};

export default JournalEntryForm;
