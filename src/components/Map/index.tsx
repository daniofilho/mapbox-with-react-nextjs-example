import React, { useState, useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

import { Container, ClickCoordinatesContainer, CustomMap } from './styles';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''; // YOUR TOKEN HERE (or in a .env file)

const Map: React.FC<IMap> = ({ mapId, width, height, lng, lat, zoom, markers }) => {
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);

  const [clickCoordinates, setClickCoordinates] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(zoom);
  const [mapCoordinates, setMapCoordinates] = useState({ lat, lng });

  // # Start the map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapId,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapCoordinates.lng, mapCoordinates.lat],
      zoom: mapZoom,
    });

    map.on('load', () => {
      setMapInstance(map);

      map.resize();

      // possible markers
      if (markers) {
        markers.map((marker: MarkerType): boolean => {
          new mapboxgl.Marker().setLngLat([marker.lng, marker.lat]).addTo(map);
          return true;
        });
      }
    });

    map.on('click', (e) => {
      setClickCoordinates({
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      });

      new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
    });

    /* 
    The idea is to execute the useEffect only once (when DOM is ready).
    If any other map props are updated, there are "listeners" for every one of them
  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // # Marker Listener
  useEffect(() => {
    if (!mapInstance || !markers) return;

    markers.map((marker: MarkerType): boolean => {
      new mapboxgl.Marker().setLngLat([marker.lng, marker.lat]).addTo(mapInstance);
      return true;
    });
  }, [mapInstance, markers]);

  // # Zoom Listener
  useEffect(() => {
    if (!mapInstance) return;

    mapInstance.setZoom(mapZoom);
  }, [mapInstance, mapZoom]);

  // # Coordinates Listener
  useEffect(() => {
    if (!mapInstance) return;

    mapInstance.setCenter([lng, lat]);
  }, [mapInstance, mapCoordinates, lng, lat]);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  const changeMapZoom = useCallback(
    (val: number): void => {
      setMapZoom(val);
      if (mapInstance) mapInstance.setZoom(val);
    },
    [mapInstance]
  );

  return (
    <Container>
      <ClickCoordinatesContainer>
        <p>
          Click on the map to add a marker and see the coordinates:
          <br />
          {clickCoordinates.lat}
          <small>x</small>
          {clickCoordinates.lng}
        </p>
      </ClickCoordinatesContainer>

      <CustomMap id={mapId} width={width} height={height} />

      <div>
        <button type="button" onClick={() => changeMapZoom(mapZoom - 1)}>
          Zoom (-)
        </button>
        <button type="button" onClick={() => changeMapZoom(mapZoom + 1)}>
          Zoom (+)
        </button>
        <button type="button" onClick={() => setMapCoordinates({ lat, lng })}>
          Reset map center
        </button>
      </div>
    </Container>
  );
};

export default Map;
