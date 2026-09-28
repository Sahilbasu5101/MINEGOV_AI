import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/context/auth-context';
import { TechnicalExaminationProvider } from '../src/context/technical-examination-context';
import { requireOptionalNativeModule } from 'expo';

const DevMenuPreferences = requireOptionalNativeModule('DevMenuPreferences');

export default function RootLayout() {
  useEffect(() => {
    try {
      DevMenuPreferences?.setPreferencesAsync?.({
        showFloatingActionButton: false,
      });
    } catch {
      // Ignored if not running in Expo Go / DevClient
    }
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TechnicalExaminationProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        </TechnicalExaminationProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
