import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../../components/OnboardingHeader';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';

const GOALS = [
  { id: 'relaxed', emoji: '🌿', label: 'Décontracté',  time: '5 min / jour',  xp: 10  },
  { id: 'normal',  emoji: '🎯', label: 'Normal',       time: '10 min / jour', xp: 20  },
  { id: 'serious', emoji: '💪', label: 'Sérieux',      time: '15 min / jour', xp: 30  },
  { id: 'great',   emoji: '🚀', label: 'Intense',      time: '30 min / jour', xp: 60  },
  { id: 'awesome', emoji: '🏆', label: 'Champion',     time: '60 min / jour', xp: 100 },
];

export default function DailyGoalPage({ navigation }) {
  const { setDailyGoal } = useApp();
  const [selected, setSelected] = useState('normal');

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingHeader onBack={() => navigation.goBack()} progress={0.8} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Quel est votre objectif quotidien ?</Text>
        <Text style={styles.sub}>Vous pouvez le modifier à tout moment.</Text>

        <View style={styles.list}>
          {GOALS.map(g => (
            <TouchableOpacity
              key={g.id}
              style={[styles.card, selected === g.id && styles.cardSelected]}
              onPress={() => setSelected(g.id)}
            >
              <Text style={styles.emoji}>{g.emoji}</Text>
              <View style={styles.textBlock}>
                <Text style={[styles.label, selected === g.id && styles.labelSelected]}>{g.label}</Text>
                <Text style={styles.time}>{g.time}</Text>
              </View>
              <View style={styles.xpBadge}>
                <Text style={styles.xpText}>+{g.xp} XP</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => { setDailyGoal(selected); navigation.navigate('ProfileWelcome'); }}
        >
          <Text style={styles.btnText}>Continuer →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', color: colors.black, marginBottom: 8, lineHeight: 30 },
  sub: { fontSize: 14, color: colors.textMuted, marginBottom: 24, lineHeight: 20 },
  list: { gap: 12, marginBottom: 32 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  cardSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  emoji: { fontSize: 26 },
  textBlock: { flex: 1 },
  label: { fontSize: 15, fontWeight: '700', color: colors.black },
  labelSelected: { color: colors.primary },
  time: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  xpBadge: {
    backgroundColor: colors.xp + '22',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  xpText: { fontSize: 12, fontWeight: '700', color: colors.warning },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
});
