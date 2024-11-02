import { getDate, getDateInformation } from "@/lib/date";
import React, { createContext, useMemo, useState } from "react";

type CalendarContextType = {
  month: number;
  day: number;
  year: number;
  weekDay: number;
  weekRange: [Date, Date];
  selectedMonth: number;
  selectedDay: number;
  selectedWeekRange: [Date, Date];
  selectedYear: number;
  selectedWeekDay: number;
  setSelectedWeekDay: (weekDay: number) => void;
  setSelectedWeekRange: (weekRange: [Date, Date]) => void;
  setSelectedMonth: (month: number) => void;
  handleToday: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
};

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export function useCalendar() {
  const context = React.useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }

  return context;
}

export default function CalendarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { day, month, year, weekRange, weekDay } = useMemo(() => {
    return getDateInformation(new Date());
  }, []);

  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [selectedDay, setSelectedDay] = useState<number>(day);
  const [selectedWeekDay, setSelectedWeekDay] = useState<number>(weekDay);
  const [selectedWeekRange, setSelectedWeekRange] =
    useState<[Date, Date]>(weekRange);
  const [selectedYear, setSelectedYear] = useState<number>(year);

  function handleToday() {
    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedDay(day);
    setSelectedWeekDay(weekDay);
    setSelectedWeekRange(weekRange);
  }

  function handleNext() {
    const currentDate = getDate(selectedYear, selectedMonth, selectedDay);
    // Find the start of the week (Sunday)
    const startOfWeek = new Date(currentDate);
    // setting date to be the end date of the next week (7 days)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 7);
    const { day, month, year, weekRange } = getDateInformation(startOfWeek);

    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedDay(day);
    setSelectedWeekRange(weekRange);
  }

  function handlePrevious() {
    const currentDate = getDate(selectedYear, selectedMonth, selectedDay);
    // Find the start of the week (Sunday)
    const startOfWeek = new Date(currentDate);
    // setting selected date to be the last day of previous week.
    // Adjust to the previous saturday.
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() - 1);
    const { day, month, year, weekRange } = getDateInformation(startOfWeek);

    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedDay(day);
    setSelectedWeekRange(weekRange);
  }

  return (
    <CalendarContext.Provider
      value={{
        month,
        year,
        day,
        weekDay,
        weekRange,
        selectedWeekDay,
        selectedMonth,
        selectedDay,
        selectedWeekRange,
        selectedYear,
        setSelectedWeekDay,
        setSelectedWeekRange,
        handleNext,
        handlePrevious,
        handleToday,
        setSelectedMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
