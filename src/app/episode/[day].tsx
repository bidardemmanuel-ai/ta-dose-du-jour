import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

type Message = { from: 'inconnu' | 'moi'; text: string; time: string };

const EPISODE_CONTENT: Record<string, { title: string; messages: Message[] }> = {
  '1': {
    title: 'Le premier message',
    messages: [
      { from: 'inconnu', text: 'Salut. Tu me reconnais pas, c’est normal.', time: '18:42' },
      { from: 'moi', text: 'C’est qui ?', time: '18:43' },
      { from: 'inconnu', text: 'Quelqu’un qui sait où ton frère a passé sa nuit.', time: '18:43' },
      { from: 'moi', text: 'Mon frère est rentré hier à 23h. Je l’ai vu.', time: '18:44' },
      { from: 'inconnu', text: 'Non. Tu as vu quelqu’un qui lui ressemble.', time: '18:44' },
      { from: 'inconnu', text: 'Regarde la boîte aux lettres du 14. Maintenant.', time: '18:45' },
      { from: 'moi', text: '…', time: '18:46' },
      { from: 'inconnu', text: 'Alors ?', time: '18:47' },
      { from: 'moi', text: 'Il y a une photo. C’est pas possible.', time: '18:48' },
      { from: 'inconnu', text: 'Si. Demain, 21h, même endroit. Viens seul. Ou ne viens pas.', time: '18:49' },
    ],
  },
  '2': {
    title: 'La photo',
    messages: [
      { from: 'inconnu', text: 'Sur la photo, regarde bien le fond.', time: '07:12' },
      { from: 'moi', text: 'Je regarde depuis ce matin. Je vois rien.', time: '08:01' },
      { from: 'inconnu', text: 'Le hangar. Derrière ton frère. Celui de la zone Nord.', time: '08:02' },
      { from: 'moi', text: 'Personne va là-bas. Même pas les gosses.', time: '08:03' },
      { from: 'inconnu', text: 'Exactement.', time: '08:03' },
      { from: 'moi', text: 'Pourquoi vous me faites ça ?', time: '08:05' },
      { from: 'inconnu', text: 'Parce que lui a pris quelque chose qui ne lui appartient pas.', time: '08:06' },
      { from: 'inconnu', text: 'Et que toi, tu peux le rendre avant jeudi.', time: '08:06' },
    ],
  },
  '3': {
    title: 'Le rendez-vous',
    messages: [
      { from: 'moi', text: 'Je suis là. Seul, comme demandé.', time: '21:00' },
      { from: 'inconnu', text: 'Je sais. Je te vois d’ici.', time: '21:01' },
      { from: 'moi', text: 'Vous êtes où ??', time: '21:01' },
      { from: 'inconnu', text: 'Réglage de compte à la Chapelle Nord : un mot, et ton frère passe la nuit en garde à vue. Ton choix.', time: '21:02' },
      { from: 'moi', text: 'C’est du chantage.', time: '21:02' },
      { from: 'inconnu', text: 'C’est une offre. Le chantage, c’est après si tu refuses.', time: '21:03' },
      { from: 'inconnu', text: 'Réfléchis bien jusqu’à demain 18h. Après, je parle à la police. Ou pire.', time: '21:03' },
    ],
  },
};

export default function EpisodeScreen() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const episode = EPISODE_CONTENT[day ?? '1'] ?? { title: 'Épisode à venir', messages: [] };

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
          {episode.messages.map((msg, i) => (
            <View key={i} style={[styles.bubble, msg.from === 'moi' ? styles.bubbleMine : styles.bubbleTheirs]}>
              <Text style={styles.bubbleText}>{msg.text}</Text>
              <Text style={[styles.time, msg.from === 'moi' && styles.timeMine]}>{msg.time}</Text>
            </View>
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
    padding: 16,
    gap: 10,
    paddingBottom: 40,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 4,
  },
  bubbleMine: {
    alignSelf: 'flex-end',
    backgroundColor: '#2E7D32',
    borderBottomRightRadius: 4,
  },
  bubbleTheirs: {
    alignSelf: 'flex-start',
    backgroundColor: '#26262A',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 21,
  },
  time: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  timeMine: {
    color: 'rgba(255,255,255,0.6)',
  },
  cliffhanger: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
});
