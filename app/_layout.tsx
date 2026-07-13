import { Stack } from 'expo-router';
import { ThemeProvider } from '@/lib/theme-provider';
import { AuthProvider } from '@/lib/auth-context';
import { useAuth } from '@/lib/auth-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function RootLayoutNav() {
  const { isSignedIn, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <Stack>
        <Stack.Screen
          name="splash"
          options={{ headerShown: false }}
        />
      </Stack>
    );
  }

  return (
    <Stack>
      {isSignedIn ? (
        <>
          {/* Patient Stack */}
          {user?.role === 'patient' && (
            <Stack.Screen
              name="(patient)"
              options={{ headerShown: false }}
            />
          )}
          {/* Professional Stack */}
          {user?.role === 'professional' && (
            <Stack.Screen
              name="(professional)"
              options={{ headerShown: false }}
            />
          )}
          {/* Admin Stack */}
          {user?.role === 'admin' && (
            <Stack.Screen
              name="(admin)"
              options={{ headerShown: false }}
            />
          )}
        </>
      ) : (
        <>
          {/* Auth Stack */}
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
