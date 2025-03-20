
import { TimeFrame } from '../types';

export const hasEnoughData = (journalEntries: any[], timeFrame: TimeFrame): boolean => {
  // We should always show data if there's at least one journal entry
  if (journalEntries.length > 0) {
    return true;
  }
  
  return false;
};
