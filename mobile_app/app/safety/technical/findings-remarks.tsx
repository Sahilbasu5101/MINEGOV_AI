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
  CalendarIcon,
  CheckmarkCircleIcon,
  CrossCircleIcon,
} from '../../../src/components/icons/TechnicalIcons';

export default function FindingsRemarksScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [overallResult, setOverallResult] = useState<'compliant' | 'defect'>('defect');
  const [findingsSummary, setFindingsSummary] = useState(
    'Minor hydraulic hose leakage observed near the left rear wheel. Otherwise equipment is in good working condition.'
  );
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [recommendedAction, setRecommendedAction] = useState(
    'Replace hydraulic hose during next scheduled maintenance. Monitor for further leakage.'
  );
  const [nextDueDate, setNextDueDate] = useState('11 Dec 2026');
  const [additionalRemarks, setAdditionalRemarks] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push('/safety/technical/add-evidence');
  };

  const handleSelectDate = () => {
    Alert.alert('Next Due Date', 'Select next scheduled examination date (11 Dec 2026).');
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
            accessibilityLabel="Back to Inspection Checklist"
          >
            <BackArrowIcon size={20} color={colors.navy} />
          </Pressable>

          <Text style={styles.headerTitle}>Findings & Remarks</Text>

          <View style={styles.pageBadge}>
            <Text style={styles.pageBadgeText}>Page 3 of 3</Text>
          </View>
        </View>

        {/* Form Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Section 1: Overall Result */}
          <View style={styles.sectionGroup}>
            <Text style={styles.fieldLabel}>
              Overall Result<Text style={styles.requiredAsterisk}> *</Text>
            </Text>

            <View style={styles.resultCardsRow}>
              {/* Compliant Option */}
              <Pressable
                style={[
                  styles.resultCard,
                  overallResult === 'compliant' && styles.resultCardCompliantSelected,
                ]}
                onPress={() => setOverallResult('compliant')}
              >
                <CheckmarkCircleIcon size={34} color="#0B9E5A" />
                <Text style={styles.compliantTitle}>Compliant</Text>
                <Text style={styles.resultDesc}>No major issues found.</Text>
                {overallResult === 'compliant' && (
                  <View style={styles.selectedIndicatorCircle}>
                    <View style={styles.selectedIndicatorDot} />
                  </View>
                )}
              </Pressable>

              {/* Defect Identified Option */}
              <Pressable
                style={[
                  styles.resultCard,
                  overallResult === 'defect' && styles.resultCardDefectSelected,
                ]}
                onPress={() => setOverallResult('defect')}
              >
                <CrossCircleIcon size={34} color="#D93025" />
                <Text style={styles.defectTitle}>Defect Identified</Text>
                <Text style={styles.resultDesc}>Issues found, action required.</Text>
                {overallResult === 'defect' && (
                  <View style={styles.selectedIndicatorCircle}>
                    <View style={styles.selectedIndicatorDot} />
                  </View>
                )}
              </Pressable>
            </View>
          </View>

          {/* Section 2: Findings Summary */}
          <View style={styles.sectionGroup}>
            <Text style={styles.fieldLabel}>
              Findings Summary<Text style={styles.requiredAsterisk}> *</Text>
            </Text>
            <View style={styles.textareaContainer}>
              <TextInput
                style={styles.textareaInput}
                value={findingsSummary}
                onChangeText={setFindingsSummary}
                placeholder="Enter findings summary..."
                placeholderTextColor="#7D98C4"
                multiline
                numberOfLines={3}
                maxLength={500}
                textAlignVertical="top"
              />
              <Text style={styles.charCountText}>{findingsSummary.length}/500</Text>
            </View>
          </View>

          {/* Section 3: Severity Level */}
          <View style={styles.sectionGroup}>
            <Text style={styles.fieldLabel}>
              Severity Level<Text style={styles.requiredAsterisk}> *</Text>
            </Text>
            <View style={styles.severityRow}>
              {/* Low */}
              <Pressable
                style={[
                  styles.severityOption,
                  severity === 'low' && styles.severityOptionLowActive,
                ]}
                onPress={() => setSeverity('low')}
              >
                <View
                  style={[
                    styles.radioCircle,
                    severity === 'low' && styles.radioCircleActive,
                  ]}
                />
                <Text
                  style={[
                    styles.severityLabel,
                    severity === 'low' && styles.severityLabelActive,
                  ]}
                >
                  Low
                </Text>
              </Pressable>

              {/* Medium */}
              <Pressable
                style={[
                  styles.severityOption,
                  severity === 'medium' && styles.severityOptionMediumActive,
                ]}
                onPress={() => setSeverity('medium')}
              >
                <View style={styles.mediumPillCheck}>
                  <Text style={styles.mediumCheckmark}>✓</Text>
                </View>
                <Text style={styles.mediumLabelActive}>Medium</Text>
              </Pressable>

              {/* High */}
              <Pressable
                style={[
                  styles.severityOption,
                  severity === 'high' && styles.severityOptionHighActive,
                ]}
                onPress={() => setSeverity('high')}
              >
                <View
                  style={[
                    styles.radioCircle,
                    styles.radioCircleRed,
                    severity === 'high' && styles.radioCircleActiveRed,
                  ]}
                />
                <Text
                  style={[
                    styles.severityLabel,
                    severity === 'high' && styles.severityLabelRedActive,
                  ]}
                >
                  High
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Section 4: Recommended Action */}
          <View style={styles.sectionGroup}>
            <Text style={styles.fieldLabel}>Recommended Action</Text>
            <View style={styles.textareaContainer}>
              <TextInput
                style={styles.textareaInput}
                value={recommendedAction}
                onChangeText={setRecommendedAction}
                placeholder="Enter recommended action..."
                placeholderTextColor="#7D98C4"
                multiline
                numberOfLines={3}
                maxLength={500}
                textAlignVertical="top"
              />
              <Text style={styles.charCountText}>{recommendedAction.length}/500</Text>
            </View>
          </View>

          {/* Section 5: Next Due Date */}
          <View style={styles.sectionGroup}>
            <Text style={styles.fieldLabel}>
              Next Due Date<Text style={styles.requiredAsterisk}> *</Text>
            </Text>
            <Pressable
              style={styles.dateInputContainer}
              onPress={handleSelectDate}
            >
              <TextInput
                style={styles.dateTextInput}
                value={nextDueDate}
                onChangeText={setNextDueDate}
                placeholder="DD Mon YYYY"
                placeholderTextColor="#7D98C4"
              />
              <View style={styles.calendarIconWrapper}>
                <CalendarIcon size={18} color="#006CFF" />
              </View>
            </Pressable>
          </View>

          {/* Section 6: Additional Remarks (Optional) */}
          <View style={styles.sectionGroup}>
            <Text style={styles.fieldLabel}>Additional Remarks (Optional)</Text>
            <View style={styles.textareaContainer}>
              <TextInput
                style={styles.textareaInput}
                value={additionalRemarks}
                onChangeText={setAdditionalRemarks}
                placeholder="Add any additional remarks..."
                placeholderTextColor="#7D98C4"
                multiline
                numberOfLines={3}
                maxLength={500}
                textAlignVertical="top"
              />
              <Text style={styles.charCountText}>{additionalRemarks.length}/500</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 20,
  },
  sectionGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 6,
    marginLeft: 2,
  },
  requiredAsterisk: {
    color: '#D93025',
    fontWeight: '800',
  },
  resultCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#DFECFA',
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    position: 'relative',
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  resultCardCompliantSelected: {
    backgroundColor: '#F3FBF7',
    borderColor: '#0B9E5A',
  },
  resultCardDefectSelected: {
    backgroundColor: '#FFF7F7',
    borderColor: '#E53E3E',
  },
  compliantTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0B9E5A',
    marginTop: 6,
    marginBottom: 2,
  },
  defectTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#D93025',
    marginTop: 6,
    marginBottom: 2,
  },
  resultDesc: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 13,
  },
  selectedIndicatorCircle: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#006CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#006CFF',
  },
  textareaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 12,
  },
  textareaInput: {
    fontSize: 13,
    color: colors.navy,
    minHeight: 64,
    lineHeight: 18,
  },
  charCountText: {
    fontSize: 10,
    color: '#8BA6CD',
    textAlign: 'right',
    marginTop: 4,
  },
  severityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  severityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFECFA',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 3,
  },
  severityOptionLowActive: {
    borderColor: '#006CFF',
    backgroundColor: '#F0F6FF',
  },
  severityOptionMediumActive: {
    borderColor: '#F9A825',
    backgroundColor: '#FEF7E6',
  },
  severityOptionHighActive: {
    borderColor: '#D93025',
    backgroundColor: '#FFF7F7',
  },
  radioCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.6,
    borderColor: '#8BA6CD',
    marginRight: 6,
  },
  radioCircleActive: {
    borderColor: '#006CFF',
    borderWidth: 4,
  },
  radioCircleRed: {
    borderColor: '#E53E3E',
  },
  radioCircleActiveRed: {
    borderColor: '#D93025',
    borderWidth: 4,
  },
  mediumPillCheck: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F9A825',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  mediumCheckmark: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  severityLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.navy,
  },
  severityLabelActive: {
    color: '#006CFF',
    fontWeight: '800',
  },
  mediumLabelActive: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#D97706',
  },
  severityLabelRedActive: {
    color: '#D93025',
    fontWeight: '800',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFECFA',
    paddingHorizontal: 12,
  },
  dateTextInput: {
    flex: 1,
    fontSize: 13.5,
    color: colors.navy,
    fontWeight: '600',
  },
  calendarIconWrapper: {
    paddingLeft: 8,
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
