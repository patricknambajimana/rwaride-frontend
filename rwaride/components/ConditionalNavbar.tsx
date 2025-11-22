"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname() || "/";

  // Hide the global Navbar on passenger dashboard routes
  if (pathname.startsWith("/dashboard/passenger")) return null;

  return <Navbar />;
}
