import { View, Text, FlatList, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

const services = [
  { id: '1', name: 'Lab Tests', icon: '🧪', description: 'Get lab tests done at home' },
  { id: '2', name: 'Medicine Delivery', icon: '💊', description: 'Medicines delivered to your door' },
  { id: '3', name: 'Ambulance', icon: '🚑', description: 'Emergency ambulance service' },
  { id: '4', name: 'Physiotherapy', icon: '🏃', description: 'Home physiotherapy sessions' },
  { id: '5', name: 'Home Nursing', icon: '👩‍⚕️', description: 'Professional nursing care at home' },
  { id: '6', name: 'Medical Equipment', icon: '🩺', description: 'Rent medical equipment' },
];

export default function HealthcareServicesScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="p-4">
      <View className="gap-4 flex-1">
        <Text className="text-2xl font-bold text-foreground">Healthcare Services</Text>
        <Text className="text-sm text-muted">Explore additional healthcare services</Text>

        <FlatList
          data={services}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                {
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: 'center',
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text className="text-4xl mb-2">{item.icon}</Text>
              <Text className="text-sm font-semibold text-foreground text-center">{item.name}</Text>
              <Text className="text-xs text-muted text-center mt-1">{item.description}</Text>
            </Pressable>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScreenContainer>
  );
}
