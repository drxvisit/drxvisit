import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';
import * as Haptics from 'expo-haptics';

export default function ProfessionalDashboardScreen() {
  const router = useRouter();
  const colors = useColors();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await logout();
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-primary">Welcome, {user?.name}</Text>
              <Text className="text-sm text-muted mt-1">Manage your practice</Text>
            </View>
            <Image
              source={require('@/assets/images/falco-welcome.png')}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </View>

          <View className="gap-3">
            <View className="flex-row gap-3">
              <View
                className="flex-1 rounded-lg p-4 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text className="text-sm text-muted mb-1">Pending</Text>
                <Text className="text-2xl font-bold text-primary">3</Text>
                <Text className="text-xs text-muted">Bookings</Text>
              </View>
              <View
                className="flex-1 rounded-lg p-4 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text className="text-sm text-muted mb-1">Rating</Text>
                <Text className="text-2xl font-bold text-secondary">4.8</Text>
                <Text className="text-xs text-muted">Stars</Text>
              </View>
            </View>
          </View>

          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Management</Text>
            <Pressable
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text className="text-primary font-semibold">View Bookings</Text>
            </Pressable>
            <Pressable
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text className="text-primary font-semibold">Manage Availability</Text>
            </Pressable>
            <Pressable
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text className="text-primary font-semibold">View Reviews</Text>
            </Pressable>
            <Pressable
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text className="text-primary font-semibold">Upload Documents</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
              {
                backgroundColor: colors.surface,
                borderColor: '#EF4444',
                borderWidth: 1,
                borderRadius: 8,
                padding: 14,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <Text className="text-error font-bold text-center">Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
