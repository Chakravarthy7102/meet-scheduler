import React from "react";
import { CalendarCheck, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCalendar } from "@/context/calendar-context";
import { MONTH_SHORT_FORMS } from "@/constants";
import { getDateInformation } from "@/lib/date";

export default function CalendarToobar() {
  const { handleNext, handlePrevious, handleToday, selectedWeekRange } =
    useCalendar();

  function renderContextTextBasesOnMode() {
    const {
      day: weekStartDay,
      month: weekStartMonth,
      year: weekStartYear,
    } = getDateInformation(selectedWeekRange[0]);
    const {
      day: weekEndDay,
      month: weekEndMonth,
      year: weekEndYear,
    } = getDateInformation(selectedWeekRange[1]);

    return `${MONTH_SHORT_FORMS[weekStartMonth]} ${weekStartDay}, ${weekStartYear} - ${MONTH_SHORT_FORMS[weekEndMonth]} ${weekEndDay}, ${weekEndYear} `;
  }

  return (
    <div className="flex items-center w-full mt-6 gap-x-3 justify-between">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <CalendarCheck /> Book a meeting
      </h2>
      <div className="flex gap-x-3 ml-auto">
        <Button className="text-xs" variant="outline" onClick={handleToday}>
          Today
        </Button>
        <div className="flex justify-center flex-shrink-0 items-center w-fit rounded-md border overflow-clip gap-x-3 h-9">
          <Button
            size="sm"
            variant="outline"
            className="flex justify-center items-center h-9 w-9 border-l-0 border-y-0 border-r rounded-none p-0"
            onClick={handlePrevious}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <div className="font-medium text-xs">
            {renderContextTextBasesOnMode()}
          </div>
          <Button
            size="sm"
            variant="outline"
            className={
              "flex justify-center items-center h-9 w-9 border border-r-0 border-y-0 border-l p-0 rounded-none"
            }
            onClick={handleNext}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
