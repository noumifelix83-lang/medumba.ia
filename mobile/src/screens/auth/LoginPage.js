import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

const logo = require('../../../assets/logo.png');

export default function LoginPage({ navigation }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow]         = useState(false);
  const valid = email.includes('@') && password.length >= 6;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>

          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>Bon retour !</Text>
          <Text style={styles.sub}>Connectez-vous pour reprendre votre progression.</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Adresse e-mail"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Mot de passe"
              placeholderTextColor={colors.textMuted}
              secureTextEntry={!show}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShow(s => !s)}>
              <Text>{show ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
            <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, !valid && styles.btnDisabled]}
            disabled={!valid}
            onPress={() => navigation.replace('Dashboard')}
          >
            <Text style={styles.btnText}>SE CONNECTER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.registerLink}>
            <Text style={styles.registerText}>Pas encore de compte ? <Text style={styles.registerHighlight}>S'inscrire</Text></Text>
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
  backBtn: { marginBottom: 24 },
  backText: { fontSize: 15, color: colors.primary, fontWeight: '600' },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 26, fontWeight: '900', color: colors.black, marginBottom: 8, textAlign: 'center' },
  sub: { fontSize: 14, color: colors.textMuted, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
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
  inputWrap: { position: 'relative' },
  eyeBtn: { position: 'absolute', right: 16, top: 14 },
  forgot: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  btnDisabled: { backgroundColor: colors.grayLight, shadowOpacity: 0, elevation: 0 },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
  registerLink: { alignItems: 'center' },
  registerText: { fontSize: 14, color: colors.textMuted },
  registerHighlight: { color: colors.primary, fontWeight: '700' },
});
