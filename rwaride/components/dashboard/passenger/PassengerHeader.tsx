"use client";

import React from "react";
import { MapPin, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PassengerHeader({ user }: { user?: any }) {
  const router = useRouter();

  const handleLogout = () => {
    // Placeholder: clear client auth state here (cookies, localStorage, etc.)
    // Then navigate to landing or auth page
    try {
      if (typeof window !== "undefined") {
        // example: localStorage.removeItem('token');
      }
    } finally {
      router.push("/");
    }
  };

  return (
    <header className="bg-[var(--primary-50)] border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[var(--primary-500)] p-2 rounded-lg">
            <MapPin className="w-5 h-5 text-[var(--white)]" />
          </div>
          <span className="font-semibold text-[var(--primary-900)]">
            RwaRide
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--muted-foreground)]">
            Welcome, {user?.name}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
