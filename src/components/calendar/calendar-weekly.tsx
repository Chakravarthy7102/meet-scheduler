import React, { useMemo } from "react";

import { useCalendar } from "@/context/calendar-context";
import { areDatesEqual, getDate, getDateInformation } from "@/lib/date";
import { WEEKS_SHORT_FORMS } from "@/constants";
import { Badge } from "../ui/badge";
import CalendarWeeklyColumn from "./calendar-weekly-column";

export default function CalendarWeekly() {
  const { selectedMonth, selectedYear, selectedDay } = useCalendar();

  const [weekDays] = useMemo(() => {
    // Get the date for the specified day
    const currentDate = getDate(selectedYear, selectedMonth, selectedDay);
    const { weekDays } = getDateInformation(currentDate);
    return [weekDays];
  }, [selectedMonth, selectedYear, selectedDay]);

  return (
    <div className="mt-16 overflow-auto relative flex flex-col">
      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((currentDate) => {
          const { day, weekDay } = getDateInformation(currentDate);
          return (
            <div
              key={day}
              className="text-sm font-semibold flex items-center gap-1 justify-center"
            >
              {WEEKS_SHORT_FORMS[weekDay]}
              {areDatesEqual(currentDate, new Date()) ? (
                <Badge className="rounded-full bg-primary text-white w-6 h-6 text-center p-1 flex items-center justify-center">
                  {day}
                </Badge>
              ) : (
                <span>{day}</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((weekDay) => {
          return <CalendarWeeklyColumn weekDay={weekDay} />;
        })}
      </div>
    </div>
  );
}
