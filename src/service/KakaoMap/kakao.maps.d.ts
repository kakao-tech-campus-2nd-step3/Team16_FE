declare namespace kakao.maps {
  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    setBounds(bounds: LatLngBounds): void;
    getCenter(): LatLng;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setPosition(position: LatLng): void;
    setMap(map: Map | null): void;
  }

  class Circle {
    constructor(options: CircleOptions);
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
  }

  interface CircleOptions {
    center: LatLng;
    radius: number;
    strokeWeight: number;
    strokeColor: string;
    strokeOpacity: number;
    strokeStyle: string;
    fillColor: string;
    fillOpacity: number;
  }

  namespace event {
    function addListener<T>(
      target: Map | Marker | Circle,
      type: string,
      callback: (mouseEvent: T) => void,
    ): void;

    class MouseEvent {
      latLng: LatLng;
    }
  }

  class LatLngBounds {
    extend(latlng: LatLng): void;
  }

  namespace services {
    class Places {
      constructor(map: Map);
      keywordSearch(
        keyword: string,
        callback: (result: PlacesSearchResult[], status: PlacesStatus) => void,
        options?: PlacesSearchOptions,
      ): void;
    }

    interface PlacesSearchResult {
      id: string;
      place_name: string;
      x: string;
      y: string;
      address_name: string;
      road_address_name?: string;
    }

    type PlacesStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

    interface PlacesSearchOptions {
      location?: LatLng;
      radius?: number;
    }
  }
}

interface Window {
  kakao: typeof kakao;
}
