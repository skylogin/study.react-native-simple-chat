import React, { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import styled from 'styled-components/native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import { MaterialIcons } from '@expo/vector-icons';


const Container = styled.View`
  align-self: center;
  width: 100px;
  height: 100px;
`;

const StyledImage = styled.Image<{ rounded: boolean }>`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded? 50: 0)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imageButtonBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(MaterialIcons).attrs({
  name: 'photo-camera',
  size: 22,
})`
  color: ${({ theme }) => theme.imageButtonIcon};
`;

interface IPhotoButtonProps{
  onPress: () => void;
}

const PhotoButton: React.FC<IPhotoButtonProps> = ({
  onPress
}) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  )
}



interface IProps {
  url?: string,
  imageStyle?: {},
  rounded?: boolean,
  showButton?: boolean,
  onChangeImage?: (url:string) => void,
}

const Image: React.FC<IProps> = ({
  url,
  imageStyle,
  rounded = false,
  showButton,
  onChangeImage = () => {},
}) => {


  useEffect(() => {
    (async () => {
      try{
        if(Platform.OS === 'ios'){
          const res = await MediaLibrary.getPermissionsAsync()
          
          if(!res.granted){
            Alert.alert(
              'Photo Permission',
              'Please turn on the camera roll permissions'
            );

            MediaLibrary.requestPermissionsAsync()
              .then(() => { })
              .catch((err) => console.warn(err));
          }
        }
      } catch(e: any){
        Alert.alert('Photo Permission Error', e.message);
      }
    })();
  }, []);


  const _handleEditButton = async () => {
    try{
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if(!result.cancelled){
        onChangeImage(result.uri);
      }
    } catch(e: any){
      Alert.alert('Photo Error', e.message);
    }
  }


  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded} />
      {showButton && <PhotoButton onPress={_handleEditButton} />}
    </Container>
  )
};

export default Image;