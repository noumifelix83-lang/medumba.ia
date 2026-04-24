import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../../components/OnboardingHeader';
import { colors } from '../../theme/colors';

export default function PasswordPage({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [show, setShow]         = useState(false);

  const strong = password.length >= 8;
  const match  = password === confirm && confirm.length > 0;
  const valid  = strong && match;

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingHeader onBack={() => navigation.goBack()} progress={0.75} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.container}>
          <Text style={styles.title}>Créez votre mot de passe</Text>
          <Text style={styles.sub}>Minimum 8 caractères.</Text>

          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Mot de passe"
              placeholderTextColor={colors.textMuted}
              secureTextEntry={!show}
              autoFocus
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShow(s => !s)}>
              <Text style={styles.eyeIcon}>{show ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, confirm && !match && styles.inputError]}
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor={colors.textMuted}
            secureTextEntry={!show}
          />
          {confirm !== '' && !match && (
            <Text style={styles.errorText}>Les mots de passe ne correspondent pas</Text>
          )}

          {/* Strength indicators */}
          <View style={styles.rules}>
            <Text style={[styles.rule, password.length >= 8 && styles.ruleOk]}>✓ Au moins 8 caractères</Text>
            <Text style={[styles.rule, /[A-Z]/.test(password) && styles.ruleOk]}>✓ Une majuscule</Text>
            <Text style={[styles.rule, /[0-9]/.test(password) && styles.ruleOk]}>✓ Un chiffre</Text>
          </View>

          <TouchableOpacity
            style={[styles.btn, !valid && styles.btnDisabled]}
            disabled={!valid}
            onPress={() => navigation.navigate('Success')}
          >
            <Text style={styles.btnText}>Créer mon compte →</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  container: { flex: 1, padding: 24, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: '800', color: colors.black, marginBottom: 8 },
  sub: { fontSize: 14, color: colors.textMuted, marginBottom: 28, lineHeight: 20 },
  inputWrap: { position: 'relative', marginBottom: 12 },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.grayBg,
    marginBottom: 12,
  },
  inputError: { borderColor: colors.danger },
  eyeBtn: { position: 'absolute', right: 16, top: 14 },
  eyeIcon: { fontSize: 20 },
  errorText: { fontSize: 12, color: colors.danger, marginBottom: 12 },
  rules: { gap: 6, marginBottom: 28 },
  rule: { fontSize: 13, color: colors.grayLight, fontWeight: '600' },
  ruleOk: { color: colors.success },
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
