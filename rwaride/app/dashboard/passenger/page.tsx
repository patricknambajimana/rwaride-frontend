"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PassengerDashboard } from "./PassengerDashboard";

export default function PassengerDashboardPage() {
  const router = useRouter();

  // TODO: replace with real auth/user fetching
  const mockUser = { name: "Passenger", email: "passenger@example.com" };

  const handleLogout = () => {
    // placeholder: navigate to home or login
    router.push("/");
  };

  const PD = PassengerDashboard as any;

  return <PD user={mockUser} onLogout={handleLogout} />;

}
