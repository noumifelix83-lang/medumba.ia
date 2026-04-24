import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';

export default function SuccessPage({ navigation }) {
  const { userName } = useApp();
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
          <Text style={styles.checkmark}>🎉</Text>
        </Animated.View>

        <Text style={styles.title}>Bienvenue, {userName || 'apprenant'} !</Text>
        <Text style={styles.sub}>
          Votre compte a été créé avec succès. Commençons votre voyage avec le Medumba !
        </Text>

        <View style={styles.statsRow}>
          {[
            { emoji: '🔥', label: '0', sub: 'Jours de suite' },
            { emoji: '⭐', label: '0 XP', sub: 'Points gagné' },
            { emoji: '💎', label: '50', sub: 'Gemmes offerts' },
          ].map(s => (
            <View key={s.label} style={styles.statBox}>
              <Text style={styles.statEmoji}>{s.emoji}</Text>
              <Text style={styles.statValue}>{s.label}</Text>
              <Text style={styles.statSub}>{s.sub}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Dashboard')}>
          <Text style={styles.btnText}>COMMENCER À APPRENDRE 🚀</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  checkmark: { fontSize: 64 },
  title: { fontSize: 26, fontWeight: '900', color: colors.black, marginBottom: 12, textAlign: 'center' },
  sub: { fontSize: 15, color: colors.textMuted, textAlign: 'center', lineHeight: 23, marginBottom: 32 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 40, width: '100%' },
  statBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.grayBg,
    borderRadius: 16,
    padding: 14,
  },
  statEmoji: { fontSize: 26, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '800', color: colors.black },
  statSub: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: 2 },
  btn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  btnText: { color: colors.white, fontSize: 15, fontWeight: '800', letterSpacing: 0.4 },
});
