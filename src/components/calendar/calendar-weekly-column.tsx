import React, { useMemo } from "react";
import CalendarTimeSlot from "./calendar-time-slot";
import { useCalendar } from "@/context/calendar-context";
import { areDatesEqual } from "@/lib/date";
import { TimeSlot } from "@/types";
import CalendarSlotNotAvailable from "./calendar-slot-not-available";

type CalendarWeeklyColumnProps = {
  weekDay: Date;
};

export default function CalendarWeeklyColumn({
  weekDay,
}: CalendarWeeklyColumnProps) {
  const { slots } = useCalendar();

  const { availabilitySlots, slotDate } = useMemo(() => {
    const todaySlot = slots.find((slot) => {
      return areDatesEqual(new Date(slot.date), weekDay);
    });

    const availabilitySlots = Object.keys(todaySlot?.slots || {})
      .map((slot) => {
        const timeSlot = todaySlot?.slots[slot];
        return timeSlot;
      })
      .filter(Boolean) as TimeSlot[];

    return { availabilitySlots, slotDate: todaySlot?.date as string };
  }, [slots, weekDay]);

  if (!availabilitySlots.length) {
    return <CalendarSlotNotAvailable className="h-[700px]" />;
  }

  return (
    <div className="flex flex-col gap-3 w-full flex-auto">
      {availabilitySlots.map((timeSlot) => {
        return (
          <CalendarTimeSlot
            key={timeSlot.end_time}
            timeSlot={timeSlot}
            slotDate={slotDate}
          />
        );
      })}
      <CalendarSlotNotAvailable />
    </div>
  );
}
