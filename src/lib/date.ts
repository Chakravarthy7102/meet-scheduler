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

export function convertTo24Hour(time12h: string) {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (modifier === "PM" && hours !== "12") {
    hours = String(parseInt(hours, 10) + 12);
  } else if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  return `${hours}:${minutes}`;
}

const time12h = "02:30 PM";
const time24h = convertTo24Hour(time12h);

console.log(time24h); // Outputs: 14:30

export function formatDate(date: Date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return date.toLocaleDateString("en-US", options);
}

export function areDatesEqual(firstDate: Date, secondDate: Date) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

export function getStartsAtAndEndsAt(startDate: string, endDate: string) {
  const startTime = new Date(startDate).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const endTime = new Date(endDate).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { startTime, endTime };
}
