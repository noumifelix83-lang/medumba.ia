import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../../components/OnboardingHeader';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';

const LANGUAGES = [
  { id: 'fr',      flag: '🇫🇷', name: 'Français'   },
  { id: 'en',      flag: '🇬🇧', name: 'English'    },
  { id: 'de',      flag: '🇩🇪', name: 'Deutsch'    },
  { id: 'es',      flag: '🇪🇸', name: 'Español'    },
  { id: 'it',      flag: '🇮🇹', name: 'Italiano'   },
  { id: 'pt',      flag: '🇵🇹', name: 'Português'  },
  { id: 'ar',      flag: '🇸🇦', name: 'عربي'       },
  { id: 'zh',      flag: '🇨🇳', name: '中文'        },
  { id: 'fulfulde',flag: '🌍', name: 'Fulfulde'    },
  { id: 'bassa',   flag: '🌍', name: 'Bassa'       },
  { id: 'ewondo',  flag: '🌍', name: 'Ewondo'      },
];

export default function LanguageSelection({ navigation }) {
  const { nativeLang, setNativeLang } = useApp();
  const [selected, setSelected] = useState(nativeLang || 'fr');

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingHeader onBack={() => navigation.goBack()} progress={0.1} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Quelle est votre langue maternelle ?</Text>
        <Text style={styles.sub}>Nous adapterons votre expérience d'apprentissage.</Text>

        <View style={styles.grid}>
          {LANGUAGES.map(lang => (
            <TouchableOpacity
              key={lang.id}
              style={[styles.card, selected === lang.id && styles.cardSelected]}
              onPress={() => setSelected(lang.id)}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={[styles.langName, selected === lang.id && styles.langNameSelected]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, !selected && styles.btnDisabled]}
          onPress={() => {
            setNativeLang(selected);
            navigation.navigate('Connection');
          }}
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
  title: { fontSize: 22, fontWeight: '800', color: colors.black, marginBottom: 8 },
  sub: { fontSize: 14, color: colors.textMuted, marginBottom: 24, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  card: {
    flexBasis: '30%',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  flag: { fontSize: 28, marginBottom: 6 },
  langName: { fontSize: 12, fontWeight: '600', color: colors.black, textAlign: 'center' },
  langNameSelected: { color: colors.primary },
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
  btnDisabled: { backgroundColor: colors.grayLight },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
});
