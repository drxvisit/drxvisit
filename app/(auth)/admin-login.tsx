import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { validateEmail, validatePassword } from '@/lib/utils/validation';

export default function AdminLoginScreen() {
  const router = useRouter();
  const colors = useColors();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      await login(email, password);
      router.replace('/(admin)');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-8 flex-1 justify-center">
          <View className="items-center">
            <Image
              source={require('@/assets/images/falco-welcome.png')}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
            />
          </View>

          <View className="gap-2 items-center">
            <Text className="text-3xl font-bold text-primary">Admin Portal</Text>
            <Text className="text-base text-muted text-center">Sign in to manage DrxVisit</Text>
          </View>

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

          <View className="gap-4">
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Admin Email</Text>
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
                  placeholder="admin@drxvisit.com"
                  value={email}
                  onChangeText={setEmail}
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
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
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
          </View>

          <Pressable
            onPress={handleLogin}
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
              <Text className="text-white font-bold text-center text-lg">Sign In</Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text className="text-center text-primary text-sm">← Back to User Type</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
