// Lightweight API abstraction for passenger flows and bookings.
// These functions call relative endpoints so you can later wire them
// to your backend. They intentionally do NOT depend on Supabase.

type Trip = any;
type Booking = any;

const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "";

async function jsonFetch(url: string, opts: RequestInit = {}) {
  const res = await fetch(url, { ...opts, credentials: "include" });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Request failed: ${res.status} ${body}`);
  }
  return res.json();
}

export async function fetchMyBookings(): Promise<Booking[]> {
  // Replace with your real API route
  return (await jsonFetch(`${baseUrl}/api/bookings/my`)).bookings || [];
}

export async function searchTrips(params: {
  from?: string;
  to?: string;
  date?: string;
}): Promise<Trip[]> {
  const qs = new URLSearchParams();
  if (params.from) qs.append("from", params.from);
  if (params.to) qs.append("to", params.to);
  if (params.date) qs.append("date", params.date);
  return (
    (await jsonFetch(`${baseUrl}/api/trips/search?${qs.toString()}`)).trips ||
    []
  );
}

export async function createBooking(payload: {
  tripId: string;
  paymentMethod?: string;
  cardLast4?: string;
}) {
  return await jsonFetch(`${baseUrl}/api/bookings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function rateBooking(payload: {
  bookingId: string;
  rating: number;
}) {
  return await jsonFetch(`${baseUrl}/api/bookings/rate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export default { fetchMyBookings, searchTrips, createBooking, rateBooking };
