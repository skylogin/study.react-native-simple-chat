import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components/native';

import { ProgressProvder } from './contexts';
import { theme } from './theme';
import Navigation from './navigations';


const Index: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ProgressProvder>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </ProgressProvder>
    </ThemeProvider>
  );
}

export default Index;