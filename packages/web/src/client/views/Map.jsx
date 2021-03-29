import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';
import GoogleMap from '../components/GoogleMapwrapper/index.jsx';
import customTheme from '../theme';

const Map = () => (
  <ThemeProvider theme={customTheme}>
    <GoogleMap />
  </ThemeProvider>
);
export default Map;
