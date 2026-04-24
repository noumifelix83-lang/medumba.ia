import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../../components/OnboardingHeader';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';

const REASONS = [
  { id: 'fun',       emoji: '😁', label: 'Pour le plaisir',   sub: 'Apprendre en s\'amusant' },
  { id: 'career',    emoji: '💼', label: 'Carrière',          sub: 'Opportunités professionnelles' },
  { id: 'education', emoji: '🎓', label: 'Éducation',         sub: 'Études et certifications' },
  { id: 'vacation',  emoji: '✈️', label: 'Voyage',            sub: 'Voyager au Cameroun' },
  { id: 'family',    emoji: '👨‍👩‍👧', label: 'Famille',          sub: 'Communiquer avec mes proches' },
  { id: 'culture',   emoji: '🎵', label: 'Culture',           sub: 'Traditions et héritage Medumba' },
  { id: 'other',     emoji: '🧩', label: 'Autre objectif',    sub: 'Une raison personnelle' },
];

export default function ReasonPage({ navigation }) {
  const { setReason } = useApp();
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingHeader onBack={() => navigation.goBack()} progress={0.5} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Pourquoi apprenez-vous le Medumba ?</Text>
        <Text style={styles.sub}>Nous personnaliserons votre parcours selon votre objectif.</Text>

        <View style={styles.grid}>
          {REASONS.map(r => (
            <TouchableOpacity
              key={r.id}
              style={[styles.card, selected === r.id && styles.cardSelected]}
              onPress={() => setSelected(r.id)}
            >
              <Text style={styles.emoji}>{r.emoji}</Text>
              <Text style={[styles.label, selected === r.id && styles.labelSelected]}>{r.label}</Text>
              <Text style={styles.cardSub}>{r.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, !selected && styles.btnDisabled]}
          disabled={!selected}
          onPress={() => { setReason(selected); navigation.navigate('Achieve'); }}
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  card: {
    flexBasis: '47%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  cardSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  emoji: { fontSize: 28, marginBottom: 6 },
  label: { fontSize: 13, fontWeight: '700', color: colors.black, textAlign: 'center' },
  labelSelected: { color: colors.primary },
  cardSub: { fontSize: 11, color: colors.textMuted, textAlign: 'center', marginTop: 3, lineHeight: 16 },
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
