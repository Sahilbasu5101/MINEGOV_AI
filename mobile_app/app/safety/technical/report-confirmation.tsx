import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/constants/theme';
import { useAuth } from '../../../src/context/auth-context';
import {
  DocLinesIcon,
  CalendarIcon,
  UserCircleIcon,
  BuildingIcon,
  InfoCircleIcon,
  LightbulbIcon,
  HomeTabIcon,
  ChecksTabIcon,
  DocumentsTabIcon,
  BellTabIcon,
  ProfileTabIcon,
} from '../../../src/components/icons/TechnicalIcons';

type TabKey = 'home' | 'checks' | 'documents' | 'profile';

export default function ReportConfirmationScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const bottomInset =
    insets.bottom > 0
      ? insets.bottom
      : Platform.OS === 'android'
      ? 12
      : 8;

  // Authoritative data from Technical flow Screens 4–8
  const equipmentTitle = 'Dumper / Haul Truck';
  const assetId = 'DT-105';
  const makeModel = 'Komatsu HD785';
  const mineSite = 'Kusunda Coal Mine';
  const workingArea = 'Working Face - 1';

  const reportId = 'ME-2026-00125';
  const submittedOn = '11 Sep 2026, 10:32 AM';
  const submittedBy = session?.user.name || 'Amit Kumar (E0012)';
  const department = 'Technical Department';

  const handleBackToDashboard = () => {
    router.replace('/safety/technical');
  };

  const handleViewReport = () => {
    Alert.alert(
      `Report: ${reportId}`,
      `Equipment: ${equipmentTitle} (${assetId})\nMake & Model: ${makeModel}\nMine: ${mineSite}\nWorking Area: ${workingArea}\nStatus: Submitted\nSubmitted By: ${submittedBy}\nDate: ${submittedOn}\n\nSummary: Minor hydraulic hose leakage observed near left rear wheel. Otherwise in good working condition.`,
      [
        {
          text: 'Close',
          style: 'cancel',
        },
        {
          text: 'Back to Dashboard',
          onPress: handleBackToDashboard,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* 1. MineGov AI Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <Image
            source={require('../../../assets/images/mountain_logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View style={styles.brandTextCol}>
            <View style={styles.brandTextRow}>
              <Text style={styles.brandNavy}>MineGov</Text>
              <Text style={styles.brandBlue}> AI</Text>
            </View>
            <Text style={styles.brandTagline}>Safer Mines • Smarter Tomorrow</Text>
          </View>
        </View>

        <View style={styles.headerRightActions}>
          <Pressable
            style={({ pressed }) => [styles.bellButton, pressed && styles.buttonPressed]}
            onPress={() => Alert.alert('Notifications', 'You have 3 unread notifications.')}
            accessibilityRole="button"
            accessibilityLabel="Notifications (3 unread)"
          >
            <BellTabIcon size={22} color="#006CFF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.avatarCircle, pressed && styles.buttonPressed]}
            onPress={() => router.push('/safety/technical/profile')}
            accessibilityRole="button"
            accessibilityLabel="User Profile"
          >
            <Text style={styles.avatarInitials}>SG</Text>
          </Pressable>
        </View>
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Success Section */}
        <View style={styles.successSection}>
          {/* Green Check Icon with Decorative Sparkles */}
          <View style={styles.checkIconWrapper}>
            {/* Celebration sparkles / accent dots */}
            <View style={[styles.sparkleDot, styles.sparkleTopLeft]} />
            <View style={[styles.sparkleDash, styles.sparkleTop]} />
            <View style={[styles.sparkleDot, styles.sparkleTopRight]} />
            <View style={[styles.sparkleDash, styles.sparkleRight]} />
            <View style={[styles.sparkleDot, styles.sparkleBottomRight]} />
            <View style={[styles.sparkleDot, styles.sparkleBottomLeft]} />
            <View style={[styles.sparkleDash, styles.sparkleLeft]} />

            {/* Central Green Circle */}
            <View style={styles.greenCircle}>
              <View style={styles.whiteCheckmark} />
            </View>
          </View>

          <Text style={styles.successTitle}>Report Submitted Successfully</Text>
          <Text style={styles.successSubtitle}>
            Your statutory equipment examination report has been submitted successfully.
          </Text>

          {/* Slogan Pill */}
          <View style={styles.sloganPill}>
            <Text style={styles.sloganPillText}>Thank you for contributing to safer mines.</Text>
          </View>
        </View>

        {/* 3. Equipment Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Equipment Details</Text>
            <View style={styles.statutoryBadge}>
              <Text style={styles.statutoryBadgeText}>Statutory Examination</Text>
            </View>
          </View>

          <View style={styles.equipmentRow}>
            <View style={styles.equipmentImageWrapper}>
              <Image
                source={require('../../../assets/images/technical/eq_dumper.png')}
                style={styles.equipmentImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.equipmentInfo}>
              <Text style={styles.equipmentNameText}>{equipmentTitle}</Text>

              <View style={styles.kvRow}>
                <Text style={styles.kvLabel}>Asset ID</Text>
                <Text style={styles.kvSeparator}>:</Text>
                <Text style={styles.kvValue}>{assetId}</Text>
              </View>

              <View style={styles.kvRow}>
                <Text style={styles.kvLabel}>Make & Model</Text>
                <Text style={styles.kvSeparator}>:</Text>
                <Text style={styles.kvValue}>{makeModel}</Text>
              </View>

              <View style={styles.kvRow}>
                <Text style={styles.kvLabel}>Mine / Site</Text>
                <Text style={styles.kvSeparator}>:</Text>
                <Text style={styles.kvValue}>{mineSite}</Text>
              </View>

              <View style={styles.kvRow}>
                <Text style={styles.kvLabel}>Working Area</Text>
                <Text style={styles.kvSeparator}>:</Text>
                <Text style={styles.kvValue}>{workingArea}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 4. Report Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Report Information</Text>

          <View style={styles.infoGrid}>
            {/* Col 1, Row 1: Report ID */}
            <View style={styles.infoGridItem}>
              <View style={styles.infoIconBox}>
                <DocLinesIcon size={20} color="#006CFF" />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Report ID</Text>
                <Text style={styles.infoValue}>{reportId}</Text>
              </View>
            </View>

            {/* Col 2, Row 1: Submitted On */}
            <View style={styles.infoGridItem}>
              <View style={styles.infoIconBox}>
                <CalendarIcon size={20} color="#006CFF" />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Submitted On</Text>
                <Text style={styles.infoValue}>{submittedOn}</Text>
              </View>
            </View>

            {/* Col 1, Row 2: Submitted By */}
            <View style={styles.infoGridItem}>
              <View style={styles.infoIconBox}>
                <UserCircleIcon size={20} color="#006CFF" />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Submitted By</Text>
                <Text style={styles.infoValue}>{submittedBy}</Text>
              </View>
            </View>

            {/* Col 2, Row 2: Department */}
            <View style={styles.infoGridItem}>
              <View style={styles.infoIconBox}>
                <BuildingIcon size={20} color="#006CFF" />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Department</Text>
                <Text style={styles.infoValue}>{department}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 5. Report Status Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Report Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Current Status: Submitted</Text>
            </View>
          </View>

          {/* Stepper Timeline */}
          <View style={styles.stepperContainer}>
            {/* Connecting Lines Background */}
            <View style={styles.stepperLinesWrapper}>
              {/* Segment 1: Submitted -> Under Review (half green, half gray) */}
              <View style={styles.stepperLineSegment}>
                <View style={[styles.stepperLineHalf, { backgroundColor: '#0B9E5A' }]} />
                <View style={[styles.stepperLineHalf, { backgroundColor: '#B8CBE4' }]} />
              </View>
              {/* Segment 2: Under Review -> Verified (gray) */}
              <View style={[styles.stepperLineSegment, { backgroundColor: '#B8CBE4' }]} />
              {/* Segment 3: Verified -> Closed (gray) */}
              <View style={[styles.stepperLineSegment, { backgroundColor: '#B8CBE4' }]} />
            </View>

            {/* 4 Steps */}
            <View style={styles.stepperStepsRow}>
              {/* Step 1: Submitted */}
              <View style={styles.stepItem}>
                <View style={styles.stepCircleActive}>
                  <View style={styles.stepWhiteCheck} />
                </View>
                <Text style={styles.stepTitleActive}>Submitted</Text>
                <Text style={styles.stepSubtext}>11 Sep 2026{'\n'}10:32 AM</Text>
              </View>

              {/* Step 2: Under Review */}
              <View style={styles.stepItem}>
                <View style={styles.stepCircleInactive}>
                  <View style={styles.stepInnerDot} />
                </View>
                <Text style={styles.stepTitle}>Under Review</Text>
                <Text style={styles.stepSubtext}>Pending{'\n'}verification</Text>
              </View>

              {/* Step 3: Verified */}
              <View style={styles.stepItem}>
                <View style={styles.stepCircleInactive}>
                  <View style={styles.stepInnerDot} />
                </View>
                <Text style={styles.stepTitle}>Verified</Text>
                <Text style={styles.stepSubtext}>By authorized{'\n'}officer</Text>
              </View>

              {/* Step 4: Closed */}
              <View style={styles.stepItem}>
                <View style={styles.stepCircleInactive}>
                  <View style={styles.stepInnerDot} />
                </View>
                <Text style={styles.stepTitle}>Closed</Text>
                <Text style={styles.stepSubtext}>Process{'\n'}completed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 6. What Happens Next Card */}
        <View style={styles.infoBannerCard}>
          <View style={styles.bannerIconWrapper}>
            <InfoCircleIcon size={24} color="#006CFF" />
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>What happens next?</Text>
            <Text style={styles.bannerBody}>
              Your report has been submitted to the system. It will be reviewed by the authorized
              officer. You can view the status anytime from your dashboard or in My Reports.
            </Text>
          </View>
        </View>

        {/* 7. Need to make a correction Card */}
        <View style={styles.correctionBannerCard}>
          <View style={styles.correctionIconWrapper}>
            <LightbulbIcon size={22} color="#E99000" />
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.correctionTitle}>Need to make a correction?</Text>
            <Text style={styles.correctionBody}>
              If you notice any mistake, please contact your department administrator.
            </Text>
          </View>
        </View>

        {/* 8. Bottom Actions */}
        <View style={styles.bottomActionsRow}>
          <Pressable
            style={({ pressed }) => [styles.viewReportButton, pressed && styles.buttonPressed]}
            onPress={handleViewReport}
            accessibilityRole="button"
            accessibilityLabel="View Report"
          >
            <View style={styles.buttonIconMargin}>
              <DocLinesIcon size={18} color="#006CFF" />
            </View>
            <Text style={styles.viewReportText}>View Report</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.dashboardButton, pressed && styles.buttonPressed]}
            onPress={handleBackToDashboard}
            accessibilityRole="button"
            accessibilityLabel="Back to Dashboard"
          >
            <View style={styles.buttonIconMargin}>
              <HomeTabIcon size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.dashboardButtonText}>Back to Dashboard</Text>
          </Pressable>
        </View>

        {/* 9. Landscape Illustration */}
        <View style={styles.footerIllustrationWrapper}>
          <Image
            source={require('../../../assets/images/main_footer.png')}
            style={styles.footerIllustration}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      {/* 10. Bottom Navigation Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(8, bottomInset) }]}>
        <Pressable
          style={styles.navItem}
          onPress={() => {
            setActiveTab('home');
            handleBackToDashboard();
          }}
        >
          <HomeTabIcon size={22} color={activeTab === 'home' ? '#006CFF' : '#7D98C4'} />
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => {
            setActiveTab('checks');
            router.push('/safety/technical/machine-checks');
          }}
        >
          <ChecksTabIcon size={22} color={activeTab === 'checks' ? '#006CFF' : '#7D98C4'} />
          <Text style={[styles.navText, activeTab === 'checks' && styles.navTextActive]}>
            Checks
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => {
            setActiveTab('documents');
            router.push('/safety/technical/documents');
          }}
        >
          <DocumentsTabIcon size={22} color={activeTab === 'documents' ? '#006CFF' : '#7D98C4'} />
          <Text style={[styles.navText, activeTab === 'documents' && styles.navTextActive]}>
            Documents
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => {
            setActiveTab('profile');
            router.push('/safety/technical/profile');
          }}
        >
          <ProfileTabIcon size={22} color={activeTab === 'profile' ? '#006CFF' : '#7D98C4'} />
          <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>
            Profile
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
  },

  /* Header */
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9F1FC',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 44,
    height: 40,
    marginRight: 8,
  },
  brandTextCol: {
    justifyContent: 'center',
  },
  brandTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandNavy: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.navy,
    letterSpacing: -0.3,
  },
  brandBlue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.blue,
    letterSpacing: -0.3,
  },
  brandTagline: {
    fontSize: 9.5,
    fontWeight: '500',
    color: colors.textMuted,
    marginTop: 1,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#D93025',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  notificationBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.navy,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  buttonPressed: {
    opacity: 0.75,
  },

  /* Success Section */
  successSection: {
    backgroundColor: '#EAF7EE',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D4EEDC',
  },
  checkIconWrapper: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  greenCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0B9E5A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0B9E5A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  whiteCheckmark: {
    width: 20,
    height: 11,
    borderLeftWidth: 3.2,
    borderBottomWidth: 3.2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }],
    marginTop: -3,
  },
  sparkleDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#34D399',
  },
  sparkleDash: {
    position: 'absolute',
    width: 3,
    height: 7,
    borderRadius: 1.5,
    backgroundColor: '#10B981',
  },
  sparkleTopLeft: {
    top: 6,
    left: 12,
  },
  sparkleTop: {
    top: 2,
    transform: [{ rotate: '15deg' }],
  },
  sparkleTopRight: {
    top: 8,
    right: 12,
  },
  sparkleRight: {
    right: 4,
    top: 28,
    transform: [{ rotate: '75deg' }],
  },
  sparkleBottomRight: {
    bottom: 8,
    right: 14,
  },
  sparkleBottomLeft: {
    bottom: 8,
    left: 14,
  },
  sparkleLeft: {
    left: 4,
    top: 28,
    transform: [{ rotate: '-75deg' }],
  },
  successTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#086337',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  successSubtitle: {
    fontSize: 12.5,
    color: '#2D3748',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontWeight: '500',
  },
  sloganPill: {
    backgroundColor: '#D7F3E2',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sloganPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0A7A40',
    textAlign: 'center',
  },

  /* Cards */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 14,
    marginBottom: 12,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.navy,
  },
  statutoryBadge: {
    backgroundColor: '#EAF2FD',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statutoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#006CFF',
  },
  statusBadge: {
    backgroundColor: '#E8F8F0',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B9E5A',
  },

  /* Equipment Details */
  equipmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentImageWrapper: {
    width: 104,
    height: 80,
    backgroundColor: '#F0F6FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  equipmentImage: {
    width: '90%',
    height: '90%',
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentNameText: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 4,
  },
  kvRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  kvLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    width: 82,
  },
  kvSeparator: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginRight: 4,
  },
  kvValue: {
    flex: 1,
    fontSize: 11.5,
    color: colors.navy,
    fontWeight: '700',
  },

  /* Report Info Grid */
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoGridItem: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EAF2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  infoTextCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 1,
  },
  infoValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.navy,
    lineHeight: 16,
  },

  /* Stepper / Timeline */
  stepperContainer: {
    marginTop: 8,
    marginBottom: 4,
    position: 'relative',
  },
  stepperLinesWrapper: {
    position: 'absolute',
    top: 10,
    left: '12%',
    right: '12%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperLineSegment: {
    flex: 1,
    height: 2.5,
    flexDirection: 'row',
  },
  stepperLineHalf: {
    flex: 1,
    height: 2.5,
  },
  stepperStepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    width: '23%',
  },
  stepCircleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0B9E5A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepWhiteCheck: {
    width: 9,
    height: 5,
    borderLeftWidth: 1.8,
    borderBottomWidth: 1.8,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }],
    marginTop: -1,
  },
  stepCircleInactive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#7D98C4',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepInnerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7D98C4',
  },
  stepTitleActive: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B9E5A',
    textAlign: 'center',
    marginBottom: 2,
  },
  stepTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.navy,
    textAlign: 'center',
    marginBottom: 2,
  },
  stepSubtext: {
    fontSize: 9.5,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 12,
  },

  /* What Happens Next */
  infoBannerCard: {
    flexDirection: 'row',
    backgroundColor: '#EBF5FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CFE2FE',
    padding: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bannerIconWrapper: {
    width: 28,
    marginRight: 8,
    marginTop: 2,
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#006CFF',
    marginBottom: 3,
  },
  bannerBody: {
    fontSize: 11.5,
    color: '#334155',
    lineHeight: 16,
    fontWeight: '500',
  },

  /* Correction Note */
  correctionBannerCard: {
    flexDirection: 'row',
    backgroundColor: '#FEF7E6',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE6BA',
    padding: 12,
    marginBottom: 14,
    alignItems: 'flex-start',
  },
  correctionIconWrapper: {
    width: 28,
    marginRight: 8,
    marginTop: 2,
    alignItems: 'center',
  },
  correctionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 3,
  },
  correctionBody: {
    fontSize: 11.5,
    color: '#78350F',
    lineHeight: 16,
    fontWeight: '500',
  },

  /* Bottom Actions */
  bottomActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewReportButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonIconMargin: {
    marginRight: 6,
  },
  viewReportText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006CFF',
  },
  dashboardButton: {
    flex: 1.3,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#006CFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#006CFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  dashboardButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Footer Illustration */
  footerIllustrationWrapper: {
    width: '100%',
    height: 100,
    marginTop: 4,
    marginBottom: 4,
  },
  footerIllustration: {
    width: '100%',
    height: '100%',
  },

  /* Bottom Navigation Bar */
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1EDFA',
    paddingTop: 8,
    justifyContent: 'space-around',
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    minHeight: 44,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#7D98C4',
    marginTop: 3,
  },
  navTextActive: {
    color: '#006CFF',
    fontWeight: '800',
  },
});
