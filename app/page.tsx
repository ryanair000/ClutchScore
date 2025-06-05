import Header from '@/components/header';
import ChatInterface from '@/components/chat-interface';
import RecentGames from '@/components/recent-games';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
          <div className="lg:col-span-8 flex flex-col h-full">
            <ChatInterface />
          </div>
          <div className="lg:col-span-4">
            <RecentGames />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}