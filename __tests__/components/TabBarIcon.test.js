import React from 'react';
import renderer from 'react-test-renderer';

import TabBarIcon from '../../src/components/TabBarIcon';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

it('renders correctly', () => {
  const tree = renderer.create(<TabBarIcon name="test" focused={false} />);

  expect(tree.toJSON()).toMatchSnapshot();
});

it('renders correctly when focused', () => {
  const tree = renderer.create(<TabBarIcon name="test" focused />);

  expect(tree.toJSON()).toMatchSnapshot();
});
