"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, GithubIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TowerControl as GameController } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/logo.png" alt="ClutchScore Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#0070CC] to-[#2EA9DF] bg-clip-text text-transparent">
                ClutchScore
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link href="/" className="text-gray-700 hover:text-[#0070CC] transition-colors font-medium">Home</Link></li>
              <li><Link href="/login" className="text-gray-700 hover:text-[#0070CC] transition-colors font-medium">Login</Link></li>
              <li><Link href="/signup" className="text-gray-700 hover:text-[#0070CC] transition-colors font-medium">Sign Up</Link></li>
              <li><Link href="/socials" className="text-gray-700 hover:text-[#0070CC] transition-colors font-medium">Socials</Link></li>
            </ul>
          </nav>
          
          <div className="flex items-center">
            <Button variant="outline" className="mr-2 hidden md:block"
              onClick={() => router.push('/chat')}>
              New Session
            </Button>
            <Button className="bg-[#0070CC] hover:bg-[#005da9] text-white hidden md:block"
              onClick={() => router.push('/chat')}>
              Start Chat
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-in fade-in slide-in-from-top duration-300">
            <ul className="space-y-4 px-2">
              <li><Link href="/" className="block text-gray-700 hover:text-[#0070CC] transition-colors font-medium">Home</Link></li>
              <li><Link href="/login" className="block text-gray-700 hover:text-[#0070CC] transition-colors font-medium">Login</Link></li>
              <li><Link href="/signup" className="block text-gray-700 hover:text-[#0070CC] transition-colors font-medium">Sign Up</Link></li>
              <li><Link href="/socials" className="block text-gray-700 hover:text-[#0070CC] transition-colors font-medium">Socials</Link></li>
              <li className="pt-2">
                <Button className="w-full bg-[#0070CC] hover:bg-[#005da9] text-white"
                  onClick={() => router.push('/chat')}>
                  Start Chat
                </Button>
              </li>
              <li className="pt-2">
                <Button variant="outline" className="w-full"
                  onClick={() => router.push('/chat')}>
                  New Session
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}