
import { Route } from 'react-router-dom';
import JournalPrompt from '@/pages/JournalPrompt';

const JournalPromptRoute = () => {
  return <Route path="/journal-prompt" element={<JournalPrompt />} />;
};

export default JournalPromptRoute;
