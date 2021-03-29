import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../lib/theme';

const WithTheme = Component => props => (
  <ThemeProvider theme={theme}>
    <Component {...props}/>
  </ThemeProvider>
);

export default WithTheme;
