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
  BackArrowIcon,
  UserCircleIcon,
  BuildingIcon,
  LocationPinIcon,
  CalendarIcon,
  CrossCircleIcon,
  AlertTriangleIcon,
  DocLinesIcon,
  ImageSquareIcon,
  CheckboxCheckedIcon,
  CheckboxUncheckedIcon,
  SendIcon,
} from '../../../src/components/icons/TechnicalIcons';

import { useTechnicalExamination } from '../../../src/context/technical-examination-context';

export default function ReviewSubmitScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const insets = useSafeAreaInsets();
  const { dateTimeString, photos, videos, documents } = useTechnicalExamination();

  const [confirmed, setConfirmed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Authoritative reference values for review
  const reporterName = session?.user.name || 'Amit Kumar (E0012)';
  const department = 'Technical Department';
  const location = 'Kusunda Coal Mine\nWorking Face - 1';
  const dateTime = dateTimeString;
  const overallResult = 'Defect Identified';
  const severity = 'Medium';
  const nextDueDate = '11 Dec 2026';
  const summary =
    'Minor hydraulic hose leakage observed near the left rear wheel. Otherwise equipment is in good working condition.';

  const evidenceParts: string[] = [];
  if (photos.length > 0) evidenceParts.push(`${photos.length} Photo${photos.length > 1 ? 's' : ''}`);
  if (videos.length > 0) evidenceParts.push(`${videos.length} Video${videos.length > 1 ? 's' : ''}`);
  if (documents.length > 0) evidenceParts.push(`${documents.length} File${documents.length > 1 ? 's' : ''}`);
  const evidence = evidenceParts.length > 0 ? evidenceParts.join(', ') : 'None attached';

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (!confirmed) {
      Alert.alert('Confirmation Required', 'Please confirm that the statutory examination information is correct.');
      return;
    }
    setIsSubmitted(true);
    router.push('/safety/technical/report-confirmation');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <View style={styles.headerBar}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.pressedState]}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Back to Add Evidence"
        >
          <BackArrowIcon size={20} color={colors.navy} />
        </Pressable>

        <Text style={styles.headerTitle}>Review Check Report</Text>

        {/* Balance spacer */}
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Equipment Summary Card */}
        <View style={styles.equipmentCard}>
          <View style={styles.thumbContainer}>
            <Image
              source={require('../../../assets/images/technical/dumper_thumb.png')}
              style={styles.thumbImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.equipmentInfo}>
            <Text style={styles.equipmentTitle}>Dumper / Haul Truck</Text>
            <Text style={styles.equipmentId}>ID: DT-105</Text>
          </View>

          <View style={styles.haulageBadge}>
            <Text style={styles.haulageBadgeText}>Haulage</Text>
          </View>
        </View>

        {/* Review Key-Value Details Card */}
        <View style={styles.detailsCard}>
          {/* Row 1: Reported By */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <UserCircleIcon size={18} color="#006CFF" />
            </View>
            <Text style={styles.detailLabel}>Reported By</Text>
            <Text style={styles.detailValueBold}>{reporterName}</Text>
          </View>

          {/* Row 2: Department */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <BuildingIcon size={18} color="#006CFF" />
            </View>
            <Text style={styles.detailLabel}>Department</Text>
            <Text style={styles.detailValue}>{department}</Text>
          </View>

          {/* Row 3: Location */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <LocationPinIcon size={18} color="#006CFF" />
            </View>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValueRightMultiline}>{location}</Text>
          </View>

          {/* Row 4: Date & Time */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <CalendarIcon size={18} color="#006CFF" />
            </View>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{dateTime}</Text>
          </View>

          {/* Row 5: Overall Result */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <CrossCircleIcon size={18} color="#D93025" />
            </View>
            <Text style={styles.detailLabel}>Overall Result</Text>
            <Text style={styles.resultValueDefect}>{overallResult}</Text>
          </View>

          {/* Row 6: Severity */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <AlertTriangleIcon size={18} color="#E99000" />
            </View>
            <Text style={styles.detailLabel}>Severity</Text>
            <Text style={styles.severityValueMedium}>{severity}</Text>
          </View>

          {/* Row 7: Next Due Date */}
          <View style={styles.detailRow}>
            <View style={styles.detailIconBox}>
              <CalendarIcon size={18} color="#006CFF" />
            </View>
            <Text style={styles.detailLabel}>Next Due Date</Text>
            <Text style={styles.detailValue}>{nextDueDate}</Text>
          </View>

          {/* Row 8: Summary */}
          <View style={styles.detailRowStacked}>
            <View style={styles.summaryLabelRow}>
              <View style={styles.detailIconBox}>
                <DocLinesIcon size={18} color="#006CFF" />
              </View>
              <Text style={styles.detailLabel}>Summary</Text>
            </View>
            <Text style={styles.summaryValueText}>{summary}</Text>
          </View>

          {/* Row 9: Evidence */}
          <View style={[styles.detailRow, styles.detailRowLast]}>
            <View style={styles.detailIconBox}>
              <ImageSquareIcon size={18} color="#006CFF" />
            </View>
            <Text style={styles.detailLabel}>Evidence</Text>
            <Text style={styles.detailValue}>{evidence}</Text>
          </View>
        </View>

        {/* Confirmation Checkbox Card */}
        <Pressable
          style={styles.confirmationCard}
          onPress={() => setConfirmed(!confirmed)}
        >
          <View style={styles.checkboxContainer}>
            {confirmed ? (
              <CheckboxCheckedIcon size={20} color="#006CFF" />
            ) : (
              <CheckboxUncheckedIcon size={20} color="#C9D9F3" />
            )}
          </View>
          <Text style={styles.confirmationText}>
            I confirm that the above information is correct and this statutory examination has been carried out by me.
          </Text>
        </Pressable>
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
          style={({ pressed }) => [styles.submitActionButton, pressed && styles.pressedState]}
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityLabel="Submit Report"
        >
          <Text style={styles.submitActionText}>Submit Report</Text>
          <View style={styles.sendIconWrapper}>
            <SendIcon size={16} color="#FFFFFF" />
          </View>
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
  headerRightSpacer: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
  },
  equipmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 12,
    marginBottom: 12,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbContainer: {
    width: 60,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F3F7FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  thumbImage: {
    width: '92%',
    height: '92%',
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.navy,
  },
  equipmentId: {
    fontSize: 11.5,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  haulageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#E9F7EF',
  },
  haulageBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B9E5A',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFECFA',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 12,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F6FD',
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailRowStacked: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F6FD',
  },
  summaryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIconBox: {
    width: 24,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailLabel: {
    fontSize: 12.5,
    color: colors.textMuted,
    fontWeight: '600',
    width: 105,
  },
  detailValue: {
    flex: 1,
    fontSize: 12.5,
    color: colors.navy,
    fontWeight: '600',
    textAlign: 'left',
  },
  detailValueBold: {
    flex: 1,
    fontSize: 12.5,
    color: colors.navy,
    fontWeight: '800',
    textAlign: 'left',
  },
  detailValueRightMultiline: {
    flex: 1,
    fontSize: 12.5,
    color: colors.navy,
    fontWeight: '600',
    lineHeight: 16,
  },
  resultValueDefect: {
    flex: 1,
    fontSize: 12.5,
    color: '#D93025',
    fontWeight: '800',
  },
  severityValueMedium: {
    flex: 1,
    fontSize: 12.5,
    color: '#E99000',
    fontWeight: '800',
  },
  summaryValueText: {
    fontSize: 12,
    color: colors.navy,
    lineHeight: 16,
    paddingLeft: 32,
    fontWeight: '500',
  },
  confirmationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 12,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginRight: 10,
    marginTop: 2,
  },
  confirmationText: {
    flex: 1,
    fontSize: 11.5,
    color: colors.navy,
    lineHeight: 16,
    fontWeight: '500',
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
  submitActionButton: {
    flex: 1.3,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#0B9E5A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0B9E5A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  submitActionText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 6,
  },
  sendIconWrapper: {
    marginLeft: 2,
  },
});
