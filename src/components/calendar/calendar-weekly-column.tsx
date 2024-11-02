import React, { useMemo } from "react";
import CalendarTimeSlot from "./calendar-time-slot";
import { useCalendar } from "@/context/calendar-context";
import { fomatDate } from "@/lib/date";
import { TimeSlot } from "@/types";

type CalendarWeeklyColumnProps = {
  weekDay: Date;
};

export default function CalendarWeeklyColumn({
  weekDay,
}: CalendarWeeklyColumnProps) {
  const { slots } = useCalendar();

  const availabilitySlots = useMemo(() => {
    const todaySlot = slots.find((slot) => {
      return slot.date === fomatDate(weekDay);
    });

    const _availabilitySlots = Object.keys(todaySlot?.slots || {})
      .map((slot) => {
        const timeSlot = todaySlot?.slots[slot];
        return timeSlot;
      })
      .filter(Boolean) as TimeSlot[];

    return _availabilitySlots;
  }, [slots, weekDay]);

  return (
    <div className="flex flex-col gap-3 w-full">
      {availabilitySlots.map((timeSlot) => {
        return <CalendarTimeSlot key={timeSlot.end_time} timeSlot={timeSlot} />;
      })}
    </div>
  );
}
