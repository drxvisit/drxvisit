import { View, Text } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function StatCard({ label, value, subtext, variant = 'default' }: StatCardProps) {
  const colors = useColors();

  const variantColors = {
    default: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  };

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        flex: 1,
      }}
    >
      <Text className="text-sm text-muted mb-1">{label}</Text>
      <Text className="text-3xl font-bold mb-1" style={{ color: variantColors[variant] }}>
        {value}
      </Text>
      {subtext && <Text className="text-xs text-muted">{subtext}</Text>}
    </View>
  );
}
