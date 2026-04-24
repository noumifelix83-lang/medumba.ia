import React from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

const logo = require('../../../assets/logo.png');

const FEATURES = [
  { icon: '📅', label: 'Calendrier',   color: colors.primaryDark, bg: colors.primaryLight,  border: colors.primaryBorder, screen: 'Calendar'   },
  { icon: '📖', label: 'Dictionnaire', color: colors.success,     bg: colors.successLight,  border: colors.successBorder, screen: 'Dictionary' },
  { icon: '🔢', label: 'Numérotation', color: colors.cyan,        bg: colors.cyanLight,     border: colors.cyanBorder,    screen: 'Counting'   },
  { icon: '🎥', label: 'Vidéos',       color: colors.purple,      bg: colors.purpleLight,   border: colors.purpleBorder,  screen: 'Video'      },
];

export default function WelcomePage({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        {/* Heritage badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🇨🇲 Heritage Learner Edition</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          La langue de votre{'\n'}
          <Text style={styles.titleHighlight}>famille</Text>,{'\n'}
          redécouverte.
        </Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Des milliers de locuteurs d'héritage reconnectent avec le Medumba — chaque jour, à leur propre rythme.
        </Text>

        {/* Feature grid */}
        <View style={styles.grid}>
          {FEATURES.map(({ icon, label, color, bg, border, screen }) => (
            <TouchableOpacity
              key={label}
              style={[styles.featureBtn, { backgroundColor: bg, borderColor: border }]}
              onPress={() => navigation.navigate(screen)}
            >
              <Text style={styles.featureIcon}>{icon}</Text>
              <Text style={[styles.featureLabel, { color }]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA buttons */}
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Language')}>
          <Text style={styles.btnPrimaryText}>COMMENCER MON VOYAGE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnSecondaryText}>J'AI DÉJÀ UN COMPTE</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.black,
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  titleHighlight: { color: colors.primary },
  tagline: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
    marginBottom: 32,
  },
  featureBtn: {
    flexBasis: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 14,
  },
  featureIcon: { fontSize: 20 },
  featureLabel: { fontSize: 13, fontWeight: '700' },
  btnPrimary: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  btnSecondary: {
    width: '100%',
    backgroundColor: colors.primaryLight,
    paddingVertical: 17,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primaryBorder,
  },
  btnSecondaryText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
