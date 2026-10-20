import { Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

const FEATURES = [
  'Un épisode chaque jour, directement dans l’app',
  'Des histoires complètes en 30 jours',
  'La lecture en 3 minutes, où que tu sois',
  'Annulable à tout moment, sans justification',
];

export default function AbonnementScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'S’abonner',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          headerBackTitle: 'Retour',
        }}
      />
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.kicker}>MINI ROMANS</Text>
          <Text style={styles.title}>Ta dose quotidienne de fiction</Text>
          <Text style={styles.subtitle}>
            Des micronouvelles qui te tiennent en haleine, un épisode par jour, directement sur ton téléphone.
          </Text>

          <View style={styles.offer}>
            <View style={styles.offerTop}>
              <View>
                <Text style={styles.offerName}>Abonnement mensuel</Text>
                <Text style={styles.offerDesc}>La Chapelle Nord — 30 épisodes</Text>
              </View>
            </View>
            <View style={styles.offerPriceRow}>
              <Text style={styles.offerPrice}>4,99 €</Text>
              <Text style={styles.offerPer}>/ mois</Text>
            </View>
          </View>

          <View style={styles.features}>
            {FEATURES.map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <Text style={styles.featureCheck}>✓</Text>
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          <Pressable style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]} onPress={() => {}}>
            <Text style={styles.ctaText}>S’abonner maintenant</Text>
          </Pressable>

          <Text style={styles.legal}>
            Paiement via l’App Store. Renouvellement automatique chaque mois. Annulable à tout moment dans les réglages de ton compte Apple.
          </Text>
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
    gap: 20,
  },
  kicker: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 32,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  offer: {
    backgroundColor: '#C0392B',
    borderRadius: 20,
    padding: 22,
    gap: 12,
    marginTop: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  offerTop: {
    gap: 2,
  },
  offerName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  offerDesc: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
  },
  offerPriceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  offerPrice: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '800',
  },
  offerPer: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 15,
    marginBottom: 8,
  },
  features: {
    gap: 14,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  featureCheck: {
    color: '#2ECC71',
    fontSize: 16,
    fontWeight: '800',
  },
  featureText: {
    color: '#EDEDF0',
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  cta: {
    backgroundColor: '#FF4D4D',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  ctaPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  legal: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 4,
  },
});
