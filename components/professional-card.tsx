import { View, Text, Pressable } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface ProfessionalCardProps {
  id: string;
  name: string;
  category: string;
  experience: string;
  rating: number;
  reviews: number;
  fee: number;
  onPress?: () => void;
}

export function ProfessionalCard({
  name,
  category,
  experience,
  rating,
  reviews,
  fee,
  onPress,
}: ProfessionalCardProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View className="gap-2">
        <Text className="text-lg font-semibold text-foreground">{name}</Text>
        <Text className="text-sm text-muted">{category} • {experience} years</Text>
        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row items-center gap-1">
            <Text className="text-sm font-semibold text-primary">★ {rating}</Text>
            <Text className="text-xs text-muted">({reviews} reviews)</Text>
          </View>
          <Text className="text-lg font-bold text-primary">₹{fee}</Text>
        </View>
      </View>
    </Pressable>
  );
}
