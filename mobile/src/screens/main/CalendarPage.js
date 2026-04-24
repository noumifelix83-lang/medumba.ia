import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

const MONTHS_MEDUMBA = [
  'Mbwogngà', 'Nkàgnὰ', 'Njwìdcu', 'Ntàŋmbwə',
  'Nsônὰ', 'Ŋwα̂gnkun', 'Ntôngə̀fələ', 'Ncôcu',
  'Njâgcu', "Mbə̂'nswə", 'Nsônα̌ndɔ', 'Ntòngǒdməsaŋə',
];
const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS_MEDUMBA = ["Ntα̂nla'", 'Nsigha', "Nsěmntə'", 'Nga', 'Nkɔ̂tʉ', 'Nzìnyam', "Ntα̂nbu'", "Ntα̂ntə'"];
const MONTH_COLORS = [
  colors.primaryDark, colors.purple, colors.cyan, colors.success,
  colors.warning, colors.danger, colors.primaryDark, colors.purple,
  colors.cyan, colors.success, colors.warning, colors.danger,
];

function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function medumbaDayIndex(year, month, day) {
  const msPerDay = 86400000;
  const d = new Date(year, month, day);
  return (Math.floor(d.getTime() / msPerDay + 0.5) + 7) % 8;
}

export default function CalendarPage({ navigation }) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected,  setSelected]  = useState(null);

  const firstDay  = medumbaDayIndex(viewYear, viewMonth, 1);
  const totalDays = daysInMonth(viewYear, viewMonth);
  const prevDays  = daysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelected(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelected(null);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: prevDays - firstDay + 1 + i, cur: false });
  for (let d = 1; d <= totalDays; d++) cells.push({ day: d, cur: true });
  while (cells.length % 8 !== 0) cells.push({ day: cells.length - firstDay - totalDays + 1, cur: false });

  const accent = MONTH_COLORS[viewMonth];
  const isToday = (d) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const selectedMedumbaDay = selected ? medumbaDayIndex(viewYear, viewMonth, selected) : null;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendrier Medumba</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Month navigator */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
          <View style={styles.monthInfo}>
            <Text style={[styles.monthMedumba, { color: accent }]}>{MONTHS_MEDUMBA[viewMonth]}</Text>
            <Text style={styles.monthFr}>{MONTHS_FR[viewMonth]} {viewYear}</Text>
          </View>
          <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
            <Text style={styles.navArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Day headers (8-day Medumba week) */}
        <View style={styles.dayHeaders}>
          {DAYS_MEDUMBA.map((d, i) => (
            <Text key={i} style={[styles.dayHeader, { color: accent }]}>{d.slice(0, 3)}</Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.grid}>
          {cells.map((cell, i) => {
            const isSelected = cell.cur && selected === cell.day;
            const isTod = cell.cur && isToday(cell.day);
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.cell,
                  !cell.cur && styles.cellGray,
                  isTod && { backgroundColor: accent },
                  isSelected && styles.cellSelected,
                ]}
                onPress={() => cell.cur && setSelected(cell.day)}
                disabled={!cell.cur}
              >
                <Text style={[
                  styles.cellText,
                  !cell.cur && styles.cellTextGray,
                  isTod && { color: colors.white, fontWeight: '800' },
                  isSelected && { color: accent, fontWeight: '800' },
                ]}>
                  {cell.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected day info */}
        {selected && (
          <View style={[styles.selectedInfo, { borderColor: accent }]}>
            <Text style={styles.selectedTitle}>
              {MONTHS_FR[viewMonth]} {selected}, {viewYear}
            </Text>
            <Text style={[styles.selectedMedumba, { color: accent }]}>
              {MONTHS_MEDUMBA[viewMonth]} · {DAYS_MEDUMBA[selectedMedumbaDay]}
            </Text>
          </View>
        )}

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Les 8 jours de la semaine Medumba</Text>
          {DAYS_MEDUMBA.map((d, i) => (
            <View key={i} style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: MONTH_COLORS[i % 12] }]} />
              <Text style={styles.legendDay}>Jour {i + 1}</Text>
              <Text style={styles.legendName}>{d}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  container: { padding: 16, paddingBottom: 40 },
  monthNav: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  navBtn: { padding: 10 },
  navArrow: { fontSize: 28, color: colors.primary, fontWeight: '700' },
  monthInfo: { flex: 1, alignItems: 'center' },
  monthMedumba: { fontSize: 18, fontWeight: '800' },
  monthFr: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  dayHeaders: { flexDirection: 'row', marginBottom: 4 },
  dayHeader: { flex: 1, textAlign: 'center', fontSize: 10, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  cell: {
    width: `${100 / 8}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cellGray: { opacity: 0.3 },
  cellSelected: { borderWidth: 2, borderColor: colors.primary },
  cellText: { fontSize: 12, fontWeight: '600', color: colors.black },
  cellTextGray: { color: colors.textMuted },
  selectedInfo: {
    borderWidth: 2,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  selectedTitle: { fontSize: 16, fontWeight: '700', color: colors.black, marginBottom: 4 },
  selectedMedumba: { fontSize: 14, fontWeight: '600' },
  legend: {
    backgroundColor: colors.grayBg,
    borderRadius: 16,
    padding: 16,
  },
  legendTitle: { fontSize: 14, fontWeight: '800', color: colors.black, marginBottom: 12 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendDay: { fontSize: 13, color: colors.textMuted, width: 50 },
  legendName: { fontSize: 14, fontWeight: '600', color: colors.black },
});
