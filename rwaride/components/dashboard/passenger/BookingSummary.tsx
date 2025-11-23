import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSummary({
  trip,
  onBack,
  onProceed,
}: {
  trip: any;
  onBack: () => void;
  onProceed: () => void;
}) {
  if (!trip) return null;
  return (
    <div>
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback>{trip.driver_name?.[0] || "D"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-lg">{trip.driver_name}</p>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-600">
                {trip.driver_rating || "5.0"}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">From:</span>
            <span className="font-medium">{trip.from_location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">To:</span>
            <span className="font-medium">{trip.to_location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">
              {new Date(trip.departure_date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{trip.departure_time}</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-lg">
            <span className="font-semibold">Total Price:</span>
            <span className="font-bold text-green-600">
              {trip.price_per_seat} RWF
            </span>
          </div>
        </div>
      </div>

      <Button onClick={onProceed} className="w-full mt-4" size="lg">
        Proceed to Payment
      </Button>
      <Button variant="ghost" onClick={onBack} className="w-full mt-2">
        Back
      </Button>
    </div>
  );
}
