import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useState } from 'react';
import { BookAppointmentModal } from '../modals/book-appointment';

export default function ProfessionalDetailScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock professional data
  const professional = {
    id,
    name: 'Dr. Rajesh Kumar',
    category: 'General Practitioner',
    experience: '12 years',
    rating: 4.8,
    reviews: 245,
    fee: 500,
    about: 'Experienced general practitioner with expertise in preventive care and chronic disease management.',
    qualifications: ['MBBS', 'MD (Internal Medicine)'],
    languages: ['English', 'Hindi', 'Marathi'],
    availability: ['Monday - Friday: 9 AM - 6 PM', 'Saturday: 10 AM - 2 PM'],
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <Pressable onPress={() => router.back()}>
            <Text className="text-primary font-semibold">← Back</Text>
          </Pressable>

          {/* Professional Info */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">{professional.name}</Text>
            <Text className="text-lg text-muted">{professional.category}</Text>
            <View className="flex-row items-center gap-2 mt-2">
              <Text className="text-lg font-bold text-primary">★ {professional.rating}</Text>
              <Text className="text-sm text-muted">({professional.reviews} reviews)</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
              <Text className="text-sm text-muted mb-1">Experience</Text>
              <Text className="text-lg font-bold text-foreground">{professional.experience}</Text>
            </View>
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border">
              <Text className="text-sm text-muted mb-1">Consultation Fee</Text>
              <Text className="text-lg font-bold text-primary">₹{professional.fee}</Text>
            </View>
          </View>

          {/* About */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">About</Text>
            <Text className="text-sm text-muted leading-relaxed">{professional.about}</Text>
          </View>

          {/* Qualifications */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Qualifications</Text>
            {professional.qualifications.map((qual, idx) => (
              <View key={idx} className="flex-row items-center gap-2">
                <Text className="text-primary">✓</Text>
                <Text className="text-sm text-foreground">{qual}</Text>
              </View>
            ))}
          </View>

          {/* Languages */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Languages</Text>
            <Text className="text-sm text-muted">{professional.languages.join(', ')}</Text>
          </View>

          {/* Availability */}
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">Availability</Text>
            {professional.availability.map((slot, idx) => (
              <Text key={idx} className="text-sm text-muted">
                {slot}
              </Text>
            ))}
          </View>

          {/* Book Button */}
          <Pressable
            onPress={() => setShowBookingModal(true)}
            style={({ pressed }) => [
              {
                backgroundColor: colors.primary,
                borderRadius: 8,
                padding: 16,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <Text className="text-white font-bold text-center text-lg">Book Appointment</Text>
          </Pressable>
        </View>
      </ScrollView>

      <BookAppointmentModal
        visible={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onSubmit={(data) => {
          console.log('Booking:', data);
          setShowBookingModal(false);
        }}
      />
    </ScreenContainer>
  );
}
