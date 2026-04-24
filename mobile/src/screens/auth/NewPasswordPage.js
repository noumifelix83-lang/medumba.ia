import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

export default function NewPasswordPage({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const valid = password.length >= 8 && password === confirm;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>
          <Text style={styles.icon}>🔒</Text>
          <Text style={styles.title}>Nouveau mot de passe</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Nouveau mot de passe"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            autoFocus
          />
          <TextInput
            style={styles.input}
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.btn, !valid && styles.btnDisabled]}
            disabled={!valid}
            onPress={() => navigation.navigate('ResetSuccess')}
          >
            <Text style={styles.btnText}>RÉINITIALISER →</Text>
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
  icon: { fontSize: 44, textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '900', color: colors.black, marginBottom: 28, textAlign: 'center' },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.grayBg,
    marginBottom: 14,
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  btnDisabled: { backgroundColor: colors.grayLight, shadowOpacity: 0, elevation: 0 },
  btnText: { color: colors.white, fontSize: 15, fontWeight: '800' },
});
