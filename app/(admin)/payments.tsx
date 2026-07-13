import { View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';

export default function PaymentsScreen() {
  return (
    <ScreenContainer className="p-4">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-foreground">Payments Management</Text>
      </View>
    </ScreenContainer>
  );
}
