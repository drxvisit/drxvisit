import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

export default function OnboardingScreen() {
  const router = useRouter();
  const colors = useColors();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between py-8">
          {/* Header */}
          <View className="items-center gap-2 mb-8">
            <Text className="text-5xl font-bold text-primary">Falco</Text>
            <Text className="text-lg text-muted text-center">Your DrxVisit Guide</Text>
          </View>

          {/* Onboarding Content */}
          <View className="gap-4">
            <View className="bg-surface rounded-lg p-6 border border-border">
              <Text className="text-xl font-semibold text-foreground mb-2">Welcome to DrxVisit</Text>
              <Text className="text-sm text-muted">
                Your trusted healthcare marketplace connecting patients with verified healthcare professionals.
              </Text>
            </View>

            <View className="bg-surface rounded-lg p-6 border border-border">
              <Text className="text-lg font-semibold text-secondary mb-2">Features</Text>
              <View className="gap-2">
                <Text className="text-sm text-muted">✓ Book appointments easily</Text>
                <Text className="text-sm text-muted">✓ Clinic, home, or video consultations</Text>
                <Text className="text-sm text-muted">✓ Secure medical records</Text>
                <Text className="text-sm text-muted">✓ Digital prescriptions</Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <Pressable
            onPress={() => router.push('./index')}
            style={({ pressed }) => [{
              backgroundColor: colors.primary,
              borderRadius: 8,
              padding: 14,
              alignItems: 'center',
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            }]}
          >
            <Text className="text-white font-bold text-base">Get Started</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
