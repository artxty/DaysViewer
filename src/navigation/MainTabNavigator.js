/* eslint-disable react/prop-types */
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import MoreScreen from '../screens/MoreScreen';
import CalendarScreen from '../screens/CalendarScreen';

const config = Platform.select({
  default: {},
});

const CalendarStack = createStackNavigator(
  {
    Calendar: CalendarScreen,
  },
  config,
);

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-link'} />
  ),
};

CalendarStack.path = '';

const MoreStack = createStackNavigator(
  {
    More: MoreScreen,
  },
  config,
);

MoreStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-more' : 'md-options'} />
  ),
};

MoreStack.path = '';

const tabNavigator = createBottomTabNavigator({
  CalendarStack,
  MoreStack,
}, {
  tabBarOptions: {
    style: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      borderTopWidth: null,
    },
  },
});

tabNavigator.path = '';

export default tabNavigator;
