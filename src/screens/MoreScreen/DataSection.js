import React from 'react';
import { Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

import ListItem from '../../components/MoreListItem';
import daysStorage from '../../storage/daysStorage';
import appInfoStorage from '../../storage/appInfoStorage';

export default function getDataSection() {
  return {
    title: 'Data',
    data: [
      <ListItem label="Export">
        <Button
          title="Share backup file"
          onPress={async () => {
            const keys = await daysStorage.getAllKeys();
            const data = await daysStorage.get(keys);
            const uri = `${FileSystem.cacheDirectory}backup.json`;
            await FileSystem.writeAsStringAsync(uri, JSON.stringify(data));
            await Sharing.shareAsync(uri);
          }}
        />
      </ListItem>,
      <ListItem label="Import">
        <Button
          title="Choose backup file"
          onPress={async () => {
            const document = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
            if (document.type === 'success') {
              const jsonString = await FileSystem.readAsStringAsync(document.uri);
              /* TODO: validate json */
              await daysStorage.clear();
              await daysStorage.set(JSON.parse(jsonString));
              await appInfoStorage.set('doesCalendarNeedUpdate', true);
            }
          }}
        />
      </ListItem>,
    ],
  };
}
