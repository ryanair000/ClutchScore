"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { SendIcon, GamepadIcon, Trophy, Users, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatMessage from '@/components/chat-message';
import { motion, AnimatePresence } from 'framer-motion';
import { PacmanLoader } from "react-spinners";
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// Retrieve API key from environment variable
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

// Sample data for initial messages
const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your PlayStation gaming assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date().toISOString(),
  },
];

// Sample suggestions for initial prompts
const suggestions = [
  "How do I beat the final boss in God of War Ragnarök?",
  "What are the missable trophies in Ghost of Tsushima?",
  "Can you recommend games similar to Horizon Forbidden West?",
  "How do I set up multiplayer in Gran Turismo 7?"
];

export default function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('chat');
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const scrollToBottom = () => {
    setTimeout(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Increment user message count
    setUserMessageCount(prevCount => prevCount + 1);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage], apiKey: OPENAI_API_KEY }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: messages.length + 2,
        content: data.response, // Assuming the API returns { response: "AI message" }
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        content: 'Oops! Something went wrong. Please try again.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Check if user is unauthenticated and has sent 5 messages
      if (!session && userMessageCount + 1 >= 5) { // +1 because state updates are async
        setShowSignUpPrompt(true);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <Card className="relative flex flex-col shadow-lg border-[#e5e7eb] flex-1 justify-between">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full flex flex-col flex-1">
        <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
          <TabsTrigger value="chat" className="data-[state=active]:bg-white">
            <GamepadIcon className="w-4 h-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="trophies" className="data-[state=active]:bg-white">
            <Trophy className="w-4 h-4 mr-2" />
            Trophies
          </TabsTrigger>
          <TabsTrigger value="multiplayer" className="data-[state=active]:bg-white">
            <Users className="w-4 h-4 mr-2" />
            Multiplayer
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex-1 flex flex-col h-full m-0">
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChatMessage message={message} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3 py-2"
              >
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow">
                  <GamepadIcon className="h-4 w-4" />
                </div>
                <PacmanLoader size={15} color="#0070CC" />
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showSignUpPrompt && !session && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-4 py-4 mt-4 bg-yellow-50 border-y border-yellow-200 text-yellow-800 text-center"
            >
              <p className="mb-2 text-sm font-semibold">
                You've reached your message limit as a guest. Sign up to get 50 chat credits!
              </p>
              <Link href="/signup">
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Sign Up Now
                </Button>
              </Link>
            </motion.div>
          )}

          {messages.length === 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-4 pt-4 mt-4"
            >
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <HelpCircle className="w-4 h-4 mr-1" /> Try asking
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto py-2 text-sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ask about game walkthroughs, trophies, or tips..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isLoading}
                className={cn(
                  "bg-[#0070CC] hover:bg-[#005da9] text-white",
                  (inputValue.trim() === '' || isLoading) && "opacity-50 cursor-not-allowed"
                )}
              >
                {isLoading ? <PacmanLoader size={15} color="#0070CC" /> : <SendIcon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="trophies" className="h-full flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <Trophy className="mx-auto h-12 w-12 text-[#0070CC] mb-4" />
            <h3 className="text-xl font-bold mb-2">Trophy Insights</h3>
            <p className="text-muted-foreground mb-4">
              Chat with the AI to get trophy guides and achievement help for your PlayStation games.
            </p>
            <Button onClick={() => setCurrentTab('chat')} className="bg-[#0070CC] hover:bg-[#005da9] text-white">
              Start a conversation
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="multiplayer" className="h-full flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <Users className="mx-auto h-12 w-12 text-[#0070CC] mb-4" />
            <h3 className="text-xl font-bold mb-2">Multiplayer Tips</h3>
            <p className="text-muted-foreground mb-4">
              Get advice on multiplayer setups, strategies, and finding teammates for your favorite games.
            </p>
            <Button onClick={() => setCurrentTab('chat')} className="bg-[#0070CC] hover:bg-[#005da9] text-white">
              Start a conversation
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}