import { Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset } from '@/constants/theme';

const EPISODES = [
  { day: 'J1', title: 'Le premier message', teaser: 'Un numéro inconnu. Une photo. Et un choix que tu ne pourras pas annuler.', unlocked: true, read: true },
  { day: 'J2', title: 'La photo', teaser: 'Sur la photo : ton frère. Dans un endroit où il n’aurait jamais dû mettre les pieds.', unlocked: true, read: true },
  { day: 'J3', title: 'Le rendez-vous', teaser: '21h, sous le pont. Viens seul. Ou ne viens pas.', unlocked: true, read: false },
  { day: 'J4', title: '???', teaser: 'Débloque ton épisode de demain.', unlocked: false, read: false },
];

const TOTAL_DAYS = 30;
const UNLOCKED_DAYS = 3;

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Masque le header natif (bouton appareil photo) et force le mode sombre */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <ThemedText type="small" style={styles.brand}>MINI ROMANS</ThemedText>
              <Text style={styles.title}>Ta dose du jour</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.subscribeButton, pressed && styles.subscribePressed]}
              onPress={() => {}}
              hitSlop={8}
            >
              <Text style={styles.subscribeText} numberOfLines={1} adjustsFontSizeToFit>S’abonner</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardKicker}>OCTOBRE 2026</Text>
            <Text style={styles.cardTitle}>La Chapelle Nord</Text>
            <Text style={styles.cardTagline}>30 jours. 30 épisodes. Une banlieue qui brûle. 🔥</Text>

            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>J3 / {TOTAL_DAYS} débloqués</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${(UNLOCKED_DAYS / TOTAL_DAYS) * 100}%` }]} />
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Tes épisodes</Text>

          {EPISODES.map((ep) => (
            <View key={ep.day} style={[styles.episode, !ep.unlocked && styles.episodeLocked]}>
              <View style={[styles.dayBadge, ep.unlocked ? styles.dayBadgeActive : styles.dayBadgeMuted]}>
                <Text style={[styles.dayBadgeText, !ep.unlocked && styles.dayBadgeTextMuted]}>{ep.day}</Text>
              </View>
              <View style={styles.episodeBody}>
                <Text style={[styles.episodeTitle, !ep.unlocked && styles.episodeTitleMuted]}>
                  {ep.title}
                </Text>
                <Text style={styles.episodeTeaser}>{ep.teaser}</Text>
              </View>
              {ep.read ? (
                <Text style={styles.check}>✓</Text>
              ) : ep.unlocked ? (
                <Text style={styles.newDot}>●</Text>
              ) : (
                <Text style={styles.lock}>🔒</Text>
              )}
            </View>
          ))}

          <Text style={styles.footer}>Abonnement 4,99 €/mois · Annulable à tout moment</Text>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: BottomTabInset + 40,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  headerLeft: {
    flexShrink: 1,
  },
  brand: {
    letterSpacing: 2,
    opacity: 0.6,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  subscribeButton: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  subscribePressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  subscribeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#C0392B',
    borderRadius: 20,
    padding: 22,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cardKicker: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
  },
  cardTagline: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    lineHeight: 21,
  },
  progressRow: {
    marginTop: 10,
    gap: 8,
  },
  progressLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#FFD166',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  episode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  episodeLocked: {
    opacity: 0.5,
  },
  dayBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadgeActive: {
    backgroundColor: '#2ECC71',
  },
  dayBadgeMuted: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  dayBadgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  dayBadgeTextMuted: {
    color: 'rgba(255,255,255,0.7)',
  },
  episodeBody: {
    flex: 1,
    gap: 4,
  },
  episodeTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  episodeTitleMuted: {
    color: 'rgba(255,255,255,0.7)',
  },
  episodeTeaser: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    lineHeight: 18,
  },
  check: {
    color: '#2ECC71',
    fontSize: 18,
    fontWeight: '800',
  },
  newDot: {
    color: '#FF4D4D',
    fontSize: 14,
  },
  lock: {
    fontSize: 16,
  },
  footer: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
