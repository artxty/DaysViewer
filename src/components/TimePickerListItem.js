import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import iosColors from 'ios-colors';

import { format } from '../helpers/date';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
  },
  timeText: {
    color: iosColors.systemBlue.light,
  },
});

export default function TimePickerItem({ value, onChange, style }) {
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [time, setTime] = useState(new Date(0, 0, 0, value.hours, value.minutes));

  function handleChange(event, selectedTime) {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    onChange({
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
    });
  }

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setIsTimePickerVisible(!isTimePickerVisible)}>
        <View style={styles.item}>
          <Text style={styles.text}>Time</Text>
          <Text style={{ ...styles.text, ...styles.timeText }}>{format(time, 'p')}</Text>
        </View>
      </TouchableOpacity>
      {isTimePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}

TimePickerItem.propTypes = {
  value: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
};

TimePickerItem.defaultProps = {
  style: StyleSheet.create({}),
};
