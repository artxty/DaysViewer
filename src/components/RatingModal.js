import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modalize } from 'react-native-modalize';
import iosColors from 'ios-colors';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

import { getDateFromDateId, format } from '../helpers/date';
import RatingPicker from './RatingPicker';

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 15,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 15,
    minHeight: 50,
    padding: 15,
    borderRadius: 15,
    backgroundColor: iosColors.systemGray6.light,
  },
  footer: {
    marginBottom: 10,
  },
});

const RatingModal = React.forwardRef(({ dayData, onSave }, ref) => {
  const [title, setTitle] = useState();
  const [rating, setRating] = useState();
  const [note, setNote] = useState();

  useEffect(() => {
    const dayDate = getDateFromDateId(dayData.id);
    setTitle(format(dayDate, 'PPP'));
    setRating(dayData.rating);
    setNote(dayData.note);
  }, [dayData.id]);

  const handleSavePress = () => onSave({
    id: dayData.id,
    rating: rating || 0,
    note: note || '',
  });

  return (
    <Modalize
      ref={ref}
      modalTopOffset={50}
      adjustToContentHeight
      HeaderComponent={() => <Text style={styles.header}>{title}</Text>}
      FooterComponent={() => <View style={styles.footer}><Button title="Done" onPress={handleSavePress} /></View>}
    >
      <View style={styles.container}>
        <RatingPicker
          rating={rating}
          onPress={setRating}
          containerStyle={styles.ratingPicker}
        />
        <TextInput
          multiline
          placeholder="Note"
          maxLength={400}
          numberOfLines={1}
          onChangeText={setNote}
          value={note}
          style={styles.textInput}
        />
      </View>
    </Modalize>
  );
});

RatingModal.propTypes = {
  dayData: PropTypes.exact({
    id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default RatingModal;
