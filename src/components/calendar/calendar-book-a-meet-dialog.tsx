import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TimeSlot } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { makeABooking } from "@/endpoints/neetocal";
import { useCalendar } from "@/context/calendar-context";
import toast from "react-hot-toast";
import { Calendar1Icon, Clock, Globe } from "lucide-react";
import { convertTo24Hour, formatDate } from "@/lib/date";
import GoogleMeetIcon from "./google-meet-icon";

type CalendarBookAMeetDialogProps = {
  children: React.ReactNode;
  timeSlot: TimeSlot;
  slotDate: string;
};

export default function CalendarBookAMeetDialog({
  children,
  slotDate,
  timeSlot,
}: CalendarBookAMeetDialogProps) {
  const { timezone, slots, setSlots } = useCalendar();

  const [attendeeEmail, setAttendeeEmail] = useState<string>("");
  const [attendeeName, setAttendeeName] = useState<string>("");
  const [isScheduling, setIsScheduling] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!attendeeEmail || !attendeeName) {
      toast.error("Please enter all the required fields!");
      return;
    }
    setIsScheduling(true);
    try {
      await makeABooking({
        email: attendeeEmail,
        name: attendeeName,
        slot_date: slotDate,
        slot_start_time: timeSlot.start_time,
        time_zone: timezone,
      });
      setAttendeeEmail("");
      setAttendeeName("");
      setIsDialogOpen(false);

      setSlots(
        slots.map((slot) => {
          if (slot.date === slotDate) {
            delete slot.slots[
              `${convertTo24Hour(timeSlot.start_time)}-${convertTo24Hour(
                timeSlot.end_time
              )}`
            ];
          }
          return slot;
        })
      );
      toast.success("Meeting scheduled successfully");
    } catch (error) {
      console.log({ error });
      toast.error("Failed to schedule meeting");
    } finally {
      setIsScheduling(false);
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="gap-2">
            <DialogTitle>Schedule Meeting</DialogTitle>
            <div className="flex flex-col gap-3 text-xs font-medium max-w-xs mt-2">
              <div className="flex items-start gap-1.5">
                <Calendar1Icon className="h-4 w-4" />{" "}
                {formatDate(new Date(slotDate))} <br /> {timeSlot.start_time} -{" "}
                {timeSlot.end_time}
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
            <div>
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={attendeeEmail}
                className="col-span-3"
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setAttendeeEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                required
                value={attendeeName}
                className="col-span-3"
                onChange={(e) => setAttendeeName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isScheduling}
              isLoading={isScheduling}
            >
              Schedule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
