import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

const Index: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
    </ThemeProvider>
  );
}

export default Index;