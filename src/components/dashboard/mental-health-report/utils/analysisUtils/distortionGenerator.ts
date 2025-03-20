
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
      type: 'All-or-Nothing Thinking',
      description: 'Seeing things in black and white categories. If a situation falls short of perfect, it is a total failure.',
      frequency: 1,
      example: 'Using words like "always" or "never"'
    });
  }

  // Example: Overgeneralization
  if (combinedText.includes('nothing good ever happens')) {
    distortions.push({
      type: 'Overgeneralization',
      description: 'Drawing sweeping conclusions based on a single event. Using words like "always" or "never" when they are not true.',
      frequency: 1,
      example: 'Phrase like "nothing good ever happens"'
    });
  }

  // Example: Mental Filter
  if (sentimentResult.negative.length > sentimentResult.positive.length) {
    distortions.push({
      type: 'Mental Filter',
      description: 'Dwelling on the negatives and ignoring the positives. Focusing on the bad and filtering out the good.',
      frequency: 1,
      example: 'More negative than positive language'
    });
  }

  // Example: Disqualifying the Positive
  if (combinedText.includes('but')) {
    distortions.push({
      type: 'Disqualifying the Positive',
      description: 'Rejecting positive experiences by insisting they "don\'t count" for some reason. Maintaining a negative belief despite contradictory evidence.',
      frequency: 1,
      example: 'Using "but" to invalidate positives'
    });
  }

  // Example: Jumping to Conclusions (Mind Reading)
  if (combinedText.includes('I know they')) {
    distortions.push({
      type: 'Jumping to Conclusions (Mind Reading)',
      description: 'Assuming that you know what people are thinking without having sufficient evidence to back it up.',
      frequency: 1,
      example: 'Phrases like "I know they..."'
    });
  }

  // Example: Magnification (Catastrophizing) or Minimization
  if (combinedText.includes('worst thing')) {
    distortions.push({
      type: 'Magnification (Catastrophizing) or Minimization',
      description: 'Exaggerating the importance of things (such as your mistakes or someone else\'s achievements) or inappropriately shrinking things until they appear tiny (your own desirable qualities or other people\'s imperfections).',
      frequency: 1,
      example: 'Phrases like "worst thing"'
    });
  }

  // Example: Emotional Reasoning
  if (feelings.includes('feel')) {
    distortions.push({
      type: 'Emotional Reasoning',
      description: 'Assuming that your negative emotions necessarily reflect the way things really are: "I feel it, therefore it must be true."',
      frequency: 1,
      example: 'Basing conclusions on feelings'
    });
  }

  // Example: Should Statements
  if (thoughtProcess.includes('should')) {
    distortions.push({
      type: 'Should Statements',
      description: 'Trying to motivate yourself with shoulds and shouldn\'ts, as if you had to be whipped and punished before you could be expected to do anything. "Musts" and "oughts" are also offenders. The emotional consequence is guilt. When you direct should statements toward others, you feel anger, frustration, and resentment.',
      frequency: 1,
      example: 'Use of "should" statements'
    });
  }

  // Example: Labeling and Mislabeling
  if (combinedText.includes('I am a')) {
    distortions.push({
      type: 'Labeling and Mislabeling',
      description: 'An extreme form of overgeneralization. Instead of describing your error, you attach a negative label to yourself: "I\'m a loser." Mislabeling involves describing an event with language that is highly colored and emotionally loaded.',
      frequency: 1,
      example: 'Phrases like "I am a..."'
    });
  }

  // Example: Personalization
  if (thoughtProcess.includes('my fault')) {
    distortions.push({
      type: 'Personalization',
      description: 'Seeing yourself as the cause of some negative external event which in fact you were not primarily responsible for.',
      frequency: 1,
      example: 'Phrases like "my fault"'
    });
  }

  return distortions;
}
