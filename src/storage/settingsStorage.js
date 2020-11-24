import createStorage from 'typed-async-storage';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

const settingsSchema = {
  dailyNotification: PropTypes.exact({
    isActive: PropTypes.bool.isRequired,
    time: PropTypes.exact({
      hours: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  pastMonthsRange: PropTypes.number.isRequired,
};

const settingsStorage = createStorage({
  name: 'settingsStorage',
  schema: settingsSchema,
  AsyncStorage,
});

export default settingsStorage;
