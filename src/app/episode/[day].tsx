import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

type Episode = { title: string; paragraphs: string[] };

const EPISODES: Record<string, Episode> = {
  '1': {
    title: 'Le premier message',
    paragraphs: [
      '18h42. Le téléphone vibre sur la table de la cuisine. Un numéro inconnu, composé de chiffres qui ne disent rien. Tu hésites. Tu réponds quand même, comme toujours, comme tout le monde.',
      '« Salut. Tu me reconnais pas, c’est normal. »',
      'Tu regardes l’écran. Trois mots tapés trop vite, sans ponctuation. Tu demandes qui c’est. La réponse arrive en une phrase qui te glace davantage que la première : « Quelqu’un qui sait où ton frère a passé sa nuit. »',
      'Tu te redresses. Ton frère est rentré hier soir, 23h, tu l’as vu passer dans le couloir, son odeur de tabac froid et de pluie. Tu tapis la réponse, les mains moites : il est rentré, tu l’as vu.',
      '« Non. Tu as vu quelqu’un qui lui ressemble. »',
      'Il y a quelque chose dans la formulation, une certitude tranquille, qui te fait descendre vérifier. La boîte aux lettres du 14, dit le message suivant. Maintenant.',
      'L’escalier craque. Dans la boîte, une photo. Ton frère, de profil, devant un hangar que tu reconnais trop bien : la zone Nord, celle où personne ne va, même pas les gosses. L’heure sur la photo : 3h47. Cette nuit.',
      'Ton téléphone vibre encore. « Si. Demain, 21h, même endroit. Viens seul. Ou ne viens pas. »',
    ],
  },
  '2': {
    title: 'La photo',
    paragraphs: [
      'Tu as dormi deux heures. La photo est restée sur la table, face vers le bas, comme on retourne une carte qu’on ne veut plus voir et qu’on n’ose pas jeter.',
      '07h12. Premier message de la journée : « Sur la photo, regarde bien le fond. »',
      'Tu la regardes depuis ce matin. Le hangar, les tôles, la pluie. Ton frère au premier plan, l’air buté, cette façon qu’il a de rentrer le menton quand il veut pas qu’on voie qu’il a peur. Tu vois rien d’autre.',
      '« Le hangar. Derrière ton frère. Celui de la zone Nord. »',
      'Personne va là-bas. Même pas les gosses. Tu tapis la question qui te brûle depuis la veille : pourquoi vous me faites ça ? La réponse tombe, plate, sans émotion :',
      '« Parce que lui a pris quelque chose qui ne lui appartient pas. Et que toi, tu peux le rendre avant jeudi. »',
      'Tu regardes la photo une dernière fois. Et pour la première fois, tu remarques les mains de ton frère. Cachées derrière son dos.',
    ],
  },
  '3': {
    title: 'Le rendez-vous',
    paragraphs: [
      '21h00, sous le pont. Le vent sent le chaud-froid de la Chapelle Nord, ce mélange de goudron mouillé et de poulet grillé qui remonte du kebab d’à côté. Tu es venu seul, comme demandé. Ton cœur tape plus fort que tes pas.',
      '« Je sais. Je te vois d’ici. »',
      'Tu te retournes brusquement. Personne. Juste les voitures sur le pont, au-dessus, et leurs phares qui balayent la rampe. Tu demandes où il est. Pas de réponse pendant trente secondes. Trente secondes, c’est long.',
      'Puis : « Réglage de compte à la Chapelle Nord : un mot, et ton frère passe la nuit en garde à vue. Ton choix. »',
      'C’est du chantage, tu tapis, les dents serrées. La réponse arrive, presque gentille :',
      '« C’est une offre. Le chantage, c’est après, si tu refuses. »',
      '« Réfléchis bien jusqu’à demain 18h. Après, je parle à la police. Ou pire. »',
      'Le téléphone se tait. Tu restes un moment sous le pont, seul avec le bruit des voitures, à regarder la photo que tu n’aurais jamais dû recevoir.',
    ],
  },
};

export default function EpisodeScreen() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const episode = EPISODES[day ?? '1'] ?? { title: 'Épisode à venir', paragraphs: [] };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'J' + day + ' — ' + episode.title,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          headerBackTitle: 'Retour',
        }}
      />
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {episode.paragraphs.map((p, i) => (
            <Text key={i} style={styles.paragraph}>{p}</Text>
          ))}
          <Text style={styles.cliffhanger}>Fin de l’épisode. La suite demain.</Text>
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
  paragraph: {
    color: '#EDEDF0',
    fontSize: 16,
    lineHeight: 26,
  },
  cliffhanger: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
});
