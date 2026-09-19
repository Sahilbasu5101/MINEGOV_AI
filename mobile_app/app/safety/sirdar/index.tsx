import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { HeaderBar } from '../../../src/components/HeaderBar';
import { MineGovBrand } from '../../../src/components/MineGovBrand';
import { colors } from '../../../src/constants/theme';
import { useAuth } from '../../../src/context/auth-context';
import {
  BellIcon,
  MineIcon,
  CalendarIcon,
  PinIcon,
  ClipboardCheckIcon,
  AlertTriangleIcon,
  HomeIcon,
  ReportsIcon,
  SyncTabIcon,
  ProfileTabIcon,
} from '../../../src/components/icons/SirdarIcons';

type TabKey = 'home' | 'reports' | 'location' | 'sync' | 'profile';

export default function SirdarHomeScreen() {
  const router = useRouter();
  const { session, signOut } = useAuth();
  const insets = useSafeAreaInsets();

  // Bottom padding to shift navigation bar safely above the phone's system navigation bar.
  // Supports Android 3-button navigation (~48dp), gesture pill (~20dp), and iOS home indicator (~34dp).
  // If insets.bottom is 0 on an Android device with software buttons, defaults to 56dp so buttons are never obstructed.
  const bottomInset = insets.bottom > 0
    ? insets.bottom + 8
    : (Platform.OS === 'android' ? 56 : 12);

  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const userName = session?.user.name || 'Ramesh Kumar';
  const employeeId = session?.user.employeeId === 'TEST-SIR-001' ? 'SD1024' : (session?.user.employeeId || 'SD1024');
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      Alert.alert(
        'Offline Synchronization',
        '3 local reports checked. 1 pending item ("Loose Conveyor Guard") will sync automatically when mobile connectivity is restored.'
      );
    }, 900);
  };

  const handleActionPress = (actionTitle: string) => {
    Alert.alert(
      actionTitle,
      'Field inspection and observation recording forms will be available in the upcoming statutory safety release.'
    );
  };

  const handleLogout = async () => {
    setProfileModalVisible(false);
    await signOut();
    router.replace('/(main)');
  };

  const renderHeaderRight = () => (
    <View style={styles.headerRightActions}>
      {/* Notification Bell Button */}
      <TouchableOpacity
        style={styles.bellButton}
        onPress={() => setNotificationsModalVisible(true)}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel="Notifications (3 unread)"
      >
        <BellIcon size={20} color={colors.blue} />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationBadgeText}>3</Text>
        </View>
      </TouchableOpacity>

      {/* User Avatar Circle */}
      <TouchableOpacity
        style={styles.avatarCircle}
        onPress={() => setProfileModalVisible(true)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="User Profile"
      >
        <Text style={styles.avatarInitials}>{initials || 'RK'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Government Header with Notification & Profile */}
        <HeaderBar rightComponent={renderHeaderRight()} />

        {/* Brand Logo & Slogan */}
        <MineGovBrand compact />

        {/* Hero Greeting Section with Open Pit Mine Image & Trucks */}
        <View style={styles.heroSection}>
          {/* Background Quarry Image positioned on right */}
          <Image
            source={require('../../../assets/images/main_hero.png')}
            style={styles.heroBackgroundImage}
            resizeMode="cover"
          />

          {/* Semi-transparent soft overlay to ensure text contrast */}
          <View style={styles.heroOverlayGradient} />

          {/* Left Greeting Content */}
          <View style={styles.heroTextContainer}>
            <Text style={styles.greetingTitle}>Good Morning,</Text>
            <Text style={styles.greetingName}>{userName}</Text>

            <Text style={styles.roleLine}>
              Sirdar <Text style={styles.pipeSymbol}>|</Text> Employee ID: {employeeId}
            </Text>
            <Text style={styles.mineLocationLine}>Jayant Mine, Singrauli Area</Text>

            <Text style={styles.vigilanceQuote}>
              “Your vigilance keeps everyone safe.”
            </Text>
          </View>
        </View>

        {/* 3-Column Shift & Location Information Card */}
        <View style={styles.infoCard}>
          {/* Column 1: Assigned Mine */}
          <View style={styles.infoColumn}>
            <View style={styles.infoIconWrapper}>
              <MineIcon size={18} color="#07115B" />
            </View>
            <Text style={styles.infoLabel}>Assigned Mine</Text>
            <Text style={styles.infoValue}>Jayant Mine</Text>
          </View>

          <View style={styles.infoDivider} />

          {/* Column 2: Current Shift */}
          <View style={styles.infoColumn}>
            <View style={styles.infoIconWrapper}>
              <CalendarIcon size={18} color="#07115B" />
            </View>
            <Text style={styles.infoLabel}>Current Shift</Text>
            <Text style={styles.infoValueCenter}>Morning Shift{'\n'}(6 AM – 2 PM)</Text>
          </View>

          <View style={styles.infoDivider} />

          {/* Column 3: Working Location */}
          <View style={styles.infoColumn}>
            <View style={styles.infoIconWrapper}>
              <PinIcon size={18} color="#07115B" />
            </View>
            <Text style={styles.infoLabel}>Working Location</Text>
            <Text style={styles.infoValueCenter}>Section B{'\n'}Main Pit Area</Text>
          </View>
        </View>

        {/* Section Header: What would you like to report today? */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What would you like to report today?</Text>
          <Text style={styles.sectionSubtitle}>
            Choose the type of safety reporting as per your responsibility.
          </Text>
        </View>

        {/* Primary Action Card 1: Daily / Shift Inspection */}
        <TouchableOpacity
          style={styles.inspectionCard}
          onPress={() => router.push('/safety/sirdar/daily-inspection')}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel="Daily or Shift Inspection"
        >
          <View style={styles.actionCardTopRow}>
            <View style={styles.blueBadgeCircle}>
              <ClipboardCheckIcon size={24} color="#FFFFFF" />
            </View>

            <View style={styles.actionCardDetails}>
              <Text style={styles.actionCardTitle}>Daily / Shift Inspection</Text>
              <Text style={styles.actionCardSubtitle}>
                Report workplace conditions, PPE, equipment, area safety and routine checks.
              </Text>
            </View>

            <Text style={styles.actionChevronBlue}>›</Text>
          </View>

          <View style={styles.blueBannerPill}>
            <Text style={styles.blueBannerText}>
              Keep your workplace safe every shift.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Primary Action Card 2: Report Safety Event */}
        <TouchableOpacity
          style={styles.safetyEventCard}
          onPress={() => handleActionPress('Report Safety Event')}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel="Report Safety Event"
        >
          <View style={styles.actionCardTopRow}>
            <View style={styles.redBadgeCircle}>
              <AlertTriangleIcon size={24} color="#FFFFFF" badgeBg="#E53935" />
            </View>

            <View style={styles.actionCardDetails}>
              <Text style={styles.safetyEventTitle}>Report Safety Event</Text>
              <Text style={styles.safetyEventSubtitle}>
                Report accident, hazard, dangerous occurrence or any safety emergency.
              </Text>
            </View>

            <Text style={styles.actionChevronRed}>›</Text>
          </View>

          <View style={styles.redBannerPill}>
            <Text style={styles.redBannerText}>
              Report early. Prevent bigger risks.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Recent Reports Header */}
        <View style={styles.recentReportsHeaderRow}>
          <Text style={styles.recentReportsTitle}>Recent Reports</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('All Reports', 'Navigating to Sirdar past reports registry.')}
            activeOpacity={0.7}
            accessibilityRole="button"
          >
            <Text style={styles.viewAllLink}>View All ➔</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Reports List Container */}
        <View style={styles.reportsCardContainer}>
          {/* Report 1 */}
          <TouchableOpacity
            style={styles.reportRowItem}
            activeOpacity={0.75}
            onPress={() => Alert.alert('Daily Inspection – Section B', 'Inspection Status: Submitted\nTime: 07 Sep 2026, 08:15 AM\nIssues: 2 issues reported')}
          >
            <View style={styles.reportIconSquareBlue}>
              <ClipboardCheckIcon size={20} color={colors.blue} />
            </View>

            <View style={styles.reportRowDetails}>
              <Text style={styles.reportRowTitle}>Daily Inspection – Section B</Text>
              <Text style={styles.reportRowMeta}>
                07 Sep 2026, 08:15 AM <Text style={styles.pipeSymbolLight}>|</Text> 2 issues reported
              </Text>
            </View>

            <View style={styles.statusPillSubmitted}>
              <Text style={styles.statusTextSubmitted}>Submitted</Text>
            </View>

            <Text style={styles.reportRowChevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.reportItemDivider} />

          {/* Report 2 */}
          <TouchableOpacity
            style={styles.reportRowItem}
            activeOpacity={0.75}
            onPress={() => Alert.alert('Loose Conveyor Guard', 'Hazard Status: Pending Sync\nTime: 05 Sep 2026, 11:40 AM\nLocation: Main Conveyor')}
          >
            <View style={styles.reportIconSquareRed}>
              <AlertTriangleIcon size={20} color="#E53935" badgeBg="#FFFFFF" />
            </View>

            <View style={styles.reportRowDetails}>
              <Text style={styles.reportRowTitle}>Loose Conveyor Guard</Text>
              <Text style={styles.reportRowMeta}>
                05 Sep 2026, 11:40 AM <Text style={styles.pipeSymbolLight}>|</Text> Main Conveyor
              </Text>
            </View>

            <View style={styles.statusPillPendingSync}>
              <Text style={styles.statusTextPendingSync}>Pending Sync</Text>
            </View>

            <Text style={styles.reportRowChevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.reportItemDivider} />

          {/* Report 3 */}
          <TouchableOpacity
            style={styles.reportRowItem}
            activeOpacity={0.75}
            onPress={() => Alert.alert('Daily Inspection – Workshop', 'Inspection Status: Submitted\nTime: 03 Sep 2026, 07:55 AM\nIssues: No issues')}
          >
            <View style={styles.reportIconSquareBlue}>
              <ClipboardCheckIcon size={20} color={colors.blue} />
            </View>

            <View style={styles.reportRowDetails}>
              <Text style={styles.reportRowTitle}>Daily Inspection – Workshop</Text>
              <Text style={styles.reportRowMeta}>
                03 Sep 2026, 07:55 AM <Text style={styles.pipeSymbolLight}>|</Text> No issues
              </Text>
            </View>

            <View style={styles.statusPillSubmitted}>
              <Text style={styles.statusTextSubmitted}>Submitted</Text>
            </View>

            <Text style={styles.reportRowChevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Offline Mode Active Card */}
        <View style={styles.offlineCard}>
          <View style={styles.offlineIconBox}>
            <Image
              source={require('../../../assets/icons/sec_cloud.png')}
              style={styles.offlineCloudImage}
              resizeMode="contain"
            />
            <View style={styles.offlineOnlineDot} />
          </View>

          <View style={styles.offlineTextBox}>
            <Text style={styles.offlineTitle}>Offline Mode Active</Text>
            <Text style={styles.offlineDesc}>
              Your reports are saved locally and will sync automatically when internet is available.
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.syncNowButton, isSyncing && styles.syncNowButtonActive]}
            onPress={handleSyncNow}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Sync Now"
          >
            <Text style={styles.syncRefreshIcon}>🔄</Text>
            <Text style={styles.syncNowText}>
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 5-Item Bottom Navigation Bar */}
      <View style={[styles.bottomNavContainer, { paddingBottom: bottomInset }]}>
        {/* Tab 1: Home (Active) */}
        <TouchableOpacity
          style={styles.navTab}
          onPress={() => setActiveTab('home')}
          activeOpacity={0.7}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'home' }}
        >
          <HomeIcon size={22} color={activeTab === 'home' ? colors.blue : '#5A7AAB'} />
          <Text style={activeTab === 'home' ? styles.navLabelActive : styles.navLabelInactive}>Home</Text>
          <View style={[styles.activeTabIndicator, activeTab !== 'home' && { opacity: 0 }]} />
        </TouchableOpacity>

        {/* Tab 2: Reports */}
        <TouchableOpacity
          style={styles.navTab}
          onPress={() => {
            setActiveTab('reports');
            Alert.alert('Reports Registry', 'Accessing field inspection reports archive.');
          }}
          activeOpacity={0.7}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'reports' }}
        >
          <ReportsIcon size={22} color={activeTab === 'reports' ? colors.blue : '#5A7AAB'} />
          <Text style={activeTab === 'reports' ? styles.navLabelActive : styles.navLabelInactive}>Reports</Text>
          <View style={[styles.activeTabIndicator, activeTab !== 'reports' && { opacity: 0 }]} />
        </TouchableOpacity>

        {/* Tab 3: My Location */}
        <TouchableOpacity
          style={styles.navTab}
          onPress={() => {
            setActiveTab('location');
            Alert.alert('My Working Location', 'Current Pit Coordinates: Section B, Jayant Mine (Lat 24.120° N, Long 82.650° E).');
          }}
          activeOpacity={0.7}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'location' }}
        >
          <PinIcon size={22} color={activeTab === 'location' ? colors.blue : '#5A7AAB'} />
          <Text style={activeTab === 'location' ? styles.navLabelActive : styles.navLabelInactive}>My Location</Text>
          <View style={[styles.activeTabIndicator, activeTab !== 'location' && { opacity: 0 }]} />
        </TouchableOpacity>

        {/* Tab 4: Sync */}
        <TouchableOpacity
          style={styles.navTab}
          onPress={() => {
            setActiveTab('sync');
            handleSyncNow();
          }}
          activeOpacity={0.7}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'sync' }}
        >
          <SyncTabIcon size={22} color={activeTab === 'sync' ? colors.blue : '#5A7AAB'} />
          <Text style={activeTab === 'sync' ? styles.navLabelActive : styles.navLabelInactive}>Sync</Text>
          <View style={[styles.activeTabIndicator, activeTab !== 'sync' && { opacity: 0 }]} />
        </TouchableOpacity>

        {/* Tab 5: Profile */}
        <TouchableOpacity
          style={styles.navTab}
          onPress={() => setProfileModalVisible(true)}
          activeOpacity={0.7}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'profile' }}
        >
          <ProfileTabIcon size={22} color={activeTab === 'profile' ? colors.blue : '#5A7AAB'} />
          <Text style={activeTab === 'profile' ? styles.navLabelActive : styles.navLabelInactive}>Profile</Text>
          <View style={[styles.activeTabIndicator, activeTab !== 'profile' && { opacity: 0 }]} />
        </TouchableOpacity>
      </View>

      {/* Notifications Modal */}
      <Modal
        visible={notificationsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setNotificationsModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setNotificationsModalVisible(false)}
        >
          <View style={[styles.modalContentCard, { paddingBottom: Math.max(36, insets.bottom + 24) }]}>
            <View style={styles.modalDragHandle} />
            <Text style={styles.modalHeading}>Safety Bulletins & Alerts</Text>

            <View style={styles.notificationItem}>
              <Text style={styles.notifBadge}>NEW</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.notifTitle}>Pre-shift DGMS Safety Directive</Text>
                <Text style={styles.notifBody}>Ensure slope stability checks along Section B haul road prior to blast scheduling.</Text>
                <Text style={styles.notifTime}>Today, 06:15 AM</Text>
              </View>
            </View>

            <View style={styles.notificationItem}>
              <Text style={styles.notifBadge}>SYNC</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.notifTitle}>Conveyor Inspection Pending</Text>
                <Text style={styles.notifBody}>Report #SIR-2026-089 queued in local memory awaiting synchronization.</Text>
                <Text style={styles.notifTime}>Yesterday, 04:30 PM</Text>
              </View>
            </View>

            <View style={styles.notificationItem}>
              <Text style={styles.notifBadge}>ALERT</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.notifTitle}>Dust Suppression Sprinklers</Text>
                <Text style={styles.notifBody}>Routine check confirmed active along Jayant Main Pit approach road.</Text>
                <Text style={styles.notifTime}>05 Sep 2026</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setNotificationsModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* User Profile & Logout Modal */}
      <Modal
        visible={profileModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setProfileModalVisible(false)}
        >
          <View style={styles.profileModalCard}>
            <View style={styles.profileAvatarLarge}>
              <Text style={styles.profileAvatarLargeText}>{initials || 'RK'}</Text>
            </View>

            <Text style={styles.profileNameLarge}>{userName}</Text>
            <Text style={styles.profileRoleBadge}>Statutory Mining Sirdar</Text>
            <Text style={styles.profileMetaLine}>Employee ID: {employeeId}</Text>
            <Text style={styles.profileMetaLine}>Jayant Mine, Singrauli Coalfield</Text>
            <Text style={styles.profileMetaLine}>Section B (Morning Shift)</Text>

            <View style={styles.profileActionsRow}>
              <TouchableOpacity
                style={styles.profileCancelBtn}
                onPress={() => setProfileModalVisible(false)}
              >
                <Text style={styles.profileCancelText}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.profileLogoutBtn}
                onPress={handleLogout}
              >
                <Text style={styles.profileLogoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
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
    paddingBottom: 24,
    backgroundColor: '#F7FBFF',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EAF3FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#D8E8FC',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E53935',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#D7E5F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C6DCF7',
  },
  avatarInitials: {
    color: colors.navy,
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: -0.2,
  },

  /* Hero Greeting Section */
  heroSection: {
    marginTop: 4,
    height: 200,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  heroBackgroundImage: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: '90%',
    height: '100%',
    opacity: 0.96,
  },
  heroOverlayGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '64%',
    height: '100%',
    backgroundColor: '#F7FBFF',
    opacity: 0.94,
  },
  heroTextContainer: {
    paddingHorizontal: 16,
    zIndex: 2,
    maxWidth: '68%',
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.4,
    lineHeight: 26,
  },
  greetingName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.4,
    lineHeight: 26,
    marginBottom: 8,
  },
  roleLine: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.1,
  },
  pipeSymbol: {
    color: '#7697C6',
    fontWeight: '400',
  },
  mineLocationLine: {
    fontSize: 12.5,
    fontWeight: '500',
    color: colors.navy,
    marginTop: 2,
    marginBottom: 8,
  },
  vigilanceQuote: {
    fontSize: 12.5,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#3B5B8E',
    lineHeight: 17,
  },

  /* 3-Column Info Card */
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    marginHorizontal: 14,
    marginTop: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DFEBF9',
    paddingVertical: 12,
    paddingHorizontal: 4,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
  },
  infoColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  infoIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDF5FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#D8E7FA',
  },
  infoLabel: {
    fontSize: 9.5,
    fontWeight: '500',
    color: '#6585B5',
    textAlign: 'center',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.navy,
    textAlign: 'center',
  },
  infoValueCenter: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.navy,
    textAlign: 'center',
    lineHeight: 14.5,
  },
  infoDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E4EEFA',
  },

  /* Section Header */
  sectionHeader: {
    marginTop: 22,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18.5,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#5375A6',
    marginTop: 3,
    lineHeight: 17,
  },

  /* Primary Action Card 1: Daily / Shift Inspection */
  inspectionCard: {
    backgroundColor: '#EDF4FE',
    marginHorizontal: 14,
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D2E3FB',
    padding: 14,
    shadowColor: '#006CFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueBadgeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#006CFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#006CFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  actionCardDetails: {
    flex: 1,
    marginHorizontal: 12,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.2,
  },
  actionCardSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B6B9C',
    lineHeight: 16,
    marginTop: 3,
  },
  actionChevronBlue: {
    fontSize: 26,
    fontWeight: '400',
    color: '#4B6B9C',
  },
  blueBannerPill: {
    backgroundColor: '#DCE8FB',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  blueBannerText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#34598F',
  },

  /* Primary Action Card 2: Report Safety Event */
  safetyEventCard: {
    backgroundColor: '#FFF0F0',
    marginHorizontal: 14,
    marginBottom: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FCD2D2',
    padding: 14,
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  redBadgeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  safetyEventTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#160808',
    letterSpacing: -0.2,
  },
  safetyEventSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6F4E4E',
    lineHeight: 16,
    marginTop: 3,
  },
  actionChevronRed: {
    fontSize: 26,
    fontWeight: '400',
    color: '#9C6B6B',
  },
  redBannerPill: {
    backgroundColor: '#FCE1E1',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  redBannerText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#B71C1C',
  },

  /* Recent Reports Section */
  recentReportsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  recentReportsTitle: {
    fontSize: 17.5,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.2,
  },
  viewAllLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.blue,
  },
  reportsCardContainer: {
    backgroundColor: colors.surface,
    marginHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFEAF8',
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  reportRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  reportIconSquareBlue: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EAF2FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8E7FA',
  },
  reportIconSquareRed: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FEECEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FCD8D8',
  },
  reportRowDetails: {
    flex: 1,
    marginHorizontal: 10,
  },
  reportRowTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.navy,
  },
  reportRowMeta: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6786B6',
    marginTop: 2.5,
  },
  pipeSymbolLight: {
    color: '#9EBAE0',
  },
  statusPillSubmitted: {
    backgroundColor: '#DDF7E6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusTextSubmitted: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B9E5A',
  },
  statusPillPendingSync: {
    backgroundColor: '#FFF1DE',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusTextPendingSync: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  reportRowChevron: {
    fontSize: 20,
    color: '#8CA4C7',
    marginLeft: 6,
  },
  reportItemDivider: {
    height: 1,
    backgroundColor: '#F0F5FD',
    marginHorizontal: 12,
  },

  /* Offline Mode Card */
  offlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF5FE',
    marginHorizontal: 14,
    marginBottom: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D4E4F8',
    padding: 12,
  },
  offlineIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DBE9FA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  offlineCloudImage: {
    width: 26,
    height: 26,
    tintColor: '#07115B',
  },
  offlineOnlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#0B9E5A',
    borderWidth: 1.5,
    borderColor: '#EDF5FE',
  },
  offlineTextBox: {
    flex: 1,
    marginHorizontal: 10,
  },
  offlineTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.navy,
  },
  offlineDesc: {
    fontSize: 11,
    fontWeight: '500',
    color: '#5575A3',
    lineHeight: 14.5,
    marginTop: 2,
  },
  syncNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.blue,
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  syncNowButtonActive: {
    opacity: 0.7,
  },
  syncRefreshIcon: {
    fontSize: 13,
    color: colors.blue,
    marginRight: 4,
  },
  syncNowText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.blue,
  },

  /* Bottom Navigation Bar */
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#E2EDFA',
    paddingTop: 8,
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 46,
  },
  navLabelActive: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.blue,
    marginTop: 3,
  },
  navLabelInactive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5A7AAB',
    marginTop: 3,
  },
  activeTabIndicator: {
    width: 20,
    height: 2.5,
    borderRadius: 1.5,
    backgroundColor: colors.blue,
    marginTop: 2.5,
  },

  /* Modal Backdrop & Shared Cards */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(7, 17, 91, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContentCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1E2F7',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 14,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#F5F9FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0EDFA',
    padding: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  notifBadge: {
    fontSize: 9.5,
    fontWeight: '800',
    color: colors.blue,
    backgroundColor: '#E0EDFC',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginRight: 8,
    marginTop: 2,
  },
  notifTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.navy,
  },
  notifBody: {
    fontSize: 11.5,
    color: '#4B6B9C',
    lineHeight: 16,
    marginTop: 2,
  },
  notifTime: {
    fontSize: 10,
    color: '#7B98C4',
    marginTop: 4,
  },
  modalCloseButton: {
    backgroundColor: colors.blue,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseButtonText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Profile Modal */
  profileModalCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 24,
    marginBottom: 'auto',
    marginTop: 'auto',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  profileAvatarLarge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#D7E5F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B9D5F8',
    marginBottom: 12,
  },
  profileAvatarLargeText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.navy,
  },
  profileNameLarge: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.navy,
  },
  profileRoleBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.blue,
    backgroundColor: '#EAF2FE',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 10,
  },
  profileMetaLine: {
    fontSize: 12.5,
    color: '#5575A3',
    lineHeight: 18,
  },
  profileActionsRow: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  profileCancelBtn: {
    flex: 1,
    paddingVertical: 11,
    backgroundColor: '#F0F5FB',
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  profileCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.navy,
  },
  profileLogoutBtn: {
    flex: 1,
    paddingVertical: 11,
    backgroundColor: '#FDEEEE',
    borderWidth: 1,
    borderColor: '#FCD8D8',
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  profileLogoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D93025',
  },
});
