import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/stack';

import { Image, Input, Button } from '../components';

import { validateEmail, removeWhitespace } from '../utils/common';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;
interface IProps {
  navigation: SignupScreenNavigationProp
}

const Signup: React.FC<IProps> = ({
  navigation
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage]);


  const _handleSignupButtonPress = () => {

  };


  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}  
    >
      <Container>
        <Image rounded />
        <Input
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => setName(name.trim())}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
        />
        <Input
          label="Email"
          value={email}
          onChangeText={text => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => {}}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          label="password"
          value={password}
          onChangeText={text => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => {}}
          placeholder="Password"
          returnKeyType="next"
          isPassword
        />
        <Input
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="Password Confirm"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>
          {errorMessage}
        </ErrorText>
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  )
};

export default Signup;