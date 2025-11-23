import React from "react";
import type { ReactNode } from "react";
import "@/app/globals.css";
import PassengerHeader from "@/components/dashboard/passenger/PassengerHeader";

export const metadata = {
  title: "Passenger Dashboard - RwaRide",
};

export default function PassengerLayout({ children }: { children: ReactNode }) {
  const mockUser = { name: "Passenger" };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <PassengerHeader user={mockUser} />
      <main className="container mx-auto px-4 py-8 ">{children}</main>
    </div>
  );
}
