import React, { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoginScreenNavigationType } from '../types/stack';

import { ProgressContext } from '../contexts';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import { validateEmail, removeWhitespace } from '../utils/common';
import { login } from '../utils/firebase';

const Container = styled.View<{ insets: any }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
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
  navigation: LoginScreenNavigationType
}


const Login: React.FC<IProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const { spinner } = useContext(ProgressContext);
  const insets = useSafeAreaInsets();

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

  const _handleLoginButtonPress = async () => {
    if(!disabled){
      try{
        spinner.start();
        const user = await login({ email, password });
        Alert.alert('Login Success', String(user?.email));
      } catch(e: any){
        Alert.alert('Login Error', e.message);
      } finally{
        spinner.stop();
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex:1 }} extraScrollHeight={20}>
      <Container insets={insets}>
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
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button title="Login" onPress={_handleLoginButtonPress} disabled={disabled} />
        <Button title="Sign up with Email" onPress={() => navigation.navigate('Signup')} isFilled={false} />
      </Container>
    </KeyboardAwareScrollView>
  )
};

export default Login;