import { View, Text, FlatList, Pressable, SearchBar, TextInput } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useState } from 'react';
import { ProfessionalCard } from '@/components/professional-card';

const mockProfessionals = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    category: 'General Practitioner',
    experience: '12',
    rating: 4.8,
    reviews: 245,
    fee: 500,
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    category: 'Cardiologist',
    experience: '8',
    rating: 4.9,
    reviews: 189,
    fee: 1000,
  },
  {
    id: '3',
    name: 'Dr. Amit Patel',
    category: 'Dermatologist',
    experience: '10',
    rating: 4.7,
    reviews: 156,
    fee: 600,
  },
];

export default function BookingScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Doctor', 'Nurse', 'Physiotherapist', 'Dentist'];

  return (
    <ScreenContainer className="p-4">
      <View className="gap-4 flex-1">
        <Text className="text-2xl font-bold text-foreground">Find a Professional</Text>

        {/* Search */}
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 12,
            backgroundColor: colors.surface,
          }}
        >
          <TextInput
            placeholder="Search by name or specialty"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              color: colors.foreground,
              paddingVertical: 10,
            }}
            placeholderTextColor={colors.muted}
          />
        </View>

        {/* Category Filter */}
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedCategory(item)}
              style={({ pressed }) => [
                {
                  backgroundColor: selectedCategory === item ? colors.primary : colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  marginRight: 8,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text
                className={`font-semibold text-sm ${
                  selectedCategory === item ? 'text-white' : 'text-foreground'
                }`}
              >
                {item}
              </Text>
            </Pressable>
          )}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        />

        {/* Professionals List */}
        <FlatList
          data={mockProfessionals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProfessionalCard
              id={item.id}
              name={item.name}
              category={item.category}
              experience={item.experience}
              rating={item.rating}
              reviews={item.reviews}
              fee={item.fee}
              onPress={() => {
                // Navigate to professional detail
              }}
            />
          )}
          scrollEnabled={false}
        />
      </View>
    </ScreenContainer>
  );
}
