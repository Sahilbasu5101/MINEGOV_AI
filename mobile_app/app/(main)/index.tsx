import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { HeaderBar } from '../../src/components/HeaderBar';
import { MineGovBrand } from '../../src/components/MineGovBrand';
import { colors } from '../../src/constants/theme';

export default function MainScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [learnMoreVisible, setLearnMoreVisible] = useState(false);

  const handleLoginPress = () => {
    // Navigate to Login screen using Expo Router
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(16, insets.bottom + 12) }]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Government Header */}
        <HeaderBar />

        {/* Brand Mountain Logo & Title */}
        <MineGovBrand />

        {/* Section Header */}
        <View style={styles.terminalHeaderRow}>
          <View style={styles.terminalLine} />
          <Text style={styles.terminalTitle}>Field Reporting Terminal</Text>
          <View style={styles.terminalLine} />
        </View>

        <Text style={styles.pillarsTagline}>
          People   |   Compliance   |   Sustainable Mines
        </Text>

        <Text style={styles.terminalSubtitle}>
          Digitizing field inspections for a safer, cleaner{'\n'}and more responsible mining future.
        </Text>

        {/* Hero Illustration */}
        <View style={styles.heroWrapper}>
          <Image
            source={require('../../assets/images/main_hero.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* 4 Value Pillars Card */}
        <View style={styles.pillarsCard}>
          <View style={styles.pillarColumn}>
            <Image
              source={require('../../assets/icons/pillar_helmet.png')}
              style={styles.pillarIcon}
              resizeMode="contain"
            />
            <Text style={styles.pillarTitle}>Safer{'\n'}Workplaces</Text>
            <Text style={styles.pillarDesc}>Prevent risks{'\n'}Save lives</Text>
          </View>

          <View style={styles.pillarDivider} />

          <View style={styles.pillarColumn}>
            <Image
              source={require('../../assets/icons/pillar_leaf.png')}
              style={styles.pillarIcon}
              resizeMode="contain"
            />
            <Text style={styles.pillarTitle}>Cleaner{'\n'}Environment</Text>
            <Text style={styles.pillarDesc}>Monitor{'\n'}for a better tomorrow</Text>
          </View>

          <View style={styles.pillarDivider} />

          <View style={styles.pillarColumn}>
            <Image
              source={require('../../assets/icons/pillar_chart.png')}
              style={styles.pillarIcon}
              resizeMode="contain"
            />
            <Text style={styles.pillarTitle}>Better{'\n'}Compliance</Text>
            <Text style={styles.pillarDesc}>Data driven{'\n'}governance</Text>
          </View>

          <View style={styles.pillarDivider} />

          <View style={styles.pillarColumn}>
            <Image
              source={require('../../assets/icons/pillar_community.png')}
              style={styles.pillarIcon}
              resizeMode="contain"
            />
            <Text style={styles.pillarTitle}>Stronger{'\n'}Communities</Text>
            <Text style={styles.pillarDesc}>People at the{'\n'}heart of progress</Text>
          </View>
        </View>

        {/* Action Controls */}
        <View style={styles.actionContainer}>
          {/* Primary Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel="Login to Field Reporting Terminal"
          >
            <View style={styles.loginButtonContent}>
              <Image
                source={require('../../assets/icons/btn_login_door.png')}
                style={styles.doorIcon}
                resizeMode="contain"
              />
              <Text style={styles.loginButtonText}>Login</Text>
              <Text style={styles.chevronRight}>›</Text>
            </View>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          {/* Secondary Learn More Button */}
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => setLearnMoreVisible(true)}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Learn More about MineGov AI"
          >
            <View style={styles.learnMoreContent}>
              <Text style={styles.infoCircleIcon}>ⓘ</Text>
              <Text style={styles.learnMoreText}>Learn More</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Landscape Illustration */}
        <View style={styles.footerWrapper}>
          <Image
            source={require('../../assets/images/main_footer.png')}
            style={styles.footerImage}
            resizeMode="contain"
          />
        </View>

        {/* Learn More Information Modal */}
        <Modal
          visible={learnMoreVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setLearnMoreVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setLearnMoreVisible(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeaderIndicator} />
              <Text style={styles.modalTitle}>About MineGov AI</Text>
              <Text style={styles.modalText}>
                MineGov AI is the Ministry of Coal's next-generation field reporting terminal.
                It empowers field statutory personnel (Sirdar, Safety Inspectors, Technical
                Competent Persons, Environment Officers, Production Officers, and Welfare Officers)
                to report observations, capture authentic offline GPS-stamped evidence, and digitize
                statutory compliance across Indian mines.
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setLearnMoreVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FBFF',
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
  pillarsTagline: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.navy,
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: -0.2,
  },
  terminalSubtitle: {
    fontSize: 11.5,
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 4,
    paddingHorizontal: 24,
  },
  heroWrapper: {
    width: '100%',
    height: 195,
    marginTop: 10,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  pillarsCard: {
    marginHorizontal: 12,
    marginTop: -8,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E1EDFA',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 4,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  pillarColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  pillarDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E8F1FA',
    alignSelf: 'center',
  },
  pillarIcon: {
    width: 38,
    height: 38,
    marginBottom: 6,
  },
  pillarTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: colors.navy,
    textAlign: 'center',
    lineHeight: 13,
    marginBottom: 3,
  },
  pillarDesc: {
    fontSize: 8.5,
    color: '#5C7AA6',
    textAlign: 'center',
    lineHeight: 11,
  },
  actionContainer: {
    marginTop: 14,
    paddingHorizontal: 16,
  },
  loginButton: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 4,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24,
  },
  doorIcon: {
    width: 22,
    height: 20,
    tintColor: '#FFFFFF',
  },
  loginButtonText: {
    fontSize: 17,
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
    marginVertical: 10,
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
  learnMoreButton: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.blue,
    borderRadius: 999,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  learnMoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCircleIcon: {
    fontSize: 16,
    color: colors.blue,
    marginRight: 8,
    fontWeight: '700',
  },
  learnMoreText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.blue,
  },
  footerWrapper: {
    width: '100%',
    height: 110,
    marginTop: 6,
  },
  footerImage: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 17, 91, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalHeaderIndicator: {
    width: 44,
    height: 4,
    backgroundColor: '#D1E2F7',
    borderRadius: 2,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 12,
  },
  modalText: {
    fontSize: 13.5,
    color: colors.textMuted,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: colors.blue,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
