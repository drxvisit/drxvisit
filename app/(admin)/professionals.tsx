import { View, Text, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';

const mockProfessionals = [
  { id: '1', name: 'Dr. Rajesh Kumar', category: 'Doctor', verified: true },
  { id: '2', name: 'Priya Sharma', category: 'Nurse', verified: true },
  { id: '3', name: 'Amit Patel', category: 'Physiotherapist', verified: false },
];

export default function ProfessionalsScreen() {
  return (
    <ScreenContainer className="p-4">
      <View className="gap-4">
        <Text className="text-2xl font-bold text-foreground">Professionals</Text>
        <FlatList
          data={mockProfessionals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-surface rounded-lg p-4 border border-border mb-3">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-foreground">{item.name}</Text>
                  <Text className="text-sm text-muted">{item.category}</Text>
                </View>
                <View className={`px-2 py-1 rounded ${item.verified ? 'bg-success/20' : 'bg-warning/20'}`}>
                  <Text className={`text-xs font-semibold ${item.verified ? 'text-success' : 'text-warning'}`}>
                    {item.verified ? 'Verified' : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScreenContainer>
  );
}
