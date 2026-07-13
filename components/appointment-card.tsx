import { View, Text, Pressable } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface AppointmentCardProps {
  id: string;
  professionalName: string;
  date: string;
  time: string;
  type: 'clinic' | 'home' | 'video';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  onPress?: () => void;
}

export function AppointmentCard({
  professionalName,
  date,
  time,
  type,
  status,
  onPress,
}: AppointmentCardProps) {
  const colors = useColors();

  const statusColors = {
    confirmed: { bg: 'bg-success/10', text: 'text-success' },
    pending: { bg: 'bg-warning/10', text: 'text-warning' },
    completed: { bg: 'bg-muted/10', text: 'text-muted' },
    cancelled: { bg: 'bg-error/10', text: 'text-error' },
  };

  const typeLabels = {
    clinic: 'Clinic Visit',
    home: 'Home Visit',
    video: 'Video Consultation',
  };

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
        <View className="flex-row justify-between items-start">
          <Text className="text-lg font-semibold text-foreground flex-1">{professionalName}</Text>
          <View className={`px-2 py-1 rounded ${statusColors[status].bg}`}>
            <Text className={`text-xs font-semibold ${statusColors[status].text}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </View>
        </View>
        <Text className="text-sm text-muted">{typeLabels[type]}</Text>
        <View className="flex-row gap-4">
          <Text className="text-sm font-medium text-foreground">{date}</Text>
          <Text className="text-sm font-medium text-foreground">{time}</Text>
        </View>
      </View>
    </Pressable>
  );
}
