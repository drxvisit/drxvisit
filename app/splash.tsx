import { View, Text, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

export default function SplashScreen() {
  const colors = useColors();

  return (
    <ScreenContainer containerClassName="bg-background" edges={['top', 'bottom', 'left', 'right']}>
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-4xl font-bold text-primary">DrxVisit</Text>
        <Text className="text-lg text-muted">Connecting Patients with Trusted Healthcare Professionals</Text>
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      </View>
    </ScreenContainer>
  );
}
