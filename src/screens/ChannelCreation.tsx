import React, { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ProgressContext } from '../contexts';
import { createChannel } from '../utils/firebase';

import { ChannelCreationScreenNavigationType } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;


interface IProps {
  navigation: ChannelCreationScreenNavigationType
}

const ChannelCreation: React.FC<IProps> = ({
  navigation
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { spinner } = useContext(ProgressContext);

  useEffect(() => {
    setDisabled(!(title && !errorMessage));
  }, [title, description, errorMessage]);

  const _handleTitleChange = (title: string) => {
    setTitle(title);
    setErrorMessage(title.trim()? '': 'Plesase enter the title.');
  };

  const _handleCreateButtonPress = async () => {
    //disabled 체크
    try{
      spinner.start();
      const id = await createChannel({ title, description });
      navigation.replace('Channel', { id, title });
    } catch(e: any){
      Alert.alert('Creation Error', e.message);
    } finally{
      spinner.stop();
    }

  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <Input
          label="Title"
          value={title}
          onChangeText={_handleTitleChange}
          onSubmitEditing={() => setTitle(title.trim())}
          onBlur={() => setTitle(title.trim())}
          placeholder="Title"
          returnKeyType="next"
          maxLength={20}
        />
        <Input
          label="Description"
          value={description}
          onChangeText={text => setDescription(text)}
          onSubmitEditing={() => {
            setDescription(description.trim());
            _handleCreateButtonPress();
          }}
          onBlur={() => setDescription(description.trim())}
          placeholder="Description"
          returnKeyType="done"
          maxLength={40}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Create"
          onPress={_handleCreateButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  )
};

export default ChannelCreation;