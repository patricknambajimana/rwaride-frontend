"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Star,
  User,
  LogOut,
  MessageCircle,
} from "lucide-react";
import api from "@/app/utils/api";
import BookingCard from "@/components/dashboard/passenger/BookingCard";
import { ChatDialog } from "@/components/dashboard/passenger/ChatDialog";
import PassengerHeader from "@/components/dashboard/passenger/PassengerHeader";
import PassengerSearchForm from "@/components/dashboard/passenger/PassengerSearchForm";
import PassengerTripsList from "@/components/dashboard/passenger/PassengerTripsList";
import PassengerProfileCard from "@/components/dashboard/passenger/PassengerProfileCard";

interface PassengerDashboardProps {
  user: any;
}

export function PassengerDashboard({ user }: PassengerDashboardProps) {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [availableTrips, setAvailableTrips] = useState<any[]>([]);
  const [myBookings, setMyBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const bookings = await api.fetchMyBookings();
      setMyBookings(bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (searchFrom) params.append("from", searchFrom);
      if (searchTo) params.append("to", searchTo);
      if (searchDate) params.append("date", searchDate);

      const trips = await api.searchTrips({
        from: searchFrom,
        to: searchTo,
        date: searchDate,
      });
      setAvailableTrips(trips || []);
    } catch (error) {
      console.error("Error searching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookTrip = async (tripId: string) => {
    try {
      await api.createBooking({ tripId });
      alert("Booking successful!");
      fetchMyBookings();
      handleSearch(new Event("submit") as any);
    } catch (error) {
      console.error("Error booking trip:", error);
      alert("Failed to book trip");
    }
  };

  const handleRateTrip = async (bookingId: string, rating: number) => {
    try {
      await api.rateBooking({ bookingId, rating });
      alert("Rating submitted!");
      fetchMyBookings();
    } catch (err) {
      console.error("Error rating trip:", err);
    }
  };

  const openChat = (trip: any) => {
    setSelectedTrip(trip);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PassengerHeader user={user} />

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search Rides</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Search Rides */}
          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find Your Ride</CardTitle>
                <CardDescription>
                  Search for available trips to your destination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PassengerSearchForm
                  from={searchFrom}
                  to={searchTo}
                  date={searchDate}
                  setFrom={setSearchFrom}
                  setTo={setSearchTo}
                  setDate={setSearchDate}
                  onSearch={handleSearch}
                  loading={loading}
                />
              </CardContent>
            </Card>

            <PassengerTripsList
              trips={availableTrips}
              onBook={handleBookTrip}
              onOpenChat={openChat}
            />
          </TabsContent>

          {/* My Bookings */}
          <TabsContent value="bookings" className="space-y-4">
            {myBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onRate={handleRateTrip}
              />
            ))}

            {myBookings.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No bookings yet. Start searching for rides!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <PassengerProfileCard user={user} />
          </TabsContent>
        </Tabs>
      </div>

      {chatOpen && selectedTrip && (
        <ChatDialog
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          tripId={selectedTrip.id}
          recipientId={selectedTrip.driver_id}
          recipientName={selectedTrip.driver_name}
        />
      )}
    </div>
  );
}
