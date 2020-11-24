import React, { useState, useRef, useContext } from 'react';
import { Portal } from 'react-native-portalize';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import RatingModal from '../components/RatingModal';
import Calendar from '../components/Calendar';
import useDaysStorage from '../storage/daysStorageHook';
import { SettingsContext } from '../storage/settingsContext';
import appInfoStorage from '../storage/appInfoStorage';

const EMPTY_DAY = (id) => ({ id, rating: 0, note: '' });

export default function CalendarScreen() {
  const { usePastMonthsRange } = useContext(SettingsContext);
  const [pastMonthsRange] = usePastMonthsRange;

  const modalRef = useRef(null);
  const [modalData, setModalData] = useState(EMPTY_DAY('2020-01-01'));

  const [visibleMonths, setVisibleMonths] = useState([]);
  const [days, setDaysToStorage, refetchHookData] = useDaysStorage(visibleMonths);

  function handleOnDayPress(id) {
    setModalData(days[id] !== null ? { ...days[id], id } : EMPTY_DAY(id));
    modalRef.current.open();
  }

  async function handleDaySaving({ id, rating, note }) {
    if (!(rating === 0 && note.length === 0)) {
      await setDaysToStorage({ [id]: { rating, note } });
    }
    modalRef.current.close();
  }

  return (
    <View>
      <NavigationEvents
        onWillFocus={async () => {
          const doesNeedUpdate = await appInfoStorage.get('doesCalendarNeedUpdate');
          if (doesNeedUpdate) {
            refetchHookData();
            await appInfoStorage.set('doesCalendarNeedUpdate', false);
          }
        }}
      />
      <Portal>
        <RatingModal
          ref={modalRef}
          dayData={modalData}
          onSave={handleDaySaving}
        />
      </Portal>
      <Calendar
        pastMonthsRange={pastMonthsRange}
        days={days}
        onScroll={(months) => setVisibleMonths(months)}
        onDayPress={handleOnDayPress}
      />
    </View>
  );
}

CalendarScreen.navigationOptions = {
  header: null,
};
