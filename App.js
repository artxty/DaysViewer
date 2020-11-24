/* eslint-disable global-require */
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import PropTypes from 'prop-types';
import { Asset } from 'expo-asset';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Platform, StatusBar, StyleSheet, SafeAreaView,
} from 'react-native';
import { Host } from 'react-native-portalize';

import AppNavigator from './src/navigation/AppNavigator';
import appInfoStorage from './src/storage/appInfoStorage';
import { SettingsContextProvider } from './src/storage/settingsContext';

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
    }),
  ]);
}

async function detectFirstLaunch() {
  const firstLaunchDate = await appInfoStorage.get('firstLaunch');
  if (firstLaunchDate === null) await appInfoStorage.set('firstLaunch', new Date());
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={() => {
          loadResourcesAsync();
          detectFirstLaunch();
        }}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }
  return (
    <SettingsContextProvider>
      <SafeAreaView style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <Host>
          <AppNavigator />
        </Host>
      </SafeAreaView>
    </SettingsContextProvider>
  );
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};

App.defaultProps = {
  skipLoadingScreen: false,
};
