import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';
import * as Haptics from 'expo-haptics';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const colors = useColors();
  const { user, logout } = useAuth();

  const handleNavigate = (screen: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`./${screen}`);
  };

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
              <Text className="text-3xl font-bold text-primary">Admin Panel</Text>
              <Text className="text-sm text-muted mt-1">Manage the platform</Text>
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
                <Text className="text-sm text-muted mb-1">Total Users</Text>
                <Text className="text-2xl font-bold text-primary">1,234</Text>
              </View>
              <View
                className="flex-1 rounded-lg p-4 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text className="text-sm text-muted mb-1">Professionals</Text>
                <Text className="text-2xl font-bold text-secondary">456</Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <View
                className="flex-1 rounded-lg p-4 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text className="text-sm text-muted mb-1">Bookings</Text>
                <Text className="text-2xl font-bold text-primary">789</Text>
              </View>
              <View
                className="flex-1 rounded-lg p-4 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text className="text-sm text-muted mb-1">Pending</Text>
                <Text className="text-2xl font-bold text-warning">23</Text>
              </View>
            </View>
          </View>

          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Management</Text>
            <Pressable
              onPress={() => handleNavigate('users')}
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
              <Text className="text-primary font-semibold">Users Management</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNavigate('professionals')}
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
              <Text className="text-primary font-semibold">Professionals</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNavigate('verification')}
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
              <Text className="text-primary font-semibold">Verification Queue</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNavigate('bookings')}
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
              <Text className="text-primary font-semibold">Bookings</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNavigate('reports')}
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
              <Text className="text-primary font-semibold">Reports & Analytics</Text>
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
