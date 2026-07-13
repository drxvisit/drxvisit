import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';

export default function PatientRegisterScreen() {
  const router = useRouter();
  const colors = useColors();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await register({
        name,
        email,
        phone,
        role: 'patient',
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('../(patient)');
    } catch (err) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-between py-8">
          {/* Header */}
          <View className="items-center gap-2 mb-8">
            <Text className="text-4xl font-bold text-primary">Create Account</Text>
            <Text className="text-base text-muted text-center">Join DrxVisit as a patient</Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            {/* Name Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Full Name</Text>
              <TextInput
                placeholder="John Doe"
                placeholderTextColor={colors.muted}
                value={name}
                onChangeText={setName}
                editable={!isLoading}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: colors.foreground,
                  backgroundColor: colors.surface,
                }}
              />
            </View>

            {/* Email Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Email Address</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: colors.foreground,
                  backgroundColor: colors.surface,
                }}
              />
            </View>

            {/* Phone Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Phone Number</Text>
              <TextInput
                placeholder="+91 98765 43210"
                placeholderTextColor={colors.muted}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                editable={!isLoading}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: colors.foreground,
                  backgroundColor: colors.surface,
                }}
              />
            </View>

            {/* Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Password</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: colors.foreground,
                  backgroundColor: colors.surface,
                }}
              />
            </View>

            {/* Confirm Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Confirm Password</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor={colors.muted}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!isLoading}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: colors.foreground,
                  backgroundColor: colors.surface,
                }}
              />
            </View>

            {/* Error Message */}
            {error ? (
              <View className="bg-error/10 border border-error rounded-lg p-3">
                <Text className="text-error text-sm">{error}</Text>
              </View>
            ) : null}

            {/* Register Button */}
            <Pressable
              onPress={handleRegister}
              disabled={isLoading}
              style={({ pressed }) => [{
                backgroundColor: colors.primary,
                borderRadius: 8,
                padding: 14,
                alignItems: 'center',
                opacity: isLoading ? 0.6 : pressed ? 0.9 : 1,
                transform: [{ scale: pressed && !isLoading ? 0.97 : 1 }],
              }]}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-base">Create Account</Text>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <View className="items-center gap-2">
            <Text className="text-sm text-muted">Already have an account?</Text>
            <Pressable
              onPress={() => router.push('./patient-login')}
              disabled={isLoading}
            >
              <Text className="text-primary font-semibold">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
