import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RatingPanel({
  selectedTrip,
  onRate,
  onSkip,
}: {
  selectedTrip: any;
  onRate: (rating: number) => void;
  onSkip: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-xl">
          {selectedTrip?.driver_name?.[0] || "D"}
        </div>
        <div>
          <p className="font-medium text-lg">{selectedTrip?.driver_name}</p>
          <p className="text-sm text-gray-600">How was your ride?</p>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="mb-4">Tap to rate</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => onRate(rating)}
              className="hover:scale-125 transition-transform"
            >
              <Star className="w-12 h-12 text-gray-300 hover:text-yellow-500 hover:fill-yellow-500" />
            </button>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={onSkip} className="w-full mt-6">
        Skip Rating
      </Button>
    </div>
  );
}
