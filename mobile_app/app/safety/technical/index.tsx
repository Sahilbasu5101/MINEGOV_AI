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
  GearIcon,
  WrenchIcon,
  DocLinesIcon,
  ClipboardCheckIcon,
  ChevronRightIcon,
  HomeTabIcon,
  ChecksTabIcon,
  DocumentsTabIcon,
  BellTabIcon,
  ProfileTabIcon,
} from '../../../src/components/icons/TechnicalIcons';

type TabKey = 'home' | 'checks' | 'documents' | 'profile';

export default function TechnicalDashboardScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const bottomInset = insets.bottom > 0
    ? insets.bottom
    : (Platform.OS === 'android' ? 12 : 8);

  const userName = session?.user.name || 'Sanjay Gupta';
  const employeeId = session?.user.employeeId === 'TEST-TECH-001' ? 'E0012' : (session?.user.employeeId || 'E0012');

  const handlePeriodicChecksPress = () => {
    setSelectedCard('periodic');
    router.push('/safety/technical/machine-checks');
  };

  const handleProfilePress = () => {
    router.push('/safety/technical/profile');
  };

  const handleDocumentsPress = () => {
    setSelectedCard('documents');
    router.push('/safety/technical/documents');
  };

  const handleNotImplemented = (title: string, cardId?: string) => {
    if (cardId) setSelectedCard(cardId);
    Alert.alert(title, 'This module is scheduled for the upcoming statutory safety release.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header with MineGov AI Branding */}
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
            style={({ pressed }) => [
              styles.bellButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => handleNotImplemented('Notifications')}
            accessibilityRole="button"
            accessibilityLabel="Notifications (3 unread)"
          >
            <BellTabIcon size={22} color="#006CFF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.avatarCircle,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleProfilePress}
            accessibilityRole="button"
            accessibilityLabel="User Profile"
          >
            <Text style={styles.avatarInitials}>SG</Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content Scroll Area */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <Pressable
          style={({ pressed }) => [
            styles.profileCard,
            pressed && styles.cardPressed,
          ]}
          onPress={handleProfilePress}
        >
          <View style={styles.profileAvatarPlaceholder}>
            <View style={styles.avatarHead} />
            <View style={styles.avatarShoulders} />
          </View>

          <View style={styles.profileDetails}>
            <Text style={styles.welcomeBackText}>Welcome Back,</Text>
            <Text style={styles.profileNameText}>{userName}</Text>
            <Text style={styles.profileIdText}>Employee ID: {employeeId}</Text>
            <Text style={styles.profileDeptText}>Technical Department</Text>
          </View>

          <ChevronRightIcon size={20} color="#6585B5" />
        </Pressable>

        {/* Hero Banner Card - Text is part of the banner graphic, rendered cleanly once */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('../../../assets/images/technical/tech_banner.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* 4 Action Cards Grid (2x2) */}
        {/* All 4 cards have the SAME neutral default background. Blue is ONLY selected/pressed state */}
        <View style={styles.gridContainer}>
          {/* Card 1: Periodic Statutory Checks */}
          <Pressable
            style={({ pressed }) => {
              const active = selectedCard === 'periodic' || pressed;
              return [
                styles.gridCard,
                active ? styles.gridCardActive : styles.gridCardDefault,
              ];
            }}
            onPress={handlePeriodicChecksPress}
          >
            {({ pressed }) => {
              const active = selectedCard === 'periodic' || pressed;
              const iconColor = active ? '#FFFFFF' : '#006CFF';
              const titleColor = active ? '#FFFFFF' : colors.navy;
              const subtitleColor = active ? '#E0EEFF' : colors.textMuted;
              return (
                <>
                  <View style={styles.gridIconContainer}>
                    <GearIcon size={28} color={iconColor} />
                  </View>
                  <Text style={[styles.gridCardTitle, { color: titleColor }]}>
                    Periodic Statutory{'\n'}Checks
                  </Text>
                  <Text style={[styles.gridCardSubtitle, { color: subtitleColor }]}>
                    Examination & testing{'\n'}of equipment
                  </Text>
                </>
              );
            }}
          </Pressable>

          {/* Card 2: Maintenance & Repairs */}
          <Pressable
            style={({ pressed }) => {
              const active = selectedCard === 'repairs' || pressed;
              return [
                styles.gridCard,
                active ? styles.gridCardActive : styles.gridCardDefault,
              ];
            }}
            onPress={() => handleNotImplemented('Maintenance & Repairs', 'repairs')}
          >
            {({ pressed }) => {
              const active = selectedCard === 'repairs' || pressed;
              const iconColor = active ? '#FFFFFF' : '#006CFF';
              const titleColor = active ? '#FFFFFF' : colors.navy;
              const subtitleColor = active ? '#E0EEFF' : colors.textMuted;
              return (
                <>
                  <View style={styles.gridIconContainer}>
                    <WrenchIcon size={28} color={iconColor} />
                  </View>
                  <Text style={[styles.gridCardTitle, { color: titleColor }]}>
                    Maintenance &{'\n'}Repairs
                  </Text>
                  <Text style={[styles.gridCardSubtitle, { color: subtitleColor }]}>
                    Report & track{'\n'}maintenance activities
                  </Text>
                </>
              );
            }}
          </Pressable>

          {/* Card 3: Documents & Certificates */}
          <Pressable
            style={({ pressed }) => {
              const active = selectedCard === 'documents' || pressed;
              return [
                styles.gridCard,
                active ? styles.gridCardActive : styles.gridCardDefault,
              ];
            }}
            onPress={handleDocumentsPress}
          >
            {({ pressed }) => {
              const active = selectedCard === 'documents' || pressed;
              const iconColor = active ? '#FFFFFF' : '#006CFF';
              const titleColor = active ? '#FFFFFF' : colors.navy;
              const subtitleColor = active ? '#E0EEFF' : colors.textMuted;
              return (
                <>
                  <View style={styles.gridIconContainer}>
                    <DocLinesIcon size={28} color={iconColor} />
                  </View>
                  <Text style={[styles.gridCardTitle, { color: titleColor }]}>
                    Documents &{'\n'}Certificates
                  </Text>
                  <Text style={[styles.gridCardSubtitle, { color: subtitleColor }]}>
                    View statutory{'\n'}documents
                  </Text>
                </>
              );
            }}
          </Pressable>

          {/* Card 4: My Assigned Tasks */}
          <Pressable
            style={({ pressed }) => {
              const active = selectedCard === 'tasks' || pressed;
              return [
                styles.gridCard,
                active ? styles.gridCardActive : styles.gridCardDefault,
              ];
            }}
            onPress={() => handleNotImplemented('My Assigned Tasks', 'tasks')}
          >
            {({ pressed }) => {
              const active = selectedCard === 'tasks' || pressed;
              const iconColor = active ? '#FFFFFF' : '#006CFF';
              const titleColor = active ? '#FFFFFF' : colors.navy;
              const subtitleColor = active ? '#E0EEFF' : colors.textMuted;
              return (
                <>
                  <View style={styles.gridIconContainer}>
                    <ClipboardCheckIcon size={28} color={iconColor} />
                  </View>
                  <Text style={[styles.gridCardTitle, { color: titleColor }]}>
                    My Assigned{'\n'}Tasks
                  </Text>
                  <Text style={[styles.gridCardSubtitle, { color: subtitleColor }]}>
                    Pending & upcoming{'\n'}actions
                  </Text>
                </>
              );
            }}
          </Pressable>
        </View>

        {/* Quick Stats Section */}
        <View style={styles.statsHeaderRow}>
          <Text style={styles.statsSectionTitle}>Quick Stats</Text>
          <Pressable
            onPress={() => router.push('/safety/technical/all-quick-stats')}
            style={({ pressed }) => [pressed && styles.buttonPressed]}
          >
            <Text style={styles.viewAllText}>View All ➔</Text>
          </Pressable>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statBox, { backgroundColor: '#EBF3FC' }]}>
            <Text style={[styles.statNumber, { color: colors.navy }]}>8</Text>
            <Text style={styles.statLabel}>Due{'\n'}Checks</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#FDEBEB' }]}>
            <Text style={[styles.statNumber, { color: '#D93025' }]}>2</Text>
            <Text style={styles.statLabel}>Overdue</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#E9F7EF' }]}>
            <Text style={[styles.statNumber, { color: '#0B9E5A' }]}>12</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#FEF7E6' }]}>
            <Text style={[styles.statNumber, { color: '#E99000' }]}>1</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar - Structured flex sibling, never overlaps ScrollView */}
      {/* Bottom Navigation Bar - Exactly: Home | Checks | Documents | Profile */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(8, bottomInset) }]}>
        <Pressable
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <HomeTabIcon size={22} color={activeTab === 'home' ? '#006CFF' : '#7D98C4'} />
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => {
            setActiveTab('checks');
            handlePeriodicChecksPress();
          }}
        >
          <ChecksTabIcon size={22} color={activeTab === 'checks' ? '#006CFF' : '#7D98C4'} />
          <Text style={[styles.navText, activeTab === 'checks' && styles.navTextActive]}>Checks</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={handleDocumentsPress}
        >
          <DocumentsTabIcon size={22} color={activeTab === 'documents' ? '#006CFF' : '#7D98C4'} />
          <Text style={[styles.navText, activeTab === 'documents' && styles.navTextActive]}>Documents</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={handleProfilePress}
        >
          <ProfileTabIcon size={22} color={activeTab === 'profile' ? '#006CFF' : '#7D98C4'} />
          <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>Profile</Text>
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
    opacity: 0.7,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 14,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.85,
  },
  profileAvatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E2ECF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarHead: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8BA6CD',
    marginBottom: 2,
  },
  avatarShoulders: {
    width: 28,
    height: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: '#8BA6CD',
  },
  profileDetails: {
    flex: 1,
  },
  welcomeBackText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  profileNameText: {
    fontSize: 16.5,
    fontWeight: '800',
    color: colors.navy,
    marginTop: 1,
  },
  profileIdText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#284C8A',
    marginTop: 1,
  },
  profileDeptText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: colors.textMuted,
    marginTop: 1,
  },
  bannerContainer: {
    height: 130,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0F2753',
    marginBottom: 14,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  gridCard: {
    width: '48.5%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 11,
    minHeight: 126,
    justifyContent: 'space-between',
  },
  gridCardDefault: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFECFA',
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  gridCardActive: {
    backgroundColor: '#006CFF',
    borderColor: '#005EDD',
    shadowColor: '#006CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 7,
    elevation: 4,
  },
  gridIconContainer: {
    marginBottom: 8,
  },
  gridCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
  gridCardSubtitle: {
    fontSize: 10.5,
    lineHeight: 14,
    marginTop: 4,
  },
  statsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  statsSectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.navy,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006CFF',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statBox: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 12,
  },
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
