import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../../components/OnboardingHeader';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';

const GOALS = [
  { id: 'speak',  emoji: '💬', label: 'Parler couramment',       sub: 'Mener des conversations naturelles' },
  { id: 'vocab',  emoji: '📇', label: 'Maîtriser le vocabulaire', sub: 'Apprendre de nombreux mots et expressions' },
  { id: 'habit',  emoji: '⏰', label: 'Créer une habitude',       sub: 'Étudier régulièrement chaque jour' },
  { id: 'culture',emoji: '🎵', label: 'Comprendre la culture',    sub: 'Traditions, proverbes et chansons' },
  { id: 'cert',   emoji: '🏆', label: 'Obtenir une certification', sub: 'Certification A1–C1 CEPOM' },
];

export default function AchievePage({ navigation }) {
  const { setGoals } = useApp();
  const [selected, setSelected] = useState([]);

  const toggle = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingHeader onBack={() => navigation.goBack()} progress={0.65} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Que voulez-vous accomplir ?</Text>
        <Text style={styles.sub}>Sélectionnez tout ce qui s'applique.</Text>

        <View style={styles.list}>
          {GOALS.map(g => {
            const active = selected.includes(g.id);
            return (
              <TouchableOpacity
                key={g.id}
                style={[styles.card, active && styles.cardSelected]}
                onPress={() => toggle(g.id)}
              >
                <Text style={styles.emoji}>{g.emoji}</Text>
                <View style={styles.textBlock}>
                  <Text style={[styles.label, active && styles.labelSelected]}>{g.label}</Text>
                  <Text style={styles.cardSub}>{g.sub}</Text>
                </View>
                <View style={[styles.check, active && styles.checkActive]}>
                  {active && <Text style={styles.checkMark}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.btn, selected.length === 0 && styles.btnDisabled]}
          disabled={selected.length === 0}
          onPress={() => { setGoals(selected); navigation.navigate('DailyGoal'); }}
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
  cardSub: { fontSize: 12, color: colors.textMuted, marginTop: 2, lineHeight: 18 },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  checkMark: { color: colors.white, fontSize: 13, fontWeight: '800' },
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
  btnDisabled: { backgroundColor: colors.grayLight, shadowOpacity: 0, elevation: 0 },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
});
