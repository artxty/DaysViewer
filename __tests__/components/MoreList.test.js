import React from 'react';
import renderer from 'react-test-renderer';

import MoreList from '../../src/components/MoreList';

jest.mock('expo-constants', () => ({ nativeAppVersion: 'v0.1.1' }));
jest.mock('react-native', () => {
  const reactNative = jest.requireActual('react-native');
  return {
    __esModule: true,
    View: 'View',
    Text: 'Text',
    SectionList: 'SectionList',
    StyleSheet: reactNative.StyleSheet,
  };
});

describe('MoreList', () => {
  it('renders correctly', () => {
    const sections = [
      { titile: '1', data: [1, 2, 3] },
      { titile: '2', data: [3, 4, 5] },
    ];
    const tree = renderer.create(<MoreList sections={sections} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
