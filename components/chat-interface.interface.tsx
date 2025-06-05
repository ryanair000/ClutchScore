interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  user?: {
    name: string;
    image: string;
  };
}
