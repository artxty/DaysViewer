import React from 'react';
import renderer from 'react-test-renderer';

import Calendar from '../../src/components/Calendar';

jest.mock('react-native-calendars', () => ({
  CalendarList: 'CalendarList',
}));

const pastMonthsRange = 3;

describe('Calendar', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Calendar
        pastMonthsRange={pastMonthsRange}
        days={{}}
        onDayPress={jest.fn()}
        onScroll={jest.fn()}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('transforms days prop into markedDates correctly', () => {
    const possibleRatings = [0, 1, 2, 3, 4, 5];
    const rawDays = possibleRatings.reduce((acc, r) => ({
      ...acc,
      [`mock day id ${r}`]: {
        rating: r,
        note: 'some note',
      },
    }), {});

    const tree = renderer.create(
      <Calendar
        pastMonthsRange={pastMonthsRange}
        days={rawDays}
        onDayPress={jest.fn()}
        onScroll={jest.fn()}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('calls onScroll when CalendarList calls onVisibleMonthsChange', async () => {
    const onScrollMock = jest.fn();
    const tree = renderer.create(
      <Calendar
        pastMonthsRange={pastMonthsRange}
        days={{}}
        onDayPress={jest.fn()}
        onScroll={onScrollMock}
      />,
    );

    const testInstance = tree.root;
    const calendarList = testInstance.find((el) => el.type === 'CalendarList');
    await calendarList.props.onVisibleMonthsChange([]);

    expect(onScrollMock).toBeCalled();
  });
});
