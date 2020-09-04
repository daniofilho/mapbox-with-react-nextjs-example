import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import GlobalStyle from 'styles/global';
import 'mapbox-gl/dist/mapbox-gl.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Mapbox - React / NextJS</title>
      </Head>

      <Component {...pageProps} />

      <GlobalStyle />
    </>
  );
};

export default MyApp;
