import React from 'react';
import renderer from 'react-test-renderer';

import RatingModal from '../../src/components/RatingModal';

jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  return {
    __esModule: true,
    View: 'View',
    Text: 'Text',
    Button: 'Button',
    TextInput: 'TextInput',
    StyleSheet: reactNative.StyleSheet,
  };
});

jest.mock('react-native-modalize', () => ({ Modalize: 'Modalize' }));
jest.mock('../../src/components/RatingPicker', () => 'RatingPicker');

describe('RatingModal', () => {
  const ref = React.createRef(null);

  it('renders correctly', () => {
    const dayData = {
      id: '2020-04-01',
      rating: 4,
      note: 'My little note right here!',
    };

    const tree = renderer.create(
      <RatingModal
        ref={ref}
        onSave={jest.fn()}
        dayData={dayData}
      />,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
