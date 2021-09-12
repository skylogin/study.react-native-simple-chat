import React, { useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/stack';

import { Image, Input } from '../components';
import { images } from '../utils/images';
import { validateEmail, removeWhitespace } from '../utils/common';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  /* margin-bottom: 60%; */
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
interface IProps {
  navigation: LoginScreenNavigationProp
}



const Login: React.FC<IProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const _handleEmailChange = (email: string) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail)? '': 'Please verify your Email.'
    );
  };

  const _handlePasswordChange = (password: string) => {
    setPassword(removeWhitespace(password));
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex:1 }} extraScrollHeight={20}>
      <Container>
        <Image url={images.logo} imageStyle={{ borderRadius: 8 }} />
        <Input
          label="Eamil"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => {}}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={() => {}}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
      </Container>
    </KeyboardAwareScrollView>
  )
};

export default Login;