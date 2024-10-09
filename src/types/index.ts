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
