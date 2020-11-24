import React from 'react';
import renderer from 'react-test-renderer';

import MoreScreen from '../../../src/screens/MoreScreen';

jest.mock('../../../src/components/MoreList', () => 'MoreList');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    useDailyNotification: [{}, jest.fn()],
    usePastMonthsRange: [3, jest.fn()],
  }),
}));

describe('MoreScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MoreScreen />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
