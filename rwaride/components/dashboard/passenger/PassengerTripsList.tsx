import React from "react";
import TripCard from "@/components/dashboard/passenger/TripCard";
import { Card, CardContent } from "@/components/ui/card";

export default function PassengerTripsList({
  trips,
  onBook,
  onOpenChat,
}: {
  trips: any[];
  onBook: (id: string) => void;
  onOpenChat: (trip: any) => void;
}) {
  if (!trips || trips.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center text-[var(--muted-foreground)]">
          <p>No trips found. Try adjusting your search criteria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {trips.map((t) => (
        <TripCard
          key={t.id}
          trip={t}
          onSelect={(trip) => onBook(trip.id)}
        />
      ))}
    </div>
  );
}
