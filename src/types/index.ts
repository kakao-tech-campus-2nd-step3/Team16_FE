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
