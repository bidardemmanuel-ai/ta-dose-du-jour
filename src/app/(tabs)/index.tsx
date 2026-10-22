import { Link, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const ACCENT = '#e5ceac';
const BUTTON = '#d8bc8f';

// Histoire en cours : en vedette, lisible tout de suite.
const FEATURED = {
  id: 'chapelle-nord',
  title: 'La Chapelle Nord',
  tagline: '30 jours. 30 épisodes. Une banlieue qui brûle.',
  episodes: 30,
  unlocked: 3,
};

// Catalogue provisoire : 9 autres minis romans à venir.
const CATALOG = [
  { id: '1', title: 'Le Fromage de la Honte', tagline: 'Trafic de Pont-Lévêque à Caen. Deux losers, une 2CV, zéro plan.', genre: 'Polar absurde' },
  { id: '2', title: 'La Marée Noire', tagline: 'Un pêcheur de Dieppe remonte dans ses filets ce que la mer devait garder.', genre: 'Thriller' },
  { id: '3', title: 'L’Applaudissement', tagline: 'Une comédienne reçoit des ovations pour une pièce qu’elle n’a jamais jouée.', genre: 'Mystère' },
  { id: '4', title: 'L’Appart 3B', tagline: 'Le locataire d’en dessous entend des voix. Sauf que l’appart est vide.', genre: 'Huis clos' },
  { id: '5', title: 'Le Dernier Terminus', tagline: 'Chaque nuit, un train s’arrête en gare. Il n’est pas au tableau des horaires.', genre: 'Fantastique' },
  { id: '6', title: 'Le Témoin Muet', tagline: 'Au mariage de sa sœur, il reconnaît l’homme que tout le monde croyait mort.', genre: 'Polar' },
  { id: '7', title: 'Compte à Rebours', tagline: 'Son téléphone annonce chaque matin l’heure exacte de sa mort. J-30.', genre: 'Thriller' },
  { id: '8', title: 'La Vitesse de l’Escargot', tagline: 'Le braquage le plus lent de l’histoire de France. 30 jours de fuite.', genre: 'Comédie noire' },
  { id: '9', title: 'La Veillée', tagline: 'Onze personnes, une chambre funéraire, et un cercueil qu’on n’ouvre pas.', genre: 'Huis clos' },
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

          <View style={styles.separator} />

          <Link href="/chapelle-nord" asChild>
            <Pressable style={({ pressed }) => [styles.featured, pressed && styles.featuredPressed]}>
              <View style={styles.featuredHead}>
                <Text style={styles.featuredKicker}>EN COURS</Text>
                <Text style={styles.featuredTitle}>{FEATURED.title}</Text>
                <Text style={styles.featuredTagline}>{FEATURED.tagline}</Text>
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>J{FEATURED.unlocked} / {FEATURED.episodes} débloqués</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: ((FEATURED.unlocked / FEATURED.episodes) * 100) + '%' }]} />
                </View>
              </View>
              <Text style={styles.featuredCta}>Voir les épisodes →</Text>
            </Pressable>
          </Link>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Romans disponibles</Text>

          <View style={styles.catalog}>
            {CATALOG.map((story, i) => (
              <View key={story.id}>
                <View style={styles.storyRow}>
                  <View style={styles.storyTexts}>
                    <Text style={styles.storyGenre}>{story.genre}</Text>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <Text style={styles.storyTagline}>{story.tagline}</Text>
                  </View>
                  {i >= CATALOG.length - 2 ? <Text style={styles.soonText}>Bientôt</Text> : null}
                </View>
                {i < CATALOG.length - 1 ? <View style={styles.rowSeparator} /> : null}
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
    paddingHorizontal: 24,
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
    letterSpacing: 2.5,
    opacity: 0.5,
    fontSize: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5ceac',
  },
  subscribeButton: {
    backgroundColor: BUTTON,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  subscribePressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  subscribeText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  sectionTitle: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: '300',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  featured: {
    backgroundColor: BUTTON,
    borderRadius: 16,
    padding: 20,
    gap: 14,
  },
  featuredPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  featuredHead: {
    gap: 3,
  },
  featuredKicker: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  featuredTagline: {
    color: 'rgba(0,0,0,0.75)',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 19,
  },
  progressRow: {
    gap: 6,
  },
  progressLabel: {
    color: 'rgba(0,0,0,0.75)',
    fontSize: 11,
    fontWeight: '300',
  },
  progressTrack: {
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.15)',
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 999,
    backgroundColor: '#000',
  },
  featuredCta: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
  },
  catalog: {
    gap: 0,
  },
  storyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 14,
  },
  storyTexts: {
    flexShrink: 1,
    gap: 3,
  },
  storyGenre: {
    color: ACCENT,
    fontSize: 9,
    fontWeight: '300',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  storyTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  storyTagline: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '300',
    lineHeight: 16,
  },
  soonText: {
    color: ACCENT,
    fontSize: 10,
    fontWeight: '300',
    opacity: 0.7,
    flexShrink: 0,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: 'rgba(229,206,172,0.5)',
  },
  footer: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 10,
  },
});
