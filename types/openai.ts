export interface ChatCompletionRequestMessage {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
}

export interface GameInfo {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  releaseDate: string;
  publisher: string;
  developer: string;
  genres: string[];
  platforms: string[];
  metacriticScore?: number;
  userScore?: number;
}

export interface TrophyInfo {
  id: number;
  name: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Ultra Rare';
  type: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  percentage: number;
  unlocked: boolean;
}

export interface MultiplayerInfo {
  hasMultiplayer: boolean;
  modes: string[];
  playerCount: {
    min: number;
    max: number;
  };
  features: string[];
  requiresSubscription: boolean;
}