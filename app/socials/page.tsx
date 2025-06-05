import Link from "next/link";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "lucide-react";

export default function SocialsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-5xl font-bold mb-8">Connect with Us!</h1>
      <p className="text-lg mb-12 text-center max-w-2xl">
        Follow us on our social media platforms to stay updated with the latest news, game insights, and community events.
      </p>
      <div className="flex space-x-6">
        <Link href="https://github.com/DeveloperAspire/ClutchScoreAI" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-[#0070CC] dark:hover:text-[#2EA9DF] transition-colors">
          <GithubIcon className="h-10 w-10" />
        </Link>
        <Link href="#" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-[#0070CC] dark:hover:text-[#2EA9DF] transition-colors">
          <TwitterIcon className="h-10 w-10" />
        </Link>
        <Link href="#" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-[#0070CC] dark:hover:text-[#2EA9DF] transition-colors">
          <LinkedinIcon className="h-10 w-10" />
        </Link>
      </div>
      <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
        More social links coming soon!
      </p>
    </main>
  );
} 