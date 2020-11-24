import createStorage from 'typed-async-storage';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

const daysSchema = PropTypes.objectOf(PropTypes.exact({
  rating: PropTypes.number.isRequired,
  note: PropTypes.string.isRequired,
}));

const daysStorage = createStorage({
  name: 'daysStorage',
  schema: daysSchema,
  AsyncStorage,
  isMultiple: true,
});

export default daysStorage;
