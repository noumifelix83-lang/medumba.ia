import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

export default function ForgotPasswordPage({ navigation }) {
  const [email, setEmail] = useState('');
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>

          <Text style={styles.icon}>🔑</Text>
          <Text style={styles.title}>Mot de passe oublié ?</Text>
          <Text style={styles.sub}>
            Entrez votre adresse e-mail et nous vous enverrons un code de vérification.
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Adresse e-mail"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
          />

          <TouchableOpacity
            style={[styles.btn, !valid && styles.btnDisabled]}
            disabled={!valid}
            onPress={() => navigation.navigate('OTP', { email })}
          >
            <Text style={styles.btnText}>ENVOYER LE CODE →</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  container: { flex: 1, padding: 24, paddingTop: 16 },
  backBtn: { marginBottom: 32 },
  backText: { fontSize: 15, color: colors.primary, fontWeight: '600' },
  icon: { fontSize: 48, textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '900', color: colors.black, marginBottom: 10, textAlign: 'center' },
  sub: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.grayBg,
    marginBottom: 24,
  },
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
  btnText: { color: colors.white, fontSize: 15, fontWeight: '800' },
});
