import React from 'react';
import { Text, Button } from 'react-native';
import styled from 'styled-components/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/stack';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
interface IProps {
  navigation: LoginScreenNavigationProp
}



const Login: React.FC<IProps> = ({
  navigation
}) => {
  return (
    <Container>
      <Text style={{ fontSize: 30}}>
        Login Screen
      </Text>
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </Container>
  )
};

export default Login;