import React from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';

import { ChannelListScreenNavigationType } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;


interface IProps {
  navigation: ChannelListScreenNavigationType
}

const ChannelList: React.FC<IProps> = ({
  navigation
}) => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>
        Channel List
      </Text>
      <Button title="Channel Creation" onPress={() => navigation.navigate('Channel Creation')} />
    </Container>
  )
};

export default ChannelList;