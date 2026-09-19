import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { HeaderBar } from '../../src/components/HeaderBar';
import { MineGovBrand } from '../../src/components/MineGovBrand';
import { colors } from '../../src/constants/theme';
import { useAuth } from '../../src/context/auth-context';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const insets = useSafeAreaInsets();

  const [employeeId, setEmployeeId] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!employeeId.trim()) {
      Alert.alert('Required', 'Please enter your Employee ID (e.g. TEST-SIR-001).');
      return;
    }
    if (!pin.trim()) {
      Alert.alert('Required', 'Please enter your PIN.');
      return;
    }

    try {
      setLoading(true);
      const session = await signIn(employeeId.trim(), pin.trim());
      if (session.user.role === 'SIRDAR') {
        router.replace('/safety/sirdar');
      } else {
        Alert.alert('Success', `Welcome to MineGov AI Field Terminal!`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials';
      Alert.alert('Login Notice', message);
    } finally {
      setLoading(false);
    }
  };

  const handleQrLogin = () => {
    Alert.alert(
      'QR Code Login',
      'Point your camera at your statutory MineGov AI badge QR code to authenticate in the field.'
    );
  };

  const handleForgotPin = () => {
    Alert.alert(
      'Forgot PIN',
      'Please contact your Mine Safety Officer or IT Administrator to reset your field terminal PIN.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(24, insets.bottom + 16) }]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Government Header */}
          <HeaderBar />

          {/* Brand Mountain Logo & Title */}
          <MineGovBrand />

          {/* Terminal Subheader */}
          <View style={styles.terminalHeaderRow}>
            <View style={styles.terminalLine} />
            <Text style={styles.terminalTitle}>Field Reporting Terminal</Text>
            <View style={styles.terminalLine} />
          </View>

          <Text style={styles.terminalSubtitle}>
            Secure Access for a Safer, Cleaner{'\n'}and More Responsible Mining Future
          </Text>

          {/* Login Card */}
          <View style={styles.loginCard}>
            <Text style={styles.cardTitle}>Login to Continue</Text>
            <Text style={styles.cardSubtitle}>
              Enter your employee credentials to access the field reporting terminal.
            </Text>

            {/* Input 1: Employee ID */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIconBox}>
                <Image
                  source={require('../../assets/icons/input_user.png')}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Employee ID"
                placeholderTextColor="#7D98C4"
                value={employeeId}
                onChangeText={setEmployeeId}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>
            <Text style={styles.helperText}>Enter your valid Employee ID</Text>

            {/* Input 2: PIN */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIconBox}>
                <Image
                  source={require('../../assets/icons/input_lock.png')}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="PIN"
                placeholderTextColor="#7D98C4"
                value={pin}
                onChangeText={setPin}
                secureTextEntry={!showPin}
                keyboardType="numeric"
                maxLength={6}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPin(!showPin)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                <Image
                  source={
                    showPin
                      ? require('../../assets/icons/input_eye_off.png')
                      : require('../../assets/icons/input_eye.png')
                  }
                  style={styles.eyeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Helper Row: PIN helper & Forgot PIN */}
            <View style={styles.pinHelperRow}>
              <Text style={styles.helperText}>Enter your 4/6 digit PIN</Text>
              <TouchableOpacity
                onPress={handleForgotPin}
                activeOpacity={0.7}
                accessibilityRole="button"
              >
                <Text style={styles.forgotPinText}>Forgot PIN?</Text>
              </TouchableOpacity>
            </View>

            {/* Primary Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.88}
              accessibilityRole="button"
              accessibilityLabel="Login"
            >
              <View style={styles.loginButtonContent}>
                <Image
                  source={require('../../assets/icons/btn_login_door.png')}
                  style={styles.doorIcon}
                  resizeMode="contain"
                />
                <Text style={styles.loginButtonText}>
                  {loading ? 'Logging in...' : 'Login'}
                </Text>
                <Text style={styles.chevronRight}>›</Text>
              </View>
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>

            {/* Secondary Login with QR Code Button */}
            <TouchableOpacity
              style={styles.qrButton}
              onPress={handleQrLogin}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Login with QR Code"
            >
              <View style={styles.qrButtonContent}>
                <Image
                  source={require('../../assets/icons/btn_qr.png')}
                  style={styles.qrIcon}
                  resizeMode="contain"
                />
                <Text style={styles.qrButtonText}>Login with QR Code</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 4 Security Feature Pillars Row */}
          <View style={styles.securityPillarsRow}>
            <View style={styles.secColumn}>
              <Image
                source={require('../../assets/icons/sec_shield.png')}
                style={styles.secIcon}
                resizeMode="contain"
              />
              <Text style={styles.secTitle}>Secure{'\n'}Access</Text>
            </View>

            <View style={styles.secDivider} />

            <View style={styles.secColumn}>
              <Image
                source={require('../../assets/icons/sec_dashboard.png')}
                style={styles.secIcon}
                resizeMode="contain"
              />
              <Text style={styles.secTitle}>Role Based{'\n'}Dashboards</Text>
            </View>

            <View style={styles.secDivider} />

            <View style={styles.secColumn}>
              <Image
                source={require('../../assets/icons/sec_cloud.png')}
                style={styles.secIcon}
                resizeMode="contain"
              />
              <Text style={styles.secTitle}>Works{'\n'}Online & Offline</Text>
            </View>

            <View style={styles.secDivider} />

            <View style={styles.secColumn}>
              <Image
                source={require('../../assets/icons/sec_tomorrow.png')}
                style={styles.secIcon}
                resizeMode="contain"
              />
              <Text style={styles.secTitle}>For a Safer{'\n'}Tomorrow</Text>
            </View>
          </View>

          {/* Bottom Quarry Landscape Illustration */}
          <View style={styles.footerWrapper}>
            <Image
              source={require('../../assets/images/login_footer.png')}
              style={styles.footerImage}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 8,
    backgroundColor: '#F7FBFF',
  },
  terminalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    paddingHorizontal: 32,
  },
  terminalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#B5CEEC',
    maxWidth: 48,
  },
  terminalTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.navy,
    marginHorizontal: 10,
    letterSpacing: -0.2,
  },
  terminalSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 5,
    paddingHorizontal: 24,
  },
  loginCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 20,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: colors.navy,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 17,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C9DCF5',
    backgroundColor: '#F2F7FE',
    overflow: 'hidden',
  },
  inputIconBox: {
    width: 44,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#C9DCF5',
  },
  inputIcon: {
    width: 20,
    height: 20,
    tintColor: '#23447F',
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 14.5,
    color: colors.navy,
    fontWeight: '500',
  },
  eyeButton: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 22,
    height: 16,
    tintColor: '#23447F',
  },
  helperText: {
    fontSize: 10.5,
    color: '#6786B6',
    marginTop: 4,
    marginBottom: 10,
    marginLeft: 2,
  },
  pinHelperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  forgotPinText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.blue,
  },
  loginButton: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.65,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 22,
  },
  doorIcon: {
    width: 22,
    height: 20,
    tintColor: '#FFFFFF',
  },
  loginButtonText: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  chevronRight: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1E2F7',
    maxWidth: 90,
  },
  orText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6585B5',
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },
  qrButton: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.blue,
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  qrButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.blue,
  },
  securityPillarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 14,
    paddingVertical: 6,
  },
  secColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  secDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E0ECF9',
  },
  secIcon: {
    width: 36,
    height: 36,
    marginBottom: 6,
  },
  secTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.navy,
    textAlign: 'center',
    lineHeight: 13,
  },
  footerWrapper: {
    width: '100%',
    height: 135,
    marginTop: 8,
  },
  footerImage: {
    width: '100%',
    height: '100%',
  },
});
