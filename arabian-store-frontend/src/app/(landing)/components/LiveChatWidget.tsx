"use client";
import React, { useState } from 'react';
import { X, Phone } from 'lucide-react';

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 hidden md:flex items-center justify-end h-[60px] ${isOpen ? 'w-[280px]' : 'w-[60px]'}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Expanded Icons */}
      <div 
        className={`flex items-center gap-3 transition-all duration-300 ease-in-out absolute right-[70px] ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
        }`}
      >
        <a href="tel:09666767673" className="w-[50px] h-[50px] rounded-full bg-[#00d366] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform">
          <Phone fill="currentColor" size={24} />
        </a>
        
        <a href="#" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] rounded-full bg-[#0084ff] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.898 1.488 5.483 3.825 7.14v3.602l3.491-1.916c.866.241 1.77.374 2.684.374 5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.094 12.39-2.883-3.076-5.632 3.076 6.196-6.58 2.923 3.075 5.59-3.075-6.194 6.58z"/></svg>
        </a>

        <a href="https://wa.me/8801403510331" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] rounded-full bg-[#25d366] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>

      {/* Tooltip & Main Button */}
      <div className="relative flex items-center">
   
        {/* Tooltip - Hide (Top) */}
        <div 
          className={`absolute bottom-full mb-3 right-1/2 translate-x-1/2 bg-white text-neutral-800 px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap font-medium text-[14px] transition-all duration-300 pointer-events-none flex items-center justify-center ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          Hide
          <div className="absolute -bottom-[4px] left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-white rotate-45 shadow-sm -z-10"></div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="w-[56px] h-[56px] rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-10"
        >
          {isOpen ? (
            <X size={28} strokeWidth={3} />
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 5.92 2 10.75C2 13.56 3.53 16.03 6 17.5V22L10.33 19.34C10.87 19.44 11.43 19.5 12 19.5C17.52 19.5 22 15.58 22 10.75C22 5.92 17.52 2 12 2ZM8 11.5C7.17 11.5 6.5 10.83 6.5 10C6.5 9.17 7.17 8.5 8 8.5C8.83 8.5 9.5 9.17 9.5 10C9.5 10.83 8.83 11.5 8 11.5ZM12 11.5C11.17 11.5 10.5 10.83 10.5 10C10.5 9.17 11.17 8.5 12 8.5C12.83 8.5 13.5 9.17 13.5 10C13.5 10.83 12.83 11.5 12 11.5ZM16 11.5C15.17 11.5 14.5 10.83 14.5 10C14.5 9.17 15.17 8.5 16 8.5C16.83 8.5 17.5 9.17 17.5 10C17.5 10.83 16.83 11.5 16 11.5Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
