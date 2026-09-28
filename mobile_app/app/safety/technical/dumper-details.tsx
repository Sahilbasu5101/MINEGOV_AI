import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
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
  EquipmentBadgeIcon,
  LocationPinIcon,
  CalendarIcon,
  ClockIcon,
  QrScanIcon,
} from '../../../src/components/icons/TechnicalIcons';

import { useTechnicalExamination } from '../../../src/context/technical-examination-context';

export default function DumperDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { examDate, examTime } = useTechnicalExamination();

  // Form states initialized with authoritative reference values
  const [equipmentId, setEquipmentId] = useState('DT-105');
  const [equipmentName, setEquipmentName] = useState('Dumper / Haul Truck');
  const [makeModel, setMakeModel] = useState('Komatsu HD785');
  const [serialNumber, setSerialNumber] = useState('KMT785-4587');
  const [mineSite, setMineSite] = useState('Kusunda Coal Mine');
  const [workingArea, setWorkingArea] = useState('Working Face - 1');
  const [exactLocation, setExactLocation] = useState('Near Loading Point');

  const handleScanQr = () => {
    Alert.alert('Asset Scanner', 'Barcode / QR code scanning initialized for DT-105.');
  };

  const handleSelectMineSite = () => {
    Alert.alert('Mine / Site', 'Kusunda Coal Mine (Selected)');
  };

  const handleSelectWorkingArea = () => {
    Alert.alert('Working Area / Section', 'Working Face - 1 (Selected)');
  };

  const handleCancel = () => {
    router.back();
  };

  const handleNext = () => {
    router.push('/safety/technical/inspection-checklist');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Back to Equipment List"
          >
            <BackArrowIcon size={20} color={colors.navy} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Basic Details</Text>

          <View style={styles.pageBadge}>
            <Text style={styles.pageBadgeText}>Page 1 of 3</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(32, insets.bottom + 24) },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Equipment Summary Header Card */}
          <View style={styles.equipmentSummaryCard}>
            <View style={styles.equipmentThumbContainer}>
              <Image
                source={require('../../../assets/images/technical/dumper_thumb.png')}
                style={styles.equipmentThumbImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.equipmentSummaryInfo}>
              <Text style={styles.equipmentSummaryTitle}>Dumper / Haul Truck</Text>
              <Text style={styles.equipmentSummaryId}>ID: DT-105</Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Active</Text>
            </View>
          </View>

          {/* Section 1: Equipment Information */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <EquipmentBadgeIcon size={18} color="#006CFF" />
              <Text style={styles.sectionHeaderText}>Equipment Information</Text>
            </View>

            {/* Field 1: Equipment ID / Asset No. */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                Equipment ID / Asset No.<Text style={styles.requiredAsterisk}> *</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={equipmentId}
                  onChangeText={setEquipmentId}
                  placeholder="e.g. DT-105"
                  placeholderTextColor="#7D98C4"
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  style={styles.inputRightAction}
                  onPress={handleScanQr}
                  activeOpacity={0.7}
                >
                  <QrScanIcon size={20} color="#006CFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Field 2: Equipment Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                Equipment Name<Text style={styles.requiredAsterisk}> *</Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={equipmentName}
                  onChangeText={setEquipmentName}
                  placeholder="e.g. Dumper / Haul Truck"
                  placeholderTextColor="#7D98C4"
                />
              </View>
            </View>

            {/* Field 3: Make & Model */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Make & Model</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={makeModel}
                  onChangeText={setMakeModel}
                  placeholder="e.g. Komatsu HD785"
                  placeholderTextColor="#7D98C4"
                />
              </View>
            </View>

            {/* Field 4: Serial Number */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Serial Number</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={serialNumber}
                  onChangeText={setSerialNumber}
                  placeholder="e.g. KMT785-4587"
                  placeholderTextColor="#7D98C4"
                  autoCapitalize="characters"
                />
              </View>
            </View>
          </View>

          {/* Section 2: Location Details */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <LocationPinIcon size={18} color="#006CFF" />
              <Text style={styles.sectionHeaderText}>Location Details</Text>
            </View>

            {/* Field 5: Mine / Site */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                Mine / Site<Text style={styles.requiredAsterisk}> *</Text>
              </Text>
              <TouchableOpacity
                style={styles.dropdownContainer}
                onPress={handleSelectMineSite}
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownValueText}>{mineSite}</Text>
                <ChevronDownIcon size={16} color="#07115B" />
              </TouchableOpacity>
            </View>

            {/* Field 6: Working Area / Section */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                Working Area / Section<Text style={styles.requiredAsterisk}> *</Text>
              </Text>
              <TouchableOpacity
                style={styles.dropdownContainer}
                onPress={handleSelectWorkingArea}
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownValueText}>{workingArea}</Text>
                <ChevronDownIcon size={16} color="#07115B" />
              </TouchableOpacity>
            </View>

            {/* Field 7: Exact Location / Landmark */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Exact Location / Landmark</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={exactLocation}
                  onChangeText={setExactLocation}
                  placeholder="e.g. Near Loading Point"
                  placeholderTextColor="#7D98C4"
                />
              </View>
            </View>
          </View>

          {/* Section 3: Examination Details */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <CalendarIcon size={18} color="#006CFF" />
              <Text style={styles.sectionHeaderText}>Examination Details</Text>
            </View>

            {/* Date & Time Row */}
            <View style={styles.rowTwoColumns}>
              {/* Date Column */}
              <View style={styles.columnLeft}>
                <Text style={styles.fieldLabel}>
                  Date of Examination<Text style={styles.requiredAsterisk}> *</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.textInput, styles.readOnlyInput]}
                    value={examDate}
                    editable={false}
                    placeholder="DD Mon YYYY"
                    placeholderTextColor="#7D98C4"
                  />
                  <View style={styles.inputRightAction}>
                    <CalendarIcon size={18} color="#006CFF" />
                  </View>
                </View>
              </View>

              {/* Time Column */}
              <View style={styles.columnRight}>
                <Text style={styles.fieldLabel}>
                  Time<Text style={styles.requiredAsterisk}> *</Text>
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.textInput, styles.readOnlyInput]}
                    value={examTime}
                    editable={false}
                    placeholder="HH:MM"
                    placeholderTextColor="#7D98C4"
                  />
                  <View style={styles.inputRightAction}>
                    <ClockIcon size={18} color="#006CFF" />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Action Buttons (Cancel / Next) */}
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Cancel"
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.88}
              accessibilityRole="button"
              accessibilityLabel="Next"
            >
              <Text style={styles.nextButtonText}>Next ➔</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  equipmentSummaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 12,
    marginBottom: 14,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  equipmentThumbContainer: {
    width: 64,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#F3F7FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  equipmentThumbImage: {
    width: '92%',
    height: '92%',
  },
  equipmentSummaryInfo: {
    flex: 1,
  },
  equipmentSummaryTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.navy,
  },
  equipmentSummaryId: {
    fontSize: 11.5,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#E9F7EF',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B9E5A',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.navy,
    marginLeft: 8,
  },
  fieldGroup: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 4,
    marginLeft: 2,
  },
  requiredAsterisk: {
    color: '#D93025',
    fontWeight: '800',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFECFA',
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 13.5,
    color: colors.navy,
    fontWeight: '500',
  },
  readOnlyInput: {
    color: colors.navy,
  },
  inputRightAction: {
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFECFA',
    paddingHorizontal: 12,
  },
  dropdownValueText: {
    fontSize: 13.5,
    color: colors.navy,
    fontWeight: '500',
  },
  rowTwoColumns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnLeft: {
    flex: 1,
    marginRight: 10,
  },
  columnRight: {
    flex: 1,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  cancelButton: {
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
  cancelButtonText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#006CFF',
  },
  nextButton: {
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
  nextButtonText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
