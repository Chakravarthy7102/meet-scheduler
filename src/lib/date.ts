export function getDateInformation(today: Date) {
  const month = today.getMonth();
  const year = today.getFullYear();
  const weekDay = today.getDay();
  const day = today.getDate();

  const time = today.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const weekStartDay = today.getDate() - today.getDay();
  const startOfWeek = getDate(year, month, weekStartDay);
  const endOfWeek = getDate(year, month, weekStartDay + 7);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const weekRange = [startOfWeek, endOfWeek] as [Date, Date];

  return {
    month,
    year,
    day,
    weekDay,
    weekRange,
    weekDays,
    time,
  };
}

export function getDate(year: number, month: number, day: number) {
  const date = new Date(year, month, day);
  return date;
}

export function addHours(time: string, hoursToAdd: number) {
  let [hour, minute] = time
    .match(/(\d+):(\d+)/)!
    .slice(1, 3)
    .map(Number);
  let period = time.slice(-2);

  // Convert hour to 24-hour format
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  // Add the hours
  hour += hoursToAdd;

  // Handle overflow (e.g., 24-hour wrap around)
  if (hour >= 24) hour -= 24;

  // Convert back to 12-hour format
  period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour}:${String(minute).padStart(2, "0")} ${period}`;
}

export function timeToNumber(time: string) {
  let [hours, minutes] = time
    .match(/(\d+):(\d+)/)!
    .slice(1, 3)
    .map(Number);
  const period = time.slice(-2);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 100 + minutes;
}

export function isTimeWithinRange(
  targetTime: string,
  startTime: string,
  endTime: string
) {
  const target = timeToNumber(targetTime);
  const start = timeToNumber(startTime);
  const end = timeToNumber(endTime);

  return target >= start && target <= end;
}

export function areDatesEqual(firstDate: Date, secondDate: Date) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}
