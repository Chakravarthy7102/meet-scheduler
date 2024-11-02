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
  const endOfWeek = getDate(year, month, weekStartDay + 6);

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

export function formatToTimeInHours(date: Date) {
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return time;
}

export function fomatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function areDatesEqual(firstDate: Date, secondDate: Date) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}
