import React from 'react';
import renderer from 'react-test-renderer';

import MoreListItem from '../../src/components/MoreListItem';

const ChildrenComponent = () => <div />;

describe('MoreListItem', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <MoreListItem label="test">
        <ChildrenComponent />
      </MoreListItem>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
