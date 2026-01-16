import React from 'react';
import { Grip } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 right-0 p-4 z-50">
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
          <a href="#" className="text-sm font-medium text-gray-600 hover:underline">Gmail</a>
        </button>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
          <a href="#" className="text-sm font-medium text-gray-600 hover:underline">Images</a>
        </button>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
          <Grip size={20} />
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-[2px] cursor-pointer hover:ring-4 hover:ring-indigo-100 transition-all">
          <img 
            src="https://picsum.photos/seed/user/100/100" 
            alt="User" 
            className="rounded-full h-full w-full border-2 border-white"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};
