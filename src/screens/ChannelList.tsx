import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { ChannelListScreenNavigationType } from '../types/stack';


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
`;


const channels: TItem[] = [];
for(let i=0; i<1000; i++){
  channels.push({
    id: String(i),
    title: `title ${i}`,
    description: `desciprtion ${i}`,
    createdAt: i,
  });
}



type TParam = {
  id: string;
  title: string;
}

type TItem = TParam & {
  description: string;
  createdAt: number;
}
interface ItemProps {
  item: TItem;
  onPress: ({id, title}: TParam) => void;
}

const Item: React.FC<ItemProps> = React.memo(({
  item,
  onPress,
}) => {
  const { id, title, description, createdAt } = item;

  const theme = useContext(ThemeContext);
  console.log(`Item: ${id}`);


  return (
    <ItemContainer onPress={() => onPress({ id, title })}>
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemTextContainer>
      <ItemTime>{createdAt}</ItemTime>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={24}
        color={theme.listIcon}
      />
    </ItemContainer>
  );
});


interface IProps{
    navigation: ChannelListScreenNavigationType;
}

const ChannelList: React.FC<IProps> = ({
  navigation
}) => {

  const _handleItemPress = (params: TParam) => {
    navigation.navigate('Channel', params);
  }

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id'].toString()}
        data={channels}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={5}
      />
    </Container>
  )
};

export default ChannelList;