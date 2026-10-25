import { Link, Stack, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

const ACCENT = '#e5ceac';
const BUTTON = '#d8bc8f';

const TOTAL = 30;
const TODAY = 1; // épisode du jour

// Titres provisoires, à remplacer par les vrais textes.
const TITLES: Record<number, string> = {
  1: 'La nuit du camembert',
  2: 'L’homme au livarot',
  3: 'La fourgonnette blanche',
  4: 'Le plan parfait (presque)',
  5: 'Odeurs suspectes',
  6: 'La 2CV ne démarre pas',
  7: 'Le douanier du dimanche',
  8: 'Un pont, deux losers',
  9: 'Le fromage qui parlait',
  10: 'Cavale à 30 à l’heure',
  11: 'Le froid, ça conserve',
  12: 'Un flic très affiné',
  13: 'La cave du père Gervais',
  14: 'Paiement en nature',
  15: 'La presse à neuf heures',
  16: 'Le silence des meules',
  17: 'Livraison express',
  18: 'Deux mètres de câble',
  19: 'Le mandat du juge',
  20: 'Le convoi de l’extrême',
  21: 'Vente à perte',
  22: 'Le troc du mardi',
  23: 'Piste blanche',
  24: 'Sur la voie rapide',
  25: 'L’aveu du petit-lait',
  26: 'Requiem pour un brie',
  27: 'Compte à rebours à Pont-L’Évêque',
  28: 'La trêve du fromager',
  29: 'Dernier tour de roue',
  30: 'Le fromage de la honte',
};

export default function FromageDeLaHonteScreen() {
  const days = Array.from({ length: TOTAL }, (_, i) => i + 1);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Le Fromage de la Honte',
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
              <Text style={styles.kicker}>POLAR ABSURDE · 30 ÉPISODES</Text>
              <Text style={styles.tagline}>Trafic de Pont-L’Évêque à Caen. Deux losers, une 2CV, zéro plan.</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.buyButton, pressed && styles.buyPressed]}
              onPress={() => router.push('/abonnement?roman=fromage-de-la-honte')}
              hitSlop={8}
            >
              <Text style={styles.buyText}>Acheter</Text>
            </Pressable>
          </View>

          <View style={styles.list}>
            {days.map((day) => {
              const isToday = day === TODAY;
              const isAvailable = day <= TODAY;
              const title = TITLES[day] ?? 'Épisode à venir';

              const row = (
                  <View style={[styles.row, isToday && styles.rowToday]}>
                    <Text style={[styles.day, isToday ? styles.dayToday : styles.dayLocked]}>
                      J{day}
                    </Text>
                    <View style={styles.rowTexts}>
                      <Text style={[styles.rowTitle, isToday ? styles.rowTitleToday : styles.rowTitleLocked]} numberOfLines={1}>
                        {title}
                      </Text>
                      {isToday ? <Text style={styles.todayLabel}>Épisode du jour</Text> : null}
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
                    <Link href={'/fromage/' + day} asChild>
                      <Pressable style={({ pressed }) => [styles.rowPress, pressed && styles.rowPressed]}>{row}</Pressable>
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
  rowPress: {},
  rowPressed: {
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
