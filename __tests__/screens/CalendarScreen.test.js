import React from 'react';
import renderer from 'react-test-renderer';

import CalendarScreen from '../../src/screens/CalendarScreen';
import useDaysStorage from '../../src/storage/daysStorageHook';

jest.mock('react-native-portalize', () => ({
  Portal: 'Portal',
}));

jest.mock('react-navigation', () => ({
  NavigationEvents: 'NavigationEvents',
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    usePastMonthsRange: [3],
  }),
}));

jest.mock('../../src/components/RatingModal', () => 'RatingModal');
jest.mock('../../src/components/Calendar', () => 'Calendar');

const dayId = '2020-01-01';
const days = {
  [dayId]: {
    rating: 1,
    note: 'Note123',
  },
};

jest.mock('../../src/storage/daysStorageHook', () => jest.fn());
useDaysStorage.mockImplementation(() => [
  days,
  jest.fn(),
]);

describe('CalendarScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CalendarScreen />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  // TODO: should call modal.close when onSave
  // TODO: should call RatingModal.open when onDayPress
  // TODO: passes dayData param to RatingModal when onDayPress
});
