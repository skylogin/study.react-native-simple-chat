import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Alert } from 'react-native';

import { Button, Image, Input } from '../components';
import { logout, getCurrentUser, updateUserPhoto } from '../utils/firebase';
import { UserContext, ProgressContext } from '../contexts';

import { ProfileScreenNavigationType } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;


interface IProps {
  navigation: ProfileScreenNavigationType
}

const Profile: React.FC<IProps> = ({
  navigation
}) => {
  
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const theme = useContext(ThemeContext);
  
  const user = getCurrentUser();
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);


  const _handleLogoutButtonPress = async () => {
    try{
      spinner.start();
      await logout();
    } catch(e: any){
      console.log('[Profile] logout: ', e.message);
    } finally{
      dispatch({});
      spinner.stop();
    }
  }

  const _handlePhotoChange = async (url: string) => {
    try{
      spinner.start();
      const updateUser = await updateUserPhoto(url);
      setPhotoUrl(String(updateUser.photoUrl));
    } catch(e: any){
      Alert.alert('Photo error', e.message);
    } finally{
      spinner.stop();
    }
  }

  return (
    <Container>
      <Image
        url={String(photoUrl)}
        onChangeImage={_handlePhotoChange}
        showButton
        rounded
      />
      <Input label="Name" value={String(user.name)} disabled />
      <Input label="Email" value={String(user.email)} disabled />
      <Button 
        title="logout" 
        onPress={_handleLogoutButtonPress} 
        containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }} 
      />
    </Container>
  )
};

export default Profile;