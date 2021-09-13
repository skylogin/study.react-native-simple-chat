import React from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';

import { ChannelCreationScreenNavigationType } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;


interface IProps {
  navigation: ChannelCreationScreenNavigationType
}

const ChannelCreation: React.FC<IProps> = ({
  navigation
}) => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>
        Channel Creation
      </Text>
      <Button title="Channel" onPress={() => navigation.navigate('Channel')} />
    </Container>
  )
};

export default ChannelCreation;