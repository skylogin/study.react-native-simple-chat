import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

import { ChannelScreenNavigationType } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;


interface IProps {
  navigation: ChannelScreenNavigationType
}

const Channel: React.FC<IProps> = ({
  navigation
}) => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>
        Channel
      </Text>
    </Container>
  )
};

export default Channel;