"use client";

import { useState, useEffect } from "react";
import { Bell, Check } from "lucide-react";
import { io, Socket } from "socket.io-client";
import Swal from 'sweetalert2';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
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
    // Fetch initial notifications
    const fetchNotifications = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/notifications`);
        const data = await res.json();
        
        if (data.success && data.data) {
          const fetchedNotifications = data.data.map((item: any) => ({
            id: item.id,
            message: item.message,
            time: item.createdAt
          }));
          setNotifications(fetchedNotifications);
          if (fetchedNotifications.length > 0) {
            setHasUnread(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };
    
    fetchNotifications();

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
        position: 'top',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMarkAllRead = async () => {
    setHasUnread(false);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await fetch(`${apiUrl}/api/notifications/mark-all-read`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error("Failed to mark notifications as read", error);
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative shrink-0 w-10 h-10 rounded-sm bg-indigo-50/50 hover:bg-indigo-100/50 transition-colors mr-2">
          <Bell className="h-5 w-5 text-indigo-600" />
          {hasUnread && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden shadow-lg border-neutral-200 rounded-md bg-white">
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-indigo-600" />
            <span className="font-semibold text-sm text-slate-900">Notifications</span>
          </div>
          {hasUnread && notifications.length > 0 && (
            <button 
              onClick={handleMarkAllRead}
              className="flex items-center text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Check className="w-3.5 h-3.5 mr-1" /> Mark all as read
            </button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="px-4 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 cursor-default bg-white">
                <p className="text-sm text-slate-800">{notification.message}</p>
                <p className="text-xs text-slate-400 mt-1.5">{formatTime(notification.time)}</p>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
