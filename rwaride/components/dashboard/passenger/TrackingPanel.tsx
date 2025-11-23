import React from "react";
import { Navigation, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TrackingPanel({
  selectedTrip,
  eta,
}: {
  selectedTrip: any;
  eta: number;
}) {
  return (
    <div>
      <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#bfdbfe,#bbf7d0)]"></div>
        <div className="relative z-10 text-center">
          <Navigation className="w-16 h-16 mx-auto mb-4 text-green-600 animate-pulse" />
          <p className="font-medium">Tracking driver location...</p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center mt-4">
        <p className="text-sm text-gray-600 mb-2">Estimated Time of Arrival</p>
        <p className="text-4xl font-bold text-green-600">{eta} min</p>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mt-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback>
            {selectedTrip?.driver_name?.[0] || "D"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-medium text-lg">{selectedTrip?.driver_name}</p>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">
              {selectedTrip?.driver_rating || "5.0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
