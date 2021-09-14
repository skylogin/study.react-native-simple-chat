import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components/native';

import { ProgressProvder, UserProvider } from './contexts';
import { theme } from './theme';
import Navigation from './navigations';


const Index: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ProgressProvder>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </ProgressProvder>
      </UserProvider>
    </ThemeProvider>
  );
}

export default Index;