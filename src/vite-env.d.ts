
/// <reference types="vite/client" />

// Google Maps API type definitions
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      setOptions(options: MapOptions): void;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng | LatLngLiteral): void;
      setTitle(title: string): void;
      setIcon(icon: string | Icon | Symbol): void;
    }

    class Polyline {
      constructor(opts?: PolylineOptions);
      setMap(map: Map | null): void;
      setPath(path: Array<LatLng | LatLngLiteral>): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      styles?: Array<any>;
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: string | Icon | Symbol;
      label?: string | MarkerLabel;
    }

    interface PolylineOptions {
      path?: Array<LatLng | LatLngLiteral>;
      geodesic?: boolean;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    }

    interface Icon {
      url: string;
      size?: Size;
      scaledSize?: Size;
      origin?: Point;
      anchor?: Point;
    }

    interface MarkerLabel {
      text: string;
      color?: string;
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
    }

    class Size {
      constructor(width: number, height: number);
    }

    class Point {
      constructor(x: number, y: number);
    }

    class Symbol {
      constructor(options: SymbolOptions);
    }

    interface SymbolOptions {
      path: string;
      fillColor?: string;
      fillOpacity?: number;
      scale?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    }

    namespace MapTypeId {
      const ROADMAP: string;
      const SATELLITE: string;
      const HYBRID: string;
      const TERRAIN: string;
    }
  }
}

// Ensure the google global variable is available on the window object
interface Window {
  google?: typeof google;
}
