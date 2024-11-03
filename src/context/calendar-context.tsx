import { fetchAvailableTimeSlots } from "@/endpoints/neetocal";
import { getDate, getDateInformation } from "@/lib/date";
import { DaySlot } from "@/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";

type CalendarContextType = {
  slots: DaySlot[];
  timezone: string;
  month: number;
  day: number;
  year: number;
  weekDay: number;
  weekRange: [Date, Date];
  selectedMonth: number;
  selectedDay: number;
  selectedWeekRange: [Date, Date];
  selectedYear: number;
  handleToday: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  setTimeZone: (timezone: string) => void;
  setSlots: Dispatch<SetStateAction<DaySlot[]>>;
  isFetchingSlots: boolean;
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
  // Might be useful to set timezones dynamically?
  const [timezone, setTimeZone] = useState<string>("America/New_York");

  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [selectedDay, setSelectedDay] = useState<number>(day);
  const [selectedWeekRange, setSelectedWeekRange] =
    useState<[Date, Date]>(weekRange);
  const [selectedYear, setSelectedYear] = useState<number>(year);

  const [slots, setSlots] = useState<DaySlot[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);

  function handleToday() {
    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedDay(day);
    setSelectedWeekRange(weekRange);
  }

  function handleNext() {
    const currentDate = getDate(selectedYear, selectedMonth, selectedDay);
    // Find the start of the week (Sunday)
    const startOfNextWeek = new Date(currentDate);
    // setting date to be the start date of the next week (7 days)
    startOfNextWeek.setDate(currentDate.getDate() - currentDate.getDay() + 7);
    const { day, month, year, weekRange } = getDateInformation(startOfNextWeek);

    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedDay(day);
    setSelectedWeekRange(weekRange);
  }

  function handlePrevious() {
    const currentDate = getDate(selectedYear, selectedMonth, selectedDay);
    // Find the start of the week (Sunday)
    const endOfPrevWeek = new Date(currentDate);
    // setting selected date to be the last day of previous week.
    // Adjust to the previous saturday.
    endOfPrevWeek.setDate(currentDate.getDate() - currentDate.getDay() - 1);
    const { day, month, year, weekRange } = getDateInformation(endOfPrevWeek);

    setSelectedMonth(month);
    setSelectedYear(year);
    setSelectedDay(day);
    setSelectedWeekRange(weekRange);
  }

  async function getMonthlyTimeSlots() {
    setIsFetchingSlots(true);
    try {
      const weekStartDate = getDateInformation(selectedWeekRange[0]);
      const weekEndDate = getDateInformation(selectedWeekRange[1]);

      if (
        weekStartDate.month === weekEndDate.month &&
        weekStartDate.year === weekEndDate.year
      ) {
        const weekDateTimeSlotsResponse = await fetchAvailableTimeSlots(
          timezone,
          weekStartDate.year,
          weekStartDate.month + 1
        );

        if (weekDateTimeSlotsResponse) {
          setSlots(weekDateTimeSlotsResponse.slots);
        }
        setIsFetchingSlots(false);
        return;
      }

      let normalizedSlots: DaySlot[] = [];
      const startDateTimeSlotsResponse = await fetchAvailableTimeSlots(
        timezone,
        weekStartDate.year,
        weekStartDate.month + 1
      );
      const endDateTimeSlotsResponse = await fetchAvailableTimeSlots(
        timezone,
        weekEndDate.year,
        weekEndDate.month + 1
      );

      if (
        startDateTimeSlotsResponse &&
        startDateTimeSlotsResponse.slots.length > 0
      ) {
        normalizedSlots = [
          ...normalizedSlots,
          ...startDateTimeSlotsResponse.slots,
        ];
      }

      if (
        endDateTimeSlotsResponse &&
        endDateTimeSlotsResponse.slots.length > 0
      ) {
        normalizedSlots = [
          ...normalizedSlots,
          ...endDateTimeSlotsResponse.slots,
        ];
      }

      setSlots(normalizedSlots);
    } catch {
      toast.error("Error fetching time slots, Please try again!");
    } finally {
      setIsFetchingSlots(false);
    }
  }

  useEffect(() => {
    getMonthlyTimeSlots();
  }, [selectedWeekRange]);

  return (
    <CalendarContext.Provider
      value={{
        slots,
        month,
        year,
        day,
        timezone,
        weekDay,
        weekRange,
        selectedMonth,
        selectedDay,
        selectedWeekRange,
        selectedYear,
        isFetchingSlots,
        setTimeZone,
        setSlots,
        handleNext,
        handlePrevious,
        handleToday,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
