
import { useState, useEffect } from 'react';
import { JournalEntry } from './mental-health-report/types';
import TrendsSection from './TrendsSection';
import { getJournalEntries } from '@/services/supabaseService';
import JournalCard from './journal/JournalCard';
import JournalEntryForm from './journal/JournalEntryForm';

const RecommendedNextSteps = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

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

  const handleJournalSave = (entry: JournalEntry) => {
    // Update the local list with the new entry
    setJournalEntries(prev => [...prev, entry]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-4">Mental Well-being</h2>
        
        <div className="space-y-3">
          <JournalCard>
            <JournalEntryForm onSave={handleJournalSave} />
          </JournalCard>
        </div>
      </div>

      {/* Trends Section with Journal Entries */}
      <TrendsSection journalEntries={journalEntries} />
    </div>
  );
};

export default RecommendedNextSteps;
