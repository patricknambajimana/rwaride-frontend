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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Star,
  CreditCard,
  Navigation,
  CheckCircle,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import api from "@/app/utils/api";
import TripCard from "@/components/dashboard/passenger/TripCard";
import BookingCard from "@/components/dashboard/passenger/BookingCard";
import PassengerHeader from "@/components/dashboard/passenger/PassengerHeader";
import BookingSummary from "@/components/dashboard/passenger/BookingSummary";
import PaymentForm from "@/components/dashboard/passenger/PaymentForm";
import BookingConfirmed from "@/components/dashboard/passenger/BookingConfirmed";
import TrackingPanel from "@/components/dashboard/passenger/TrackingPanel";
import RatingPanel from "@/components/dashboard/passenger/RatingPanel";

type FlowStep =
  | "dashboard"
  | "search"
  | "results"
  | "booking"
  | "payment"
  | "confirmed"
  | "tracking"
  | "during-ride"
  | "complete"
  | "rating";

interface PassengerFlowProps {
  user: any;
  onLogout: () => void;
}

export function PassengerFlow({ user, onLogout }: PassengerFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("dashboard");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [availableTrips, setAvailableTrips] = useState<any[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [myBookings, setMyBookings] = useState<any[]>([]);

  // Payment details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  // Tracking
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });
  const [eta, setEta] = useState(15);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  useEffect(() => {
    if (currentStep === "tracking") {
      simulateDriverTracking();
    }
  }, [currentStep]);

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
      setCurrentStep("results");
    } catch (error) {
      console.error("Error searching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRide = (trip: any) => {
    setSelectedTrip(trip);
    setCurrentStep("booking");
  };

  const handleConfirmBooking = () => {
    setCurrentStep("payment");
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.createBooking({
        tripId: selectedTrip.id,
        paymentMethod: "card",
        cardLast4: cardNumber.slice(-4),
      });
      setCurrentBooking(res.booking);
      setCurrentStep("confirmed");
      setTimeout(() => setCurrentStep("tracking"), 3000);
    } catch (error) {
      console.error("Error booking trip:", error);
      alert("Failed to book trip");
    } finally {
      setLoading(false);
    }
  };

  const simulateDriverTracking = () => {
    let timeRemaining = eta;
    const interval = setInterval(() => {
      timeRemaining -= 1;
      setEta(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(interval);
        setCurrentStep("during-ride");

        // Simulate ride duration (10 seconds for demo)
        setTimeout(() => {
          setCurrentStep("complete");
        }, 10000);
      }
    }, 1000);
  };

  const handleRateDriver = async (rating: number) => {
    try {
      await api.rateBooking({ bookingId: currentBooking.id, rating });
      alert("Thank you for your feedback!");
      setCurrentStep("dashboard");
      setSelectedTrip(null);
      setCurrentBooking(null);
      fetchMyBookings();
    } catch (err) {
      console.error("Error rating trip:", err);
    }
  };

  const getProgressPercentage = () => {
    const steps = [
      "dashboard",
      "search",
      "results",
      "booking",
      "payment",
      "confirmed",
      "tracking",
      "during-ride",
      "complete",
      "rating",
    ];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <PassengerHeader user={user} />
      {currentStep !== "dashboard" && (
        <div className="container mx-auto px-4 py-2">
          <Progress value={getProgressPercentage()} className="h-2" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Dashboard */}
        {currentStep === "dashboard" && (
          <div className="space-y-6">
            <Card className="border-2 border-green-500">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Find Your Ride</CardTitle>
                <CardDescription>
                  Search for available trips to your destination
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  size="lg"
                  onClick={() => setCurrentStep("search")}
                  className="w-full max-w-md"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search for Rides
                </Button>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            {myBookings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myBookings.slice(0, 3).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {booking.driver_name?.[0] || "D"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {booking.from_location} → {booking.to_location}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(
                              booking.departure_date
                            ).toLocaleDateString()}
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
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Search Rides */}
        {currentStep === "search" && (
          <Card>
            <CardHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep("dashboard")}
                className="mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <CardTitle>Search for Available Rides</CardTitle>
              <CardDescription>
                Enter your trip details to find matching drivers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="from">Pickup Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="from"
                      value={searchFrom}
                      onChange={(e) => setSearchFrom(e.target.value)}
                      placeholder="e.g., Kigali City Center"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="to"
                      value={searchTo}
                      onChange={(e) => setSearchTo(e.target.value)}
                      placeholder="e.g., Nyamirambo"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Travel Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Find Rides"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* View Results */}
        {currentStep === "results" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl">Available Rides</h2>
                <p className="text-gray-600">
                  {availableTrips.length} rides found
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentStep("search")}
              >
                <Search className="w-4 h-4 mr-2" />
                New Search
              </Button>
            </div>

            {availableTrips.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No rides found matching your criteria</p>
                  <Button
                    variant="link"
                    onClick={() => setCurrentStep("search")}
                    className="mt-4"
                  >
                    Try a different search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              availableTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onSelect={handleSelectRide}
                />
              ))
            )}
          </div>
        )}

        {/* Book Ride */}
        {currentStep === "booking" && selectedTrip && (
          <Card>
            <CardHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep("results")}
                className="mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
              </Button>
              <CardTitle>Confirm Your Booking</CardTitle>
              <CardDescription>
                Review trip details before payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BookingSummary
                trip={selectedTrip}
                onBack={() => setCurrentStep("results")}
                onProceed={handleConfirmBooking}
              />
            </CardContent>
          </Card>
        )}

        {/* Payment */}
        {currentStep === "payment" && (
          <Card>
            <CardHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep("booking")}
                className="mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentForm
                selectedTrip={selectedTrip}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardExpiry={cardExpiry}
                setCardExpiry={setCardExpiry}
                cardCVV={cardCVV}
                setCardCVV={setCardCVV}
                onBack={() => setCurrentStep("booking")}
                onPay={handlePayment}
                loading={loading}
              />
            </CardContent>
          </Card>
        )}

        {/* Booking Confirmed */}
        {currentStep === "confirmed" && currentBooking && (
          <Card className="border-2 border-green-500">
            <CardContent className="p-12 text-center">
              <BookingConfirmed booking={currentBooking} />
            </CardContent>
          </Card>
        )}

        {/* Track Driver */}
        {currentStep === "tracking" && (
          <Card>
            <CardHeader>
              <CardTitle>Driver is on the way</CardTitle>
              <CardDescription>
                Track your driver's location in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrackingPanel selectedTrip={selectedTrip} eta={eta} />
            </CardContent>
          </Card>
        )}

        {/* During Ride */}
        {currentStep === "during-ride" && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Navigation className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Ride in Progress</h2>
              <p className="text-gray-600 mb-6">
                Enjoy your trip! We'll notify you when you arrive at your
                destination.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">From</span>
                  <span className="font-medium">
                    {selectedTrip?.from_location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To</span>
                  <span className="font-medium">
                    {selectedTrip?.to_location}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ride Complete */}
        {currentStep === "complete" && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Ride Complete!</h2>
              <p className="text-gray-600 mb-6">
                You've arrived at your destination safely.
              </p>
              <Button
                onClick={() => setCurrentStep("rating")}
                size="lg"
                className="w-full max-w-md"
              >
                Rate Your Experience
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Rate Driver */}
        {currentStep === "rating" && (
          <Card>
            <CardHeader>
              <CardTitle>Rate Your Driver</CardTitle>
              <CardDescription>
                Help us improve by sharing your feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RatingPanel
                selectedTrip={selectedTrip}
                onRate={handleRateDriver}
                onSkip={() => {
                  setCurrentStep("dashboard");
                  setSelectedTrip(null);
                  setCurrentBooking(null);
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
