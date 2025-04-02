
import { useState, useEffect } from 'react';
import { CheckCircle2, Heart, Brain, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { JournalEntry } from './mental-health-report/types';
import TrendsSection from './TrendsSection';
import { saveJournalEntry, getJournalEntries } from '@/services/supabaseService';
import { useNavigate } from 'react-router-dom';

const RecommendedNextSteps = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [journalEntry, setJournalEntry] = useState<JournalEntry>({
    feelings: '',
    thoughtProcess: '',
    gratitude: ''
  });
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Load saved journal entries from Supabase on component mount
  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const entries = await getJournalEntries('month');
        // Transform the data structure if needed to match JournalEntry type
        const formattedEntries = entries.map(entry => ({
          feelings: entry.feelings,
          thoughtProcess: entry.thought_process,
          gratitude: entry.gratitude
        }));
        setJournalEntries(formattedEntries);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };

    fetchJournalEntries();
  }, []);

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
      
      // Show success message
      toast({
        title: "Journal Entry Saved",
        description: "Your journal entry has been saved successfully and your report has been updated.",
        variant: "default"
      });
      
      // Update the local list with the new entry
      setJournalEntries(prev => [...prev, journalEntry]);
      
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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Mental Well-being</h2>
        
        <div className="space-y-3">
          <div 
            className="rounded-lg bg-white shadow-sm transition-all duration-300"
            style={{ 
              animation: 'fade-in 0.5s ease-out backwards' 
            }}
          >
            <div className="p-3">
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-full bg-harmony-light-lavender">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-grow mr-2">
                  <div className="font-medium">Complete Today's Journal Prompt</div>
                </div>
              </div>
            </div>
            
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
          </div>
        </div>
      </div>

      {/* Trends Section with Journal Entries */}
      <TrendsSection journalEntries={journalEntries} />
    </div>
  );
};

export default RecommendedNextSteps;
