import { Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

const ACCENT = '#e5ceac';

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
          headerTitleStyle: { fontWeight: '500' },
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
              <Text style={styles.offerName}>Abonnement mensuel</Text>
              <Text style={styles.offerDesc}>La Chapelle Nord — 30 épisodes</Text>
            </View>
            <View style={styles.offerPriceRow}>
              <Text style={styles.offerPrice}>4,99 €</Text>
              <Text style={styles.offerPer}>/ mois</Text>
            </View>
          </View>

          <View style={styles.features}>
            {FEATURES.map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <Text style={styles.featureDash}>—</Text>
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
    gap: 18,
  },
  kicker: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '300',
    letterSpacing: 3,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 29,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 20,
    textAlign: 'center',
  },
  offer: {
    backgroundColor: 'rgba(229,206,172,0.08)',
    borderColor: 'rgba(229,206,172,0.35)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    gap: 10,
    marginTop: 4,
  },
  offerTop: {
    gap: 2,
  },
  offerName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  offerDesc: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '300',
  },
  offerPriceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  offerPrice: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '500',
  },
  offerPer: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '300',
    marginBottom: 7,
  },
  features: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  featureDash: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '300',
  },
  featureText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 20,
    flex: 1,
  },
  cta: {
    backgroundColor: ACCENT,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  legal: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontWeight: '300',
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 2,
  },
});
