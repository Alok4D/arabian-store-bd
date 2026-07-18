"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { io, Socket } from "socket.io-client";
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  message: string;
  time: string;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to notification server");
    });

    socket.on("newOrder", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      setHasUnread(true);
      
      Swal.fire({
        title: 'New Order!',
        text: data.message || 'You have received a new order.',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMarkAllRead = () => {
    setHasUnread(false);
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && handleMarkAllRead()}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative shrink-0 w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors mr-2">
          <Bell className="h-5 w-5 text-neutral-600" />
          {hasUnread && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden shadow-lg border-neutral-200">
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-50/80 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm text-neutral-800">Notifications</span>
          </div>
          {notifications.length > 0 && (
            <button 
              onClick={handleMarkAllRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-sm text-neutral-500">
              No new notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0 cursor-default">
                <p className="text-sm text-neutral-800">{notification.message}</p>
                <p className="text-xs text-neutral-400 mt-1">{formatTime(notification.time)}</p>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
