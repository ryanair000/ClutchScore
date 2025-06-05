"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GamepadIcon, Trophy, Star, Calendar, Users, Clock, Share2 } from 'lucide-react';
import Image from 'next/image';

interface GameInfoProps {
  gameId: string;
}

export default function GameInfo({ gameId }: GameInfoProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // This would typically come from an API
  const gameData = {
    id: gameId,
    title: "God of War Ragnarök",
    description: "Embark on a mythic journey for answers and allies before Ragnarök arrives. Join Kratos and Atreus on a breathtaking journey through the Nine Realms as they face their destiny.",
    coverImage: "https://images.pexels.com/photos/14746492/pexels-photo-14746492.jpeg?auto=compress&cs=tinysrgb&w=600",
    releaseDate: "November 9, 2022",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment",
    genres: ["Action-Adventure", "RPG"],
    rating: 9.6,
    playtime: "25-40 hours",
    trophies: {
      total: 36,
      bronze: 18,
      silver: 11,
      gold: 6,
      platinum: 1,
      progress: 68
    },
    multiplayer: {
      available: false,
      modes: [],
      requiresPsPlus: false
    }
  };

  const trophyCategories = [
    { name: "Story", count: 15, progress: 100 },
    { name: "Combat", count: 8, progress: 75 },
    { name: "Collection", count: 9, progress: 45 },
    { name: "Misc", count: 4, progress: 25 }
  ];

  return (
    <Card className="shadow-lg border-[#e5e7eb]">
      <CardHeader className="relative p-0 overflow-hidden h-48">
        <Image
          src={gameData.coverImage}
          alt={gameData.title}
          fill
          style={{ objectFit: "cover" }}
          className="brightness-[0.7]"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <CardTitle className="text-white text-xl">{gameData.title}</CardTitle>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-white text-sm">{gameData.rating}</span>
            <span className="mx-2 text-white/80">•</span>
            <span className="text-white/80 text-sm">{gameData.releaseDate}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="overview">
              <GamepadIcon className="w-4 h-4 mr-2" /> 
              Overview
            </TabsTrigger>
            <TabsTrigger value="trophies">
              <Trophy className="w-4 h-4 mr-2" /> 
              Trophies
            </TabsTrigger>
            <TabsTrigger value="multiplayer">
              <Users className="w-4 h-4 mr-2" /> 
              Multiplayer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <p className="text-sm text-gray-600 mb-4">
              {gameData.description}
            </p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-xs">{gameData.releaseDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-xs">{gameData.playtime}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {gameData.genres.map((genre, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <div className="border-t pt-3 mt-3">
              <div className="text-xs text-gray-500 mb-1">Developer</div>
              <div className="text-sm mb-2">{gameData.developer}</div>
              
              <div className="text-xs text-gray-500 mb-1">Publisher</div>
              <div className="text-sm">{gameData.publisher}</div>
            </div>
          </TabsContent>
          
          <TabsContent value="trophies" className="mt-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-[#0070CC] mr-2" />
                <span className="font-medium">Trophy Progress</span>
              </div>
              <Badge variant="outline" className="flex items-center">
                {gameData.trophies.progress}%
              </Badge>
            </div>
            
            <Progress value={gameData.trophies.progress} className="h-2 mb-4" />
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#CD7F32] flex items-center justify-center mb-1">
                  <span className="text-white text-xs font-bold">{gameData.trophies.bronze}</span>
                </div>
                <span className="text-xs">Bronze</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#C0C0C0] flex items-center justify-center mb-1">
                  <span className="text-white text-xs font-bold">{gameData.trophies.silver}</span>
                </div>
                <span className="text-xs">Silver</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center mb-1">
                  <span className="text-white text-xs font-bold">{gameData.trophies.gold}</span>
                </div>
                <span className="text-xs">Gold</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#6A0DAD] flex items-center justify-center mb-1">
                  <span className="text-white text-xs font-bold">{gameData.trophies.platinum}</span>
                </div>
                <span className="text-xs">Platinum</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Trophy Categories</h4>
              {trophyCategories.map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">{category.name} ({category.count})</span>
                    <span className="text-xs">{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="multiplayer" className="mt-0">
            {gameData.multiplayer.available ? (
              <div>
                <div className="bg-green-50 rounded-lg p-3 mb-4 flex items-start">
                  <Users className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Multiplayer Available</h3>
                    <p className="text-xs text-green-700 mt-1">
                      This game supports online multiplayer features.
                      {gameData.multiplayer.requiresPsPlus && 
                        " PlayStation Plus subscription required."}
                    </p>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium mb-2">Multiplayer Modes</h3>
                <div className="space-y-2">
                  {gameData.multiplayer.modes.map((mode, index) => (
                    <div key={index} className="bg-gray-50 rounded p-2 text-sm">
                      {mode}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Users className="w-12 h-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-500">No Multiplayer</h3>
                <p className="text-sm text-gray-400 mt-1 max-w-xs">
                  This game does not have any multiplayer features and is designed as a single-player experience.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}