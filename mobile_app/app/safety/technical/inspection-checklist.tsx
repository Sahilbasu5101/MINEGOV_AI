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
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/constants/theme';
import {
  BackArrowIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckboxCheckedIcon,
  CheckboxUncheckedIcon,
  MicrophoneIcon,
} from '../../../src/components/icons/TechnicalIcons';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
  remarks?: string;
  isExpandedDefault: boolean;
}

const INITIAL_SECTIONS: ChecklistSection[] = [
  {
    id: '1',
    title: '1. General Condition',
    isExpandedDefault: true,
    items: [
      { id: '1-1', label: 'No visible structural damage', checked: true },
      { id: '1-2', label: 'Clean and fit for operation', checked: true },
      { id: '1-3', label: 'No abnormal noise/vibration', checked: true },
    ],
  },
  {
    id: '2',
    title: '2. Braking System',
    isExpandedDefault: true,
    remarks: '',
    items: [
      { id: '2-1', label: 'Service brakes working properly', checked: true },
      { id: '2-2', label: 'Parking brake functional', checked: true },
      { id: '2-3', label: 'No brake oil leakage', checked: false },
    ],
  },
  {
    id: '3',
    title: '3. Steering System',
    isExpandedDefault: false,
    items: [
      { id: '3-1', label: 'Steering response normal', checked: false },
      { id: '3-2', label: 'Hydraulic steering fluid level adequate', checked: false },
      { id: '3-3', label: 'No steering play or slackness', checked: false },
    ],
  },
  {
    id: '4',
    title: '4. Tyres & Wheels',
    isExpandedDefault: false,
    items: [
      { id: '4-1', label: 'Tyre pressure within statutory limits', checked: false },
      { id: '4-2', label: 'No severe tread wear or cuts', checked: false },
      { id: '4-3', label: 'Wheel rim & lug nuts tight', checked: false },
      { id: '4-4', label: 'Dual tyre spacing clear of rocks', checked: false },
    ],
  },
  {
    id: '5',
    title: '5. Lights, Alarms & Safety Devices',
    isExpandedDefault: false,
    items: [
      { id: '5-1', label: 'Headlights & tail lamps working', checked: false },
      { id: '5-2', label: 'Audio-visual reverse alarm functional', checked: false },
      { id: '5-3', label: 'Emergency steering indicator active', checked: false },
      { id: '5-4', label: 'Rearview mirrors & cameras clean', checked: false },
      { id: '5-5', label: 'Seat belt & rollover cage intact', checked: false },
    ],
  },
  {
    id: '6',
    title: '6. Body / Structure',
    isExpandedDefault: false,
    items: [
      { id: '6-1', label: 'Dump body hoist cylinders leak-free', checked: false },
      { id: '6-2', label: 'Canopy & rock protector secure', checked: false },
      { id: '6-3', label: 'Body rest pads and guide plates aligned', checked: false },
      { id: '6-4', label: 'Tailgate latch & locking mechanism sound', checked: false },
    ],
  },
  {
    id: '7',
    title: '7. Fire Extinguisher',
    isExpandedDefault: false,
    items: [
      { id: '7-1', label: 'Fire extinguisher pressure gauge in green', checked: false },
      { id: '7-2', label: 'Inspection tag valid and nozzle clear', checked: false },
    ],
  },
];

export default function InspectionChecklistScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [sections, setSections] = useState<ChecklistSection[]>(INITIAL_SECTIONS);
  const [expandedSectionIds, setExpandedSectionIds] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
  });
  const [brakingRemarks, setBrakingRemarks] = useState('');

  const toggleSection = (sectionId: string) => {
    setExpandedSectionIds((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleItem = (sectionId: string, itemId: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          ),
        };
      })
    );
  };

  // Calculate progress
  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const checkedItems = sections.reduce(
    (acc, s) => acc + s.items.filter((i) => i.checked).length,
    0
  );
  const progressPercent = Math.round((checkedItems / totalItems) * 100);

  const handleVoiceRecord = () => {
    Alert.alert('Voice Note', 'Voice remark recording initialized for Braking System.');
  };

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push('/safety/technical/findings-remarks');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top Header */}
        <View style={styles.headerBar}>
          <Pressable
            style={({ pressed }) => [styles.backButton, pressed && styles.pressedState]}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Back to Basic Details"
          >
            <BackArrowIcon size={20} color={colors.navy} />
          </Pressable>

          <Text style={styles.headerTitle}>Inspection Checklist</Text>

          <View style={styles.pageBadge}>
            <Text style={styles.pageBadgeText}>Page 2 of 3</Text>
          </View>
        </View>

        {/* Subtitle / Equipment context */}
        <View style={styles.contextBar}>
          <Text style={styles.contextTitle}>Dumper / Haul Truck (DT-105)</Text>
          <Text style={styles.contextSubtitle}>
            Tick the applicable items and add remarks if needed.
          </Text>
        </View>

        {/* Scrollable Checklist */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {sections.map((section) => {
            const isExpanded = !!expandedSectionIds[section.id];
            const checkedCount = section.items.filter((i) => i.checked).length;
            const totalCount = section.items.length;
            const isAllChecked = checkedCount === totalCount && totalCount > 0;
            const isPartial = checkedCount > 0 && checkedCount < totalCount;

            // Determine badge style
            let badgeStyle = styles.badgeGray;
            let badgeTextStyle = styles.badgeTextGray;
            if (isAllChecked) {
              badgeStyle = styles.badgeGreen;
              badgeTextStyle = styles.badgeTextWhite;
            } else if (isPartial) {
              badgeStyle = styles.badgeAmber;
              badgeTextStyle = styles.badgeTextAmber;
            }

            return (
              <View key={section.id} style={styles.sectionCard}>
                {/* Section Header */}
                <Pressable
                  style={styles.sectionHeader}
                  onPress={() => toggleSection(section.id)}
                >
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <View style={styles.sectionHeaderRight}>
                    <View style={[styles.badgePill, badgeStyle]}>
                      <Text style={[styles.badgeText, badgeTextStyle]}>
                        {checkedCount}/{totalCount}
                      </Text>
                    </View>
                    <View style={styles.chevronBox}>
                      {isExpanded ? (
                        <ChevronUpIcon size={16} color={colors.navy} />
                      ) : (
                        <ChevronDownIcon size={16} color={colors.navy} />
                      )}
                    </View>
                  </View>
                </Pressable>

                {/* Section Content */}
                {isExpanded && (
                  <View style={styles.sectionBody}>
                    {section.items.map((item) => (
                      <Pressable
                        key={item.id}
                        style={styles.checkItemRow}
                        onPress={() => toggleItem(section.id, item.id)}
                      >
                        <View style={styles.checkboxWrapper}>
                          {item.checked ? (
                            <CheckboxCheckedIcon size={20} color="#006CFF" />
                          ) : (
                            <CheckboxUncheckedIcon size={20} color="#C9D9F3" />
                          )}
                        </View>
                        <Text style={styles.checkItemLabel}>{item.label}</Text>
                      </Pressable>
                    ))}

                    {/* Remarks Input for Braking System (Section 2) */}
                    {section.id === '2' && (
                      <View style={styles.remarksInputContainer}>
                        <TextInput
                          style={styles.remarksTextInput}
                          placeholder="Add remarks (if any)"
                          placeholderTextColor="#7D98C4"
                          value={brakingRemarks}
                          onChangeText={setBrakingRemarks}
                        />
                        <Pressable
                          style={({ pressed }) => [styles.micButton, pressed && styles.pressedState]}
                          onPress={handleVoiceRecord}
                          accessibilityRole="button"
                          accessibilityLabel="Record voice note"
                        >
                          <MicrophoneIcon size={18} color="#006CFF" />
                        </Pressable>
                      </View>
                    )}
                  </View>
                )}
              </View>
            );
          })}

          {/* Overall Progress Box */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressLabel}>Overall Progress</Text>
              <View style={styles.progressStats}>
                <Text style={styles.progressCount}>{checkedItems}/{totalItems}</Text>
                <Text style={styles.progressPercent}>{progressPercent}%</Text>
              </View>
            </View>
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.max(5, progressPercent)}%` },
                ]}
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation Buttons */}
        <View style={[styles.bottomBar, { paddingBottom: Math.max(12, insets.bottom + 8) }]}>
          <Pressable
            style={({ pressed }) => [styles.backActionButton, pressed && styles.pressedState]}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <Text style={styles.backActionText}>← Back</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.nextActionButton, pressed && styles.pressedState]}
            onPress={handleNext}
            accessibilityRole="button"
            accessibilityLabel="Next"
          >
            <Text style={styles.nextActionText}>Next ➔</Text>
          </Pressable>
        </View>
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
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedState: {
    opacity: 0.75,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.2,
  },
  pageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#EAF2FC',
  },
  pageBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#006CFF',
  },
  contextBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9F1FC',
  },
  contextTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.navy,
  },
  contextSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
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
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFECFA',
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.navy,
  },
  sectionHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeGreen: {
    backgroundColor: '#0B9E5A',
  },
  badgeAmber: {
    backgroundColor: '#FEF7E6',
    borderWidth: 1,
    borderColor: '#F9A825',
  },
  badgeGray: {
    backgroundColor: '#F0F4FA',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  badgeTextWhite: {
    color: '#FFFFFF',
  },
  badgeTextAmber: {
    color: '#D97706',
  },
  badgeTextGray: {
    color: '#6585B5',
  },
  chevronBox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionBody: {
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F6FD',
  },
  checkItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkboxWrapper: {
    marginRight: 10,
  },
  checkItemLabel: {
    flex: 1,
    fontSize: 13,
    color: colors.navy,
    fontWeight: '500',
  },
  remarksInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#F7FBFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFECFA',
    paddingHorizontal: 12,
    marginTop: 6,
  },
  remarksTextInput: {
    flex: 1,
    fontSize: 12,
    color: colors.navy,
    height: '100%',
  },
  micButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.navy,
  },
  progressStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCount: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy,
    marginRight: 8,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '800',
    color: '#006CFF',
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8F1FC',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#006CFF',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1EDFA',
  },
  backActionButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backActionText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#006CFF',
  },
  nextActionButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#006CFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#006CFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  nextActionText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
