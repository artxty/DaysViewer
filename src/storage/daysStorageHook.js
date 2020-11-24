import { useState, useEffect } from 'react';

import daysStorage from './daysStorage';
import { getEachDayIdInMonth } from '../helpers/date';

export default function useDaysStorage(visibleMonths = []) {
  const [days, setDays] = useState({});
  const [readyMonths, setReadyMonths] = useState([]);

  async function getDaysDataFromStorage(monthsIds = []) {
    const daysIds = [];
    monthsIds.forEach((id) => daysIds.push(...getEachDayIdInMonth(id)));
    const daysData = await daysStorage.get(daysIds);
    setDays({ ...days, ...daysData });
  }

  async function setDaysDataToStorage(daysObject) {
    await daysStorage.set(daysObject);
    setDays({ ...days, ...daysObject });
  }

  useEffect(() => {
    const newMonthsToGet = [];
    visibleMonths.forEach((id) => {
      if (!readyMonths.includes(id)) {
        newMonthsToGet.push(id);
        setReadyMonths([...readyMonths, id]);
      }
    });
    if (newMonthsToGet.length !== 0) {
      getDaysDataFromStorage(newMonthsToGet);
    }
  }, [visibleMonths]);

  const refetch = async () => {
    await getDaysDataFromStorage(readyMonths);
  };

  return [days, setDaysDataToStorage, refetch];
}
