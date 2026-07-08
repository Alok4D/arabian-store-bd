import React from 'react';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-8 h-8 text-gray-800" />
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mb-4">
          <Settings className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Store Settings</h2>
        <p className="text-gray-500 max-w-md">This page is under construction. Soon you will be able to configure your store preferences here.</p>
      </div>
    </div>
  );
}
