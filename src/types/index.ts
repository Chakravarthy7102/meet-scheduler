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

export type Booking = {
  id: string;
  user_id: string;
  room_type: string;
  room_url: string;
  created_at: string;
  updated_at: string;
  starts_at: string;
  ends_at: string;
  name: string;
  email: string;
  meeting_id: string;
  notes_url: any;
  status: string;
  cancel_reason: any;
  time_zone: string;
  sid: string;
  room_id: any;
  cancelled_by: any;
  parent_booking_id: any;
  reschedule_requested: boolean;
  metadata: any;
  meeting: Meeting;
  host_name: string;
  host_email: string;
  is_multihost: boolean;
  multihosts: any[];
  admin_booking_url: string;
  client_booking_url: string;
  form_responses: FormResponse[];
};

export type Meeting = {
  id: string;
  organization_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  kind: string;
  slug: string;
  description: string;
  duration: number;
  owner_id_deprecated_on_2024_10_18: any;
  start_time_increment: number;
  lead_time: number;
  spot: string;
  booking_modification_allowed: boolean;
  schedulable_range_type: string;
  schedulable_range_value: string;
  cancellation_lead_time: number;
  cancellation_too_late_notice: any;
  cancellation_policy: any;
  rescheduling_lead_time: number;
  rescheduling_too_late_notice: any;
  is_template: boolean;
  use_email_of_host_in_reply_to_header: boolean;
  deleted_at: any;
  homepage_id: string;
  original_price_enabled: boolean;
  original_price: any;
  pre_booking_allowed: boolean;
  disabled: boolean;
  spot_in_person_location: any;
  spot_custom_text: any;
  sid: string;
  durations_possible: any[];
  is_email_reminders_enabled: boolean;
  is_sms_reminders_enabled: boolean;
};

export type FormResponse = {
  Name?: string;
  Email?: string;
};
