import { View, Text, Pressable, ScrollView } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';
import * as Haptics from 'expo-haptics';

export default function PatientDashboardScreen() {
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
          {/* Header */}
          <View className="gap-2">
            <Text className="text-4xl font-bold text-primary">Welcome, {user?.name}</Text>
            <Text className="text-base text-muted">Your healthcare journey starts here</Text>
          </View>

          {/* Quick Stats */}
          <View className="gap-3">
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Upcoming</Text>
                <Text className="text-2xl font-bold text-primary">2</Text>
                <Text className="text-xs text-muted">Appointments</Text>
              </View>
              <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-muted mb-1">Wallet</Text>
                <Text className="text-2xl font-bold text-secondary">₹500</Text>
                <Text className="text-xs text-muted">Balance</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Quick Actions</Text>
            <Pressable
              style={({ pressed }) => [{
                backgroundColor: colors.primary,
                borderRadius: 8,
                padding: 14,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              }]}
            >
              <Text className="text-white font-bold text-center">Book Appointment</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 14,
                opacity: pressed ? 0.9 : 1,
              }]}
            >
              <Text className="text-primary font-bold text-center">View Medical Records</Text>
            </Pressable>
          </View>

          {/* Emergency Helpline */}
          <View className="bg-error/10 rounded-lg p-4 border border-error">
            <Text className="text-sm font-semibold text-error mb-2">Emergency Helpline</Text>
            <Text className="text-lg font-bold text-error">+91 74086 00050</Text>
          </View>

          {/* Logout Button */}
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
