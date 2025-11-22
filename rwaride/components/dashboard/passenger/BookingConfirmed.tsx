import React from "react";
import { CheckCircle } from "lucide-react";

export default function BookingConfirmed({ booking }: { booking: any }) {
  if (!booking) return null;
  return (
    <div>
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-3xl font-bold mb-2 text-center">
        Booking Confirmed!
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Your ride has been booked successfully. The driver has been notified.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg mb-6 text-center">
        <p className="font-medium mb-2">Booking Reference</p>
        <p className="text-sm text-gray-600 font-mono">
          {booking.id.substring(8, 20).toUpperCase()}
        </p>
      </div>
      <p className="text-sm text-gray-500 text-center">
        Redirecting to driver tracking...
      </p>
    </div>
  );
}
