import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

import { DB } from '../utils/firebase';

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


type TParam = {
  id: string;
  title: string;
}

type TItem = TParam & {
  description: string;
  createdAt: Date;
}
interface ItemProps {
  item: TItem;
  onPress: ({id, title}: TParam) => void;
}


const getDateOrTime = (ts: Date) => {
  const now = moment().startOf('day');
  const target = moment(ts).startOf('day');
  return moment(ts).format(now.diff(target, 'days') > 0? 'MM/DD': 'HH:mm');
}

const Item: React.FC<ItemProps> = React.memo(({
  item,
  onPress,
}) => {
  const { id, title, description, createdAt } = item;
  const theme = useContext(ThemeContext);

  return (
    <ItemContainer onPress={() => onPress({ id, title })}>
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemTextContainer>
      <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
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
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const unsubscribe = DB.collection('channels')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list: any = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setChannels(list);
      });

    return () => unsubscribe();
  }, []);

  const _handleItemPress = (params: TParam) => {
    navigation.navigate('Channel', params);
  }

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id']}
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