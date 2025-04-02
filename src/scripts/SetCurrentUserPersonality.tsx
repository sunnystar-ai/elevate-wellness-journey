
import React, { useEffect, useState } from 'react';
import { saveMbtiResults, saveBigFiveResults } from '@/services/personalityService';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const SetCurrentUserPersonality = () => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const savePersonalityData = async () => {
    setSaving(true);
    try {
      // Set MBTI Type to INFJ for danine6688@gmail.com
      await saveMbtiResults("INFJ");
      
      // Set Big Five traits all to 50%
      await saveBigFiveResults({
        openness: 50,
        conscientiousness: 50,
        extraversion: 50,
        agreeableness: 50,
        neuroticism: 50
      });
      
      toast({
        title: "Personality Data Saved",
        description: "Your personality data has been saved successfully and will be used in wellness insights."
      });
      
      setSaved(true);
    } catch (error) {
      console.error("Error saving personality data:", error);
      toast({
        title: "Error Saving Data",
        description: "There was a problem saving your personality data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    // Upon component mount, automatically save the data
    savePersonalityData();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-2">Personality Data Setup</h3>
      
      {saved ? (
        <div className="text-green-600">
          Personality data has been saved successfully! MBTI Type: INFJ, Big Five traits all set to 50%.
        </div>
      ) : (
        <>
          <p className="mb-4">
            This utility will save MBTI Type (INFJ) and Big Five traits (all 50%) for the current user.
          </p>
          <Button 
            onClick={savePersonalityData} 
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Personality Data"}
          </Button>
        </>
      )}
    </div>
  );
};

export default SetCurrentUserPersonality;
