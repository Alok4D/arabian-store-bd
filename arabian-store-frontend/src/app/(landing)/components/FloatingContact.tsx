'use client';
import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Options Menu */}
      {isOpen && (
        <div className="flex flex-col gap-3 items-end mb-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <a href="tel:09666767673" className="flex items-center gap-3 group">
            <span className="bg-white text-neutral-600 text-[14px] px-4 py-2 rounded-full shadow-md font-medium border border-neutral-100">
              Call Us
            </span>
            <div className="w-14 h-14 rounded-full bg-[#00d084] text-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
              <Phone fill="currentColor" size={22} />
            </div>
          </a>
          
          <a href="https://m.me/yourpage" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
            <span className="bg-white text-neutral-600 text-[14px] px-4 py-2 rounded-full shadow-md font-medium border border-neutral-100">
              Messenger
            </span>
            <div className="w-14 h-14 rounded-full bg-[#0084ff] text-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
              <MessageCircle fill="currentColor" size={28} className="text-white" />
            </div>
          </a>
          
          <a href="https://wa.me/01403510331" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
            <span className="bg-white text-neutral-600 text-[14px] px-4 py-2 rounded-full shadow-md font-medium border border-neutral-100">
              WhatsApp
            </span>
            <div className="w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </div>
          </a>
        </div>
      )}

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 group focus:outline-none"
      >
        <div className="bg-white text-neutral-600 text-[15px] px-4 py-2.5 rounded-[12px] shadow-sm font-medium border border-neutral-100 transition-all">
          {isOpen ? "Close" : "Live Chat"}
        </div>
        <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] transform group-hover:scale-105 transition-transform">
          {isOpen ? (
            <X size={26} strokeWidth={2.5} />
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22L7.9 20Z" fill="white" />
              <circle cx="8" cy="12" r="1.5" fill="black" />
              <circle cx="12" cy="12" r="1.5" fill="black" />
              <circle cx="16" cy="12" r="1.5" fill="black" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
