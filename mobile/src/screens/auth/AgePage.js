import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../../components/OnboardingHeader';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';

const AGE_RANGES = ['< 13', '13–17', '18–24', '25–34', '35–44', '45–54', '55+'];

export default function AgePage({ navigation }) {
  const { setUserAge } = useApp();
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingHeader onBack={() => navigation.goBack()} progress={0.25} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Votre tranche d'âge</Text>
        <Text style={styles.sub}>Ces informations restent confidentielles.</Text>

        <View style={styles.grid}>
          {AGE_RANGES.map(age => (
            <TouchableOpacity
              key={age}
              style={[styles.card, selected === age && styles.cardSelected]}
              onPress={() => setSelected(age)}
            >
              <Text style={[styles.ageText, selected === age && styles.ageTextSelected]}>{age}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, !selected && styles.btnDisabled]}
          disabled={!selected}
          onPress={() => { setUserAge(selected); navigation.navigate('Email'); }}
        >
          <Text style={styles.btnText}>Continuer →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: colors.black, marginBottom: 8 },
  sub: { fontSize: 14, color: colors.textMuted, marginBottom: 32, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  card: {
    flexBasis: '30%',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  cardSelected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  ageText: { fontSize: 16, fontWeight: '700', color: colors.black },
  ageTextSelected: { color: colors.primary },
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
