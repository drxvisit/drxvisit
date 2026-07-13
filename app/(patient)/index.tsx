import { View, Text, Pressable, ScrollView, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';
import * as Haptics from 'expo-haptics';
import { formatDate } from '@/lib/utils/validation';

export default function PatientDashboardScreen() {
  const router = useRouter();
  const colors = useColors();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await logout();
  };

  const upcomingAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      date: new Date(Date.now() + 86400000),
      type: 'Clinic Visit',
      status: 'confirmed',
    },
    {
      id: '2',
      doctorName: 'Dr. Priya Sharma',
      specialty: 'Dermatologist',
      date: new Date(Date.now() + 172800000),
      type: 'Video Consultation',
      status: 'confirmed',
    },
  ];

  const services = [
    { id: '1', name: 'Lab Tests', icon: '🧪', color: colors.primary },
    { id: '2', name: 'Medicine', icon: '💊', color: colors.secondary },
    { id: '3', name: 'Ambulance', icon: '🚑', color: '#FF6B6B' },
    { id: '4', name: 'Physiotherapy', icon: '🏥', color: '#4ECDC4' },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header with Falco */}
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-3xl font-bold text-primary">Welcome, {user?.name}</Text>
              <Text className="text-sm text-muted mt-1">Your health, our priority</Text>
            </View>
            <Image
              source={require('@/assets/images/falco-welcome.png')}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </View>

          {/* Quick Stats */}
          <View className="gap-3">
            <View className="flex-row gap-3">
              <View
                className="flex-1 rounded-lg p-4 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text className="text-sm text-muted mb-1">Upcoming</Text>
                <Text className="text-2xl font-bold text-primary">2</Text>
                <Text className="text-xs text-muted">Appointments</Text>
              </View>
              <View
                className="flex-1 rounded-lg p-4 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text className="text-sm text-muted mb-1">Medical</Text>
                <Text className="text-2xl font-bold text-secondary">5</Text>
                <Text className="text-xs text-muted">Records</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Quick Actions</Text>
            <Pressable
              onPress={() => router.push('/(patient)/appointments')}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  borderRadius: 8,
                  padding: 14,
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-white font-bold text-center">Book Appointment</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/(patient)/records')}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 14,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text className="text-primary font-bold text-center">View Medical Records</Text>
            </Pressable>
          </View>

          {/* Upcoming Appointments */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Upcoming Appointments</Text>
            {upcomingAppointments.map((appointment) => (
              <View
                key={appointment.id}
                className="rounded-lg p-4 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-1">
                    <Text className="font-semibold text-foreground">{appointment.doctorName}</Text>
                    <Text className="text-sm text-muted">{appointment.specialty}</Text>
                  </View>
                  <View
                    className="px-2 py-1 rounded"
                    style={{ backgroundColor: colors.secondary + '20' }}
                  >
                    <Text className="text-xs font-semibold text-secondary">{appointment.type}</Text>
                  </View>
                </View>
                <Text className="text-sm text-muted">{formatDate(appointment.date)}</Text>
              </View>
            ))}
          </View>

          {/* Healthcare Services */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Healthcare Services</Text>
            <View className="flex-row flex-wrap gap-3">
              {services.map((service) => (
                <Pressable
                  key={service.id}
                  onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                  style={({ pressed }) => [
                    {
                      flex: 0.48,
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      borderWidth: 1,
                      borderRadius: 12,
                      padding: 12,
                      alignItems: 'center',
                      gap: 8,
                      opacity: pressed ? 0.8 : 1,
                      transform: [{ scale: pressed ? 0.95 : 1 }],
                    },
                  ]}
                >
                  <Text style={{ fontSize: 24 }}>{service.icon}</Text>
                  <Text className="text-sm font-semibold text-foreground text-center">{service.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Emergency Section */}
          <View
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: '#EF4444' + '10',
              borderColor: '#EF4444',
            }}
          >
            <Text className="text-sm font-semibold text-error mb-2">Emergency Helpline</Text>
            <Text className="text-lg font-bold text-error">+91 74086 00050</Text>
          </View>

          {/* Sign Out */}
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
