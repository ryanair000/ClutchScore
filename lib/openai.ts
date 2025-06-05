// This is a simple implementation of OpenAI API calls
// In a production app, you would want to use environment variables for your API key

import { ChatCompletionRequestMessage } from '@/types/openai';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateChatCompletion(
  messages: ChatCompletionRequestMessage[],
  apiKey: string,
  options = {
    model: 'gpt-4',
    temperature: 0.7,
    max_tokens: 1000,
  }
) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: options.model,
        messages,
        temperature: options.temperature,
        max_tokens: options.max_tokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating chat completion:', error);
    throw error;
  }
}