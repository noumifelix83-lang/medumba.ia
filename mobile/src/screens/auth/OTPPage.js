import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

export default function OTPPage({ navigation, route }) {
  const email = route.params?.email ?? '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Each ref declared individually — hooks cannot be called inside loops
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const refs = [ref0, ref1, ref2, ref3, ref4, ref5];

  const handleChange = (text, idx) => {
    const next = [...otp];
    next[idx] = text.slice(-1);
    setOtp(next);
    if (text && idx < 5) refs[idx + 1].current?.focus();
  };

  const filled = otp.every(d => d !== '');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>

        <Text style={styles.icon}>📩</Text>
        <Text style={styles.title}>Vérification par e-mail</Text>
        <Text style={styles.sub}>
          Nous avons envoyé un code à{'\n'}<Text style={styles.emailText}>{email}</Text>
        </Text>

        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={refs[i]}
              style={[styles.cell, digit && styles.cellFilled]}
              value={digit}
              onChangeText={t => handleChange(t, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.btn, !filled && styles.btnDisabled]}
          disabled={!filled}
          onPress={() => navigation.navigate('NewPassword')}
        >
          <Text style={styles.btnText}>VÉRIFIER →</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resend}>
          <Text style={styles.resendText}>Renvoyer le code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: { flex: 1, padding: 24, paddingTop: 16 },
  backBtn: { marginBottom: 32 },
  backText: { fontSize: 15, color: colors.primary, fontWeight: '600' },
  icon: { fontSize: 48, textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '900', color: colors.black, marginBottom: 10, textAlign: 'center' },
  sub: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 22, marginBottom: 36 },
  emailText: { color: colors.primary, fontWeight: '700' },
  otpRow: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginBottom: 36 },
  cell: {
    width: 46,
    height: 56,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    fontSize: 22,
    fontWeight: '800',
    color: colors.black,
    backgroundColor: colors.grayBg,
  },
  cellFilled: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  btnDisabled: { backgroundColor: colors.grayLight, shadowOpacity: 0, elevation: 0 },
  btnText: { color: colors.white, fontSize: 15, fontWeight: '800' },
  resend: { alignItems: 'center', paddingVertical: 8 },
  resendText: { fontSize: 14, color: colors.primary, fontWeight: '600', textDecorationLine: 'underline' },
});
