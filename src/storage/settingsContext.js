import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useSettingsStorage from './settingsStorageHook';

export const SettingsContext = createContext({});

export const SettingsContextProvider = ({ children }) => {
  const context = {
    usePastMonthsRange: useSettingsStorage('pastMonthsRange', 3),
    useDailyNotification: useSettingsStorage('dailyNotification', {
      isActive: false,
      time: { hours: 12, minutes: 0 },
    }),
  };
  return <SettingsContext.Provider value={context}>{children}</SettingsContext.Provider>;
};

export const SettingsContextConsumer = SettingsContext;

SettingsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
