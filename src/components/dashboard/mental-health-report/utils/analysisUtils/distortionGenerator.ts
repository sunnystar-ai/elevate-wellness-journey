import { JournalEntry, CognitiveDistortion } from '../../types';
import { SentimentResult } from './types';

// Function to extract cognitive distortions from journal entry
export function extractDistortions(entry: JournalEntry, sentimentResult: SentimentResult): CognitiveDistortion[] {
  const { feelings, thoughtProcess, gratitude } = entry;
  const combinedText = `${feelings} ${thoughtProcess} ${gratitude}`;
  const distortions: CognitiveDistortion[] = [];

  // Example: All-or-Nothing Thinking
  if (combinedText.includes('always') || combinedText.includes('never')) {
    distortions.push({
      name: 'All-or-Nothing Thinking',
      description: 'Seeing things in black and white categories. If a situation falls short of perfect, it is a total failure.'
    });
  }

  // Example: Overgeneralization
  if (combinedText.includes('nothing good ever happens')) {
    distortions.push({
      name: 'Overgeneralization',
      description: 'Drawing sweeping conclusions based on a single event. Using words like "always" or "never" when they are not true.'
    });
  }

  // Example: Mental Filter
  if (sentimentResult.negative.length > sentimentResult.positive.length) {
    distortions.push({
      name: 'Mental Filter',
      description: 'Dwelling on the negatives and ignoring the positives. Focusing on the bad and filtering out the good.'
    });
  }

  // Example: Disqualifying the Positive
  if (combinedText.includes('but')) {
    distortions.push({
      name: 'Disqualifying the Positive',
      description: 'Rejecting positive experiences by insisting they "don\'t count" for some reason. Maintaining a negative belief despite contradictory evidence.'
    });
  }

  // Example: Jumping to Conclusions (Mind Reading)
  if (combinedText.includes('I know they')) {
    distortions.push({
      name: 'Jumping to Conclusions (Mind Reading)',
      description: 'Assuming that you know what people are thinking without having sufficient evidence to back it up.'
    });
  }

  // Example: Magnification (Catastrophizing) or Minimization
  if (combinedText.includes('worst thing')) {
    distortions.push({
      name: 'Magnification (Catastrophizing) or Minimization',
      description: 'Exaggerating the importance of things (such as your mistakes or someone else\'s achievements) or inappropriately shrinking things until they appear tiny (your own desirable qualities or other people\'s imperfections).'
    });
  }

  // Example: Emotional Reasoning
  if (feelings.includes('feel')) {
    distortions.push({
      name: 'Emotional Reasoning',
      description: 'Assuming that your negative emotions necessarily reflect the way things really are: "I feel it, therefore it must be true."'
    });
  }

  // Example: Should Statements
  if (thoughtProcess.includes('should')) {
    distortions.push({
      name: 'Should Statements',
      description: 'Trying to motivate yourself with shoulds and shouldn\'ts, as if you had to be whipped and punished before you could be expected to do anything. "Musts" and "oughts" are also offenders. The emotional consequence is guilt. When you direct should statements toward others, you feel anger, frustration, and resentment.'
    });
  }

  // Example: Labeling and Mislabeling
  if (combinedText.includes('I am a')) {
    distortions.push({
      name: 'Labeling and Mislabeling',
      description: 'An extreme form of overgeneralization. Instead of describing your error, you attach a negative label to yourself: "I\'m a loser." Mislabeling involves describing an event with language that is highly colored and emotionally loaded.'
    });
  }

  // Example: Personalization
  if (thoughtProcess.includes('my fault')) {
    distortions.push({
      name: 'Personalization',
      description: 'Seeing yourself as the cause of some negative external event which in fact you were not primarily responsible for.'
    });
  }

  return distortions;
}
