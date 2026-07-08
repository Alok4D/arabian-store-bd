import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">
          Welcome to Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-[#e35a34] outline-none transition-all w-64"
          />
        </div>
        
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center cursor-pointer">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
