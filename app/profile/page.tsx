import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Gamepad2, Settings, MessageCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Card className="w-full max-w-4xl shadow-lg rounded-xl overflow-hidden mt-10">
        <CardHeader className="relative p-6 bg-gradient-to-r from-[#0070CC] to-[#2EA9DF] text-white flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-white dark:border-gray-800">
            <AvatarImage src="https://github.com/shadcn.png" alt="@username" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold">GamerTag123</CardTitle>
          <CardDescription className="text-gray-200 text-lg">Joined on January 1, 2023</CardDescription>
          <Button variant="secondary" className="mt-4 text-[#0070CC] hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold"><Trophy className="w-5 h-5 mr-2" />Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">No achievements yet. Start playing and earning!</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold"><Gamepad2 className="w-5 h-5 mr-2" />Recent Games</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">No recent games played.</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-sm col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold"><MessageCircle className="w-5 h-5 mr-2" />About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">Tell us something about yourself! What are your favorite games? What kind of player are you?</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 shadow-sm col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold"><Settings className="w-5 h-5 mr-2" />Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">Manage your account settings, privacy, and notifications here.</p>
              <Button className="mt-4 bg-[#0070CC] hover:bg-[#005da9] text-white">Go to Settings</Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </main>
  );
} 