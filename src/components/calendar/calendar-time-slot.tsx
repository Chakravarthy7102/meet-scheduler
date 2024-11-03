import { Button } from "@/components/ui/button";
import { TimeSlot } from "@/types";
import { useMemo } from "react";
import CalendarBookAMeetDialog from "./calendar-book-a-meet-dialog";

type CalendarTimeSlotProps = {
  timeSlot: TimeSlot;
  slotDate: string;
};

export default function CalendarTimeSlot({
  timeSlot,
  slotDate,
}: CalendarTimeSlotProps) {
  return (
    <CalendarBookAMeetDialog timeSlot={timeSlot} slotDate={slotDate}>
      <Button
        disabled={!timeSlot.is_available}
        variant="outline"
        className="border-b h-8 w-full border-l px-2 py-1 relative"
      >
        {timeSlot.start_time}
      </Button>
    </CalendarBookAMeetDialog>
  );
}
