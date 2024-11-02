import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CalendarTimeSlotProps = {
  timeFrame: string;
};

export default function CalendarTimeSlot({ timeFrame }: CalendarTimeSlotProps) {
  return (
    <Button
      variant="outline"
      className="border-b h-8 w-full border-l px-2 py-1 relative"
    >
      {timeFrame}
    </Button>
  );
}
