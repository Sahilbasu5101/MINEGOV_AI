import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
  BackArrowIcon,
  BuildingIcon,
  LocationPinIcon,
  CalendarIcon,
  ClockIcon,
  UserCircleIcon,
  GearIcon,
  InfoCircleIcon,
  ChevronRightIcon,
  HomeTabIcon,
  ChecksTabIcon,
  DocumentsTabIcon,
  ProfileTabIcon,
  IdBadgeIcon,
  ShieldCheckIcon,
  UserTieIcon,
  PhoneIcon,
  MailIcon,
  LayersIcon,
  PencilIcon,
  LockIcon,
  LogoutIcon,
} from '../../../src/components/icons/TechnicalIcons';

type TabKey = 'home' | 'checks' | 'documents' | 'profile';

export default function TechnicalProfileScreen() {
  const router = useRouter();
  const { session, signOut } = useAuth();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<TabKey>('profile');

  const bottomInset =
    insets.bottom > 0
      ? insets.bottom
      : Platform.OS === 'android'
      ? 12
      : 8;

  // Authoritative Technical User values
  const userName = session?.user.name || 'Sanjay Gupta';
  const employeeId = 'E0012';
  const department = 'Technical Department';
  const role = 'Technical / Competent Person';
  const workLocation = 'Kusunda Coal Mine';
  const reportingTo = 'Chief Technical Officer';
  const dateOfJoining = '12 Jan 2023';
  const contactNumber = '+91 98765 43210';
  const emailAddress = 'sanjay.gupta@minegov.in';
  const appVersion = 'v1.0.0';
  const lastLogin = '20 Sep 2026, 09:15 AM';

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/safety/technical');
    }
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Personal information updates will be enabled in the next release.');
  };

  const handleChangePin = () => {
    Alert.alert('Change PIN', 'PIN change security dialog will be available in the next release.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to sign out from your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* 1. Profile Header Area */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeftGroup}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.pressedState]}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Back to Dashboard"
          >
            <BackArrowIcon size={20} color={colors.navy} />
          </Pressable>

          <View style={styles.headerTitleCol}>
            <Text style={styles.headerTitle}>My Profile</Text>
            <Text style={styles.headerSubtitle}>View and manage your account information</Text>
          </View>
        </View>

        {/* Safe Mines Sustainable India Tag */}
        <View style={styles.headerRightTag}>
          <Text style={styles.taglineBlue}>Safe Mines</Text>
          <Text style={styles.taglineNavy}>Sustainable India</Text>
          <View style={styles.taglineUnderline} />
        </View>
      </View>

      {/* Main Scroll Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Profile Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTopRow}>
            {/* Large Circular SG Avatar - Clean, no edit icon */}
            <View style={styles.avatarCircleLarge}>
              <Text style={styles.avatarInitialsLarge}>SG</Text>
            </View>

            <View style={styles.summaryDetails}>
              <Text style={styles.profileName}>{userName}</Text>
              <Text style={styles.profileRole}>{role}</Text>
              <Text style={styles.profileEmpId}>Employee ID: {employeeId}</Text>

              {/* Badges Row */}
              <View style={styles.badgesRow}>
                {/* Active Badge */}
                <View style={styles.activeBadge}>
                  <View style={styles.activeDot} />
                  <Text style={styles.activeBadgeText}>Active</Text>
                </View>

                {/* Technical Department Badge */}
                <View style={styles.deptBadge}>
                  <View style={styles.deptIconWrapper}>
                    <BuildingIcon size={13} color="#1E3A8A" />
                  </View>
                  <Text style={styles.deptBadgeText}>{department}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quote / Slogan */}
          <Text style={styles.summaryQuote}>“Safe Operations. Sustainable Tomorrow.”</Text>
        </View>

        {/* 3. Employee Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <UserCircleIcon size={20} color="#006CFF" />
            <Text style={styles.cardHeaderTitle}>Employee Information</Text>
          </View>

          {/* Row 1: Employee ID */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <IdBadgeIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>Employee ID</Text>
            <Text style={styles.infoValue}>{employeeId}</Text>
          </View>

          {/* Row 2: Department */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <BuildingIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>Department</Text>
            <Text style={styles.infoValue}>{department}</Text>
          </View>

          {/* Row 3: Role */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <ShieldCheckIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{role}</Text>
          </View>

          {/* Row 4: Work Location / Mine */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <LocationPinIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>Work Location / Mine</Text>
            <Text style={styles.infoValue}>{workLocation}</Text>
          </View>

          {/* Row 5: Reporting To */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <UserTieIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>Reporting To</Text>
            <Text style={styles.infoValue}>{reportingTo}</Text>
          </View>

          {/* Row 6: Date of Joining */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <CalendarIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>Date of Joining</Text>
            <Text style={styles.infoValue}>{dateOfJoining}</Text>
          </View>

          {/* Row 7: Contact Number */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <PhoneIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>Contact Number</Text>
            <Text style={styles.infoValue}>{contactNumber}</Text>
          </View>

          {/* Row 8: Email Address */}
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <View style={styles.infoIconBox}>
              <MailIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoValueEmail}>{emailAddress}</Text>
          </View>
        </View>

        {/* 4. Account Actions Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <GearIcon size={20} color="#006CFF" />
            <Text style={styles.cardHeaderTitle}>Account Actions</Text>
          </View>

          <View style={styles.actionsRow}>
            {/* Action 1: Edit Profile */}
            <Pressable
              style={({ pressed }) => [styles.actionCardBlue, pressed && styles.pressedState]}
              onPress={handleEditProfile}
              accessibilityRole="button"
              accessibilityLabel="Edit Profile"
            >
              <View style={styles.actionCardTop}>
                <View style={styles.actionIconBoxBlue}>
                  <PencilIcon size={15} color="#FFFFFF" />
                </View>
                <ChevronRightIcon size={14} color="#006CFF" />
              </View>
              <Text style={styles.actionTitleBlue}>Edit Profile</Text>
              <Text style={styles.actionSubtitle}>Update your personal information</Text>
            </Pressable>

            {/* Action 2: Change PIN */}
            <Pressable
              style={({ pressed }) => [styles.actionCardPurple, pressed && styles.pressedState]}
              onPress={handleChangePin}
              accessibilityRole="button"
              accessibilityLabel="Change PIN"
            >
              <View style={styles.actionCardTop}>
                <View style={styles.actionIconBoxPurple}>
                  <LockIcon size={15} color="#FFFFFF" />
                </View>
                <ChevronRightIcon size={14} color="#7C3AED" />
              </View>
              <Text style={styles.actionTitlePurple}>Change PIN</Text>
              <Text style={styles.actionSubtitle}>Update your login PIN</Text>
            </Pressable>

            {/* Action 3: Logout */}
            <Pressable
              style={({ pressed }) => [styles.actionCardRed, pressed && styles.pressedState]}
              onPress={handleLogout}
              accessibilityRole="button"
              accessibilityLabel="Logout"
            >
              <View style={styles.actionCardTop}>
                <View style={styles.actionIconBoxRed}>
                  <LogoutIcon size={15} color="#FFFFFF" />
                </View>
                <ChevronRightIcon size={14} color="#DC2626" />
              </View>
              <Text style={styles.actionTitleRed}>Logout</Text>
              <Text style={styles.actionSubtitle}>Sign out from your account</Text>
            </Pressable>
          </View>
        </View>

        {/* 5. Application Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <InfoCircleIcon size={20} color="#006CFF" />
            <Text style={styles.cardHeaderTitle}>Application Information</Text>
          </View>

          {/* Row 1: App Version */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <LayersIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>{appVersion}</Text>
          </View>

          {/* Row 2: Last Login */}
          <View style={[styles.infoRow, styles.infoRowLast]}>
            <View style={styles.infoIconBox}>
              <ClockIcon size={18} color="#2563EB" />
            </View>
            <Text style={styles.infoLabel}>Last Login</Text>
            <Text style={styles.infoValue}>{lastLogin}</Text>
          </View>
        </View>
      </ScrollView>

      {/* 6. Bottom Navigation Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(8, bottomInset) }]}>
        <Pressable
          style={styles.navItem}
          onPress={() => {
            setActiveTab('home');
            router.replace('/safety/technical');
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
          onPress={() => setActiveTab('profile')}
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9F1FC',
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pressedState: {
    opacity: 0.75,
  },
  headerTitleCol: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: colors.textMuted,
    fontWeight: '500',
    marginTop: 1,
  },
  headerRightTag: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  taglineBlue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#006CFF',
    lineHeight: 14,
  },
  taglineNavy: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.navy,
    lineHeight: 14,
  },
  taglineUnderline: {
    width: 32,
    height: 2,
    backgroundColor: '#006CFF',
    borderRadius: 1,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
  },

  /* Profile Summary Card */
  summaryCard: {
    backgroundColor: '#F0F6FE',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D8E7F9',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircleLarge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#163B70',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#163B70',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarInitialsLarge: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  summaryDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.2,
  },
  profileRole: {
    fontSize: 13,
    fontWeight: '700',
    color: '#006CFF',
    marginTop: 2,
  },
  profileEmpId: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 10,
  },
  activeDot: {
    width: 6.5,
    height: 6.5,
    borderRadius: 3.5,
    backgroundColor: '#16A34A',
    marginRight: 4.5,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  deptBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF2FD',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 10,
  },
  deptIconWrapper: {
    marginRight: 4,
  },
  deptBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  summaryQuote: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#475569',
    textAlign: 'center',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#DFEDFA',
    fontWeight: '500',
  },

  /* Section Cards */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFECFA',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 4,
  },
  cardHeaderTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: colors.navy,
    marginLeft: 8,
  },

  /* Info Rows */
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F6FD',
  },
  infoRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  infoIconBox: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 12.5,
    color: '#64748B',
    fontWeight: '500',
    width: 135,
  },
  infoValue: {
    flex: 1,
    fontSize: 12.5,
    color: colors.navy,
    fontWeight: '700',
    textAlign: 'right',
  },
  infoValueEmail: {
    flex: 1,
    fontSize: 12,
    color: colors.navy,
    fontWeight: '700',
    textAlign: 'right',
  },

  /* Account Actions */
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionCardBlue: {
    flex: 1,
    backgroundColor: '#F0F7FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    padding: 12,
    minHeight: 112,
    justifyContent: 'space-between',
  },
  actionCardPurple: {
    flex: 1,
    backgroundColor: '#F5F3FE',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    padding: 12,
    minHeight: 112,
    justifyContent: 'space-between',
  },
  actionCardRed: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    padding: 12,
    minHeight: 112,
    justifyContent: 'space-between',
  },
  actionCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionIconBoxBlue: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconBoxPurple: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconBoxRed: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitleBlue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1D4ED8',
    marginTop: 8,
  },
  actionTitlePurple: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6D28D9',
    marginTop: 8,
  },
  actionTitleRed: {
    fontSize: 13,
    fontWeight: '800',
    color: '#B91C1C',
    marginTop: 8,
  },
  actionSubtitle: {
    fontSize: 10,
    lineHeight: 13.5,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
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
