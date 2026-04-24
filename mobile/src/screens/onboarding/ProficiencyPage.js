import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../../components/OnboardingHeader';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';

const LEVELS = [
  { id: 1, emoji: '🌱', label: 'Débutant absolu',  sub: 'Je ne connais presque aucun mot en Medumba',     color: colors.danger },
  { id: 2, emoji: '📚', label: 'Élémentaire',       sub: 'Je connais quelques mots et phrases simples',    color: colors.warning },
  { id: 3, emoji: '💬', label: 'Intermédiaire',     sub: 'Je peux avoir de petites conversations de base', color: colors.success },
  { id: 4, emoji: '🎓', label: 'Avancé',            sub: 'Je parle couramment avec des locuteurs natifs',  color: colors.primaryDark },
];

export default function ProficiencyPage({ navigation }) {
  const { setProficiency } = useApp();
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingHeader onBack={() => navigation.goBack()} progress={0.35} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Quel est votre niveau en Medumba ?</Text>

        <View style={styles.list}>
          {LEVELS.map(level => (
            <TouchableOpacity
              key={level.id}
              style={[styles.card, selected === level.id && styles.cardSelected]}
              onPress={() => setSelected(level.id)}
            >
              <Text style={styles.emoji}>{level.emoji}</Text>
              <View style={styles.textBlock}>
                <Text style={[styles.label, selected === level.id && { color: colors.primary }]}>{level.label}</Text>
                <Text style={styles.sub}>{level.sub}</Text>
              </View>
              <View style={[styles.dot, { backgroundColor: level.color }]} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, !selected && styles.btnDisabled]}
          disabled={!selected}
          onPress={() => { setProficiency(selected); navigation.navigate('Reason'); }}
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
  title: { fontSize: 22, fontWeight: '800', color: colors.black, marginBottom: 24, lineHeight: 30 },
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
  emoji: { fontSize: 28 },
  textBlock: { flex: 1 },
  label: { fontSize: 15, fontWeight: '700', color: colors.black },
  sub: { fontSize: 12, color: colors.textMuted, marginTop: 3, lineHeight: 18 },
  dot: { width: 12, height: 12, borderRadius: 6 },
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
