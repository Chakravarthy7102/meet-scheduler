"use client";

import CalendarToobar from "@/components/calendar/calendar-toolbar";
import CalendarWeekly from "@/components/calendar/calendar-weekly";
import CalendarProvider from "@/context/calendar-context";

export default function Home() {
  return (
    <CalendarProvider>
      <section className="p-10 max-w-[1540px] mx-auto">
        <CalendarToobar />
        <CalendarWeekly />
      </section>
    </CalendarProvider>
  );
}
