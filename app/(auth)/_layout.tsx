import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="user-type" />
      <Stack.Screen name="patient-login" />
      <Stack.Screen name="patient-register" />
      <Stack.Screen name="professional-login" />
      <Stack.Screen name="professional-register" />
      <Stack.Screen name="admin-login" />
    </Stack>
  );
}
