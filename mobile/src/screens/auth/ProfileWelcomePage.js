import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

export default function ProfileWelcomePage({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.illustration}>
          <Text style={styles.illustrationIcon}>👤</Text>
        </View>
        <Text style={styles.title}>Créez votre profil</Text>
        <Text style={styles.sub}>
          Créez un compte pour sauvegarder votre progression, gagner des récompenses et rejoindre la communauté Medumba.
        </Text>

        <View style={styles.benefits}>
          {['💾 Progression sauvegardée', '🏆 Badges et certifications', '👥 Rejoindre la communauté'].map(b => (
            <View key={b} style={styles.benefitRow}>
              <Text style={styles.benefitText}>{b}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Name')}>
          <Text style={styles.btnPrimaryText}>CRÉER MON COMPTE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.btnSecondaryText}>Passer pour l'instant</Text>
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
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  illustrationIcon: { fontSize: 56 },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  sub: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 28,
  },
  benefits: { gap: 10, marginBottom: 36, width: '100%' },
  benefitRow: {
    backgroundColor: colors.grayBg,
    borderRadius: 12,
    padding: 14,
  },
  benefitText: { fontSize: 14, fontWeight: '600', color: colors.black },
  btnPrimary: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  btnPrimaryText: { color: colors.white, fontSize: 15, fontWeight: '800' },
  btnSecondary: { paddingVertical: 12 },
  btnSecondaryText: { color: colors.textMuted, fontSize: 14, fontWeight: '600', textDecorationLine: 'underline' },
});
