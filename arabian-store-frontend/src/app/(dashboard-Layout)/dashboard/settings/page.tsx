"use client";

import { Settings } from "lucide-react";
import { useGetProfileQuery } from "@/lib/feature/auth/authApi";
import { useGetShippingQuery } from "@/lib/feature/shipping/shippingApi";
import ProfileSettings from "./components/ProfileSettings";
import SecuritySettings from "./components/SecuritySettings";
import ShippingSettings from "./components/ShippingSettings";

export default function SettingsPage() {
  
  const { isLoading: isLoadingProfile } = useGetProfileQuery({});
  const { isLoading: isLoadingShipping } = useGetShippingQuery({});

  const isLoading = isLoadingProfile || isLoadingShipping;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse max-w-full">
        {/* Heading skeleton */}
        <div className="h-9 w-40 bg-neutral-200 rounded-md" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Settings skeleton */}
          <div className="border border-neutral-200 rounded-xl p-6 space-y-4">
            <div className="h-5 w-36 bg-neutral-200 rounded" />
            <div className="h-4 w-56 bg-neutral-100 rounded" />
            {/* Avatar */}
            <div className="flex flex-col items-center gap-2 pb-2">
              <div className="w-24 h-24 rounded-full bg-neutral-200" />
              <div className="h-3 w-32 bg-neutral-100 rounded" />
            </div>
            {/* Name input */}
            <div className="space-y-2">
              <div className="h-4 w-12 bg-neutral-200 rounded" />
              <div className="h-10 w-full bg-neutral-100 rounded-md" />
            </div>
            {/* Email input */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-neutral-200 rounded" />
              <div className="h-10 w-full bg-neutral-100 rounded-md" />
            </div>
            {/* Button */}
            <div className="h-10 w-full bg-neutral-200 rounded-md mt-4" />
          </div>

          {/* Security Settings skeleton */}
          <div className="border border-neutral-200 rounded-xl p-6 space-y-4">
            <div className="h-5 w-24 bg-neutral-200 rounded" />
            <div className="h-4 w-48 bg-neutral-100 rounded" />
            {/* 3 password inputs */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-32 bg-neutral-200 rounded" />
                <div className="h-10 w-full bg-neutral-100 rounded-md" />
              </div>
            ))}
            <div className="h-10 w-full bg-neutral-200 rounded-md mt-4" />
          </div>

          {/* Shipping Settings skeleton */}
          <div className="border border-neutral-200 rounded-xl p-6 space-y-4">
            <div className="h-5 w-36 bg-neutral-200 rounded" />
            <div className="h-4 w-52 bg-neutral-100 rounded" />
            {/* 2 number inputs */}
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-28 bg-neutral-200 rounded" />
                <div className="h-10 w-full bg-neutral-100 rounded-md" />
              </div>
            ))}
            <div className="h-10 w-full bg-neutral-200 rounded-md mt-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#2D251E] flex items-center gap-2">
          <Settings className="w-8 h-8" /> Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProfileSettings />
        <SecuritySettings />
        <ShippingSettings />
      </div>
    </div>
  );
}
