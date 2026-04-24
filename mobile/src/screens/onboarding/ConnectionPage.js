import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../../components/OnboardingHeader';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';

const OPTIONS = [
  { id: 'native',       emoji: '🏡', label: 'Je suis Medumba de naissance',        sub: 'C\'est ma langue maternelle ou celle de mes parents' },
  { id: 'heritage',     emoji: '🌍', label: 'J\'ai des racines Medumba / Bamiléké', sub: 'Famille au Cameroun ou dans la diaspora' },
  { id: 'relationship', emoji: '❤️', label: 'Mon partenaire parle Medumba',          sub: 'Je veux mieux comprendre et m\'intégrer' },
  { id: 'culture',      emoji: '🎵', label: 'Passionné(e) par la culture africaine', sub: 'Musique, traditions, proverbes Medumba' },
  { id: 'curious',      emoji: '🔍', label: 'Simple curiosité linguistique',          sub: 'J\'explore les langues du monde' },
];

export default function ConnectionPage({ navigation }) {
  const { setConnection } = useApp();
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingHeader onBack={() => navigation.goBack()} progress={0.2} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Quelle est votre connexion avec le Medumba ?</Text>

        <View style={styles.list}>
          {OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.card, selected === opt.id && styles.cardSelected]}
              onPress={() => setSelected(opt.id)}
            >
              <Text style={styles.emoji}>{opt.emoji}</Text>
              <View style={styles.textBlock}>
                <Text style={[styles.label, selected === opt.id && styles.labelSelected]}>{opt.label}</Text>
                <Text style={styles.sub}>{opt.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, !selected && styles.btnDisabled]}
          disabled={!selected}
          onPress={() => { setConnection(selected); navigation.navigate('Proficiency'); }}
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
    alignItems: 'flex-start',
    gap: 14,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  cardSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  emoji: { fontSize: 26, marginTop: 2 },
  textBlock: { flex: 1 },
  label: { fontSize: 15, fontWeight: '700', color: colors.black, lineHeight: 22 },
  labelSelected: { color: colors.primary },
  sub: { fontSize: 12, color: colors.textMuted, marginTop: 2, lineHeight: 18 },
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
