import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const CustomMap = styled.div<ICustomMap>`
  ${({ width, height }) => css`
    width: ${width || '100%'};
    height: ${height || '100%'};
  `}

  .mapboxgl-ctrl-attrib-inner {
    display: none;
  }
`;

export const ClickCoordinatesContainer = styled.div`
  padding: 10px;
  text-align: center;

  small {
    margin: 0 15px;
  }
`;
