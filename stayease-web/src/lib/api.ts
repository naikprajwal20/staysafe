import { createDemoBooking, demoDiscoverResponse } from "@/lib/demo-data";
import { BookingResponse, DiscoverResponse } from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

type DiscoverFilters = {
  destination: string;
  nights: number;
  guests: number;
  budget?: number;
  freeCancellation: boolean;
  payAtHotel: boolean;
  areaTag: string;
  sort: string;
};

export async function fetchDiscover(
  filters: DiscoverFilters
): Promise<DiscoverResponse> {
  const params = new URLSearchParams({
    destination: filters.destination,
    nights: String(filters.nights),
    guests: String(filters.guests),
    sort: filters.sort,
    freeCancellation: String(filters.freeCancellation),
    payAtHotel: String(filters.payAtHotel),
  });

  if (filters.budget) {
    params.set("budget", String(filters.budget));
  }

  if (filters.areaTag) {
    params.set("areaTag", filters.areaTag);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/discover?${params}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Unable to load hotels right now.");
    }

    return response.json();
  } catch {
    return {
      ...demoDiscoverResponse,
      destination: filters.destination || demoDiscoverResponse.destination,
      nights: filters.nights,
      guests: filters.guests,
    };
  }
}

type BookingPayload = {
  hotelId: number;
  hotelName: string;
  destination: string;
  guestName: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
};

export async function createBooking(
  payload: BookingPayload
): Promise<BookingResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Booking could not be completed.");
    }

    return response.json();
  } catch {
    return createDemoBooking(payload.hotelName, 9999);
  }
}
