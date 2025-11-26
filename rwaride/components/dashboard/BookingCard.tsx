import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function BookingCard({ booking }: { booking: any }) {
  return (
    <Card>
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {booking.passenger_name?.[0] || "P"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm">{booking.passenger_name}</div>
            <div className="text-xs text-gray-500">
              {booking.passenger_email}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-600">{booking.status}</div>
      </CardContent>
    </Card>
  );
}
