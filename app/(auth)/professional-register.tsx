import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

export default function ProfessionalRegisterScreen() {
  const router = useRouter();
  const colors = useColors();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between py-8">
          {/* Header */}
          <View className="items-center gap-2 mb-8">
            <Text className="text-4xl font-bold text-primary">Professional Registration</Text>
            <Text className="text-base text-muted text-center">Join DrxVisit as a healthcare professional</Text>
          </View>

          {/* Placeholder Content */}
          <View className="gap-4">
            <View className="bg-surface rounded-lg p-6 border border-border">
              <Text className="text-lg font-semibold text-foreground mb-2">Multi-Step Registration</Text>
              <Text className="text-sm text-muted mb-4">This is a comprehensive registration form that includes:</Text>
              <View className="gap-2">
                <Text className="text-sm text-muted">• Personal Information</Text>
                <Text className="text-sm text-muted">• Document Uploads (Aadhaar, PAN, License)</Text>
                <Text className="text-sm text-muted">• Qualifications & Certificates</Text>
                <Text className="text-sm text-muted">• Clinic Details</Text>
                <Text className="text-sm text-muted">• Fees & Availability</Text>
                <Text className="text-sm text-muted">• Admin Verification</Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="items-center gap-2">
            <Text className="text-sm text-muted">Already registered?</Text>
            <Pressable onPress={() => router.push('./professional-login')}>
              <Text className="text-primary font-semibold">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
