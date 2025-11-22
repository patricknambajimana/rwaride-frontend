import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function PassengerSearchForm({
  from,
  to,
  date,
  setFrom,
  setTo,
  setDate,
  onSearch,
  loading,
}: {
  from: string;
  to: string;
  date: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setDate: (v: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
}) {
  return (
    <form onSubmit={onSearch} className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Departure location"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Destination"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" disabled={loading} className="mt-2">
        {loading ? "Searching..." : "Search Trips"}
      </Button>
    </form>
  );
}
