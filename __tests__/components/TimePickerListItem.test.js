import React from 'react';
import renderer, { act } from 'react-test-renderer';

import TimePickerListItem from '../../src/components/TimePickerListItem';

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  return {
    __esModule: true,
    TouchableOpacity: 'TouchableOpacity',
    View: 'View',
    Text: 'Text',
    StyleSheet: reactNative.StyleSheet,
  };
});

describe('TimePickerListItem', () => {
  let tree;
  let touchableOpacity;
  const onChangeMock = jest.fn();
  beforeEach(() => {
    tree = renderer.create(<TimePickerListItem
      value={{ hours: 4, minutes: 20 }}
      onChange={onChangeMock}
    />);
    touchableOpacity = tree.root.find((el) => el.type === 'TouchableOpacity');
    jest.clearAllMocks();
  });

  it('renders correctly when DateTimePicker is hidden', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should appear DateTimePicker after onPress', () => {
    act(() => {
      touchableOpacity.props.onPress();
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('DateTimePicker', () => {
    let dateTimePicker;
    beforeEach(() => {
      act(() => {
        touchableOpacity.props.onPress();
      });
      dateTimePicker = tree.root.find((el) => el.type === 'DateTimePicker');
    });

    it('should call props.onChange when own onChange called', () => {
      act(() => {
        dateTimePicker.props.onChange();
      });

      expect(onChangeMock).toBeCalledTimes(1);
    });

    it('should call props.onChange with correct arguments', () => {
      /* should transform Date object to { hours, minutes } object */
      const expectedArgs = { hours: 8, minutes: 40 };
      const fakeDateAfterChange = new Date(0, 0, 0, expectedArgs.hours, expectedArgs.minutes);

      act(() => {
        dateTimePicker.props.onChange(null, fakeDateAfterChange);
      });

      expect(onChangeMock).toBeCalledWith(expectedArgs);
    });
  });
});
