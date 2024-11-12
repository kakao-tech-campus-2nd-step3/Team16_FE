export interface Coordinates {
  lat: number;
  lng: number;
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
