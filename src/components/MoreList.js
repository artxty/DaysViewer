import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
} from 'react-native';
import iosColors from 'ios-colors';
// import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
    backgroundColor: iosColors.systemGray6.light,
  },
  header: {
    paddingHorizontal: 16,
    fontSize: 13,
    color: iosColors.systemGray2.dark,
    marginBottom: 5,
  },
  item: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemSeparator: {
    borderColor: iosColors.systemGray3.light,
    borderBottomWidth: 0.5,
  },
  sectionSeparator: {
    borderColor: iosColors.systemGray3.light,
    borderBottomWidth: 0.5,
  },
  renderSectionFooter: {
    marginBottom: 30,
  },
});

export default function MoreList({ sections }) {
  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={() => <View style={styles.renderSectionFooter} />}
        // ListFooterComponent={() => <Text>{`Calendar App v${Constants.nativeAppVersion}`}</Text>}
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <View style={styles.item}>{item}</View>}
        renderSectionHeader={
          ({ section: { title } }) => <Text style={styles.header}>{title.toUpperCase()}</Text>
        }
        stickySectionHeadersEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
        renderSectionFooter={() => <View style={styles.renderSectionFooter} />}
      />
    </View>
  );
}

MoreList.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};
