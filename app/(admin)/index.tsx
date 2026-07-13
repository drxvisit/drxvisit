import { View, Text, Pressable, ScrollView } from 'react-native';
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
          <View className="gap-2">
            <Text className="text-4xl font-bold text-primary">Admin Panel</Text>
            <Text className="text-base text-muted">Manage the platform</Text>
          </View>

          {/* KPI Cards */}
          <View className="gap-3">
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Total Users</Text>
                <Text className="text-2xl font-bold text-primary">1,234</Text>
              </View>
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Professionals</Text>
                <Text className="text-2xl font-bold text-secondary">456</Text>
              </View>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Bookings</Text>
                <Text className="text-2xl font-bold text-primary">789</Text>
              </View>
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Revenue</Text>
                <Text className="text-2xl font-bold text-secondary">₹5.2L</Text>
              </View>
            </View>
          </View>

          {/* Admin Actions */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Management</Text>
            <Pressable
              onPress={() => handleNavigate('users')}
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                opacity: pressed ? 0.9 : 1,
              }]}
            >
              <Text className="text-primary font-semibold">Users Management</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNavigate('professionals')}
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                opacity: pressed ? 0.9 : 1,
              }]}
            >
              <Text className="text-primary font-semibold">Professionals</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNavigate('verification')}
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                opacity: pressed ? 0.9 : 1,
              }]}
            >
              <Text className="text-primary font-semibold">Verification Queue</Text>
            </Pressable>
            <Pressable
              onPress={() => handleNavigate('bookings')}
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                opacity: pressed ? 0.9 : 1,
              }]}
            >
              <Text className="text-primary font-semibold">Bookings</Text>
            </Pressable>

            <Pressable
              onPress={() => handleNavigate('reports')}
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                opacity: pressed ? 0.9 : 1,
              }]}
            >
              <Text className="text-primary font-semibold">Reports & Analytics</Text>
            </Pressable>
          </View>

          {/* Logout */}
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [{
              backgroundColor: colors.surface,
              borderColor: colors.error,
              borderWidth: 1,
              borderRadius: 8,
              padding: 14,
              opacity: pressed ? 0.9 : 1,
            }]}
          >
            <Text className="text-error font-bold text-center">Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
