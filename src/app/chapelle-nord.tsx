import { Link, Stack, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

const ACCENT = '#e5ceac';
const BUTTON = '#d8bc8f';

const TOTAL = 30;
const READ = 0;
const TODAY = 1; // épisode du jour

const TITLES: Record<number, string> = {
  1: 'Le premier message',
  2: 'La photo',
  3: 'Le rendez-vous',
  4: 'Le hangar',
  5: 'Le silence de Dédé',
  6: 'La ronde',
  7: 'Le compte est bon',
  8: 'Trois heures du matin',
  9: 'Les phares',
  10: 'La vieille 205',
  11: 'Le kebab d’à côté',
  12: 'Ce que dit le trottoir',
  13: 'Le frère',
  14: 'Personne ne dort',
  15: 'La perquisition',
  16: 'Le chantage en retour',
  17: 'Le plan B',
  18: 'La boîte aux lettres du 14',
  19: 'Faux frères',
  20: 'Le tunnel',
  21: 'Un mot de trop',
  22: 'La nuit du pont',
  23: 'Le vent tourne',
  24: 'Ce que la police savait',
  25: 'Zone interdite',
  26: 'Le dernier message',
  27: 'Le rendez-vous manqué',
  28: 'Le prix du silence',
  29: 'Vider la zone Nord',
  30: 'La Chapelle Nord brûle',
};

export default function ChapelleNordScreen() {
  const days = Array.from({ length: TOTAL }, (_, i) => i + 1);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'La Chapelle Nord',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '500' },
          headerBackTitle: 'Retour',
        }}
      />
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <View style={styles.topTexts}>
              <Text style={styles.kicker}>EN COURS · 30 ÉPISODES</Text>
              <Text style={styles.tagline}>Une banlieue qui brûle. Un épisode par jour.</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.buyButton, pressed && styles.buyPressed]}
              onPress={() => router.push('/abonnement?roman=chapelle-nord')}
              hitSlop={8}
            >
              <Text style={styles.buyText}>Acheter</Text>
            </Pressable>
          </View>

          <View style={styles.list}>
            {days.map((day) => {
              const isToday = day === TODAY;
              const isRead = day <= READ;
              const isAvailable = day <= TODAY;
              const title = TITLES[day] ?? 'Épisode à venir';

              const row = (
                <View style={[styles.row, isToday && styles.rowToday]}>
                  <Text style={[styles.day, isToday ? styles.dayToday : isRead ? styles.dayDim : styles.dayLocked]}>
                    J{day}
                  </Text>
                  <View style={styles.rowTexts}>
                    <Text style={[styles.rowTitle, isToday ? styles.rowTitleToday : isRead ? styles.rowTitleDim : styles.rowTitleLocked]} numberOfLines={1}>
                      {title}
                    </Text>
                    {isToday ? <Text style={styles.todayLabel}>Épisode du jour</Text> : null}
                    {isRead ? <Text style={styles.readLabel}>Lu</Text> : null}
                  </View>
                  {isAvailable ? (
                    <Text style={styles.chevron}>→</Text>
                  ) : (
                    <Text style={styles.soonText}>À venir</Text>
                  )}
                </View>
              );

              return (
                <View key={day}>
                  {isAvailable ? (
                    <Link href={'/episode/' + day} asChild>
                      <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>{row}</Pressable>
                    </Link>
                  ) : (
                    row
                  )}
                  {day < TOTAL ? <View style={styles.rowSeparator} /> : null}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 14,
  },
  kicker: {
    color: ACCENT,
    fontSize: 10,
    fontWeight: '300',
    letterSpacing: 2,
  },
  tagline: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 19,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  topTexts: {
    flexShrink: 1,
    gap: 6,
  },
  buyButton: {
    backgroundColor: BUTTON,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    flexShrink: 0,
  },
  buyPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  buyText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  list: {
    marginTop: 4,
  },
  pressable: {},
  pressed: {
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
  },
  rowToday: {
    backgroundColor: 'rgba(229,206,172,0.08)',
    borderColor: 'rgba(229,206,172,0.35)',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginHorizontal: -14,
  },
  day: {
    fontSize: 13,
    fontWeight: '500',
    minWidth: 36,
    flexShrink: 0,
  },
  dayToday: {
    color: ACCENT,
    fontWeight: '700',
  },
  dayDim: {
    color: 'rgba(255,255,255,0.4)',
  },
  dayLocked: {
    color: 'rgba(255,255,255,0.25)',
    fontWeight: '300',
  },
  rowTexts: {
    flexShrink: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  rowTitleToday: {
    color: '#fff',
  },
  rowTitleDim: {
    color: 'rgba(255,255,255,0.4)',
  },
  rowTitleLocked: {
    color: 'rgba(255,255,255,0.25)',
    fontWeight: '300',
  },
  todayLabel: {
    color: ACCENT,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  readLabel: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontWeight: '300',
  },
  chevron: {
    color: ACCENT,
    fontSize: 13,
    flexShrink: 0,
  },
  soonText: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 10,
    fontWeight: '300',
    flexShrink: 0,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: 'rgba(229,206,172,0.5)',
  },
});
