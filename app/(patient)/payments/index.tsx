import { View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

const transactions = [
  { id: '1', type: 'appointment', description: 'Dr. Rajesh Kumar - Consultation', amount: 500, date: '2024-07-10', status: 'completed' },
  { id: '2', type: 'refund', description: 'Cancelled Appointment Refund', amount: 300, date: '2024-07-08', status: 'completed' },
  { id: '3', type: 'wallet', description: 'Wallet Top-up', amount: 1000, date: '2024-07-05', status: 'completed' },
];

export default function PaymentsScreen() {
  const colors = useColors();

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Wallet Balance */}
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              padding: 24,
            }}
          >
            <Text className="text-white text-sm mb-2">Wallet Balance</Text>
            <Text className="text-white text-4xl font-bold mb-4">₹500</Text>
            <Pressable
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 8,
                paddingVertical: 10,
              }}
            >
              <Text className="text-white font-semibold text-center">Add Money</Text>
            </Pressable>
          </View>

          {/* Payment Methods */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Payment Methods</Text>
            <Pressable
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
              }}
            >
              <Text className="text-foreground font-semibold">💳 Credit/Debit Card</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
              }}
            >
              <Text className="text-foreground font-semibold">📱 UPI</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
              }}
            >
              <Text className="text-foreground font-semibold">🏦 Net Banking</Text>
            </Pressable>
          </View>

          {/* Transaction History */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Transaction History</Text>
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                  }}
                >
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">{item.description}</Text>
                      <Text className="text-xs text-muted mt-1">{item.date}</Text>
                    </View>
                    <Text className="text-sm font-bold text-foreground">₹{item.amount}</Text>
                  </View>
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
