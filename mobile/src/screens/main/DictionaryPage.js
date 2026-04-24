import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MEDUMBA_EXPRESSIONS } from '../../data/medumbaExpressions';
import { colors } from '../../theme/colors';

export default function DictionaryPage({ navigation }) {
  const [query, setQuery] = useState('');
  const [direction, setDirection] = useState('fr2med'); // 'fr2med' | 'med2fr'

  const results = useMemo(() => {
    if (!query.trim()) return MEDUMBA_EXPRESSIONS.slice(0, 30);
    const q = query.toLowerCase();
    return MEDUMBA_EXPRESSIONS.filter(e =>
      direction === 'fr2med'
        ? e.fr.toLowerCase().includes(q)
        : e.medumba.toLowerCase().includes(q)
    ).slice(0, 50);
  }, [query, direction]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dictionnaire Medumba</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder={direction === 'fr2med' ? 'Rechercher en français...' : 'Rechercher en Medumba...'}
          placeholderTextColor={colors.textMuted}
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Direction toggle */}
      <View style={styles.directionRow}>
        {[
          { id: 'fr2med', label: '🇫🇷 Français → Medumba' },
          { id: 'med2fr', label: '🌍 Medumba → Français' },
        ].map(d => (
          <TouchableOpacity
            key={d.id}
            style={[styles.dirBtn, direction === d.id && styles.dirBtnActive]}
            onPress={() => { setDirection(d.id); setQuery(''); }}
          >
            <Text style={[styles.dirBtnText, direction === d.id && styles.dirBtnTextActive]}>{d.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.countText}>
        {query ? `${results.length} résultat(s)` : `${MEDUMBA_EXPRESSIONS.length} expressions au total`}
      </Text>

      <FlatList
        data={results}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.frText}>{direction === 'fr2med' ? item.fr : item.medumba}</Text>
            <Text style={styles.arrow}>→</Text>
            <Text style={styles.medumbaText}>{direction === 'fr2med' ? item.medumba : item.fr}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
    backgroundColor: colors.grayBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: colors.black },
  clearBtn: { fontSize: 14, color: colors.textMuted, padding: 4 },
  directionRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 8 },
  dirBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 99,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  dirBtnActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  dirBtnText: { fontSize: 11, fontWeight: '600', color: colors.textMuted },
  dirBtnTextActive: { color: colors.primary, fontWeight: '800' },
  countText: { fontSize: 12, color: colors.textMuted, paddingHorizontal: 16, marginBottom: 4 },
  listContent: { paddingHorizontal: 16, paddingBottom: 40 },
  card: {
    paddingVertical: 12,
    gap: 4,
  },
  frText: { fontSize: 14, fontWeight: '600', color: colors.black },
  arrow: { fontSize: 12, color: colors.textMuted },
  medumbaText: { fontSize: 15, fontWeight: '700', color: colors.primary, lineHeight: 22 },
  separator: { height: 1, backgroundColor: colors.border },
});
