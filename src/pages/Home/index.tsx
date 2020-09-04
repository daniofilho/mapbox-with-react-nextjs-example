import React, { useState } from 'react';

import Map from 'components/Map';

import { Container, Github } from './styles';

const Home: React.FC = () => {
  const [mapMarkers, setMapMarkers] = useState<Array<MarkerType> | undefined>(undefined);

  // Just an example to show you can add markers after map loaded
  const markers: Array<MarkerType> = [
    {
      lat: -22.845347475419814,
      lng: -46.94279790489432,
    },
    {
      lat: -22.99586615719194,
      lng: -47.258654838487985,
    },
  ];

  return (
    <Container>
      <h1>Mapbox - React / NextJS working example</h1>
      <Map
        mapId="MapTest"
        lat={-22.84408190473907}
        lng={-46.937304740830086}
        zoom={9}
        height="600px"
        markers={mapMarkers}
      />
      <button type="button" onClick={() => setMapMarkers(markers)}>
        Add pre loaded markers
      </button>

      <Github>
        <a href="https://github.com/daniofilho/mapbox-with-react-nextjs-example" target="_blank">
          <img src="/github-logo.png" alt="Github" />
        </a>
      </Github>
    </Container>
  );
};

export default Home;
