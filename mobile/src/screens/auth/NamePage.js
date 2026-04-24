import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../../components/OnboardingHeader';
import { useApp } from '../../context/AppContext';
import { colors } from '../../theme/colors';

export default function NamePage({ navigation }) {
  const { setUserName } = useApp();
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <OnboardingHeader onBack={() => navigation.goBack()} progress={0.1} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.container}>
          <Text style={styles.title}>Quel est votre prénom ?</Text>
          <Text style={styles.sub}>Nous personnaliserons votre expérience.</Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Votre prénom"
            placeholderTextColor={colors.textMuted}
            autoFocus
            returnKeyType="done"
          />

          <TouchableOpacity
            style={[styles.btn, !name.trim() && styles.btnDisabled]}
            disabled={!name.trim()}
            onPress={() => { setUserName(name.trim()); navigation.navigate('Age'); }}
          >
            <Text style={styles.btnText}>Continuer →</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  container: { flex: 1, padding: 24, justifyContent: 'flex-start', paddingTop: 20 },
  title: { fontSize: 24, fontWeight: '800', color: colors.black, marginBottom: 8 },
  sub: { fontSize: 14, color: colors.textMuted, marginBottom: 32, lineHeight: 20 },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: colors.black,
    marginBottom: 24,
    backgroundColor: colors.grayBg,
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
  btnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
});
