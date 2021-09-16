import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { Text, FlatList } from 'react-native';

import { Input } from '../components';
import { createMessage, DB } from '../utils/firebase';

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
  const { params } = route;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsubscribe = DB.collection('channels')
      .doc(params.id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(sanpshot => {
        const list: any = [];
        sanpshot.forEach(doc => {
          list.push(doc.data());
        });
        setMessages(list);
      });

      return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: params.title || 'Channel' });
  });

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id']}
        data={messages}
        renderItem={({ item }: any) => (
          <Text style={{ fontSize: 24 }}>{item.text}</Text>
        )}
      />
      <Input
        value={text}
        onChangeText={text => setText(text)}
        onSubmitEditing={() => createMessage({ channelId: params.id, text })}
      />
    </Container>
  )
};

export default Channel;