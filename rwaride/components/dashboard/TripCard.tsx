import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Users } from "lucide-react";

export default function TripCard({ trip }: { trip: any }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">
              {trip.from_location} → {trip.to_location}
            </div>
            <div className="text-xs text-gray-500">
              <Calendar className="inline w-4 h-4 mr-1" />{" "}
              {new Date(trip.departure_date).toLocaleDateString()}{" "}
              <Clock className="inline w-4 h-4 mr-1 ml-2" />{" "}
              {trip.departure_time}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm">{trip.available_seats} seats</div>
            <div className="text-xs text-gray-500">
              RWF {trip.price_per_seat}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
