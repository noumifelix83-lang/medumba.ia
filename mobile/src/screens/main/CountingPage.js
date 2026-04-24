import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

// Medumba number system (ported from medumba_counter.jar)
const _U = ["bαnbαn","ncʉ'","bα̂","tad","kuὰ","tὰn","ntogə","sὰmbα̂","fomə","bwə̀'ə"];
const _C = ["","ncʉ'","bα̂","tad","kuὰ","tὰn","ntôg","sὰmbα̂","fôm","bwə̀'ə̂"];
const _T = ["","gham","ŋambα̂","ŋamntad","ŋamkuὰ","ŋamntὰn","ŋamntogə","ŋamsὰmbα̂","ŋamfomə","ŋambwə̀'ə"];
const _B = ["","","bonbα̂","bontad","bonkuὰ","bontὰn","bonntôg","bonsὰmbα̂","bonfôm","bonbwə̀'ə"];
const _H = ["","nkʉ","nkʉbα̂","nkʉtad","nkʉkuὰ","nkʉtὰn","nkʉntogə","nkʉsὰmbα̂","nkʉfomə","nkʉbwə̀'ə"];

function toMedumba(n) {
  if (n === 0) return "bαnbαn";
  if (n === 1000) return "ncaꞌ";
  const h = Math.floor(n / 100), r = n % 100, d = Math.floor(r / 10), u = r % 10;
  if (h > 0) {
    const hun = _H[h];
    if (r === 0) return hun;
    if (r <= 9) return _C[r] + "tû " + hun;
    if (r === 10) return "mɛnmbʉ̂m " + hun;
    if (r <= 19) return "ncòb" + _C[u] + " mɛnmbʉ̂m " + hun;
    const bt = _B[d];
    return u === 0 ? bt + " " + hun : "ncòb" + _C[u] + " " + bt + " " + hun;
  }
  if (n <= 9) return _U[n];
  if (n === 10) return "gham";
  if (n <= 19) return "ncòb" + _C[u] + " gham";
  return u === 0 ? _T[d] : "ncòb" + _C[u] + " " + _T[d];
}

const BASE_NUMBERS = Array.from({ length: 21 }, (_, i) => ({ n: i, medumba: toMedumba(i), fr: String(i) }));

export default function CountingPage({ navigation }) {
  const [inputVal, setInputVal] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'calc'

  const converted = inputVal !== '' ? toMedumba(Math.max(0, Math.min(1000, parseInt(inputVal) || 0))) : '';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Numérotation Medumba</Text>
      </View>

      {/* Sub-tabs */}
      <View style={styles.subTabs}>
        {['list', 'calc'].map(t => (
          <TouchableOpacity key={t} style={[styles.subTab, activeTab === t && styles.subTabActive]} onPress={() => setActiveTab(t)}>
            <Text style={[styles.subTabText, activeTab === t && styles.subTabTextActive]}>
              {t === 'list' ? '📋 Liste' : '🔢 Convertisseur'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'list' ? (
        <FlatList
          data={BASE_NUMBERS}
          keyExtractor={item => String(item.n)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.numberCard}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberDigit}>{item.n}</Text>
              </View>
              <View style={styles.numberInfo}>
                <Text style={styles.numberMedumba}>{item.medumba}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.calcContent}>
          <Text style={styles.calcLabel}>Entrez un nombre (0–1000)</Text>
          <TextInput
            style={styles.calcInput}
            value={inputVal}
            onChangeText={setInputVal}
            keyboardType="number-pad"
            placeholder="Ex: 42"
            placeholderTextColor={colors.textMuted}
            maxLength={4}
          />
          {converted !== '' && (
            <View style={styles.resultCard}>
              <Text style={styles.resultNum}>{inputVal}</Text>
              <Text style={styles.resultArrow}>→</Text>
              <Text style={styles.resultMedumba}>{converted}</Text>
            </View>
          )}

          {/* Number pad */}
          <View style={styles.numPad}>
            {[['1','2','3'],['4','5','6'],['7','8','9'],['0','⌫','C']].map((row, ri) => (
              <View key={ri} style={styles.numPadRow}>
                {row.map(key => (
                  <TouchableOpacity
                    key={key}
                    style={styles.numKey}
                    onPress={() => {
                      if (key === '⌫') setInputVal(v => v.slice(0, -1));
                      else if (key === 'C') setInputVal('');
                      else if (inputVal.length < 4) setInputVal(v => v + key);
                    }}
                  >
                    <Text style={styles.numKeyText}>{key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  backBtn: { paddingRight: 4 },
  backText: { fontSize: 15, color: colors.primary, fontWeight: '600' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: colors.black },
  subTabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  subTab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  subTabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  subTabText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  subTabTextActive: { color: colors.primary, fontWeight: '800' },
  listContent: { padding: 16, gap: 10 },
  numberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  numberBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberDigit: { fontSize: 18, fontWeight: '900', color: colors.primary },
  numberInfo: { flex: 1 },
  numberMedumba: { fontSize: 17, fontWeight: '700', color: colors.black },
  calcContent: { padding: 24, alignItems: 'center' },
  calcLabel: { fontSize: 15, fontWeight: '600', color: colors.textMuted, marginBottom: 12 },
  calcInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    fontSize: 24,
    fontWeight: '800',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 16,
    backgroundColor: colors.grayBg,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 28,
  },
  resultNum: { fontSize: 22, fontWeight: '900', color: colors.black },
  resultArrow: { fontSize: 20, color: colors.textMuted },
  resultMedumba: { fontSize: 22, fontWeight: '900', color: colors.primary },
  numPad: { width: '100%', gap: 10 },
  numPadRow: { flexDirection: 'row', gap: 10 },
  numKey: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 14,
    backgroundColor: colors.grayBg,
    alignItems: 'center',
  },
  numKeyText: { fontSize: 20, fontWeight: '700', color: colors.black },
});
