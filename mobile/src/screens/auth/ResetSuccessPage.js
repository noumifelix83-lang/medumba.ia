import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

export default function ResetSuccessPage({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.title}>Mot de passe réinitialisé !</Text>
        <Text style={styles.sub}>
          Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Login')}>
          <Text style={styles.btnText}>SE CONNECTER →</Text>
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
  icon: { fontSize: 72, marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '900', color: colors.black, textAlign: 'center', marginBottom: 12 },
  sub: { fontSize: 15, color: colors.textMuted, textAlign: 'center', lineHeight: 23, marginBottom: 40 },
  btn: {
    width: '100%',
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
  btnText: { color: colors.white, fontSize: 15, fontWeight: '800' },
});
