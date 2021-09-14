import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

import { Button } from '../components';
import { logout } from '../utils/firebase';
import { UserContext } from '../contexts';

import { ProfileScreenNavigationType } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;


interface IProps {
  navigation: ProfileScreenNavigationType
}

const Profile: React.FC<IProps> = ({
  navigation
}) => {

  const { dispatch } = useContext(UserContext);

  const _handleLogoutButtonPress = async () => {
    try{
      await logout();
    } catch(e: any){
      console.log('[Profile] logout: ', e.message);
    } finally{
      dispatch({});
    }
  }

  return (
    <Container>
      <Text style={{ fontSize: 24 }}>
        Profile
      </Text>
      <Button title="logout" onPress={_handleLogoutButtonPress} />
    </Container>
  )
};

export default Profile;