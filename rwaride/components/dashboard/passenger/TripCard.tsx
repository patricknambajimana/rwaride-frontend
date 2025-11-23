import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TripCard({
  trip,
  onSelect,
}: {
  trip: any;
  onSelect: (t: any) => void;
}) {
  return (
    <div className="hover:shadow-lg transition-shadow cursor-pointer border rounded-lg">
      <div className="p-6 flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{trip.driver_name?.[0] || "D"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{trip.driver_name}</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-gray-600">
                  {trip.driver_rating || "5.0"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-xs text-gray-500">From</p>
                <p className="font-medium">{trip.from_location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-xs text-gray-500">To</p>
                <p className="font-medium">{trip.to_location}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(trip.departure_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{trip.departure_time}</span>
            </div>
            <Badge variant="secondary">{trip.available_seats} seats left</Badge>
          </div>

          <div className="text-2xl font-bold text-green-600">
            {trip.price_per_seat} RWF
          </div>
        </div>

        <Button onClick={() => onSelect(trip)} size="lg">
          Select Ride
        </Button>
      </div>
    </div>
  );
}
