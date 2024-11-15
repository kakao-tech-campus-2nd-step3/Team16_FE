import type { PlaceInfo } from '@/service/KakaoMap/types';

export interface CreateMeetingRequest {
  baseLocation: PlaceInfo;
  title: string;
  startDate: string | undefined;
  endDate: string | undefined;
  durationTime: number;
  startTime: string;
  endTime: string;
}

export interface CreateMeetingResponse {
  status: number;
  message: string;
  data: number;
}

export interface MeetingInfo {
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export interface CalendarEvent {
  start: string;
  end: string;
}

export interface GroupEvent {
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  display: string;
}

export interface JoinMeetingRequest {
  preferences: number[];
  nonPreferences: number[];
  times: PersonalEvent[];
}

export interface JoinMeetingResponse {
  status: number;
  message: string;
  data: null;
}

export interface PersonalEvent {
  start_at: string;
  end_at: string;
  time_zone: string;
  all_day: boolean;
}

export interface PersonalResponse {
  meetingPersonalTimes: PersonalEvent[];
}

export interface Food {
  food_id: number;
  category: string;
  name: string;
}
