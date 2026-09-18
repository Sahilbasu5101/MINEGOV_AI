import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '../../../src/context/auth-context';


import {
  RedAlertShieldIcon,
  BlueClipboardIcon,
  GpsCrosshairIcon,
  DocumentNoteIcon,
  MicAudioIcon,
  CameraPhotoIcon,
  VideoRecordIcon,
  PaperclipFileIcon,
  SparklesAiIcon,
  WrenchToolIcon,
  ChatRemarksIcon,
  InfoIcon,
  CloseDeleteIcon,
  PlayTriangleIcon,
  PauseBarsIcon,
  PencilEditIcon,
  PlusCircleIcon,
} from '../../../src/components/icons/ReportIssueIcons';
import {
  ClockTimeIcon,
  MapTargetPinIcon,
  SirdarAvatarIcon,
} from '../../../src/components/icons/InspectionIcons';
import { inspectionStorage } from '../../../src/storage/inspection-storage';

export type EvidenceType = 'image' | 'video' | 'audio' | 'file';

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  uri: string;
  name: string;
  size?: number;
  duration?: number;
  isSample?: boolean;
}

const ACTION_TAKEN_OPTIONS = [
  'Area barricaded / Work stopped',
  'Equipment isolated / Tagged out',
  'Warning signs placed',
  'Verbal warning issued to operator',
  'Immediate repairs initiated',
  'None required / Monitored',
];

const LOCATION_CHOICES = [
  'Working Face - 1',
  'Working Face - 2',
  'Haul Road North - Ch. 4',
  'Main Pit Bench 3B',
  'Conveyor Transfer Point 2',
  'Substation Yard B',
];

export default function SirdarReportIssueScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { session } = useAuth();
  const params = useLocalSearchParams<{
    itemId?: string;
    itemNumber?: string;
    itemTitle?: string;
    itemDescription?: string;
    itemCategory?: string;
    mineSite?: string;
    mineLocationDetails?: string;
    workingLocation?: string;
    dateSubtitle?: string;
    shift?: string;
  }>();

  // Selected Checklist Item Details (from params or defaults matching the reference mockup)
  const checklistCategory = params.itemCategory || 'Machinery & Equipment';
  const checklistTitle = params.itemTitle || 'Guards / Protective Covers';
  const checklistDescription =
    params.itemDescription ||
    'Check that guards and protective covers are intact and in place.';

  // Location and Site Details
  const mineSite = params.mineSite || 'Kusunda Coal Mine';
  const mineLocationDetails = params.mineLocationDetails || 'Bokaro, Jharkhand';
  const [workingLocation, setWorkingLocation] = useState(
    params.workingLocation || 'Working Face - 1'
  );
  const dateTimeString = params.dateSubtitle || '11 Sep 2026, 10:18 AM';
  const gpsCoordsString = '23.6789° N, 86.4521° E';

  // Form State
  const [observationText, setObservationText] = useState(
    'Conveyor guard is damaged and loose near the drive end. There is a risk of entanglement.'
  );
  const [selectedAction, setSelectedAction] = useState(
    'Area barricaded / Work stopped'
  );
  const [remarksText, setRemarksText] = useState('');

  // Modals
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [addMoreModalVisible, setAddMoreModalVisible] = useState(false);

  // Evidence Items State (pre-populated with 2 sample inspection photos to mirror reference UI)
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([
    {
      id: 'sample-photo-1',
      type: 'image',
      uri: Image.resolveAssetSource(
        require('../../../assets/images/conveyor_guard_1.jpg')
      ).uri,
      name: 'Conveyor Guard Damaged',
      isSample: true,
    },
    {
      id: 'sample-photo-2',
      type: 'image',
      uri: Image.resolveAssetSource(
        require('../../../assets/images/conveyor_guard_2.jpg')
      ).uri,
      name: 'Drive End Mesh Loose',
      isSample: true,
    },
  ]);

  // Audio Recording State
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Audio Playback State
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const playbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // User details
  const employeeId =
    session?.user.employeeId === 'TEST-SIR-001'
      ? 'EMP00123'
      : session?.user.employeeId || 'EMP00123';

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
      }
    };
  }, []);

  // -------------------------------------------------------------
  // 1. Take Photo (Real Camera)
  // -------------------------------------------------------------
  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Camera access is required to take photos of safety hazards in the mine. Please grant camera permission in device settings.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newItem: EvidenceItem = {
          id: `photo-${Date.now()}`,
          type: 'image',
          uri: asset.uri,
          name: asset.fileName || `Photo_${Date.now()}.jpg`,
          size: asset.fileSize,
        };
        setEvidenceList((prev) => [...prev, newItem]);
      }
    } catch (error) {
      console.warn('Take photo error:', error);
      Alert.alert(
        'Camera Error',
        'Could not access the camera. Please check device permissions and try again.'
      );
    }
  };

  // -------------------------------------------------------------
  // 2. Record Video (Real Camera Video Recorder)
  // -------------------------------------------------------------
  const handleRecordVideo = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Camera access is required to record video evidence of the hazard. Please grant camera permission in device settings.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['videos'],
        quality: 0.8,
        videoMaxDuration: 60,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newItem: EvidenceItem = {
          id: `video-${Date.now()}`,
          type: 'video',
          uri: asset.uri,
          name: asset.fileName || `Video_${Date.now()}.mp4`,
          duration: asset.duration ? Math.round(asset.duration / 1000) : undefined,
          size: asset.fileSize,
        };
        setEvidenceList((prev) => [...prev, newItem]);
      }
    } catch (error) {
      console.warn('Record video error:', error);
      Alert.alert(
        'Video Recorder Error',
        'Could not start video recording. Please check permissions and try again.'
      );
    }
  };

  // -------------------------------------------------------------
  // 3. Voice Note (Audio Recorder & Playback Controls)
  // -------------------------------------------------------------
  const startAudioRecording = () => {
    setIsRecordingAudio(true);
    setRecordingSeconds(0);

    recordingTimerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 120) {
          // Stop at 2 minutes max
          stopAudioRecording();
          return 120;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopAudioRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setIsRecordingAudio(false);

    const duration = recordingSeconds > 0 ? recordingSeconds : 3;
    const newItem: EvidenceItem = {
      id: `audio-${Date.now()}`,
      type: 'audio',
      uri: `voice_note_${Date.now()}.m4a`,
      name: `Voice Note (${formatTime(duration)})`,
      duration,
    };
    setEvidenceList((prev) => [...prev, newItem]);
    setRecordingSeconds(0);
  };

  const cancelAudioRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setIsRecordingAudio(false);
    setRecordingSeconds(0);
  };

  const handleToggleAudioPlayback = (item: EvidenceItem) => {
    if (playingAudioId === item.id) {
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
      setPlayingAudioId(null);
      return;
    }

    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
      playbackTimerRef.current = null;
    }

    setPlayingAudioId(item.id);
    playbackTimerRef.current = setTimeout(() => {
      setPlayingAudioId(null);
      playbackTimerRef.current = null;
    }, (item.duration || 3) * 1000);
  };

  // -------------------------------------------------------------
  // 4. Attach File (Phone Document Picker)
  // -------------------------------------------------------------
  const handleAttachFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newItem: EvidenceItem = {
          id: `file-${Date.now()}`,
          type: 'file',
          uri: file.uri,
          name: file.name || `Document_${Date.now()}`,
          size: file.size,
        };
        setEvidenceList((prev) => [...prev, newItem]);
      }
    } catch (error) {
      console.warn('Attach file error:', error);
      Alert.alert(
        'Document Picker Error',
        'Could not attach document. Please try again.'
      );
    }
  };

  // -------------------------------------------------------------
  // Remove Evidence Item
  // -------------------------------------------------------------
  const handleRemoveEvidence = (id: string) => {
    if (playingAudioId === id && playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current);
      playbackTimerRef.current = null;
      setPlayingAudioId(null);
    }
    setEvidenceList((prev) => prev.filter((item) => item.id !== id));
  };

  // Format seconds to mm:ss
  const formatTime = (secs?: number) => {
    if (!secs) return '0:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Format bytes to KB/MB
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // -------------------------------------------------------------
  // Save Issue & Continue
  // -------------------------------------------------------------
  const handleSaveIssue = async () => {
    if (observationText.trim().length === 0) {
      Alert.alert('Observation Required', 'Please enter details in "What did you observe?"');
      return;
    }

    try {
      // Mark item status as ISSUE in local draft inspection storage
      const draft = await inspectionStorage.loadDraft();
      if (draft && params.itemId) {
        const updatedItems = draft.items.map((it) =>
          it.id === params.itemId
            ? { ...it, status: 'ISSUE' as const, updatedAt: new Date().toISOString() }
            : it
        );
        await inspectionStorage.saveDraft({
          ...draft,
          items: updatedItems,
          updatedAt: new Date().toISOString(),
        });
      }

      Alert.alert(
        'Issue Recorded',
        `Checklist item "${checklistTitle}" marked with ISSUE status.\n${evidenceList.length} evidence attachment(s) logged.`,
        [
          {
            text: 'Return to Checklist',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (err) {
      console.warn('Save issue error:', err);
      router.back();
    }
  };

  // Bottom bar inset
  const bottomInset = insets.bottom > 0
    ? insets.bottom + 10
    : Platform.OS === 'android'
    ? 24
    : 16;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* ------------------------------------------------------------- */}
      {/* Top Header Row                                                */}
      {/* ------------------------------------------------------------- */}
      <View style={styles.topHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Report an Issue</Text>
          <Text style={styles.headerSubtitle}>
            Provide details about the issue you observed
          </Text>
        </View>

        <View style={styles.headerRightCol}>
          {/* User Profile Badge */}
          <View style={styles.userProfilePill}>
            <View style={styles.userAvatar}>
              <SirdarAvatarIcon size={15} color="#FFFFFF" />
            </View>
            <View style={styles.userInfoText}>
              <View style={styles.userNameRow}>
                <Text style={styles.userNameText}>Sirdar</Text>
                <Text style={styles.userChevron}>▾</Text>
              </View>
              <Text style={styles.userEmpIdText}>{employeeId}</Text>
            </View>
          </View>

          {/* 1 of 1 Badge */}
          <View style={styles.stepBadgePill}>
            <Text style={styles.stepBadgeText}>1 of 1</Text>
          </View>
        </View>
      </View>

      {/* ------------------------------------------------------------- */}
      {/* Scrollable Content                                            */}
      {/* ------------------------------------------------------------- */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomInset + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ------------------------------------------------------------- */}
        {/* Banner: Issue Found                                           */}
        {/* ------------------------------------------------------------- */}
        <View style={styles.alertBannerCard}>
          <View style={styles.alertIconWrap}>
            <RedAlertShieldIcon size={34} />
          </View>

          <View style={styles.alertTextWrap}>
            <Text style={styles.alertTitle}>Issue Found</Text>
            <Text style={styles.alertSubtext}>
              Your report helps make the mine safer for everyone.
            </Text>
          </View>

          <View style={styles.reportResponsiblyBadge}>
            <Text style={styles.reportResponsiblyText}>Report</Text>
            <Text style={styles.reportResponsiblyText}>Responsibly</Text>
          </View>
        </View>

        {/* ------------------------------------------------------------- */}
        {/* Section 1: Checklist Item                                     */}
        {/* ------------------------------------------------------------- */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircleBadge}>
              <BlueClipboardIcon size={18} color="#006CFF" />
            </View>
            <View style={styles.numberPill}>
              <Text style={styles.numberPillText}>1</Text>
            </View>
            <View style={styles.cardHeaderTitleCol}>
              <Text style={styles.sectionHeaderTitle}>Checklist Item</Text>
            </View>
          </View>

          <View style={styles.checklistItemContent}>
            <Text style={styles.checklistCategoryText}>{checklistCategory}</Text>
            <Text style={styles.checklistItemTitle}>{checklistTitle}</Text>
            <Text style={styles.checklistItemDescription}>
              {checklistDescription}
            </Text>
          </View>
        </View>

        {/* ------------------------------------------------------------- */}
        {/* Section 2: Mine / Location / Date / GPS Details (2x2 Grid)    */}
        {/* ------------------------------------------------------------- */}
        <View style={styles.gridCard}>
          {/* Row 1: Mine/Site & Location */}
          <View style={styles.gridRow}>
            {/* Cell 1: Mine / Site */}
            <View style={[styles.gridCell, styles.gridCellBorderRight]}>
              <View style={styles.cellHeaderRow}>
                <View style={styles.cellIconCircle}>
                  <MapTargetPinIcon size={15} color="#006CFF" />
                </View>
                <View style={styles.numberPillSmall}>
                  <Text style={styles.numberPillSmallText}>2</Text>
                </View>
                <View style={styles.cellTitleCol}>
                  <Text style={styles.cellLabel}>Mine / Site</Text>
                  <Text style={styles.cellValueBold} numberOfLines={1}>
                    {mineSite}
                  </Text>
                  <Text style={styles.cellSubtext} numberOfLines={1}>
                    {mineLocationDetails}
                  </Text>
                </View>
              </View>
            </View>

            {/* Cell 2: Location */}
            <View style={styles.gridCell}>
              <View style={styles.cellHeaderRow}>
                <View style={styles.cellIconCircle}>
                  <MapTargetPinIcon size={15} color="#006CFF" />
                </View>
                <View style={styles.cellTitleCol}>
                  <Text style={styles.cellLabel}>Location</Text>
                  <Text style={styles.cellValueBold} numberOfLines={1}>
                    {workingLocation}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setLocationModalVisible(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.changeLocationLink}>Change Location</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.gridDivider} />

          {/* Row 2: Date & Time & GPS Coordinates */}
          <View style={styles.gridRow}>
            {/* Cell 3: Date & Time */}
            <View style={[styles.gridCell, styles.gridCellBorderRight]}>
              <View style={styles.cellHeaderRow}>
                <View style={styles.cellIconCircle}>
                  <ClockTimeIcon size={16} color="#006CFF" />
                </View>
                <View style={styles.cellTitleCol}>
                  <Text style={styles.cellLabel}>Date & Time</Text>
                  <Text style={styles.cellValueBold} numberOfLines={1}>
                    {dateTimeString}
                  </Text>
                </View>
                <View style={styles.clockIconSmall}>
                  <ClockTimeIcon size={14} color="#07115B" />
                </View>
              </View>
            </View>

            {/* Cell 4: GPS Coordinates */}
            <View style={styles.gridCell}>
              <View style={styles.cellHeaderRow}>
                <View style={styles.cellIconCircle}>
                  <GpsCrosshairIcon size={16} color="#006CFF" />
                </View>
                <View style={styles.cellTitleCol}>
                  <Text style={styles.cellLabel}>GPS Coordinates</Text>
                  <Text style={styles.cellValueBold} numberOfLines={1}>
                    {gpsCoordsString}
                  </Text>
                  <View style={styles.capturedBadgeRow}>
                    <View style={styles.capturedCheckCircle}>
                      <Text style={styles.capturedCheckMark}>✓</Text>
                    </View>
                    <Text style={styles.capturedText}>Captured</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ------------------------------------------------------------- */}
        {/* Section 3: What did you observe? *                            */}
        {/* ------------------------------------------------------------- */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircleBadge}>
              <DocumentNoteIcon size={18} color="#006CFF" />
            </View>
            <View style={styles.numberPill}>
              <Text style={styles.numberPillText}>3</Text>
            </View>
            <View style={styles.cardHeaderTitleCol}>
              <Text style={styles.sectionHeaderTitle}>
                What did you observe? <Text style={styles.redAsterisk}>*</Text>
              </Text>
            </View>
          </View>

          <View style={styles.observeInputBox}>
            <TextInput
              style={styles.observeTextInput}
              multiline
              maxLength={500}
              value={observationText}
              onChangeText={setObservationText}
              placeholder="Describe the condition, hazard or damage observed..."
              placeholderTextColor="#8FA7CE"
            />

            <View style={styles.observeBottomBar}>
              {isRecordingAudio ? (
                <View style={styles.recordingActiveBar}>
                  <View style={styles.recordingPulseDot} />
                  <Text style={styles.recordingTimerText}>
                    Recording {formatTime(recordingSeconds)}
                  </Text>
                  <TouchableOpacity
                    style={styles.stopRecordingBtn}
                    onPress={stopAudioRecording}
                  >
                    <Text style={styles.stopRecordingBtnText}>Stop</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelRecordingBtn}
                    onPress={cancelAudioRecording}
                  >
                    <Text style={styles.cancelRecordingBtnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.voiceNoteRow}>
                  <TouchableOpacity
                    style={styles.addVoiceNoteBtn}
                    onPress={startAudioRecording}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Add Voice Note"
                  >
                    <MicAudioIcon size={15} color="#006CFF" />
                    <Text style={styles.addVoiceNoteText}>Add Voice Note</Text>
                  </TouchableOpacity>
                  <Text style={styles.voiceMaxText}>Max 2 minutes</Text>
                </View>
              )}

              <Text style={styles.charCountText}>
                {observationText.length}/500
              </Text>
            </View>
          </View>
        </View>

        {/* ------------------------------------------------------------- */}
        {/* Section 4: Add Evidence *                                     */}
        {/* ------------------------------------------------------------- */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircleBadge}>
              <CameraPhotoIcon size={18} color="#006CFF" />
            </View>
            <View style={styles.numberPill}>
              <Text style={styles.numberPillText}>4</Text>
            </View>
            <View style={styles.cardHeaderTitleCol}>
              <Text style={styles.sectionHeaderTitle}>
                Add Evidence <Text style={styles.redAsterisk}>*</Text>
              </Text>
            </View>
            <View style={styles.multipleFilesNotice}>
              <InfoIcon size={13} color="#006CFF" />
              <Text style={styles.multipleFilesText}>You can add multiple files</Text>
            </View>
          </View>

          {/* 3 Evidence Action Buttons: Take Photo, Record Video, Attach File */}
          <View style={styles.evidenceButtonsRow}>
            {/* Take Photo */}
            <TouchableOpacity
              style={styles.evidenceBtn}
              onPress={handleTakePhoto}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Take Photo with Camera"
            >
              <CameraPhotoIcon size={17} color="#006CFF" />
              <Text style={styles.evidenceBtnText}>Take Photo</Text>
            </TouchableOpacity>

            {/* Record Video */}
            <TouchableOpacity
              style={styles.evidenceBtn}
              onPress={handleRecordVideo}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Record Video with Camera"
            >
              <VideoRecordIcon size={17} color="#006CFF" />
              <Text style={styles.evidenceBtnText}>Record Video</Text>
            </TouchableOpacity>

            {/* Attach File */}
            <TouchableOpacity
              style={styles.evidenceBtn}
              onPress={handleAttachFile}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Attach File from Device"
            >
              <PaperclipFileIcon size={17} color="#006CFF" />
              <Text style={styles.evidenceBtnText}>Attach File</Text>
            </TouchableOpacity>
          </View>

          {/* Evidence Items Thumbnails & Add More Card */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.evidenceScrollTrack}
          >
            {evidenceList.map((item) => {
              if (item.type === 'image') {
                return (
                  <View key={item.id} style={styles.imageThumbnailCard}>
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.thumbnailImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={styles.removeThumbBtn}
                      onPress={() => handleRemoveEvidence(item.id)}
                      activeOpacity={0.8}
                      accessibilityLabel="Remove image evidence"
                    >
                      <CloseDeleteIcon size={18} />
                    </TouchableOpacity>
                  </View>
                );
              }

              if (item.type === 'video') {
                return (
                  <View key={item.id} style={styles.videoThumbnailCard}>
                    <View style={styles.videoPlaceholder}>
                      <VideoRecordIcon size={26} color="#006CFF" />
                      <Text style={styles.videoLabelText} numberOfLines={1}>
                        {item.name}
                      </Text>
                      {item.duration !== undefined && (
                        <Text style={styles.videoDurationBadge}>
                          {formatTime(item.duration)}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.removeThumbBtn}
                      onPress={() => handleRemoveEvidence(item.id)}
                      activeOpacity={0.8}
                      accessibilityLabel="Remove video evidence"
                    >
                      <CloseDeleteIcon size={18} />
                    </TouchableOpacity>
                  </View>
                );
              }

              if (item.type === 'audio') {
                const isPlaying = playingAudioId === item.id;
                return (
                  <View key={item.id} style={styles.audioEvidenceCard}>
                    <View style={styles.audioCardHeader}>
                      <MicAudioIcon size={18} color="#006CFF" />
                      <Text style={styles.audioCardTitle} numberOfLines={1}>
                        Voice Note ({formatTime(item.duration)})
                      </Text>
                    </View>
                    <View style={styles.audioControlsRow}>
                      <TouchableOpacity
                        style={styles.audioPlayBtn}
                        onPress={() => handleToggleAudioPlayback(item)}
                        activeOpacity={0.8}
                      >
                        {isPlaying ? (
                          <PauseBarsIcon size={13} color="#FFFFFF" />
                        ) : (
                          <PlayTriangleIcon size={13} color="#FFFFFF" />
                        )}
                        <Text style={styles.audioPlayBtnText}>
                          {isPlaying ? 'Pause' : 'Play'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.removeThumbBtn}
                      onPress={() => handleRemoveEvidence(item.id)}
                      activeOpacity={0.8}
                      accessibilityLabel="Remove audio recording"
                    >
                      <CloseDeleteIcon size={18} />
                    </TouchableOpacity>
                  </View>
                );
              }

              if (item.type === 'file') {
                return (
                  <View key={item.id} style={styles.fileEvidenceCard}>
                    <PaperclipFileIcon size={22} color="#006CFF" />
                    <Text style={styles.fileNameText} numberOfLines={2}>
                      {item.name}
                    </Text>
                    {item.size && (
                      <Text style={styles.fileSizeText}>
                        {formatFileSize(item.size)}
                      </Text>
                    )}
                    <TouchableOpacity
                      style={styles.removeThumbBtn}
                      onPress={() => handleRemoveEvidence(item.id)}
                      activeOpacity={0.8}
                      accessibilityLabel="Remove file attachment"
                    >
                      <CloseDeleteIcon size={18} />
                    </TouchableOpacity>
                  </View>
                );
              }

              return null;
            })}

            {/* "+ Add More" dashed button card */}
            <TouchableOpacity
              style={styles.addMoreCard}
              onPress={() => setAddMoreModalVisible(true)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Add More Evidence"
            >
              <PlusCircleIcon size={26} color="#006CFF" />
              <Text style={styles.addMoreText}>Add More</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* ------------------------------------------------------------- */}
        {/* Section 5: AI Assessment (Auto-calculated)                    */}
        {/* ------------------------------------------------------------- */}
        <View style={styles.card}>
          <View style={styles.aiHeaderRow}>
            <View style={styles.aiHeaderLeft}>
              <View style={styles.iconCircleBadge}>
                <SparklesAiIcon size={18} color="#006CFF" />
              </View>
              <View style={styles.numberPill}>
                <Text style={styles.numberPillText}>5</Text>
              </View>
              <View style={styles.aiTitleWrap}>
                <Text style={styles.sectionHeaderTitle}>
                  AI Assessment{' '}
                  <Text style={styles.subtleAutoText}>(Auto-calculated)</Text>
                </Text>
                <Text style={styles.aiSubtitle}>
                  Based on your description, evidence, location and historical data.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.overrideLinkRow}
              onPress={() =>
                Alert.alert(
                  'Manual Override',
                  'DGMS Statutory classification: Medium severity and moderate risk automatically derived from machinery hazard criteria.'
                )
              }
              activeOpacity={0.7}
            >
              <PencilEditIcon size={12} color="#006CFF" />
              <Text style={styles.overrideLinkText}>Incorrect? Override manually</Text>
            </TouchableOpacity>
          </View>

          {/* AI Metrics: Severity Level & Risk Score side by side */}
          <View style={styles.aiMetricsRow}>
            {/* Metric 1: Severity Level */}
            <View style={styles.severityCard}>
              <View style={styles.metricHeaderRow}>
                <Text style={styles.metricLabel}>Severity Level</Text>
                <InfoIcon size={14} color="#006CFF" />
              </View>
              <View style={styles.severityContentRow}>
                {/* Warning Triangle Icon */}
                <View style={styles.amberWarningTriangle}>
                  <Text style={styles.amberWarningExclamation}>▲</Text>
                </View>
                <View style={styles.severityPillMedium}>
                  <Text style={styles.severityPillText}>MEDIUM</Text>
                </View>
              </View>
            </View>

            {/* Metric 2: Risk Score */}
            <View style={styles.riskScoreCard}>
              <View style={styles.metricHeaderRow}>
                <Text style={styles.metricLabel}>Risk Score</Text>
                <InfoIcon size={14} color="#006CFF" />
              </View>
              <View style={styles.riskScoreContentRow}>
                {/* Circular Gauge */}
                <View style={styles.donutGauge}>
                  <Text style={styles.gaugeNumberText}>62</Text>
                  <Text style={styles.gaugeTotalText}>/ 100</Text>
                </View>

                {/* Moderate Risk Badge */}
                <View style={styles.moderateRiskBadge}>
                  <Text style={styles.moderateRiskText}>Moderate Risk</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ------------------------------------------------------------- */}
        {/* Section 6: Immediate Action Taken                             */}
        {/* ------------------------------------------------------------- */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircleBadge}>
              <WrenchToolIcon size={18} color="#006CFF" />
            </View>
            <View style={styles.numberPill}>
              <Text style={styles.numberPillText}>6</Text>
            </View>
            <View style={styles.cardHeaderTitleCol}>
              <Text style={styles.sectionHeaderTitle}>Immediate Action Taken</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => setActionModalVisible(true)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Select immediate action taken"
          >
            <Text style={styles.dropdownValueText}>{selectedAction}</Text>
            <Text style={styles.dropdownChevron}>▾</Text>
          </TouchableOpacity>
        </View>

        {/* ------------------------------------------------------------- */}
        {/* Section 7: Additional Remarks (Optional)                      */}
        {/* ------------------------------------------------------------- */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircleBadge}>
              <ChatRemarksIcon size={18} color="#006CFF" />
            </View>
            <View style={styles.numberPill}>
              <Text style={styles.numberPillText}>7</Text>
            </View>
            <View style={styles.cardHeaderTitleCol}>
              <Text style={styles.sectionHeaderTitle}>
                Additional Remarks{' '}
                <Text style={styles.subtleAutoText}>(Optional)</Text>
              </Text>
            </View>
          </View>

          <View style={styles.remarksInputBox}>
            <TextInput
              style={styles.remarksTextInput}
              multiline
              maxLength={300}
              value={remarksText}
              onChangeText={setRemarksText}
              placeholder="Enter any additional information..."
              placeholderTextColor="#8FA7CE"
            />
            <View style={styles.remarksBottomBar}>
              <Text style={styles.charCountText}>{remarksText.length}/300</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ------------------------------------------------------------- */}
      {/* Bottom Sticky Action Buttons: Cancel & Save Issue & Continue  */}
      {/* ------------------------------------------------------------- */}
      <View style={[styles.bottomActionBar, { paddingBottom: bottomInset }]}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Cancel reporting issue"
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveContinueBtn}
          onPress={handleSaveIssue}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Save Issue and Continue"
        >
          <Text style={styles.saveContinueBtnText}>Save Issue & Continue ➔</Text>
        </TouchableOpacity>
      </View>

      {/* ------------------------------------------------------------- */}
      {/* Modal: Immediate Action Taken Picker                          */}
      {/* ------------------------------------------------------------- */}
      <Modal
        visible={actionModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setActionModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setActionModalVisible(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalHeaderTitle}>Select Immediate Action</Text>
            {ACTION_TAKEN_OPTIONS.map((action) => (
              <TouchableOpacity
                key={action}
                style={[
                  styles.modalOptionRow,
                  selectedAction === action && styles.modalOptionRowSelected,
                ]}
                onPress={() => {
                  setSelectedAction(action);
                  setActionModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedAction === action && styles.modalOptionTextSelected,
                  ]}
                >
                  {action}
                </Text>
                {selectedAction === action && (
                  <Text style={styles.modalCheckmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* ------------------------------------------------------------- */}
      {/* Modal: Change Location Picker                                 */}
      {/* ------------------------------------------------------------- */}
      <Modal
        visible={locationModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLocationModalVisible(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalHeaderTitle}>Select Working Location</Text>
            {LOCATION_CHOICES.map((loc) => (
              <TouchableOpacity
                key={loc}
                style={[
                  styles.modalOptionRow,
                  workingLocation === loc && styles.modalOptionRowSelected,
                ]}
                onPress={() => {
                  setWorkingLocation(loc);
                  setLocationModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    workingLocation === loc && styles.modalOptionTextSelected,
                  ]}
                >
                  {loc}
                </Text>
                {workingLocation === loc && (
                  <Text style={styles.modalCheckmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* ------------------------------------------------------------- */}
      {/* Modal: Add More Evidence Options                              */}
      {/* ------------------------------------------------------------- */}
      <Modal
        visible={addMoreModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddMoreModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setAddMoreModalVisible(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalHeaderTitle}>Add Evidence</Text>

            <TouchableOpacity
              style={styles.addMoreOptionRow}
              onPress={() => {
                setAddMoreModalVisible(false);
                setTimeout(handleTakePhoto, 300);
              }}
            >
              <CameraPhotoIcon size={20} color="#006CFF" />
              <Text style={styles.addMoreOptionText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addMoreOptionRow}
              onPress={() => {
                setAddMoreModalVisible(false);
                setTimeout(handleRecordVideo, 300);
              }}
            >
              <VideoRecordIcon size={20} color="#006CFF" />
              <Text style={styles.addMoreOptionText}>Record Video</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addMoreOptionRow}
              onPress={() => {
                setAddMoreModalVisible(false);
                setTimeout(startAudioRecording, 300);
              }}
            >
              <MicAudioIcon size={20} color="#006CFF" />
              <Text style={styles.addMoreOptionText}>Record Voice Note</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addMoreOptionRow}
              onPress={() => {
                setAddMoreModalVisible(false);
                setTimeout(handleAttachFile, 300);
              }}
            >
              <PaperclipFileIcon size={20} color="#006CFF" />
              <Text style={styles.addMoreOptionText}>Attach File / Document</Text>
            </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  /* Top Header */
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: '#F7FBFF',
  },
  headerLeft: {
    flex: 1,
    paddingRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#07115B',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#456399',
    marginTop: 2,
  },
  headerRightCol: {
    alignItems: 'flex-end',
  },
  userProfilePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E5F8',
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#07115B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  userInfoText: {
    justifyContent: 'center',
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#07115B',
  },
  userChevron: {
    fontSize: 10,
    color: '#07115B',
    marginLeft: 3,
  },
  userEmpIdText: {
    fontSize: 10,
    color: '#456399',
    marginTop: -1,
  },
  stepBadgePill: {
    backgroundColor: '#EBF3FC',
    borderWidth: 1,
    borderColor: '#D4E4F7',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginTop: 6,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#07115B',
  },

  /* Alert Banner: Issue Found */
  alertBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F0',
    borderWidth: 1,
    borderColor: '#FFCCC7',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  alertIconWrap: {
    marginRight: 10,
  },
  alertTextWrap: {
    flex: 1,
    paddingRight: 6,
  },
  alertTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#D93025',
  },
  alertSubtext: {
    fontSize: 12,
    color: '#456399',
    marginTop: 2,
    lineHeight: 16,
  },
  reportResponsiblyBadge: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportResponsiblyText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D93025',
    lineHeight: 13,
  },

  /* Standard Card Container */
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1ECF9',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircleBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  numberPill: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EEF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  numberPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#07115B',
  },
  cardHeaderTitleCol: {
    flex: 1,
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#07115B',
  },
  redAsterisk: {
    color: '#D93025',
    fontWeight: '800',
  },
  subtleAutoText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#456399',
  },

  /* Checklist Item Content */
  checklistItemContent: {
    paddingLeft: 34,
  },
  checklistCategoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006CFF',
    marginBottom: 2,
  },
  checklistItemTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#07115B',
    marginBottom: 4,
  },
  checklistItemDescription: {
    fontSize: 12.5,
    color: '#456399',
    lineHeight: 18,
  },

  /* Section 2: 2x2 Grid Card */
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1ECF9',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridCell: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  gridCellBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#EDF3FD',
  },
  gridDivider: {
    height: 1,
    backgroundColor: '#EDF3FD',
    marginVertical: 4,
  },
  cellHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cellIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    marginTop: 2,
  },
  numberPillSmall: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EEF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    marginTop: 4,
  },
  numberPillSmallText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#07115B',
  },
  cellTitleCol: {
    flex: 1,
  },
  cellLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 2,
  },
  cellValueBold: {
    fontSize: 13,
    fontWeight: '700',
    color: '#07115B',
  },
  cellSubtext: {
    fontSize: 11.5,
    color: '#456399',
    marginTop: 1,
  },
  changeLocationLink: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#006CFF',
    marginTop: 2,
    textDecorationLine: 'underline',
  },
  clockIconSmall: {
    marginTop: 4,
  },
  capturedBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  capturedCheckCircle: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#0B9E5A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  capturedCheckMark: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    marginTop: -1,
  },
  capturedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B9E5A',
  },

  /* Observation Box */
  observeInputBox: {
    borderWidth: 1,
    borderColor: '#D4E4F7',
    borderRadius: 12,
    backgroundColor: '#F8FBFF',
    padding: 10,
  },
  observeTextInput: {
    fontSize: 13,
    color: '#07115B',
    lineHeight: 19,
    minHeight: 56,
    textAlignVertical: 'top',
  },
  observeBottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EDF3FD',
    paddingTop: 8,
    marginTop: 6,
  },
  voiceNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addVoiceNoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FF',
    borderWidth: 1,
    borderColor: '#93C5FD',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginRight: 8,
  },
  addVoiceNoteText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#006CFF',
    marginLeft: 5,
  },
  voiceMaxText: {
    fontSize: 11,
    color: '#6B7280',
  },
  charCountText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },

  /* Recording Active Bar */
  recordingActiveBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  recordingPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  recordingTimerText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#DC2626',
    marginRight: 8,
  },
  stopRecordingBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginRight: 6,
  },
  stopRecordingBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  cancelRecordingBtn: {
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  cancelRecordingBtnText: {
    color: '#6B7280',
    fontSize: 11,
  },

  /* Evidence Section */
  multipleFilesNotice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  multipleFilesText: {
    fontSize: 11,
    color: '#006CFF',
    marginLeft: 4,
    fontWeight: '500',
  },
  evidenceButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  evidenceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF5FF',
    borderWidth: 1,
    borderColor: '#93C5FD',
    borderRadius: 9,
    paddingVertical: 8,
    marginHorizontal: 3,
  },
  evidenceBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#006CFF',
    marginLeft: 4,
  },
  evidenceScrollTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  imageThumbnailCard: {
    width: 110,
    height: 85,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#D4E4F7',
    backgroundColor: '#1E293B',
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  removeThumbBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
  },
  videoThumbnailCard: {
    width: 110,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#EBF5FF',
    borderWidth: 1,
    borderColor: '#93C5FD',
    marginRight: 10,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  videoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLabelText: {
    fontSize: 10,
    color: '#07115B',
    fontWeight: '600',
    marginTop: 4,
    maxWidth: 90,
  },
  videoDurationBadge: {
    fontSize: 9,
    color: '#456399',
    marginTop: 2,
  },
  audioEvidenceCard: {
    width: 135,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#EBF5FF',
    borderWidth: 1,
    borderColor: '#93C5FD',
    marginRight: 10,
    padding: 8,
    justifyContent: 'space-between',
    position: 'relative',
  },
  audioCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  audioCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#07115B',
    marginLeft: 4,
    flex: 1,
  },
  audioControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioPlayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#006CFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  audioPlayBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  fileEvidenceCard: {
    width: 110,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#EBF5FF',
    borderWidth: 1,
    borderColor: '#93C5FD',
    marginRight: 10,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fileNameText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#07115B',
    textAlign: 'center',
    marginTop: 4,
  },
  fileSizeText: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
  },
  addMoreCard: {
    width: 105,
    height: 85,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#93C5FD',
    backgroundColor: '#F8FBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006CFF',
    marginTop: 4,
  },

  /* Section 5: AI Assessment */
  aiHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  aiHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aiTitleWrap: {
    flex: 1,
  },
  aiSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 15,
  },
  overrideLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  overrideLinkText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#006CFF',
    marginLeft: 3,
    textDecorationLine: 'underline',
  },
  aiMetricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severityCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDF3FD',
    borderRadius: 12,
    padding: 10,
    marginRight: 6,
  },
  riskScoreCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDF3FD',
    borderRadius: 12,
    padding: 10,
    marginLeft: 6,
  },
  metricHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#07115B',
  },
  severityContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  amberWarningTriangle: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amberWarningExclamation: {
    color: '#F59E0B',
    fontSize: 22,
  },
  severityPillMedium: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 6,
  },
  severityPillText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  riskScoreContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  donutGauge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 5,
    borderColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  gaugeNumberText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#07115B',
    lineHeight: 17,
  },
  gaugeTotalText: {
    fontSize: 8.5,
    color: '#6B7280',
    fontWeight: '600',
  },
  moderateRiskBadge: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 6,
  },
  moderateRiskText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },

  /* Section 6: Immediate Action Taken */
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D4E4F7',
    borderRadius: 10,
    backgroundColor: '#F8FBFF',
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  dropdownValueText: {
    fontSize: 13,
    color: '#07115B',
    fontWeight: '500',
  },
  dropdownChevron: {
    fontSize: 14,
    color: '#07115B',
  },

  /* Section 7: Additional Remarks */
  remarksInputBox: {
    borderWidth: 1,
    borderColor: '#D4E4F7',
    borderRadius: 10,
    backgroundColor: '#F8FBFF',
    padding: 10,
  },
  remarksTextInput: {
    fontSize: 12.5,
    color: '#07115B',
    lineHeight: 18,
    minHeight: 50,
    textAlignVertical: 'top',
  },
  remarksBottomBar: {
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#EDF3FD',
    paddingTop: 6,
    marginTop: 4,
  },

  /* Bottom Sticky Action Bar */
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1ECF9',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingTop: 10,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 4,
  },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderWidth: 1.5,
    borderColor: '#006CFF',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cancelBtnText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#006CFF',
  },
  saveContinueBtn: {
    flex: 1.3,
    height: 46,
    backgroundColor: '#006CFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveContinueBtnText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 17, 91, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#07115B',
    marginBottom: 14,
  },
  modalOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FD',
  },
  modalOptionRowSelected: {
    backgroundColor: '#F0F7FF',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  modalOptionText: {
    fontSize: 13,
    color: '#07115B',
    fontWeight: '500',
  },
  modalOptionTextSelected: {
    fontWeight: '700',
    color: '#006CFF',
  },
  modalCheckmark: {
    fontSize: 14,
    color: '#006CFF',
    fontWeight: '800',
  },
  addMoreOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FD',
  },
  addMoreOptionText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#07115B',
    marginLeft: 12,
  },
});
