import { View, Text, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'patient' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'patient' },
  { id: '3', name: 'Dr. Kumar', email: 'kumar@example.com', role: 'professional' },
];

export default function UsersScreen() {
  return (
    <ScreenContainer className="p-4">
      <View className="gap-4">
        <Text className="text-2xl font-bold text-foreground">Users Management</Text>
        <FlatList
          data={mockUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-surface rounded-lg p-4 border border-border mb-3">
              <Text className="text-lg font-semibold text-foreground">{item.name}</Text>
              <Text className="text-sm text-muted">{item.email}</Text>
              <Text className="text-xs text-primary mt-1">{item.role}</Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScreenContainer>
  );
}
