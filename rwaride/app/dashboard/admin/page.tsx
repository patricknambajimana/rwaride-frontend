"use client";

import AdminDashboard from "@/components/dashboard/Admin/AdminDashboard";

export default function AdminPage() {
  const user = {
    id: "user_1",
    name: "Alice Admin",
    email: "alice@example.com",
  };
  const handleLogout = () => {
    // UI-only: no real auth; navigate to login or clear state if implemented
    alert("Logout clicked (UI-only)");
  };

  return <AdminDashboard user={user} onLogout={handleLogout} />;
}
