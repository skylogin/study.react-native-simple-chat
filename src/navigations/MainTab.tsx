import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, ChannelList } from '../screens';

const Tab = createBottomTabNavigator();

const MainTab: React.FC<{}> = ({

}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Channel List" component={ChannelList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};


export default MainTab;