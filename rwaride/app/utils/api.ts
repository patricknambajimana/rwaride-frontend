// UI-only mock API for demo / offline mode.
// Converts the app into a frontend-only experience by returning
// synthetic data and keeping state in-memory.

type Trip = {
  id: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  departure_time: string;
  available_seats: number;
  price_per_seat: number;
  status?: string;
  bookings?: any[];
};

type Booking = {
  id: string;
  tripId: string;
  passenger_name?: string;
  passenger_email?: string;
  status?: string;
  rating?: number;
};

// In-memory store (lost on refresh) — suitable for UI-only demos.
let trips: Trip[] = [
  {
    id: "trip_1",
    from_location: "Kigali",
    to_location: "Huye",
    departure_date: new Date().toISOString().slice(0, 10),
    departure_time: "09:00",
    available_seats: 3,
    price_per_seat: 2500,
    status: "active",
    bookings: [],
  },
  {
    id: "trip_2",
    from_location: "Kigali",
    to_location: "Butare",
    departure_date: new Date().toISOString().slice(0, 10),
    departure_time: "14:30",
    available_seats: 2,
    price_per_seat: 2000,
    status: "active",
    bookings: [],
  },
];

let bookings: Booking[] = [];

// Simple users store for UI-only admin views
let users: Array<{
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
}> = [
  {
    id: "user_1",
    name: "Alice Admin",
    email: "alice@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: "user_2",
    name: "Bob Driver",
    email: "bob@example.com",
    role: "driver",
    status: "active",
  },
  {
    id: "user_3",
    name: "Carol Passenger",
    email: "carol@example.com",
    role: "passenger",
    status: "active",
  },
];

function delay(ms = 300) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchMyBookings(): Promise<Booking[]> {
  await delay(200);
  return bookings;
}

export async function searchTrips(params: {
  from?: string;
  to?: string;
  date?: string;
}): Promise<Trip[]> {
  await delay(300);
  return trips.filter((t) => {
    if (
      params.from &&
      !t.from_location.toLowerCase().includes(params.from.toLowerCase())
    )
      return false;
    if (
      params.to &&
      !t.to_location.toLowerCase().includes(params.to.toLowerCase())
    )
      return false;
    if (params.date && t.departure_date !== params.date) return false;
    return true;
  });
}

export async function createBooking(payload: {
  tripId: string;
  paymentMethod?: string;
  cardLast4?: string;
}) {
  await delay(300);
  const trip = trips.find((t) => t.id === payload.tripId);
  if (!trip) throw new Error("Trip not found");
  if (trip.available_seats <= 0) throw new Error("No seats available");

  const newBooking: Booking = {
    id: `booking_${Math.random().toString(36).slice(2, 9)}`,
    tripId: trip.id,
    passenger_name: "Guest Passenger",
    passenger_email: "guest@example.com",
    status: "confirmed",
  };

  bookings.push(newBooking);
  trip.bookings = trip.bookings || [];
  trip.bookings.push(newBooking as any);
  trip.available_seats = Math.max(0, trip.available_seats - 1);

  return { success: true, booking: newBooking };
}

export async function rateBooking(payload: {
  bookingId: string;
  rating: number;
}) {
  await delay(200);
  const b = bookings.find((x) => x.id === payload.bookingId);
  if (!b) throw new Error("Booking not found");
  b.rating = payload.rating;
  return { success: true };
}

// Admin helpers (UI-only)
export async function fetchAdminStats() {
  await delay(150);
  const totalUsers = users.length;
  const totalTrips = trips.length;
  const totalBookings = bookings.length;
  const activeTrips = trips.filter((t) => t.status === "active").length;
  return { stats: { totalUsers, totalTrips, totalBookings, activeTrips } };
}

export async function fetchAllUsers() {
  await delay(200);
  return { users };
}

export async function fetchAllTrips() {
  await delay(200);
  return { trips };
}

export async function suspendUser(userId: string) {
  await delay(150);
  const u = users.find((x) => x.id === userId);
  if (!u) throw new Error("User not found");
  u.status = "suspended";
  return { success: true };
}

export async function activateUser(userId: string) {
  await delay(150);
  const u = users.find((x) => x.id === userId);
  if (!u) throw new Error("User not found");
  u.status = "active";
  return { success: true };
}

// Driver helpers
export async function fetchMyTrips(): Promise<Trip[]> {
  await delay(200);
  return trips;
}

export async function createTrip(payload: {
  fromLocation: string;
  toLocation: string;
  departureDate: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
}) {
  await delay(300);
  const newTrip: Trip = {
    id: `trip_${Math.random().toString(36).slice(2, 9)}`,
    from_location: payload.fromLocation,
    to_location: payload.toLocation,
    departure_date: payload.departureDate,
    departure_time: payload.departureTime,
    available_seats: payload.availableSeats,
    price_per_seat: payload.pricePerSeat,
    status: "active",
    bookings: [],
  };
  trips.push(newTrip);
  return { success: true, trip: newTrip };
}

export async function updateBookingStatus(payload: {
  bookingId: string;
  status: string;
}) {
  await delay(200);
  const b = bookings.find((x) => x.id === payload.bookingId);
  if (!b) throw new Error("Booking not found");
  b.status = payload.status;
  return { success: true };
}

export default {
  fetchMyBookings,
  searchTrips,
  createBooking,
  rateBooking,
  // driver
  fetchMyTrips,
  createTrip,
  updateBookingStatus,
  // admin
  fetchAdminStats,
  fetchAllUsers,
  fetchAllTrips,
  suspendUser,
  activateUser,
};
