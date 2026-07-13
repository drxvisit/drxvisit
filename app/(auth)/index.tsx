import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import * as Haptics from 'expo-haptics';

export default function AuthIndexScreen() {
  const router = useRouter();
  const colors = useColors();

  const handleUserTypeSelect = (type: 'patient' | 'professional' | 'admin') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (type === 'patient') {
      router.push('./patient-login');
    } else if (type === 'professional') {
      router.push('./professional-login');
    } else if (type === 'admin') {
      router.push('./admin-login');
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between py-8">
          {/* Header */}
          <View className="items-center gap-2 mb-12">
            <Text className="text-5xl font-bold text-primary">DrxVisit</Text>
            <Text className="text-lg text-muted text-center">
              Connecting Patients with Trusted Healthcare Professionals
            </Text>
          </View>

          {/* User Type Selection */}
          <View className="gap-4">
            {/* Patient Option */}
            <Pressable
              onPress={() => handleUserTypeSelect('patient')}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                  borderWidth: 2,
                  borderRadius: 16,
                  padding: 20,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-2xl font-bold text-primary mb-2">Patient</Text>
              <Text className="text-base text-muted">
                Book appointments with healthcare professionals
              </Text>
            </Pressable>

            {/* Professional Option */}
            <Pressable
              onPress={() => handleUserTypeSelect('professional')}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                  borderWidth: 2,
                  borderRadius: 16,
                  padding: 20,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-2xl font-bold text-primary mb-2">Healthcare Professional</Text>
              <Text className="text-base text-muted">
                Register and manage your practice
              </Text>
            </Pressable>

            {/* Admin Option */}
            <Pressable
              onPress={() => handleUserTypeSelect('admin')}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                  borderWidth: 2,
                  borderRadius: 16,
                  padding: 20,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <Text className="text-2xl font-bold text-primary mb-2">Admin</Text>
              <Text className="text-base text-muted">
                Manage platform and verify professionals
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="items-center gap-2 mt-12">
            <Text className="text-sm text-muted">Emergency Helpline</Text>
            <Text className="text-lg font-bold text-primary">+91 74086 00050</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
