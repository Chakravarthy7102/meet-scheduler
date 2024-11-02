import React, { useMemo } from "react";

import { useCalendar } from "@/context/calendar-context";
import { areDatesEqual, getDate, getDateInformation } from "@/lib/date";
import { WEEKS_SHORT_FORMS } from "@/constants";

import CalendarTimeSlot from "./calendar-time-slot";
import { Badge } from "../ui/badge";

export default function CalendarWeekly() {
  const { selectedMonth, selectedYear, selectedDay, setSelectedWeekRange } =
    useCalendar();

  const selectedDate = getDate(selectedYear, selectedMonth, selectedDay);

  function generateWeeklyHourGrid(
    startYear: number,
    startMonth: number,
    startDay: number
  ): string[][] {
    const grid: string[][] = [];
    const daysInWeek = 7;
    const hoursInDay = 24;

    // Create a Date object for the specified start date
    const startDate = getDate(startYear, startMonth, startDay);

    // Generate the grid
    for (let i = 0; i < daysInWeek; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i); // Move to the correct day

      const hourRow: string[] = [];
      for (let hour = 0; hour < hoursInDay; hour++) {
        const dateWithHour = new Date(currentDay);
        dateWithHour.setHours(hour, 0, 0, 0); // Set the exact hour for the current date

        // Format the time as HH:MM AM/PM
        const formattedTime = dateWithHour.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        hourRow.push(formattedTime); // Add the formatted time to the row
      }

      grid.push(hourRow); // Add the hour row for the current day to the grid
    }

    return grid;
  }

  const [weeklyHourGrid, weekDays] = useMemo(() => {
    const weeklyHourGrid = generateWeeklyHourGrid(
      selectedYear,
      selectedMonth,
      selectedDay
    );
    // Get the date for the specified day
    const currentDate = getDate(selectedYear, selectedMonth, selectedDay);
    const { weekRange, weekDays } = getDateInformation(currentDate);

    setSelectedWeekRange(weekRange);

    return [weeklyHourGrid, weekDays];
  }, [selectedMonth, selectedYear, selectedDay]);

  return (
    <div className="mt-16 overflow-auto relative flex flex-col">
      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((currentDate) => {
          const { day, weekDay } = getDateInformation(currentDate);
          return (
            <div className="text-sm font-semibold flex items-center gap-1 justify-center">
              {WEEKS_SHORT_FORMS[weekDay]}
              {areDatesEqual(currentDate, selectedDate) ? (
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
        {weeklyHourGrid.map((row, rowIndex) => {
          return (
            <div className="grid grid-rows-7 gap-3 w-full" key={rowIndex}>
              {row.map((timeFrame) => {
                return (
                  <CalendarTimeSlot key={timeFrame} timeFrame={timeFrame} />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
