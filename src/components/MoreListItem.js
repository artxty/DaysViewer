import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default function ListItem({
  label, children, style, onPress,
}) {
  return (
    <View style={{ ...styles.item, ...style }} onStartShouldSetResponder={onPress}>
      <Text style={styles.text}>{label}</Text>
      {children}
    </View>
  );
}

ListItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  style: PropTypes.shape({}),
  onPress: PropTypes.func,
};

ListItem.defaultProps = {
  style: StyleSheet.create({}),
  onPress: () => null,
};
