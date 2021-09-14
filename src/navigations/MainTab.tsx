import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { Profile, ChannelList } from '../screens';
import { RouteProp, useRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

interface IProps {
  focused: boolean;
  name: typeof MaterialIcons.defaultProps;
}

const TabBarIcon: React.FC<IProps> = ({
  focused,
  name,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused? theme.tabActiveColor: theme.tabInactiveColor}
    />
  );
};






const MainTab: React.FC<{}> = ({
}) => {
  const theme = useContext(ThemeContext);


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Channels') {
            iconName = focused
              ? 'chat-bubble'
              : 'chat-bubble-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <TabBarIcon name={iconName} focused />;
        },
        tabBarActiveTintColor: theme.tabActiveColor,
        tabBarInactiveTintColor: theme.tabInactiveColor,
      })}
    >
      <Tab.Screen name="Channels" component={ChannelList} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};


export default MainTab;