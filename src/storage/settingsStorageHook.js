import { useState, useEffect } from 'react';
import settingsStorage from './settingsStorage';

export default function useSettingsData(key, initial = null) {
  const [state, setState] = useState(initial);
  const [isInitial, setIsInitial] = useState(true);

  async function get() {
    const settingData = await settingsStorage.get(key);
    if (settingData) {
      setState(settingData);
    }
  }

  async function set(value) {
    await settingsStorage.set(key, value);
    setState(value);
  }

  useEffect(() => {
    if (isInitial) {
      get(key);
      setIsInitial(false);
    }
  });

  return [state, set];
}
