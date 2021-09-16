import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';

import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';

import { createMessage, getCurrentUser, DB } from '../utils/firebase';
import { ChannelScreenNavigationType, ChannelRouteProp } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;



const SendButton = (props: any) => {
  const theme = useContext(ThemeContext);

  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <MaterialIcons
        name="send"
        size={24}
        color={props.text? theme.sendButtonActivate: theme.sendButtonInactivate}
      />
    </Send>
  );
};


interface IProps {
  navigation: ChannelScreenNavigationType,
  route: ChannelRouteProp
}

const Channel: React.FC<IProps> = ({
  navigation,
  route
}) => {
  const { params } = route;

  const theme = useContext(ThemeContext);
  const [messages, setMessages] = useState([]);

  const user = getCurrentUser();

  let uid: string|number = '';
  let name: string = '';
  let photoUrl: string = '';
  if(user){
    uid = user.uid;
    name = user.name!;
    photoUrl = user.photoUrl!;
  }

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


  const _handleMessageSend = () => {

  };


  return (
    <Container>
      <GiftedChat
        listViewProps={{
          style: { backgroundColor: theme.background },
        }}
        placeholder="Enter a message..."
        messages={messages}
        user={{ _id: uid, name, avatar: photoUrl }}
        onSend={_handleMessageSend}
        alwaysShowSend={true}
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
          textContentType: 'none',
          underlineColorAndroid: 'transparent',
        }}
        renderUsernameOnMessage={true}
        scrollToBottom={true}
        renderSend={props => <SendButton {...props} />}
      />
    </Container>
  )
};

export default Channel;