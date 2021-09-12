import React, { useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/stack';

import { Image, Input } from '../components';
import { images } from '../utils/images';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  margin-bottom: 60%;
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

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex:1 }} extraScrollHeight={20}>
      <Container>
        <Image url={images.logo} imageStyle={{ borderRadius: 8 }} />
        <Input
          label="Eamil"
          value={email}
          onChangeText={text => setEmail(text)}
          onSubmitEditing={() => {}}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={() => {}}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
      </Container>
    </KeyboardAwareScrollView>
  )
};

export default Login;