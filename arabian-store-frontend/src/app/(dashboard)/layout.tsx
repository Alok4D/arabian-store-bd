"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

import '../globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#f3f4f6]">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          {/* Main Content Wrapper */}
          <div className="lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
            <Header setSidebarOpen={setSidebarOpen} />
            
            <main className="flex-1 p-4 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
