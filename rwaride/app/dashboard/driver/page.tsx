import React from "react";
import DriverHeader from "@/components/dashboard/driver/DriverHeader";
import TripsList from "@/components/dashboard/driver/TripsList";
import CreateTripDialog from "@/components/dashboard/driver/CreateTripDialog";

export default function DriverPage() {
  return (
    <div className="p-6">
      <DriverHeader />
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Trips</h2>
        <CreateTripDialog onCreated={() => window.location.reload()} />
      </div>
      <div className="mt-4">
        <TripsList />
      </div>
    </div>
  );
}
