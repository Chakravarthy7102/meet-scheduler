import { MEETING_SLUG } from "@/constants";
import { getDefaultHeaders, getURLParams } from "@/lib/utils";
import { DaySlot } from "@/types";

const NEETOCAL_URL = process.env.NEXT_PUBLIC_NEETOCAL_URL;
const TIMEZONE = "America/New_York";

export async function fetchAvailableTimeSlots(
  year: number,
  month: number
): Promise<{ slots: Array<DaySlot> } | undefined> {
  const params = getURLParams({
    time_zone: TIMEZONE,
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
