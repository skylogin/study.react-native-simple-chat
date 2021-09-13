import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

import { ProfileScreenNavigationType } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;


interface IProps {
  navigation: ProfileScreenNavigationType
}

const Profile: React.FC<IProps> = ({
  navigation
}) => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>
        Profile
      </Text>
    </Container>
  )
};

export default Profile;