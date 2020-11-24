import iosColors from 'ios-colors';

const tintColor = '#2f95dc';

export default {
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
};

export const COLORS = {
  GREEN: '#00C853',
  LIME: '#AEEA00',
  YELLOW: '#FFD600',
  ORANGE: '#FF6D00',
  RED: '#DD2C00',
};

export const RATING_COLOR_MAP = {
  0: iosColors.systemGray5.light,
  1: iosColors.systemRed.light,
  2: iosColors.systemOrange.light,
  3: iosColors.systemYellow.light,
  4: 'rgb(164, 202, 80)', // color between systemYellow.light and systemGreen.light
  5: iosColors.systemGreen.light,
};
