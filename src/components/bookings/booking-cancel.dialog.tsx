import React, { Dispatch, SetStateAction, useState } from "react";
import { Calendar1Icon, Clock, Globe } from "lucide-react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cancleBooking } from "@/endpoints/neetocal";
import GoogleMeetIcon from "@/components/calendar/google-meet-icon";
import { Textarea } from "@/components/ui/textarea";
import { Booking } from "@/types";

type BookingCancelDialogProps = {
  bookingId: string;
  children: React.ReactNode;
  startTime: string;
  endTime: string;
  scheduledDate: string;
  timezone: string;
  setBookings: Dispatch<SetStateAction<Booking[]>>;
};

export default function BookingCancelDialog({
  children,
  bookingId,
  endTime,
  scheduledDate,
  startTime,
  timezone,
  setBookings,
}: BookingCancelDialogProps) {
  const [isCanceling, setIsCanceling] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cancelationReason, setCancelationReason] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsCanceling(true);
    try {
      await cancleBooking(bookingId, cancelationReason);
      setBookings((bookings) =>
        bookings.filter((booking) => booking.sid !== bookingId)
      );
      setIsDialogOpen(false);
      toast.success("Booking canceled successfully");
    } catch (error) {
      console.log({ error });
      toast.error("Failed to cancel booking");
    } finally {
      setIsCanceling(false);
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="gap-2">
            <DialogTitle>Cancel Booking</DialogTitle>
            <div className="flex flex-col gap-3 text-xs font-medium max-w-xs mt-2">
              <div className="flex items-start gap-1.5">
                <Calendar1Icon className="h-4 w-4" /> {scheduledDate} <br />{" "}
                {startTime} - {endTime}
              </div>
              <div className="flex items-start gap-1.5">
                <GoogleMeetIcon /> Google Meet
              </div>
              <div className="flex items-start gap-1.5">
                <Clock className="h-4 w-4" /> 30 mins
              </div>
              <div className="flex items-start gap-1.5">
                <Globe className="h-4 w-4" /> {timezone}
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="mt-2">
              <Label htmlFor="reason" className="text-right">
                Reason for cancellation (optional)
              </Label>
              <Textarea
                id="reason"
                value={cancelationReason}
                className="col-span-3"
                placeholder="Why are you cancelling?"
                onChange={(e) => setCancelationReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button>Nevermind</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isCanceling}
              isLoading={isCanceling}
              variant="outline"
            >
              Cancel Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
