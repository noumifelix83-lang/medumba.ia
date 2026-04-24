import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

const VIDEO_CATEGORIES = [
  {
    id: 'intro',
    label: 'Introduction',
    color: colors.primaryDark,
    bg: colors.primaryLight,
    videos: [
      { id: 'intro_01', title: 'Les salutations', desc: 'Bonjour, bonsoir, bonne nuit en Medumba', duration: '3 min' },
      { id: 'intro_02', title: 'Les 7 jours',     desc: 'La semaine de 7 jours (calendrier grégorie)', duration: '4 min' },
      { id: 'intro_03', title: 'Le bagwud',        desc: 'Instrument traditionnel de percussion', duration: '2 min' },
      { id: 'intro_04', title: 'Le matin',         desc: 'Expressions du matin en Medumba', duration: '3 min' },
      { id: 'intro_05', title: 'Les 8 jours',      desc: 'La semaine Medumba traditionnelle de 8 jours', duration: '5 min' },
      { id: 'intro_06', title: 'Les mois',         desc: 'Les 12 mois de l\'année en Medumba', duration: '4 min' },
      { id: 'intro_07', title: 'La maison',        desc: 'Vocabulaire de la maison Medumba', duration: '6 min' },
      { id: 'intro_08', title: 'Mots courants',    desc: 'Les 50 mots les plus utilisés', duration: '7 min' },
    ],
  },
  {
    id: 'niveau1',
    label: 'Niveau 1',
    color: colors.success,
    bg: colors.successLight,
    videos: [
      { id: 'n1_01', title: 'Marcher et courir', desc: 'Verbes de mouvement essentiels', duration: '4 min' },
      { id: 'n1_02', title: 'Marche avancée',    desc: 'Expressions de déplacement', duration: '4 min' },
      { id: 'n1_03', title: 'Mon nom',           desc: 'Se présenter en Medumba', duration: '3 min' },
      { id: 'n1_04', title: 'Salutation 1',      desc: 'Premières formules de politesse', duration: '3 min' },
      { id: 'n1_05', title: 'Salutation 2',      desc: 'Réponses aux salutations', duration: '3 min' },
      { id: 'n1_06', title: 'Demander (jus)',    desc: 'Demander à boire poliment', duration: '2 min' },
      { id: 'n1_07', title: 'Demander',          desc: 'Formules de demande courantes', duration: '3 min' },
      { id: 'n1_08', title: 'Manger',            desc: 'Vocabulaire de l\'alimentation', duration: '5 min' },
      { id: 'n1_09', title: 'Dormir',            desc: 'Expressions pour le sommeil', duration: '2 min' },
    ],
  },
  {
    id: 'niveau2',
    label: 'Niveau 2',
    color: colors.purple,
    bg: colors.purpleLight,
    videos: [
      { id: 'n2_01', title: 'Chanson Medumba', desc: 'Apprendre en chantant', duration: '5 min' },
      { id: 'n2_02', title: 'Bonne nuit',      desc: 'Les formules du soir', duration: '3 min' },
    ],
  },
  {
    id: 'dessin',
    label: 'Art & Dessin',
    color: colors.warning,
    bg: '#fff7ed',
    videos: Array.from({ length: 12 }, (_, i) => ({
      id: `dessin_${String(i + 1).padStart(2, '0')}`,
      title: `Leçon de dessin ${i + 1}`,
      desc: 'Motifs et symboles culturels Medumba',
      duration: `${4 + i} min`,
    })),
  },
];

export default function VideoPage({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('intro');

  const category = VIDEO_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vidéos Medumba</Text>
      </View>

      {/* Category tabs */}
      <View style={styles.catRow}>
        {VIDEO_CATEGORIES.map(c => (
          <TouchableOpacity
            key={c.id}
            style={[styles.catChip, activeCategory === c.id && { backgroundColor: c.bg, borderColor: c.color }]}
            onPress={() => setActiveCategory(c.id)}
          >
            <Text style={[styles.catLabel, activeCategory === c.id && { color: c.color }]}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={category.videos}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoCard}>
            <View style={[styles.thumbnail, { backgroundColor: category.bg }]}>
              <Text style={styles.thumbnailIcon}>▶️</Text>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{item.title}</Text>
              <Text style={styles.videoDesc} numberOfLines={2}>{item.desc}</Text>
              <View style={styles.videoMeta}>
                <Text style={styles.videoDuration}>⏱ {item.duration}</Text>
                <View style={[styles.levelBadge, { backgroundColor: category.bg }]}>
                  <Text style={[styles.levelText, { color: category.color }]}>{category.label}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
  catRow: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 10, gap: 8, flexWrap: 'wrap' },
  catChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  catLabel: { fontSize: 12, fontWeight: '700', color: colors.textMuted },
  listContent: { paddingHorizontal: 16, paddingBottom: 40 },
  videoCard: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  thumbnail: {
    width: 80,
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  thumbnailIcon: { fontSize: 24 },
  videoInfo: { flex: 1, gap: 4 },
  videoTitle: { fontSize: 14, fontWeight: '800', color: colors.black },
  videoDesc: { fontSize: 12, color: colors.textMuted, lineHeight: 18 },
  videoMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  videoDuration: { fontSize: 11, color: colors.textMuted },
  levelBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 },
  levelText: { fontSize: 10, fontWeight: '700' },
  separator: { height: 1, backgroundColor: colors.border },
});
