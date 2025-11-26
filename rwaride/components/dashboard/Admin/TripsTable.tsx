import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface AdminTrip {
  id: string;
  driver_name: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  available_seats: number;
  status?: string;
}

interface TripsTableProps {
  trips: AdminTrip[];
}

export function TripsTable({ trips }: TripsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Driver</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Seats</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {trip.driver_name?.[0] || "D"}
                  </AvatarFallback>
                </Avatar>
                <span>{trip.driver_name}</span>
              </div>
            </TableCell>
            <TableCell>
              {trip.from_location} → {trip.to_location}
            </TableCell>
            <TableCell>
              {new Date(trip.departure_date).toLocaleDateString()}
            </TableCell>
            <TableCell>{trip.available_seats}</TableCell>
            <TableCell>
              <Badge
                variant={trip.status === "active" ? "default" : "secondary"}
              >
                {trip.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TripsTable;
