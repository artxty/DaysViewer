import React from 'react';
import { Text } from 'react-native';

import ListItem from '../../components/MoreListItem';

export default function getAboutSection() {
  return {
    title: 'About',
    data: [
      <ListItem label="Rate app">
        <Text>text</Text>
      </ListItem>,
      <ListItem label="Share with friends">
        <Text>text</Text>
      </ListItem>,
      <ListItem label="Privacy">
        <Text>text</Text>
      </ListItem>,
    ],
  };
}
