import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  LogOut,
  Plus,
  Star,
} from "lucide-react";
import api from "@/app/utils/api";
import { NotificationBell } from "@/components/dashboard/driver/NotificationBell";

interface DriverDashboardProps {
  user: any;
  onLogout: () => void;
}

export function DriverDashboard({ user, onLogout }: DriverDashboardProps) {
  const [myTrips, setMyTrips] = useState<any[]>([]);
  const [tripBookings, setTripBookings] = useState<any[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState("");

  useEffect(() => {
    fetchMyTrips();
  }, []);

  const fetchMyTrips = async () => {
    try {
      const my = await api.fetchMyTrips();
      setMyTrips(my || []);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const fetchTripBookings = async (tripId: string) => {
    try {
      const my = await api.fetchMyTrips();
      const trip = my.find((t: any) => t.id === tripId);
      setTripBookings((trip && trip.bookings) || []);
    } catch (error) {
      console.error("Error fetching trip bookings:", error);
    }
  };

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await api.createTrip({
        fromLocation,
        toLocation,
        departureDate,
        departureTime,
        availableSeats,
        pricePerSeat: parseFloat(pricePerSeat || "0"),
      });
      if (resp?.success) {
        alert("Trip created successfully!");
        setCreateDialogOpen(false);
        // Reset form
        setFromLocation("");
        setToLocation("");
        setDepartureDate("");
        setDepartureTime("");
        setAvailableSeats(1);
        setPricePerSeat("");
        fetchMyTrips();
      } else {
        alert("Failed to create trip");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBookingStatus = async (
    bookingId: string,
    status: string
  ) => {
    try {
      const resp = await api.updateBookingStatus({ bookingId, status });
      if (resp?.success) {
        alert("Booking status updated!");
        fetchMyTrips();
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const calculateAverageRating = () => {
    const ratings = myTrips.flatMap((trip) =>
      (trip.bookings || []).map((b: any) => b.rating).filter((r: any) => r)
    );
    if (ratings.length === 0) return "No ratings yet";
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return avg.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span>RwaRide Driver</span>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell userId={user.id} />
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* My Trips */}
          <TabsContent value="trips" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2>My Trips</h2>
                <p className="text-gray-600">
                  Manage your trips and passengers
                </p>
              </div>
              <Dialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Trip
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Trip</DialogTitle>
                    <DialogDescription>
                      Add details for your upcoming trip
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateTrip} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="from">From</Label>
                      <Input
                        id="from"
                        value={fromLocation}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFromLocation(e.target.value)
                        }
                        placeholder="Departure location"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to">To</Label>
                      <Input
                        id="to"
                        value={toLocation}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setToLocation(e.target.value)
                        }
                        placeholder="Destination"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={departureDate}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDepartureDate(e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={departureTime}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDepartureTime(e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="seats">Available Seats</Label>
                        <Input
                          id="seats"
                          type="number"
                          min="1"
                          max="8"
                          value={availableSeats}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAvailableSeats(parseInt(e.target.value || "1"))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price per Seat (RWF)</Label>
                        <Input
                          id="price"
                          type="number"
                          min="0"
                          step="100"
                          value={pricePerSeat}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPricePerSeat(e.target.value)
                          }
                          placeholder="1000"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating..." : "Create Trip"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {myTrips.map((trip) => (
                <Card key={trip.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <div>
                              <p className="text-sm">From</p>
                              <p>{trip.from_location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <div>
                              <p className="text-sm">To</p>
                              <p>{trip.to_location}</p>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            trip.status === "active" ? "default" : "secondary"
                          }
                        >
                          {trip.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(trip.departure_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{trip.departure_time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{trip.available_seats} seats available</span>
                        </div>
                      </div>

                      {trip.bookings && trip.bookings.length > 0 && (
                        <div className="pt-4 border-t space-y-3">
                          <p className="text-sm">
                            Passengers ({trip.bookings.length}):
                          </p>
                          {trip.bookings.map((booking: any) => (
                            <div
                              key={booking.id}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>
                                    {booking.passenger_name?.[0] || "P"}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm">
                                    {booking.passenger_name}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {booking.passenger_email}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  booking.status === "confirmed"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {myTrips.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>
                      No trips yet. Create your first trip to start earning!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Driver Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-2xl">
                      {user.name?.[0] || "D"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl">{user.name}</p>
                    <Badge>Driver</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span>Rating: {calculateAverageRating()}</span>
                  </div>
                  <div className="text-gray-600">
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone || "Not provided"}</p>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      Total Trips: {myTrips.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
