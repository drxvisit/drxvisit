import { View, Text, TextInput, Pressable, ScrollView, Modal } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { useState } from 'react';

interface BookAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function BookAppointmentModal({ visible, onClose, onSubmit }: BookAppointmentModalProps) {
  const colors = useColors();
  const [selectedType, setSelectedType] = useState<'clinic' | 'home' | 'video'>('clinic');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onSubmit({ type: selectedType, date, time, reason });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 'auto',
            maxHeight: '90%',
          }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View className="p-6 gap-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-2xl font-bold text-foreground">Book Appointment</Text>
                <Pressable onPress={onClose}>
                  <Text className="text-2xl text-muted">✕</Text>
                </Pressable>
              </View>

              {/* Appointment Type */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Type</Text>
                <View className="flex-row gap-2">
                  {(['clinic', 'home', 'video'] as const).map((type) => (
                    <Pressable
                      key={type}
                      onPress={() => setSelectedType(type)}
                      style={{
                        flex: 1,
                        backgroundColor: selectedType === type ? colors.primary : colors.surface,
                        borderColor: colors.border,
                        borderWidth: 1,
                        borderRadius: 8,
                        padding: 12,
                      }}
                    >
                      <Text
                        className={`text-center font-semibold text-sm ${
                          selectedType === type ? 'text-white' : 'text-foreground'
                        }`}
                      >
                        {type === 'clinic' ? 'Clinic' : type === 'home' ? 'Home' : 'Video'}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Date */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Date</Text>
                <TextInput
                  placeholder="Select date"
                  value={date}
                  onChangeText={setDate}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: 12,
                    color: colors.foreground,
                    backgroundColor: colors.surface,
                  }}
                />
              </View>

              {/* Time */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Time</Text>
                <TextInput
                  placeholder="Select time"
                  value={time}
                  onChangeText={setTime}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: 12,
                    color: colors.foreground,
                    backgroundColor: colors.surface,
                  }}
                />
              </View>

              {/* Reason */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-foreground">Reason for Visit</Text>
                <TextInput
                  placeholder="Describe your symptoms or reason"
                  value={reason}
                  onChangeText={setReason}
                  multiline
                  numberOfLines={4}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: 12,
                    color: colors.foreground,
                    backgroundColor: colors.surface,
                    textAlignVertical: 'top',
                  }}
                />
              </View>

              {/* Buttons */}
              <View className="flex-row gap-3 mt-4">
                <Pressable
                  onPress={onClose}
                  style={{ flex: 1 }}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                      padding: 14,
                    }}
                  >
                    <Text className="text-foreground font-bold text-center">Cancel</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={handleSubmit}
                  style={{ flex: 1 }}
                >
                  <View style={{ backgroundColor: colors.primary, borderRadius: 8, padding: 14 }}>
                    <Text className="text-white font-bold text-center">Book Now</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
