import React, { useEffect, useState } from "react";
import TripCard from "@/components/dashboard/TripCard";
import api from "@/app/utils/api";

export default function TripsList() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.fetchMyTrips();
      // handle both shapes: res can be Trip[] or { trips: Trip[] }
      if (Array.isArray(res)) setTrips(res);
      else if (res?.trips) setTrips(res.trips);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div>Loading trips...</div>;
  if (!trips.length) return <div>No trips yet.</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {trips.map((t) => (
        <TripCard key={t.id} trip={t} />
      ))}
    </div>
  );
}
