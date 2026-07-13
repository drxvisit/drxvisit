import { View, Text, Pressable, ScrollView } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';
import * as Haptics from 'expo-haptics';

export default function ProfessionalDashboardScreen() {
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
          <View className="gap-2">
            <Text className="text-4xl font-bold text-primary">Welcome, {user?.name}</Text>
            <Text className="text-base text-muted">Manage your practice</Text>
          </View>

          <View className="gap-3">
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Today</Text>
                <Text className="text-2xl font-bold text-primary">3</Text>
                <Text className="text-xs text-muted">Bookings</Text>
              </View>
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Earnings</Text>
                <Text className="text-2xl font-bold text-secondary">₹2,500</Text>
                <Text className="text-xs text-muted">This Month</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [{
              backgroundColor: colors.surface,
              borderColor: colors.error,
              borderWidth: 1,
              borderRadius: 8,
              padding: 14,
              opacity: pressed ? 0.9 : 1,
            }]}
            onPress={handleLogout}
          >
            <Text className="text-error font-bold text-center">Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
