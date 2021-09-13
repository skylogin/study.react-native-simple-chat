import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/stack';

import { ProgressContext } from '../contexts';
import { Image, Input, Button } from '../components';

import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from '../utils/images';
import { signup } from '../utils/firebase';

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
  const [photoUrl, setPhotoUrl] = useState(images.photo);

  const didMountRef = useRef(false);

  useEffect(() => {
    if(didMountRef.current){
      let _errorMessage = '';
      if(!name){
        _errorMessage = 'Please enter your Name.';
      } else if(!validateEmail(email)){
        _errorMessage = 'Please verify your Email.';
      } else if(password.length < 6){
        _errorMessage = 'The password must contain 6 characters at least.';
      } else if(password !== passwordConfirm){
        _errorMessage = 'Passwords need to match.';
      } else{
        _errorMessage = '';
      }
  
      setErrorMessage(_errorMessage);
    } else{
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);
  
  
  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage])
  
  const { spinner } = useContext(ProgressContext);


  const _handleSignupButtonPress = async () => {
    if(!disabled){
      try{
        spinner.start();
        const user = await signup({ email, password, name, photoUrl });
        Alert.alert('Signup Success', String(user?.email));
      } catch(e: any){
        Alert.alert('Signup Error', e.message);
      } finally{
        spinner.stop();
      }
    }
  };


  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}  
    >
      <Container>
        <Image 
          url={photoUrl} 
          onChangeImage={(url:string) => setPhotoUrl(url)}
          rounded 
          showButton />
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