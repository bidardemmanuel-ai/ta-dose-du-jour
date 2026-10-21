import { Link, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Histoire en cours : en vedette, lisible tout de suite.
const FEATURED = {
  id: 'chapelle-nord',
  emoji: '🔥',
  kicker: 'OCTOBRE 2026 · EN COURS',
  title: 'La Chapelle Nord',
  tagline: '30 jours. 30 épisodes. Une banlieue qui brûle.',
  episodes: 30,
  unlocked: 3,
};

// Catalogue provisoire : 9 autres minis romans à venir.
const CATALOG = [
  { id: '1', emoji: '🧀', title: 'Le Fromage de la Honte', tagline: 'Trafic de Pont-Lévêque à Caen. Deux losers, une 2CV, zéro plan.', genre: 'Polar absurde' },
  { id: '2', emoji: '🌊', title: 'La Marée Noire', tagline: 'Un pêcheur de Dieppe remonte dans ses filets ce que la mer devait garder.', genre: 'Thriller' },
  { id: '3', emoji: '🎭', title: 'L’Applaudissement', tagline: 'Une comédienne reçoit des ovations pour une pièce qu’elle n’a jamais jouée.', genre: 'Mystère' },
  { id: '4', emoji: '🏠', title: 'L’Appart 3B', tagline: 'Le locataire d’en dessous entend des voix. Sauf que l’appart est vide.', genre: 'Huis clos' },
  { id: '5', emoji: '🚂', title: 'Le Dernier Terminus', tagline: 'Chaque nuit, un train s’arrête en gare. Il n’est pas au tableau des horaires.', genre: 'Fantastique' },
  { id: '6', emoji: '💍', title: 'Le Témoin Muet', tagline: 'Au mariage de sa sœur, il reconnaît l’homme que tout le monde croyait mort.', genre: 'Polar' },
  { id: '7', emoji: '📱', title: 'Compte à Rebours', tagline: 'Son téléphone annonce chaque matin l’heure exacte de sa mort. J-30.', genre: 'Thriller' },
  { id: '8', emoji: '🐢', title: 'La Vitesse de l’Escargot', tagline: 'Le braquage le plus lent de l’histoire de France. 30 jours de fuite.', genre: 'Comédie noire' },
  { id: '9', emoji: '🕯️', title: 'La Veillée', tagline: 'Onze personnes, une chambre funéraire, et un cercueil qu’on n’ouvre pas.', genre: 'Huis clos' },
];

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <ThemedText type="small" style={styles.brand}>MINI ROMANS</ThemedText>
              <Text style={styles.title}>Ta dose du jour</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.subscribeButton, pressed && styles.subscribePressed]}
              onPress={() => router.push('/abonnement')}
              hitSlop={8}
            >
              <Text style={styles.subscribeText} numberOfLines={1} adjustsFontSizeToFit>S’abonner</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Histoire du mois</Text>

          <Link href="/episode/1" asChild>
            <Pressable style={({ pressed }) => [styles.featured, pressed && styles.featuredPressed]}>
              <View style={styles.featuredTop}>
                <Text style={styles.featuredEmoji}>{FEATURED.emoji}</Text>
                <View style={styles.featuredHead}>
                  <Text style={styles.featuredKicker}>{FEATURED.kicker}</Text>
                  <Text style={styles.featuredTitle}>{FEATURED.title}</Text>
                  <Text style={styles.featuredTagline}>{FEATURED.tagline}</Text>
                </View>
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>J{FEATURED.unlocked} / {FEATURED.episodes} débloqués</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: ((FEATURED.unlocked / FEATURED.episodes) * 100) + '%' }]} />
                </View>
              </View>
              <Text style={styles.featuredCta}>Continuer la lecture →</Text>
            </Pressable>
          </Link>

          <Text style={styles.sectionTitle}>Bientôt disponibles</Text>

          <View style={styles.grid}>
            {CATALOG.map((story) => (
              <View key={story.id} style={styles.storyCard}>
                <Text style={styles.storyEmoji}>{story.emoji}</Text>
                <Text style={styles.storyGenre}>{story.genre}</Text>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.storyTagline}>{story.tagline}</Text>
                <View style={styles.soonBadge}>
                  <Text style={styles.soonText}>Bientôt</Text>
                </View>
              </View>
            ))}
          </View>

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
    paddingBottom: 40,
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
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  featured: {
    backgroundColor: '#C0392B',
    borderRadius: 20,
    padding: 22,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  featuredPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  featuredTop: {
    flexDirection: 'row',
    gap: 14,
  },
  featuredEmoji: {
    fontSize: 34,
  },
  featuredHead: {
    flex: 1,
    gap: 2,
  },
  featuredKicker: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  featuredTagline: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
  progressRow: {
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
  featuredCta: {
    color: '#FFD166',
    fontSize: 14,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  storyCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  storyEmoji: {
    fontSize: 28,
  },
  storyGenre: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  storyTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  storyTagline: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    lineHeight: 17,
  },
  soonBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },
  soonText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    fontWeight: '700',
  },
  footer: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
