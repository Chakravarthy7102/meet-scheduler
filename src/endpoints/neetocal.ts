import { MEETING_SLUG } from "@/constants";
import { getDefaultHeaders, getURLParams } from "@/lib/utils";
import { Booking, DaySlot } from "@/types";

const NEETOCAL_URL = process.env.NEXT_PUBLIC_NEETOCAL_URL;

export async function fetchAvailableTimeSlots(
  time_zone: string,
  year: number,
  month: number
): Promise<{ slots: Array<DaySlot> } | undefined> {
  const params = getURLParams({
    time_zone,
    year: year.toString(),
    month: month.toString(),
  });

  const response = await fetch(
    `${NEETOCAL_URL}/slots/${MEETING_SLUG}?${params}`,
    {
      method: "GET",
      headers: {
        ...getDefaultHeaders(),
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function makeABooking({
  email,
  name,
  slot_date,
  slot_start_time,
  time_zone,
}: {
  name: string;
  email: string;
  slot_date: string;
  slot_start_time: string;
  time_zone: string;
}): Promise<void> {
  const meeting_slug = MEETING_SLUG;
  const params = getURLParams({
    email,
    name,
    slot_date,
    slot_start_time,
    time_zone,
    meeting_slug,
  });

  const response = await fetch(`${NEETOCAL_URL}/bookings?${params}`, {
    method: "POST",
    headers: {
      ...getDefaultHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchAllBokings({
  type,
}: {
  client_email?: string;
  type: "upcoming";
}): Promise<{ bookings: Array<Booking> }> {
  const params = getURLParams({
    type,
  });

  const response = await fetch(`${NEETOCAL_URL}/bookings?${params}`, {
    method: "GET",
    headers: {
      ...getDefaultHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function cancleBooking(
  booking_id: string,
  cancel_reason?: string
) {
  let params = "";

  if (cancel_reason) {
    params = getURLParams({
      cancel_reason,
    });
  }

  const response = await fetch(
    `${NEETOCAL_URL}/bookings/${booking_id}/cancel?${params}`,
    {
      method: "POST",
      headers: {
        ...getDefaultHeaders(),
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
