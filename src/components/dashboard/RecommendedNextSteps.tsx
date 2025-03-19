
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Heart, Brain, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const RecommendedNextSteps = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
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
    
    // Reset the form and collapse it
    setJournalEntry({
      feelings: '',
      thoughtProcess: '',
      gratitude: ''
    });
    setExpanded(false);
  };

  const recommendations = [
    { 
      title: "Complete Today's Journal Prompt", 
      action: expanded ? "Close" : "Open", 
      icon: <CheckCircle2 className="h-4 w-4" />, 
      to: "/journal-prompt" 
    }
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Recommended Next Steps</h2>
      
      <div className="space-y-3">
        {recommendations.map((item, index) => (
          <div 
            key={item.title}
            className="rounded-lg bg-white shadow-sm transition-all duration-300"
            style={{ 
              animationDelay: `${index * 100}ms`, 
              animation: 'fade-in 0.5s ease-out backwards' 
            }}
          >
            <div 
              className="flex items-center p-3 cursor-pointer hover:shadow-md"
              onClick={() => setExpanded(!expanded)}
            >
              <div className="mr-3 p-2 rounded-full bg-harmony-light-lavender">
                {item.icon}
              </div>
              <div className="flex-grow mr-2">
                <div className="font-medium">{item.title}</div>
              </div>
              <Button size="sm">
                {item.action}
              </Button>
            </div>
            
            {expanded && (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedNextSteps;
