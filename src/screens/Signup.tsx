import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/stack';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;
interface IProps {
  navigation: SignupScreenNavigationProp
}

const Signup: React.FC<IProps> = ({
  navigation
}) => {
  return (
    <Container>
      <Text style={{ fontSize: 30}}>
        Signup Screen
      </Text>
    </Container>
  )
};

export default Signup;