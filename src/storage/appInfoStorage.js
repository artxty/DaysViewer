import createStorage from 'typed-async-storage';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

const appInfoSchema = {
  firstLaunch: PropTypes.instanceOf(Date).isRequired,
  dailyNotificationId: PropTypes.string.isRequired,
  doesCalendarNeedUpdate: PropTypes.bool.isRequired,
};

const appInfoStorage = createStorage({
  name: 'appInfoStorage',
  schema: appInfoSchema,
  AsyncStorage,
});

export default appInfoStorage;
