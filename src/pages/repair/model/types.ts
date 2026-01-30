export type RepairShop = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  distance?: number;
  placeUrl?: string;
};

export type KakaoAddressResult = {
  x: string;
  y: string;
};

export type KakaoPlace = {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  y: string;
  x: string;
  phone: string;
  distance?: string;
  place_url?: string;
};

export type KakaoPagination = {
  hasNextPage: boolean;
  nextPage: () => void;
};

export type KakaoMapInstance = {
  setCenter: (latLng: unknown) => void;
  setBounds: (bounds: unknown) => void;
  panTo: (latLng: unknown) => void;
};

export type KakaoMarker = {
  setMap: (map: KakaoMapInstance | null) => void;
};

export type KakaoOverlay = {
  setMap: (map: KakaoMapInstance | null) => void;
};

export type KakaoLatLngBounds = {
  extend: (latLng: unknown) => void;
};

export type KakaoMapsServices = {
  Geocoder: new () => {
    addressSearch: (query: string, cb: (result: unknown[], status: string) => void) => void;
  };
  Places: new () => {
    keywordSearch: (
      keyword: string,
      cb: (data: unknown[], status: string, pagination: KakaoPagination) => void,
      options: { location: unknown; radius: number }
    ) => void;
  };
  Status: { OK: string };
};

export type KakaoMaps = {
  LatLng: new (lat: number, lng: number) => unknown;
  Map: new (container: HTMLElement, options: { center: unknown; level: number }) => KakaoMapInstance;
  CustomOverlay: new (options: {
    yAnchor: number;
    zIndex: number;
    content?: string;
    position?: unknown;
  }) => KakaoOverlay;
  Marker: new (options: { map: KakaoMapInstance; position: unknown; image?: unknown }) => KakaoMarker;
  MarkerImage: new (src: string, size: unknown, options: { offset: unknown }) => unknown;
  Size: new (width: number, height: number) => unknown;
  Point: new (x: number, y: number) => unknown;
  LatLngBounds: new () => KakaoLatLngBounds;
  event: { addListener: (target: unknown, event: string, handler: () => void) => void };
  load?: (callback: () => void) => void;
  services?: KakaoMapsServices;
};
