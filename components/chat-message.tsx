"use client";

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { GamepadIcon, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [formattedTime, setFormattedTime] = useState('');
  
  useEffect(() => {
    try {
      setFormattedTime(format(new Date(message.timestamp), 'h:mm a'));
    } catch (error) {
      setFormattedTime('');
    }
  }, [message.timestamp]);
  
  const isAi = message.sender === 'ai';

  return (
    <div className={cn(
      "flex items-start gap-3 py-4",
      isAi ? "" : "flex-row-reverse"
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
        isAi ? "bg-primary text-primary-foreground" : "bg-[#0070CC] text-white"
      )}>
        {isAi ? <GamepadIcon className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div className={cn(
        "flex flex-col gap-1 w-full max-w-[85%]",
        isAi ? "" : "items-end"
      )}>
        <div className={cn(
          "rounded-xl px-4 py-3 text-sm",
          isAi ? "bg-muted" : "bg-[#0070CC] text-white"
        )}>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        <span className="text-xs text-gray-400">{formattedTime}</span>
      </div>
    </div>
  );
}