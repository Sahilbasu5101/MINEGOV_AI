import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/constants/theme';
import {
  BackArrowIcon,
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DocLinesIcon,
  CheckmarkCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  CrossedToolsIcon,
  HardHatIcon,
  LeafIcon,
  BuildingIcon,
  InfoCircleIcon,
  ThreeDotsVerticalIcon,
  HomeTabIcon,
  ChecksTabIcon,
  DocumentsTabIcon,
  ProfileTabIcon,
} from '../../../src/components/icons/TechnicalIcons';

type TabKey = 'home' | 'checks' | 'documents' | 'profile';
type FilterCategory = 'All' | 'Statutory' | 'Equipment' | 'Safety' | 'Regulatory';

interface RecentDocument {
  id: string;
  title: string;
  category: string;
  fileType: 'PDF' | 'XLS';
  fileColor: string;
  fileBg: string;
  dateLabel: string;
  dateValue: string;
  status: 'Valid' | 'Submitted' | 'Expiring Soon';
}

interface DocumentCategory {
  id: string;
  title: string;
  count: string;
  icon: React.ReactNode;
  iconBg: string;
}

export default function DocumentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<TabKey>('documents');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleFilterPress = () => {
    Alert.alert('Filter Documents', 'Select document filter options:', [
      { text: 'All Documents', onPress: () => setSelectedCategory('All') },
      { text: 'Valid Only', onPress: () => {} },
      { text: 'Expiring Soon', onPress: () => {} },
      { text: 'Expired', onPress: () => {} },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleOverflowPress = (docTitle: string) => {
    Alert.alert(docTitle, 'Options:', [
      { text: 'View Document', onPress: () => {} },
      { text: 'Download PDF', onPress: () => {} },
      { text: 'Share', onPress: () => {} },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const recentDocs: RecentDocument[] = [
    {
      id: 'doc-1',
      title: 'Excavator EX-201 – Fitness Certificate',
      category: 'Equipment Certificates',
      fileType: 'PDF',
      fileColor: '#DC2626',
      fileBg: '#FEE2E2',
      dateLabel: 'Valid till',
      dateValue: '12 Mar 2027',
      status: 'Valid',
    },
    {
      id: 'doc-2',
      title: 'DG Set – Electrical Test Report',
      category: 'Electrical Systems',
      fileType: 'PDF',
      fileColor: '#006CFF',
      fileBg: '#EBF5FF',
      dateLabel: 'Valid till',
      dateValue: '20 Jan 2027',
      status: 'Valid',
    },
    {
      id: 'doc-3',
      title: 'Quarterly Compliance Report (Q2 2026)',
      category: 'Statutory Reports',
      fileType: 'XLS',
      fileColor: '#059669',
      fileBg: '#ECFDF5',
      dateLabel: 'Uploaded on',
      dateValue: '15 Jul 2026',
      status: 'Submitted',
    },
    {
      id: 'doc-4',
      title: 'Fire Extinguisher – Inspection Certificate',
      category: 'Safety Certificates',
      fileType: 'PDF',
      fileColor: '#DC2626',
      fileBg: '#FEE2E2',
      dateLabel: 'Valid till',
      dateValue: '05 Nov 2026',
      status: 'Expiring Soon',
    },
  ];

  const docCategories: DocumentCategory[] = [
    {
      id: 'dc-1',
      title: 'Statutory Documents',
      count: '8 documents',
      icon: <ShieldCheckIcon size={20} color="#006CFF" />,
      iconBg: '#EBF5FF',
    },
    {
      id: 'dc-2',
      title: 'Equipment Certificates',
      count: '6 documents',
      icon: <CrossedToolsIcon size={20} color="#006CFF" />,
      iconBg: '#EBF5FF',
    },
    {
      id: 'dc-3',
      title: 'Safety Documents',
      count: '4 documents',
      icon: <HardHatIcon size={20} color="#006CFF" />,
      iconBg: '#EBF5FF',
    },
    {
      id: 'dc-4',
      title: 'Environmental Documents',
      count: '2 documents',
      icon: <LeafIcon size={20} color="#10B981" />,
      iconBg: '#ECFDF5',
    },
    {
      id: 'dc-5',
      title: 'Compliance Reports',
      count: '3 documents',
      icon: <DocLinesIcon size={20} color="#006CFF" />,
      iconBg: '#EBF5FF',
    },
    {
      id: 'dc-6',
      title: 'Regulatory & Legal',
      count: '1 document',
      icon: <BuildingIcon size={20} color="#006CFF" />,
      iconBg: '#EBF5FF',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* 1. Header Bar */}
      <View style={styles.headerBar}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.pressedState]}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Back to Technical Dashboard"
        >
          <BackArrowIcon size={20} color={colors.navy} />
        </Pressable>

        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>Documents & Certificates</Text>
          <Text style={styles.headerSubtitle}>View, download and manage statutory documents</Text>
        </View>
      </View>

      {/* Main Scroll Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Search & Filter Bar */}
        <View style={styles.searchFilterRow}>
          <View style={styles.searchBar}>
            <SearchIcon size={18} color="#7D98C4" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search documents, certificates..."
              placeholderTextColor="#8FA4C5"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.filterButton, pressed && styles.pressedState]}
            onPress={handleFilterPress}
            accessibilityRole="button"
            accessibilityLabel="Filter documents"
          >
            <FilterIcon size={16} color="#006CFF" />
            <Text style={styles.filterButtonText}>Filter</Text>
            <ChevronDownIcon size={12} color="#006CFF" />
          </Pressable>
        </View>

        {/* 3. Category Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsScroll}
        >
          {/* Pill 1: All */}
          <Pressable
            style={[
              styles.filterPill,
              selectedCategory === 'All' ? styles.filterPillActive : styles.filterPillInactive,
            ]}
            onPress={() => setSelectedCategory('All')}
          >
            <DocLinesIcon
              size={14}
              color={selectedCategory === 'All' ? '#006CFF' : '#64748B'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedCategory === 'All' && styles.filterPillTextActive,
              ]}
            >
              All
            </Text>
          </Pressable>

          {/* Pill 2: Statutory */}
          <Pressable
            style={[
              styles.filterPill,
              selectedCategory === 'Statutory' ? styles.filterPillActive : styles.filterPillInactive,
            ]}
            onPress={() => setSelectedCategory('Statutory')}
          >
            <ShieldCheckIcon
              size={14}
              color={selectedCategory === 'Statutory' ? '#006CFF' : '#64748B'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedCategory === 'Statutory' && styles.filterPillTextActive,
              ]}
            >
              Statutory
            </Text>
          </Pressable>

          {/* Pill 3: Equipment */}
          <Pressable
            style={[
              styles.filterPill,
              selectedCategory === 'Equipment' ? styles.filterPillActive : styles.filterPillInactive,
            ]}
            onPress={() => setSelectedCategory('Equipment')}
          >
            <CrossedToolsIcon
              size={14}
              color={selectedCategory === 'Equipment' ? '#006CFF' : '#64748B'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedCategory === 'Equipment' && styles.filterPillTextActive,
              ]}
            >
              Equipment
            </Text>
          </Pressable>

          {/* Pill 4: Safety */}
          <Pressable
            style={[
              styles.filterPill,
              selectedCategory === 'Safety' ? styles.filterPillActive : styles.filterPillInactive,
            ]}
            onPress={() => setSelectedCategory('Safety')}
          >
            <HardHatIcon
              size={14}
              color={selectedCategory === 'Safety' ? '#006CFF' : '#64748B'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedCategory === 'Safety' && styles.filterPillTextActive,
              ]}
            >
              Safety
            </Text>
          </Pressable>

          {/* Pill 5: Regulatory */}
          <Pressable
            style={[
              styles.filterPill,
              selectedCategory === 'Regulatory' ? styles.filterPillActive : styles.filterPillInactive,
            ]}
            onPress={() => setSelectedCategory('Regulatory')}
          >
            <BuildingIcon
              size={14}
              color={selectedCategory === 'Regulatory' ? '#006CFF' : '#64748B'}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedCategory === 'Regulatory' && styles.filterPillTextActive,
              ]}
            >
              Regulatory
            </Text>
          </Pressable>
        </ScrollView>

        {/* 4. Summary Cards (4 Cards) */}
        <View style={styles.summaryGrid}>
          {/* Card 1: 24 Total Documents */}
          <View style={styles.summaryCardBlue}>
            <DocLinesIcon size={20} color="#006CFF" />
            <Text style={styles.summaryNumberBlue}>24</Text>
            <Text style={styles.summaryLabelBlue}>Total Documents</Text>
          </View>

          {/* Card 2: 18 Valid */}
          <View style={styles.summaryCardGreen}>
            <CheckmarkCircleIcon size={20} color="#059669" />
            <Text style={styles.summaryNumberGreen}>18</Text>
            <Text style={styles.summaryLabelGreen}>Valid</Text>
          </View>

          {/* Card 3: 4 Expiring Soon */}
          <View style={styles.summaryCardAmber}>
            <ClockIcon size={20} color="#D97706" />
            <Text style={styles.summaryNumberAmber}>4</Text>
            <Text style={styles.summaryLabelAmber}>Expiring Soon</Text>
          </View>

          {/* Card 4: 2 Expired */}
          <View style={styles.summaryCardRed}>
            <ExclamationCircleIcon size={20} color="#DC2626" />
            <Text style={styles.summaryNumberRed}>2</Text>
            <Text style={styles.summaryLabelRed}>Expired</Text>
          </View>
        </View>

        {/* 5. Recent Documents */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Documents</Text>
          <Pressable
            onPress={() => Alert.alert('All Documents', 'Displaying all documents registry.')}
            style={({ pressed }) => [pressed && styles.pressedState]}
          >
            <Text style={styles.viewAllText}>View All ➔</Text>
          </Pressable>
        </View>

        <View style={styles.cardContainer}>
          {recentDocs.map((doc, index) => {
            const isLast = index === recentDocs.length - 1;
            return (
              <View key={doc.id} style={[styles.docRow, isLast && styles.rowLast]}>
                {/* File Type Badge */}
                <View style={[styles.fileTypeBadge, { backgroundColor: doc.fileBg }]}>
                  <Text style={[styles.fileTypeText, { color: doc.fileColor }]}>
                    {doc.fileType}
                  </Text>
                </View>

                {/* Document Details */}
                <View style={styles.docDetails}>
                  <Text style={styles.docTitle} numberOfLines={1}>
                    {doc.title}
                  </Text>
                  <Text style={styles.docCategory}>{doc.category}</Text>
                </View>

                {/* Date Col */}
                <View style={styles.dateCol}>
                  <Text style={styles.dateLabel}>{doc.dateLabel}</Text>
                  <Text style={styles.dateValue}>{doc.dateValue}</Text>
                </View>

                {/* Status Badge */}
                {doc.status === 'Valid' && (
                  <View style={styles.statusBadgeGreen}>
                    <Text style={styles.statusBadgeGreenText}>Valid</Text>
                  </View>
                )}
                {doc.status === 'Submitted' && (
                  <View style={styles.statusBadgeBlue}>
                    <Text style={styles.statusBadgeBlueText}>Submitted</Text>
                  </View>
                )}
                {doc.status === 'Expiring Soon' && (
                  <View style={styles.statusBadgeAmber}>
                    <Text style={styles.statusBadgeAmberText}>Expiring Soon</Text>
                  </View>
                )}

                {/* 3-Dots Action Button */}
                <Pressable
                  style={({ pressed }) => [styles.overflowButton, pressed && styles.pressedState]}
                  onPress={() => handleOverflowPress(doc.title)}
                  accessibilityRole="button"
                  accessibilityLabel={`Options for ${doc.title}`}
                >
                  <ThreeDotsVerticalIcon size={16} color="#006CFF" />
                </Pressable>
              </View>
            );
          })}
        </View>

        {/* 6. Document Categories (2-Column Grid) */}
        <View style={[styles.sectionHeaderRow, { marginTop: 16 }]}>
          <Text style={styles.sectionTitle}>Document Categories</Text>
        </View>

        <View style={styles.categoriesGrid}>
          {docCategories.map((category) => (
            <Pressable
              key={category.id}
              style={({ pressed }) => [styles.categoryCard, pressed && styles.pressedState]}
              onPress={() =>
                Alert.alert(category.title, `Viewing ${category.count} in this category.`)
              }
              accessibilityRole="button"
              accessibilityLabel={`${category.title}, ${category.count}`}
            >
              <View style={[styles.categoryIconCircle, { backgroundColor: category.iconBg }]}>
                {category.icon}
              </View>

              <View style={styles.categoryInfo}>
                <Text style={styles.categoryCardTitle} numberOfLines={1}>
                  {category.title}
                </Text>
                <Text style={styles.categoryCardCount}>{category.count}</Text>
              </View>

              <ChevronRightIcon size={14} color="#006CFF" />
            </Pressable>
          ))}
        </View>

        {/* 7. Information Banner */}
        <View style={styles.infoBanner}>
          <InfoCircleIcon size={22} color="#006CFF" />
          <Text style={styles.infoBannerText}>
            Keep your documents up to date to ensure compliance and safe operations.
          </Text>
        </View>
      </ScrollView>

      {/* 8. Bottom Navigation Bar - Exactly: Home | Checks | Documents | Profile */}
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

        {/* Documents Tab - Active pill background matching reference image */}
        <Pressable
          style={styles.navItemActivePill}
          onPress={() => setActiveTab('documents')}
        >
          <DocumentsTabIcon size={22} color="#006CFF" />
          <Text style={styles.navTextActivePill}>Documents</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9F1FC',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
  },

  /* Search & Filter */
  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFECFA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.navy,
    marginLeft: 8,
    paddingVertical: 0,
  },
  filterButton: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFECFA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#006CFF',
    marginHorizontal: 5,
  },

  /* Category Filter Pills */
  filterPillsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 12,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  filterPillActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#006CFF',
    borderWidth: 1.5,
  },
  filterPillInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFECFA',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterPillTextActive: {
    color: '#006CFF',
    fontWeight: '800',
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
    minHeight: 90,
    justifyContent: 'space-between',
  },
  summaryCardGreen: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    padding: 10,
    minHeight: 90,
    justifyContent: 'space-between',
  },
  summaryCardAmber: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    padding: 10,
    minHeight: 90,
    justifyContent: 'space-between',
  },
  summaryCardRed: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    padding: 10,
    minHeight: 90,
    justifyContent: 'space-between',
  },
  summaryNumberBlue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#006CFF',
    marginTop: 4,
  },
  summaryLabelBlue: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#006CFF',
  },
  summaryNumberGreen: {
    fontSize: 22,
    fontWeight: '900',
    color: '#059669',
    marginTop: 4,
  },
  summaryLabelGreen: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#059669',
  },
  summaryNumberAmber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#D97706',
    marginTop: 4,
  },
  summaryLabelAmber: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#D97706',
  },
  summaryNumberRed: {
    fontSize: 22,
    fontWeight: '900',
    color: '#DC2626',
    marginTop: 4,
  },
  summaryLabelRed: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#DC2626',
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
  viewAllText: {
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
    marginBottom: 4,
  },

  /* Recent Docs Rows */
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F6FD',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  fileTypeBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  fileTypeText: {
    fontSize: 10,
    fontWeight: '900',
  },
  docDetails: {
    flex: 1,
    marginRight: 6,
  },
  docTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.navy,
  },
  docCategory: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  dateCol: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  dateLabel: {
    fontSize: 10,
    color: '#8FA4C5',
    fontWeight: '500',
  },
  dateValue: {
    fontSize: 11,
    color: colors.navy,
    fontWeight: '700',
    marginTop: 1,
  },
  statusBadgeGreen: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
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
    paddingHorizontal: 8,
    paddingVertical: 3.5,
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
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 6,
    marginRight: 6,
  },
  statusBadgeAmberText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#D97706',
  },
  overflowButton: {
    width: 24,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Document Categories Grid */
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  categoryCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 4,
  },
  categoryCardTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.navy,
  },
  categoryCardCount: {
    fontSize: 10.5,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },

  /* Info Banner */
  infoBanner: {
    backgroundColor: '#EBF5FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CFE2FE',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '500',
    marginLeft: 8,
    lineHeight: 16,
  },

  /* Bottom Navigation Bar */
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1EDFA',
    paddingTop: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    minHeight: 44,
  },
  navItemActivePill: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF2FD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 5,
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
  navTextActivePill: {
    fontSize: 10,
    fontWeight: '800',
    color: '#006CFF',
    marginTop: 2,
  },
});
