import { View, Text, Pressable, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

const mockQueue = [
  { id: '1', name: 'Dr. Vikram Singh', category: 'Doctor', submittedDate: '2 days ago' },
  { id: '2', name: 'Neha Gupta', category: 'Dentist', submittedDate: '1 day ago' },
];

export default function VerificationScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="p-4">
      <View className="gap-4">
        <Text className="text-2xl font-bold text-foreground">Verification Queue</Text>
        <FlatList
          data={mockQueue}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-surface rounded-lg p-4 border border-border mb-3">
              <Text className="text-lg font-semibold text-foreground mb-1">{item.name}</Text>
              <Text className="text-sm text-muted mb-3">{item.category} • {item.submittedDate}</Text>
              <View className="flex-row gap-2">
                <Pressable className="flex-1" style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
                  <View style={{ backgroundColor: colors.success, borderRadius: 6, padding: 10 }}>
                    <Text className="text-white font-semibold text-center text-sm">Approve</Text>
                  </View>
                </Pressable>
                <Pressable className="flex-1" style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
                  <View style={{ backgroundColor: colors.error, borderRadius: 6, padding: 10 }}>
                    <Text className="text-white font-semibold text-center text-sm">Reject</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScreenContainer>
  );
}
