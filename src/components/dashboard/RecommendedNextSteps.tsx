
import { useState, useEffect } from 'react';
import { CheckCircle2, Heart, Brain, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { JournalEntry } from './mental-health-report/types';
import TrendsSection from './TrendsSection';

const RecommendedNextSteps = () => {
  const { toast } = useToast();
  const [journalEntry, setJournalEntry] = useState<JournalEntry>({
    feelings: '',
    thoughtProcess: '',
    gratitude: ''
  });
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  // Load saved journal entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        setJournalEntries(parsedEntries);
      } catch (error) {
        console.error('Error parsing saved journal entries:', error);
      }
    }
  }, []);

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

    // Create new journal entry with current date
    const newEntry = {
      ...journalEntry,
      date: new Date().toISOString(),
    };

    // Add the new entry to the existing entries
    const updatedEntries = [...journalEntries, newEntry];
    setJournalEntries(updatedEntries);

    // Save to localStorage (in a real app, would save to backend)
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    // Here you would typically save the journal entry to your backend
    console.log('Journal entry submitted:', newEntry);
    
    // Show success message
    toast({
      title: "Journal Entry Saved",
      description: "Your journal entry has been saved successfully and your report has been updated.",
      variant: "default"
    });
    
    // Reset the form
    setJournalEntry({
      feelings: '',
      thoughtProcess: '',
      gratitude: ''
    });
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
              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleSubmit}
                  className="w-full md:w-auto"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Journal Entry
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
