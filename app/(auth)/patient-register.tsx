import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { validateEmail, validatePassword, validatePhone, validateName } from '@/lib/utils/validation';

export default function PatientRegisterScreen() {
  const router = useRouter();
  const colors = useColors();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    setError('');

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateName(formData.name)) {
      setError('Name must be between 2 and 100 characters');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      await register(formData.email, formData.password, formData.name, formData.phone, 'patient');
      router.replace('/(patient)');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6 py-4">
          {/* Falco Mascot */}
          <View className="items-center">
            <Image
              source={require('@/assets/images/falco-welcome.png')}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View className="gap-2 items-center">
            <Text className="text-3xl font-bold text-primary">Create Account</Text>
            <Text className="text-base text-muted text-center">Join DrxVisit as a patient</Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View
              style={{
                backgroundColor: colors.error + '20',
                borderColor: colors.error,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
              }}
            >
              <Text className="text-sm text-error">{error}</Text>
            </View>
          ) : null}

          {/* Form */}
          <View className="gap-4">
            {/* Name Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Full Name</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  backgroundColor: colors.surface,
                }}
              >
                <TextInput
                  placeholder="Your full name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  editable={!loading}
                  style={{
                    color: colors.foreground,
                    fontSize: 16,
                  }}
                  placeholderTextColor={colors.muted}
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Email Address</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  backgroundColor: colors.surface,
                }}
              >
                <TextInput
                  placeholder="your@email.com"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  editable={!loading}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{
                    color: colors.foreground,
                    fontSize: 16,
                  }}
                  placeholderTextColor={colors.muted}
                />
              </View>
            </View>

            {/* Phone Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Phone Number</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  backgroundColor: colors.surface,
                }}
              >
                <TextInput
                  placeholder="10-digit phone number"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text.replace(/\D/g, '').slice(0, 10) })}
                  editable={!loading}
                  keyboardType="phone-pad"
                  maxLength={10}
                  style={{
                    color: colors.foreground,
                    fontSize: 16,
                  }}
                  placeholderTextColor={colors.muted}
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Password</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  backgroundColor: colors.surface,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  editable={!loading}
                  secureTextEntry={!showPassword}
                  style={{
                    color: colors.foreground,
                    fontSize: 16,
                    flex: 1,
                  }}
                  placeholderTextColor={colors.muted}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ padding: 8 }}
                >
                  <Text className="text-primary text-lg">{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </Pressable>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Confirm Password</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  backgroundColor: colors.surface,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  editable={!loading}
                  secureTextEntry={!showConfirmPassword}
                  style={{
                    color: colors.foreground,
                    fontSize: 16,
                    flex: 1,
                  }}
                  placeholderTextColor={colors.muted}
                />
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ padding: 8 }}
                >
                  <Text className="text-primary text-lg">{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Register Button */}
          <Pressable
            onPress={handleRegister}
            disabled={loading}
            style={({ pressed }) => [
              {
                backgroundColor: colors.primary,
                borderRadius: 8,
                padding: 14,
                opacity: pressed || loading ? 0.8 : 1,
                transform: [{ scale: pressed || loading ? 0.97 : 1 }],
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-center text-lg">Create Account</Text>
            )}
          </Pressable>

          {/* Sign In Link */}
          <View className="flex-row justify-center gap-1">
            <Text className="text-base text-muted">Already have an account?</Text>
            <Pressable onPress={() => router.push('/(auth)/patient-login')}>
              <Text className="text-base text-primary font-semibold">Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
