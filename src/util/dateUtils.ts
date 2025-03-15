
export const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) return 'Good morning';
  if (hours < 18) return 'Good afternoon';
  return 'Good evening';
};

export const getFormattedDate = () => {
  const today = new Date();
  return today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const getFormattedTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const quotes = [
  "Take care of your body. It's the only place you have to live.",
  "The greatest wealth is health.",
  "Wellness is the complete integration of body, mind, and spirit.",
  "Health is a state of complete harmony of the body, mind, and spirit.",
  "The part can never be well unless the whole is well.",
  "Your body hears everything your mind says.",
  "Good health is not something we can buy. However, it can be an extremely valuable savings account.",
  "A healthy outside starts from the inside.",
  "The groundwork for all happiness is good health.",
  "Physical fitness is the first requisite of happiness."
];

export const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return quotes[dayOfYear % quotes.length];
};
