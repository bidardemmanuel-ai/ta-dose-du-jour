import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

const ACCENT = '#e5ceac';
const BUTTON = '#d8bc8f';

const STORY_TITLE = 'Le Fromage de la Honte';
const TODAY = 1; // épisode du jour

type Episode = { title: string; paragraphs: string[] };

const EPISODES: Record<string, Episode> = {
  '1': {
    title: 'La nuit du camembert',
    paragraphs: [
      '23h17. Le fourgon blanc ronronne place du Marché, moteur au ralenti, comme un vieux chat qui aurait trop mangé. Dedans, Gégé compte les caisses. Trois. Il en manque une.',
      '« T’as compté combien ? » demande Marco au téléphone. Gégé répond trois. Silence radio pendant dix secondes. Chez Marco, dix secondes de silence, c’est une déclaration de guerre.',
      '« Trois ?! On en avait QUATRE. T’as égaré une caisse de pont-l’évêque où, sur le parking ? »',
      'Gégé regarde le rétroviseur. Le parking est désert. Il pleut comme il pleut en Normandie, c’est-à-dire sérieusement. Sur la banquette arrière, les trois caisses restantes sentent la ferme et l’argent. L’odeur de toute une vie. De la sienne, en tout cas.',
      '« J’ai rien perdu, dit Gégé. C’est le fromage qui a disparu. » Marco ne répond pas. Dans le trafic de fromage AOP, il n’y a qu’une règle : on ne perd pas la marchandise. On peut perdre son permis, sa carte Sim, sa copine. Pas la marchandise.',
      'Gégé met les warnings, descend, marche jusqu’à la borne. Sur le bitume, une traînée blanche. Pas de la farine. De la moisissure. Une meule a roulé jusque-là, blessée, et a laissé sa trace comme un blessé laisse son sang.',
      '« Marco. Il y a une traînée. » Nouveau silence. Puis, très bas : « Suis la meule. Et surtout : personne ne doit savoir. On n’est pas des trafiquants. On est des artisans. »',
    ],
  },
};

export default function FromageEpisodeScreen() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const episode = EPISODES[day ?? '1'] ?? { title: 'Épisode à venir', paragraphs: [] };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'J' + (day ?? '1') + ' — ' + episode.title,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          headerBackTitle: 'Retour',
        }}
      />
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.episodeHead}>
            <Text style={styles.kicker}>{STORY_TITLE.toUpperCase()} · J{day} / 30</Text>
            <Text style={styles.episodeTitle}>{episode.title}</Text>
          </View>

          <View style={styles.headSeparator} />

          {episode.paragraphs.map((p, i) => (
            <Text key={i} style={styles.paragraph}>{p}</Text>
          ))}

          <Text style={styles.cliffhanger}>Fin de l’épisode. La suite demain.</Text>

          <Pressable
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            onPress={() => router.push('/abonnement?roman=fromage-de-la-honte')}
          >
            <View style={styles.ctaTexts}>
              <Text style={styles.ctaText}>Acheter</Text>
              <Text style={styles.ctaStory}>{STORY_TITLE}</Text>
              <Text style={styles.ctaText}>pour lire la suite</Text>
              <Text style={styles.ctaPrice}>0,99 €</Text>
            </View>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    padding: 24,
    paddingBottom: 48,
    gap: 16,
  },
  episodeHead: {
    gap: 6,
    marginBottom: 2,
  },
  kicker: {
    color: ACCENT,
    fontSize: 10,
    fontWeight: '300',
    letterSpacing: 2,
  },
  episodeTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 26,
  },
  headSeparator: {
    height: 1,
    backgroundColor: ACCENT,
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    color: '#EDEDF0',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 26,
  },
  cliffhanger: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
  cta: {
    backgroundColor: BUTTON,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  ctaPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  ctaTexts: {
    alignItems: 'center',
    gap: 2,
  },
  ctaStory: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  ctaText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  ctaPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginTop: 2,
  },
});
