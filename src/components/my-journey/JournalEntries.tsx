
import { Plus, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type JournalEntry = {
  date: string;
  mood: string;
  preview: string;
  hasAttachments: boolean;
};

const JournalEntries = () => {
  const journalEntries: JournalEntry[] = [
    { date: 'March 15, 2025', mood: 'Happy', preview: 'Today was incredibly productive. I managed to...', hasAttachments: true },
    { date: 'March 14, 2025', mood: 'Calm', preview: 'Morning meditation really helped center me today...', hasAttachments: false },
    { date: 'March 11, 2025', mood: 'Energetic', preview: 'After trying that new workout routine, I feel...', hasAttachments: true }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Journal Entries</h2>
        <Button variant="outline" size="sm" className="h-8">
          <Plus className="h-4 w-4 mr-1" />
          New Entry
        </Button>
      </div>
      <div className="space-y-3">
        {journalEntries.map((entry, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">{entry.date}</span>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{entry.mood}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{entry.preview}</p>
                </div>
                {entry.hasAttachments && (
                  <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                    <Camera className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JournalEntries;
