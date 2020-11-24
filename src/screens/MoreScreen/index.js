import React, { useContext } from 'react';

import MoreList from '../../components/MoreList';
import getSettingsSection from './SettingsSection';
import getDataSection from './DataSection';
// import getAboutSection from './AboutSection';
import { SettingsContext } from '../../storage/settingsContext';

export default function MoreScreen() {
  const { useDailyNotification, usePastMonthsRange } = useContext(SettingsContext);

  const settingsSection = getSettingsSection(
    useDailyNotification,
    usePastMonthsRange,
  );

  return (
    <MoreList
      sections={[
        settingsSection,
        getDataSection(),
        // getAboutSection(),
      ]}
    />
  );
}

MoreScreen.navigationOptions = {
  header: null,
};
