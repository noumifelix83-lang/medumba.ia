import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import { colors } from '../theme/colors';

export default function OnboardingHeader({ onBack, progress = 0 }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <View style={styles.barWrap}>
        <ProgressBar value={progress * 100} max={100} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    gap: 12,
  },
  backBtn: {
    padding: 4,
  },
  backIcon: {
    fontSize: 22,
    color: colors.black,
  },
  barWrap: {
    flex: 1,
  },
});
