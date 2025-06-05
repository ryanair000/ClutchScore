export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ClutchScore. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              ClutchScore: AI-Powered Insights for the Ultimate Gamer
            </p>
          </div>
          <div className="flex flex-col items-center mt-4 md:mt-0">
            <p className="text-sm text-gray-500 mb-2">Developed by</p>
            <img src="/images/qybrrlabs.png" alt="QybrrLabs Logo" className="h-8" />
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-[#0070CC] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}