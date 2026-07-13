import { View, Text, ScrollView } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

export default function AdminScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4 flex-1 justify-center items-center">
          <Text className="text-3xl font-bold text-primary">Bookings</Text>
          <Text className="text-base text-muted text-center">This feature will be available soon</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
