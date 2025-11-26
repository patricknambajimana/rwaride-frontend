"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Car, BarChart3, LogOut, CheckCircle } from "lucide-react";
import api from "@/app/utils/api";
import { StatsCard } from "@/components/dashboard/Admin/StatsCard";
import UsersTable from "@/components/dashboard/Admin/UsersTable";
import TripsTable from "@/components/dashboard/Admin/TripsTable";
import EmptyState from "@/components/dashboard/Admin/EmptyState";

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export default AdminDashboard;

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrips: 0,
    totalBookings: 0,
    activeTrips: 0,
  });
  const [users, setUsers] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchTrips();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.fetchAdminStats();
      setStats(res.stats || stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.fetchAllUsers();
      setUsers(res.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTrips = async () => {
    try {
      const res = await api.fetchAllTrips();
      setTrips(res.trips || []);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const handleSuspendUser = async (userId: string) => {
    if (!confirm("Are you sure you want to suspend this user?")) return;

    try {
      const resp = await api.suspendUser(userId);
      if (resp?.success) {
        alert("User suspended successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      const resp = await api.activateUser(userId);
      if (resp?.success) {
        alert("User activated successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span>RwaRide Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="w-8 h-8 text-green-500" />}
          />
          <StatsCard
            title="Total Trips"
            value={stats.totalTrips}
            icon={<Car className="w-8 h-8 text-blue-500" />}
          />
          <StatsCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<CheckCircle className="w-8 h-8 text-purple-500" />}
          />
          <StatsCard
            title="Active Trips"
            value={stats.activeTrips}
            icon={<BarChart3 className="w-8 h-8 text-orange-500" />}
          />
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="trips">Trip Management</TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Manage platform users and their accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {users.length > 0 ? (
                  <UsersTable
                    users={users}
                    onSuspend={handleSuspendUser}
                    onActivate={handleActivateUser}
                  />
                ) : (
                  <EmptyState
                    icon={
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    }
                    message="No users found"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trips Management */}
          <TabsContent value="trips">
            <Card>
              <CardHeader>
                <CardTitle>All Trips</CardTitle>
                <CardDescription>
                  Monitor all trips on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {trips.length > 0 ? (
                  <TripsTable trips={trips} />
                ) : (
                  <EmptyState
                    icon={<Car className="w-12 h-12 mx-auto mb-4 opacity-50" />}
                    message="No trips found"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
