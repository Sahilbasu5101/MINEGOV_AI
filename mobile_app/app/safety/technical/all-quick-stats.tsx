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
import {
  BackArrowIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DocLinesIcon,
  GearIcon,
  AlertTriangleIcon,
  ClipboardCheckIcon,
  ClockIcon,
  CheckmarkCircleIcon,
  ExclamationCircleIcon,
  TruckIcon,
  FireExtinguisherIcon,
  FanIcon,
  HomeTabIcon,
  ChecksTabIcon,
  DocumentsTabIcon,
  ProfileTabIcon,
} from '../../../src/components/icons/TechnicalIcons';

type TabKey = 'home' | 'checks' | 'documents' | 'profile';

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  due: number;
  overdue: number;
  completed: number;
  inProgress: number;
}

interface RecentCheckItem {
  id: string;
  title: string;
  category: string;
  status: 'Overdue' | 'Completed' | 'Due' | 'In Progress';
  date: string;
  icon: React.ReactNode;
}

export default function AllQuickStatsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('All Time');

  const bottomInset =
    insets.bottom > 0
      ? insets.bottom
      : Platform.OS === 'android'
      ? 12
      : 8;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/safety/technical');
    }
  };

  const handleTimeFilterPress = () => {
    Alert.alert('Filter by Period', 'Select time period for quick stats:', [
      { text: 'Today', onPress: () => setSelectedTimeFilter('Today') },
      { text: 'This Week', onPress: () => setSelectedTimeFilter('This Week') },
      { text: 'This Month', onPress: () => setSelectedTimeFilter('This Month') },
      { text: 'All Time', onPress: () => setSelectedTimeFilter('All Time') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const categories: CategoryItem[] = [
    {
      id: 'cat-1',
      title: 'Machines & Equipment',
      subtitle: 'Inspection & testing',
      icon: <GearIcon size={20} color="#006CFF" />,
      due: 2,
      overdue: 1,
      completed: 5,
      inProgress: 0,
    },
    {
      id: 'cat-2',
      title: 'Electrical Systems',
      subtitle: 'Safety & compliance',
      icon: <DocLinesIcon size={20} color="#006CFF" />,
      due: 1,
      overdue: 0,
      completed: 3,
      inProgress: 1,
    },
    {
      id: 'cat-3',
      title: 'Lifting & Hoisting',
      subtitle: 'Cranes, winches, etc.',
      icon: <AlertTriangleIcon size={20} color="#006CFF" />,
      due: 2,
      overdue: 1,
      completed: 2,
      inProgress: 0,
    },
    {
      id: 'cat-4',
      title: 'Transport & Vehicles',
      subtitle: 'HME & transport',
      icon: <TruckIcon size={20} color="#006CFF" />,
      due: 1,
      overdue: 0,
      completed: 1,
      inProgress: 0,
    },
    {
      id: 'cat-5',
      title: 'Fire Safety Systems',
      subtitle: 'Detection & suppression',
      icon: <FireExtinguisherIcon size={20} color="#006CFF" />,
      due: 1,
      overdue: 0,
      completed: 1,
      inProgress: 0,
    },
    {
      id: 'cat-6',
      title: 'Ventilation Systems',
      subtitle: 'Air quality & monitoring',
      icon: <FanIcon size={20} color="#006CFF" />,
      due: 0,
      overdue: 0,
      completed: 0,
      inProgress: 0,
    },
    {
      id: 'cat-7',
      title: 'Statutory Compliance',
      subtitle: 'Legal & regulatory',
      icon: <ClipboardCheckIcon size={20} color="#006CFF" />,
      due: 1,
      overdue: 0,
      completed: 0,
      inProgress: 0,
    },
  ];

  const recentChecks: RecentCheckItem[] = [
    {
      id: 'rc-1',
      title: 'Excavator EX-201 – Hydraulic Check',
      category: 'Machines & Equipment',
      status: 'Overdue',
      date: '18 Sep 2026',
      icon: <GearIcon size={20} color="#006CFF" />,
    },
    {
      id: 'rc-2',
      title: 'DG Set – Electrical Safety',
      category: 'Electrical Systems',
      status: 'Completed',
      date: '20 Sep 2026',
      icon: <DocLinesIcon size={20} color="#006CFF" />,
    },
    {
      id: 'rc-3',
      title: 'EOT Crane – Load Test',
      category: 'Lifting & Hoisting',
      status: 'Due',
      date: '22 Sep 2026',
      icon: <AlertTriangleIcon size={20} color="#006CFF" />,
    },
    {
      id: 'rc-4',
      title: 'Fire Extinguisher – Refilling',
      category: 'Fire Safety Systems',
      status: 'In Progress',
      date: '21 Sep 2026',
      icon: <FireExtinguisherIcon size={20} color="#006CFF" />,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* 1. Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeftGroup}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.pressedState]}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Back to Technical Dashboard"
          >
            <BackArrowIcon size={20} color={colors.navy} />
          </Pressable>

          <View style={styles.headerTitleCol}>
            <Text style={styles.headerTitle}>All Quick Stats</Text>
            <Text style={styles.headerSubtitle}>Detailed view of your checks status</Text>
          </View>
        </View>

        {/* Time / Filter Selector Button */}
        <Pressable
          style={({ pressed }) => [styles.timeFilterButton, pressed && styles.pressedState]}
          onPress={handleTimeFilterPress}
          accessibilityRole="button"
          accessibilityLabel={`Time filter: ${selectedTimeFilter}`}
        >
          <CalendarIcon size={15} color="#006CFF" />
          <Text style={styles.timeFilterText}>{selectedTimeFilter}</Text>
          <ChevronDownIcon size={12} color="#006CFF" />
        </Pressable>
      </View>

      {/* Main Scroll Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Summary Cards (4 Cards) */}
        <View style={styles.summaryGrid}>
          {/* Card 1: Due Checks */}
          <View style={styles.summaryCardBlue}>
            <View style={styles.summaryCardTop}>
              <DocLinesIcon size={18} color="#006CFF" />
              <ChevronRightIcon size={13} color="#006CFF" />
            </View>
            <Text style={styles.summaryNumberBlue}>8</Text>
            <Text style={styles.summaryLabelBlue}>Due{'\n'}Checks</Text>
          </View>

          {/* Card 2: Overdue */}
          <View style={styles.summaryCardRed}>
            <View style={styles.summaryCardTop}>
              <ExclamationCircleIcon size={18} color="#DC2626" />
              <ChevronRightIcon size={13} color="#DC2626" />
            </View>
            <Text style={styles.summaryNumberRed}>2</Text>
            <Text style={styles.summaryLabelRed}>Overdue</Text>
          </View>

          {/* Card 3: Completed */}
          <View style={styles.summaryCardGreen}>
            <View style={styles.summaryCardTop}>
              <CheckmarkCircleIcon size={18} color="#059669" />
              <ChevronRightIcon size={13} color="#059669" />
            </View>
            <Text style={styles.summaryNumberGreen}>12</Text>
            <Text style={styles.summaryLabelGreen}>Completed</Text>
          </View>

          {/* Card 4: In Progress */}
          <View style={styles.summaryCardAmber}>
            <View style={styles.summaryCardTop}>
              <ClockIcon size={18} color="#D97706" />
              <ChevronRightIcon size={13} color="#D97706" />
            </View>
            <Text style={styles.summaryNumberAmber}>1</Text>
            <Text style={styles.summaryLabelAmber}>In Progress</Text>
          </View>
        </View>

        {/* 3. Checks by Category */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Checks by Category</Text>
          <Text style={styles.totalChecksText}>Total Checks: 23</Text>
        </View>

        <View style={styles.cardContainer}>
          {categories.map((cat, index) => {
            const isLast = index === categories.length - 1;
            return (
              <View
                key={cat.id}
                style={[styles.categoryRow, isLast && styles.rowLast]}
              >
                <View style={styles.categoryIconBox}>{cat.icon}</View>

                <View style={styles.categoryDetails}>
                  <Text style={styles.categoryTitle}>{cat.title}</Text>
                  <Text style={styles.categorySubtitle}>{cat.subtitle}</Text>
                </View>

                <View style={styles.pillGroup}>
                  {/* Due (Blue) */}
                  <View style={styles.statPillBlue}>
                    <Text style={styles.statPillBlueText}>{cat.due}</Text>
                  </View>
                  {/* Overdue (Red) */}
                  <View style={styles.statPillRed}>
                    <Text style={styles.statPillRedText}>{cat.overdue}</Text>
                  </View>
                  {/* Completed (Green) */}
                  <View style={styles.statPillGreen}>
                    <Text style={styles.statPillGreenText}>{cat.completed}</Text>
                  </View>
                  {/* In Progress (Amber) */}
                  <View style={styles.statPillAmber}>
                    <Text style={styles.statPillAmberText}>{cat.inProgress}</Text>
                  </View>
                </View>

                <View style={styles.chevronWrapper}>
                  <ChevronRightIcon size={14} color="#006CFF" />
                </View>
              </View>
            );
          })}
        </View>

        {/* 4. Recent Checks */}
        <View style={[styles.sectionHeaderRow, { marginTop: 16 }]}>
          <Text style={styles.sectionTitle}>Recent Checks</Text>
          <Pressable
            onPress={() => Alert.alert('Recent Checks', 'Viewing all historical checks.')}
            style={({ pressed }) => [pressed && styles.pressedState]}
          >
            <Text style={styles.recentViewAllText}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.cardContainer}>
          {recentChecks.map((check, index) => {
            const isLast = index === recentChecks.length - 1;
            return (
              <View
                key={check.id}
                style={[styles.recentCheckRow, isLast && styles.rowLast]}
              >
                <View style={styles.recentIconBox}>{check.icon}</View>

                <View style={styles.recentDetails}>
                  <Text style={styles.recentTitle} numberOfLines={1}>
                    {check.title}
                  </Text>
                  <Text style={styles.recentCategory}>{check.category}</Text>
                </View>

                {/* Status Badge */}
                {check.status === 'Overdue' && (
                  <View style={styles.statusBadgeRed}>
                    <Text style={styles.statusBadgeRedText}>Overdue</Text>
                  </View>
                )}
                {check.status === 'Completed' && (
                  <View style={styles.statusBadgeGreen}>
                    <Text style={styles.statusBadgeGreenText}>Completed</Text>
                  </View>
                )}
                {check.status === 'Due' && (
                  <View style={styles.statusBadgeBlue}>
                    <Text style={styles.statusBadgeBlueText}>Due</Text>
                  </View>
                )}
                {check.status === 'In Progress' && (
                  <View style={styles.statusBadgeAmber}>
                    <Text style={styles.statusBadgeAmberText}>In Progress</Text>
                  </View>
                )}

                <Text style={styles.recentDate}>{check.date}</Text>

                <View style={styles.chevronWrapper}>
                  <ChevronRightIcon size={14} color="#006CFF" />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* 5. Bottom Navigation Bar */}
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
  timeFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DFECFA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  timeFilterText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#006CFF',
    marginHorizontal: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
  },

  /* Summary Cards */
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  summaryCardBlue: {
    flex: 1,
    backgroundColor: '#EBF5FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CFE2FE',
    padding: 10,
    minHeight: 96,
    justifyContent: 'space-between',
  },
  summaryCardRed: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    padding: 10,
    minHeight: 96,
    justifyContent: 'space-between',
  },
  summaryCardGreen: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    padding: 10,
    minHeight: 96,
    justifyContent: 'space-between',
  },
  summaryCardAmber: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    padding: 10,
    minHeight: 96,
    justifyContent: 'space-between',
  },
  summaryCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryNumberBlue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#006CFF',
    marginTop: 4,
  },
  summaryLabelBlue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#006CFF',
    lineHeight: 14,
  },
  summaryNumberRed: {
    fontSize: 24,
    fontWeight: '900',
    color: '#DC2626',
    marginTop: 4,
  },
  summaryLabelRed: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
    lineHeight: 14,
  },
  summaryNumberGreen: {
    fontSize: 24,
    fontWeight: '900',
    color: '#059669',
    marginTop: 4,
  },
  summaryLabelGreen: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    lineHeight: 14,
  },
  summaryNumberAmber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#D97706',
    marginTop: 4,
  },
  summaryLabelAmber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    lineHeight: 14,
  },

  /* Section Headers */
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 16.5,
    fontWeight: '800',
    color: colors.navy,
  },
  totalChecksText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#006CFF',
  },
  recentViewAllText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#006CFF',
  },

  /* Card Container */
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFECFA',
    paddingHorizontal: 12,
    paddingVertical: 2,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  /* Category Rows */
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F6FD',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  categoryIconBox: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  categoryDetails: {
    flex: 1,
    marginRight: 6,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.navy,
  },
  categorySubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  pillGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 6,
  },
  statPillBlue: {
    minWidth: 25,
    height: 23,
    borderRadius: 6,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  statPillBlueText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#006CFF',
  },
  statPillRed: {
    minWidth: 25,
    height: 23,
    borderRadius: 6,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  statPillRedText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#DC2626',
  },
  statPillGreen: {
    minWidth: 25,
    height: 23,
    borderRadius: 6,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  statPillGreenText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#059669',
  },
  statPillAmber: {
    minWidth: 25,
    height: 23,
    borderRadius: 6,
    backgroundColor: '#FFFBEB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  statPillAmberText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#D97706',
  },
  chevronWrapper: {
    width: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Recent Checks */
  recentCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F6FD',
  },
  recentIconBox: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  recentDetails: {
    flex: 1,
    marginRight: 6,
  },
  recentTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.navy,
  },
  recentCategory: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  statusBadgeRed: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
  },
  statusBadgeRedText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#DC2626',
  },
  statusBadgeGreen: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
  },
  statusBadgeGreenText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#059669',
  },
  statusBadgeBlue: {
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
  },
  statusBadgeBlueText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#006CFF',
  },
  statusBadgeAmber: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
  },
  statusBadgeAmberText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#D97706',
  },
  recentDate: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginRight: 6,
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
