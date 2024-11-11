export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AddressInfo {
  address: string;
  roadAddress: string | null;
}

export interface PlaceInfo {
  location_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CreateMeetingRequest {
  baseLocation: {
    location_id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
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
  data: null;
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

export interface SelectedTime {
  startAt: string;
  endAt: string;
  timeZone: string;
  allDay: boolean;
}

export interface JoinMeetingRequest {
  preferences: number[];
  nonPreferences: number[];
  times: SelectedTime[];
}

export interface JoinMeetingResponse {
  status: number;
  message: string;
  data: null;
}
