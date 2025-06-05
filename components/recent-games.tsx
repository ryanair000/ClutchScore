"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Game {
  id: number;
  title: string;
  image: string;
  description: string;
  releaseYear: number;
  rating: number;
  trophyProgress: number;
  platinum: boolean;
  genre: string;
  multiplayerStatus: string;
}

export default function RecentGames() {
  const [activeTab, setActiveTab] = useState("recently-played");
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Game[] = await response.json();
        setGames(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleGameClick = (id: number) => {
    setSelectedGame(id === selectedGame ? null : id);
  };

  const filteredGames = activeTab === "recently-played" 
    ? games 
    : games.filter(game => game.platinum);

  if (isLoading) {
    return (
      <Card className="shadow-lg border-[#e5e7eb] flex items-center justify-center h-48">
        <p>Loading games...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg border-[#e5e7eb] flex items-center justify-center h-48 text-red-500">
        <p>Error: {error}</p>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-[#e5e7eb]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Your PlayStation Games</CardTitle>
        <CardDescription>View your recent games and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="recently-played">
              <Clock className="w-4 h-4 mr-2" /> 
              Recent
            </TabsTrigger>
            <TabsTrigger value="platinum">
              <Trophy className="w-4 h-4 mr-2" /> 
              Platinum
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedGame === game.id ? 'shadow-md' : 'hover:shadow-sm'
                    }`}
                    onClick={() => handleGameClick(game.id)}
                  >
                    <div className="flex">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={game.image}
                          alt={game.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="brightness-90"
                        />
                      </div>
                      <div className="p-3 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-sm">{game.title}</h3>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 inline mr-1" />
                            <span className="text-xs">{game.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span>{game.releaseYear}</span>
                          <span className="mx-1">•</span>
                          <span>{game.genre}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">Trophy Progress</span>
                            <span className="text-xs font-medium">{game.trophyProgress}%</span>
                          </div>
                          <Progress value={game.trophyProgress} className="h-1.5" />
                        </div>
                      </div>
                    </div>

                    {selectedGame === game.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 pb-3 border-t mt-2 pt-2"
                      >
                        <p className="text-xs text-gray-600 mb-2">{game.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {game.platinum && (
                            <Badge variant="outline" className="text-xs flex items-center gap-1 bg-yellow-50">
                              <Trophy className="w-3 h-3" /> Platinum
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            <Users className="w-3 h-3" /> {game.multiplayerStatus}
                          </Badge>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}