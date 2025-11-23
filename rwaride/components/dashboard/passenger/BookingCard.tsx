import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star } from "lucide-react";

export default function BookingCard({
  booking,
  onRate,
}: {
  booking: any;
  onRate?: (id: string, r: number) => void;
}) {
  return (
    <div className="border rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{booking.driver_name?.[0] || "D"}</AvatarFallback>
            </Avatar>
            <div>
              <p>{booking.driver_name}</p>
              <p className="text-sm text-gray-600">Driver</p>
            </div>
          </div>
          <Badge
            variant={booking.status === "confirmed" ? "default" : "secondary"}
          >
            {booking.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <div>
              <p className="text-sm">From</p>
              <p>{booking.from_location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <div>
              <p className="text-sm">To</p>
              <p>{booking.to_location}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{booking.rating ?? "New"}</span>
          </div>
        </div>

        {booking.status === "completed" && !booking.rating && onRate && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <span className="text-sm">Rate this trip:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onRate(booking.id, rating)}
                  className="hover:scale-110 transition-transform"
                >
                  <Star className="w-5 h-5 text-gray-300 hover:text-yellow-500 hover:fill-yellow-500" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
