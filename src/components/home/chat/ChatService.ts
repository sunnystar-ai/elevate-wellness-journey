
import { Message } from './types';

export const sendChatMessage = async (messages: Message[], input: string, apiKey: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI specializing in cognitive behavioral therapy and positive psychology. 
          Your goal is to help users identify limiting beliefs and reframe them into more empowering perspectives.
          Be compassionate, insightful, and offer practical suggestions. Keep responses concise (max 3 paragraphs).`
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: input }
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
