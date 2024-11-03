import { fetchAllBokings } from "@/endpoints/neetocal";
import { formatDate, getStartsAtAndEndsAt } from "@/lib/date";
import { Booking } from "@/types";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GoogleMeetIcon from "../calendar/google-meet-icon";
import Link from "next/link";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import BookingCancelDialog from "./booking-cancel.dialog";

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getBookingForAUser() {
    try {
      const response = await fetchAllBokings({
        // we can get listsing for a particular user, Since there is no auth inplace, Just fetching all the meetings!.
        type: "upcoming",
      });
      setBookings(response.bookings);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getBookingForAUser();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <Table className="mt-8">
      <TableBody>
        {bookings.map((booking) => {
          const { endTime, startTime } = getStartsAtAndEndsAt(
            booking.starts_at,
            booking.ends_at
          );

          const scheduledDate = formatDate(new Date(booking.starts_at));
          return (
            <TableRow className="border-b" key={booking.id}>
              <TableCell className="w-[280px]">
                <div className="flex flex-col gap-1.5 text-sm max-w-xs">
                  <div>{scheduledDate}</div>
                  <div className="text-neutral-600">
                    {startTime} - {endTime}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GoogleMeetIcon />{" "}
                    <Link
                      className="text-blue-700 hover:underline"
                      href={booking.room_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Google Meet
                    </Link>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col justify-start items-start gap-1.5 text-sm">
                  <div className="font-medium">{booking.meeting.name}</div>
                  <div>{booking.host_email}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <BookingCancelDialog
                    bookingId={booking.sid}
                    endTime={endTime}
                    scheduledDate={scheduledDate}
                    startTime={startTime}
                    timezone={booking.time_zone}
                    setBookings={setBookings}
                  >
                    <Button variant="outline">
                      <X />
                      Cancel Meeting
                    </Button>
                  </BookingCancelDialog>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
