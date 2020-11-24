/* eslint-disable  */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';
import  iosColors from 'ios-colors';

import { RATING_COLOR_MAP } from '../constants/Colors';

const ratingTextMap = {
  0: 'Unrated day',
  1: 'Terrible day',
  2: 'Bad day',
  3: 'Okay day',
  4: 'Good day',
  5: 'Awesome day',
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: "800",
  },
});

export default function Rating(props) {
  const { rating, onPress } = props;
  const color = RATING_COLOR_MAP[rating];
  return (
    <View style={styles.container}>
      <Text style={{...styles.text, color }}>{ratingTextMap[rating]}</Text>
      <StarRating
        emptyStar="ios-star-outline"
        fullStar="ios-star"
        starSize={70}
        iconSet="Ionicons"
        maxStars={5}
        rating={rating}
        selectedStar={onPress}
        fullStarColor={color}
        emptyStarColor={iosColors.systemGray5.light}
        {...props}
      />
    </View>
  );
}
