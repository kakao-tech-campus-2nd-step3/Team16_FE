export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AddressInfo {
  address: string;
  roadAddress: string | null;
}

export interface PlaceInfo {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CircleProps {
  map: kakao.maps.Map;
  position: Coordinates;
  radius: number;
}

export interface MarkerProps {
  map: kakao.maps.Map;
  position: Coordinates;
}

export interface CircleMapProps {
  containerId: string;
  defaultPosition: Coordinates;
  onClick?: (coordinates: Coordinates) => void;
}
