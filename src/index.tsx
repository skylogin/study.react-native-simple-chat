import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

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
          <SafeAreaView style={{ flex: 1 }}>
            <Navigation />
          </SafeAreaView>
        </ProgressProvder>
      </UserProvider>
    </ThemeProvider>
  );
}

export default Index;