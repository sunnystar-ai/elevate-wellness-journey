
import { TimeFrame } from '../types';

export const hasEnoughData = (journalEntries: any[], timeFrame: TimeFrame): boolean => {
  if (timeFrame === 'day') {
    return journalEntries.length > 0;
  }
  if (timeFrame === 'week') {
    return journalEntries.length >= 1; // Show weekly view even with just one entry
  }
  if (timeFrame === 'month') {
    return journalEntries.length >= 1; // Show monthly view even with just one entry
  }
  return false;
};
