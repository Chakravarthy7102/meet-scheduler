export type DaySlot = {
  date: string;
  day: number;
  slots: Record<string, TimeSlot>;
};

export type TimeSlot = {
  start_time: string;
  is_available: boolean;
  member_availability: MemberAvailability;
  end_time: string;
  count: number;
};

export type MemberAvailability = {
  [key: string]: number;
};
