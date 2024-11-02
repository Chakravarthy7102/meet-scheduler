import { Button } from "@/components/ui/button";
import { TimeSlot } from "@/types";
import { useMemo } from "react";

type CalendarTimeSlotProps = {
  timeSlot: TimeSlot;
};

export default function CalendarTimeSlot({ timeSlot }: CalendarTimeSlotProps) {
  return (
    <Button
      disabled={!timeSlot.is_available}
      variant="outline"
      className="border-b h-8 w-full border-l px-2 py-1 relative"
    >
      {timeSlot.start_time}
    </Button>
  );
}
