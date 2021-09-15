import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

import { ChannelScreenNavigationType, ChannelRouteProp } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;


interface IProps {
  navigation: ChannelScreenNavigationType,
  route: ChannelRouteProp
}

const Channel: React.FC<IProps> = ({
  navigation,
  route
}) => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>
        ID: {route.params?.id}
      </Text>
      <Text style={{ fontSize: 24 }}>
        Title: {route.params?.title}
      </Text>
    </Container>
  )
};

export default Channel;