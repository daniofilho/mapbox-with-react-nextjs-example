declare type MarkerType = {
  lng: number;
  lat: number;
};

declare interface ICustomMap {
  width?: string;
  height?: string;
}

declare interface IMap extends ICustomMap {
  mapId: string;
  lng: number;
  lat: number;
  zoom: number;
  markers: Array<MarkerType> | undefined;
}
