import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ProgressContext } from '../contexts';
import AuthStack from './AuthStack';
import { Spinner } from '../components';

const Navigation = () => {
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      <AuthStack />
      { inProgress && <Spinner /> }
    </NavigationContainer>
  );
};

export default Navigation;