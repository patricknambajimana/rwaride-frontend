import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import api from "@/app/utils/api";

interface CreateTripDialogProps {
  onCreated?: () => void;
}

export function CreateTripDialog({ onCreated }: CreateTripDialogProps) {
  const [open, setOpen] = useState(false);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const resp = await api.createTrip({
        fromLocation,
        toLocation,
        departureDate,
        departureTime,
        availableSeats,
        pricePerSeat: parseFloat(pricePerSeat || "0"),
      });
      if (resp?.success) {
        setOpen(false);
        setFromLocation("");
        setToLocation("");
        setDepartureDate("");
        setDepartureTime("");
        setAvailableSeats(1);
        setPricePerSeat("");
        onCreated && onCreated();
      } else {
        alert("Failed to create trip");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Trip
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Trip</DialogTitle>
          <DialogDescription>
            Add details for your upcoming trip
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              value={fromLocation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFromLocation(e.target.value)
              }
              placeholder="Departure location"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={toLocation}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setToLocation(e.target.value)
              }
              placeholder="Destination"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={departureDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDepartureDate(e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={departureTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDepartureTime(e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seats">Available Seats</Label>
              <Input
                id="seats"
                type="number"
                min={1}
                max={8}
                value={availableSeats}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAvailableSeats(parseInt(e.target.value || "1"))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per Seat (RWF)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={100}
                value={pricePerSeat}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPricePerSeat(e.target.value)
                }
                placeholder="1000"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Trip"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTripDialog;
