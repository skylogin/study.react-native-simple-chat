import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

import { ProgressContext } from '../contexts';
import { Spinner } from '../components';

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      {/* <AuthStack /> */}
      <MainStack />
      { inProgress && <Spinner /> }
    </NavigationContainer>
  );
};

export default Navigation;