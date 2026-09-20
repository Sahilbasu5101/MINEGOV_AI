import React from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { colors } from '../../../src/constants/theme';
import {
  BackArrowIcon,
  CameraIcon,
  VideoCameraIcon,
  PaperclipDocIcon,
  InfoCircleIcon,
} from '../../../src/components/icons/TechnicalIcons';
import { useTechnicalExamination } from '../../../src/context/technical-examination-context';

export default function AddEvidenceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    photos,
    videos,
    documents,
    addPhotos,
    removePhoto,
    addVideos,
    removeVideo,
    addDocuments,
    removeDocument,
  } = useTechnicalExamination();

  // -------------------------------------------------------------
  // 1. Photos Handler (Camera or Gallery)
  // -------------------------------------------------------------
  const handleAddPhotos = () => {
    if (photos.length >= 5) {
      Alert.alert('Photo Limit Reached', 'You can attach a maximum of 5 photos.');
      return;
    }

    Alert.alert(
      'Add Photos',
      'Take Photo or Choose from Gallery',
      [
        {
          text: 'Take Photo',
          onPress: handleTakePhoto,
        },
        {
          text: 'Choose from Gallery',
          onPress: handlePickPhotosFromGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Camera access is required to take photos as statutory inspection evidence. Please grant camera permission in your device settings.'
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
        addPhotos([
          {
            id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            uri: asset.uri,
            name: asset.fileName || `Photo_${Date.now()}.jpg`,
            size: asset.fileSize,
          },
        ]);
      }
    } catch (error) {
      console.warn('Take photo error:', error);
      Alert.alert(
        'Camera Error',
        'Could not access the camera. Please check device permissions and try again.'
      );
    }
  };

  const handlePickPhotosFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Gallery Permission Required',
          'Gallery access is required to select inspection photos. Please grant permission in your device settings.'
        );
        return;
      }

      const remaining = Math.max(0, 5 - photos.length);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: remaining,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newItems = result.assets.slice(0, remaining).map((asset, index) => ({
          id: `photo-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 7)}`,
          uri: asset.uri,
          name: asset.fileName || `Photo_${Date.now()}_${index}.jpg`,
          size: asset.fileSize,
        }));
        addPhotos(newItems);
      }
    } catch (error) {
      console.warn('Pick photo error:', error);
      Alert.alert(
        'Gallery Error',
        'Could not access the gallery. Please try again.'
      );
    }
  };

  // -------------------------------------------------------------
  // 2. Video Handler (Record Video or Gallery)
  // -------------------------------------------------------------
  const handleAddVideo = () => {
    if (videos.length >= 3) {
      Alert.alert('Video Limit Reached', 'You can attach a maximum of 3 videos.');
      return;
    }

    Alert.alert(
      'Add Video',
      'Record Video or Choose from Gallery',
      [
        {
          text: 'Record Video',
          onPress: handleRecordVideo,
        },
        {
          text: 'Choose from Gallery',
          onPress: handlePickVideoFromGallery,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleRecordVideo = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Camera access is required to record inspection video. Please grant permission in your device settings.'
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
        addVideos([
          {
            id: `video-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            uri: asset.uri,
            name: asset.fileName || `Video_${Date.now()}.mp4`,
            duration: asset.duration ? Math.round(asset.duration / 1000) : undefined,
            size: asset.fileSize,
          },
        ]);
      }
    } catch (error) {
      console.warn('Record video error:', error);
      Alert.alert(
        'Video Recorder Error',
        'Could not start video recording. Please check device permissions and try again.'
      );
    }
  };

  const handlePickVideoFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Gallery Permission Required',
          'Gallery access is required to choose a video. Please grant permission in your device settings.'
        );
        return;
      }

      const remaining = Math.max(0, 3 - videos.length);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: remaining,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newItems = result.assets.slice(0, remaining).map((asset, index) => ({
          id: `video-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 7)}`,
          uri: asset.uri,
          name: asset.fileName || `Video_${Date.now()}_${index}.mp4`,
          duration: asset.duration ? Math.round(asset.duration / 1000) : undefined,
          size: asset.fileSize,
        }));
        addVideos(newItems);
      }
    } catch (error) {
      console.warn('Pick video error:', error);
      Alert.alert(
        'Gallery Error',
        'Could not access the gallery. Please try again.'
      );
    }
  };

  // -------------------------------------------------------------
  // 3. Document Handler (Phone Document Picker)
  // -------------------------------------------------------------
  const handleAddFile = async () => {
    if (documents.length >= 5) {
      Alert.alert('Document Limit Reached', 'You can attach a maximum of 5 documents.');
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const remaining = Math.max(0, 5 - documents.length);
        const newItems = result.assets.slice(0, remaining).map((file, index) => ({
          id: `doc-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 7)}`,
          uri: file.uri,
          name: file.name || `Document_${Date.now()}_${index}`,
          size: file.size,
          mimeType: file.mimeType,
        }));
        addDocuments(newItems);
      }
    } catch (error) {
      console.warn('Document picker error:', error);
      Alert.alert(
        'Document Picker Error',
        'Could not attach document. Please try again.'
      );
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push('/safety/technical/review-submit');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <View style={styles.headerBar}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.pressedState]}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Back to Findings & Remarks"
        >
          <BackArrowIcon size={20} color={colors.navy} />
        </Pressable>

        <Text style={styles.headerTitle}>Add Evidence</Text>

        {/* Balance spacer */}
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Subtitle */}
      <View style={styles.subtitleBar}>
        <Text style={styles.subtitleText}>
          Attach photos, videos or files as proof of inspection.
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Photos */}
        <View style={styles.evidenceSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <CameraIcon size={19} color="#006CFF" />
              <Text style={styles.sectionTitleText}>
                Photos<Text style={styles.requiredAsterisk}> *</Text>
              </Text>
            </View>
            <Text style={styles.counterText}>{photos.length}/5</Text>
          </View>

          {/* Photo Thumbnails Row */}
          {photos.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailsScrollContent}
              style={styles.thumbnailsScrollView}
            >
              {photos.map((photo) => (
                <View key={photo.id} style={styles.thumbnailWrapper}>
                  <Image
                    source={{ uri: photo.uri }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                  <Pressable
                    style={styles.removePhotoButton}
                    onPress={() => removePhoto(photo.id)}
                    accessibilityRole="button"
                    accessibilityLabel="Remove photo"
                  >
                    <Text style={styles.removePhotoText}>✕</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Add Photos Button Card */}
          <Pressable
            style={({ pressed }) => [styles.actionUploadCard, pressed && styles.cardPressed]}
            onPress={handleAddPhotos}
          >
            <View style={styles.uploadIconCircle}>
              <CameraIcon size={22} color="#006CFF" />
            </View>
            <Text style={styles.uploadCardTitle}>Add Photos</Text>
            <Text style={styles.uploadCardSubtitle}>Take Photo or Choose from Gallery</Text>
          </Pressable>
        </View>

        {/* Section 2: Videos (Optional) */}
        <View style={styles.evidenceSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <VideoCameraIcon size={19} color="#006CFF" />
              <Text style={styles.sectionTitleText}>Videos (Optional)</Text>
            </View>
            <Text style={styles.counterText}>{videos.length}/3</Text>
          </View>

          {/* Attached Videos List */}
          {videos.length > 0 && (
            <View style={styles.mediaList}>
              {videos.map((video) => (
                <View key={video.id} style={styles.mediaItemCard}>
                  <View style={styles.mediaItemIconCircle}>
                    <VideoCameraIcon size={18} color="#006CFF" />
                  </View>
                  <View style={styles.mediaItemInfo}>
                    <Text style={styles.mediaItemTitle} numberOfLines={1} ellipsizeMode="middle">
                      {video.name || 'Inspection_Video.mp4'}
                    </Text>
                    <Text style={styles.mediaItemSubtitle}>
                      {video.duration ? `${video.duration}s • ` : ''}
                      {video.size ? `${(video.size / (1024 * 1024)).toFixed(1)} MB` : 'Video Evidence'}
                    </Text>
                  </View>
                  <Pressable
                    style={styles.removeMediaButton}
                    onPress={() => removeVideo(video.id)}
                    accessibilityRole="button"
                    accessibilityLabel="Remove video"
                  >
                    <Text style={styles.removePhotoText}>✕</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}

          <Pressable
            style={({ pressed }) => [styles.actionUploadCard, pressed && styles.cardPressed]}
            onPress={handleAddVideo}
          >
            <View style={styles.uploadIconCircle}>
              <VideoCameraIcon size={22} color="#006CFF" />
            </View>
            <Text style={styles.uploadCardTitle}>Add Video</Text>
            <Text style={styles.uploadCardSubtitle}>Record Video or Choose from Gallery</Text>
          </Pressable>
        </View>

        {/* Section 3: Documents (Optional) */}
        <View style={styles.evidenceSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <PaperclipDocIcon size={19} color="#006CFF" />
              <Text style={styles.sectionTitleText}>Documents (Optional)</Text>
            </View>
            <Text style={styles.counterText}>{documents.length}/5</Text>
          </View>

          {/* Attached Documents List */}
          {documents.length > 0 && (
            <View style={styles.mediaList}>
              {documents.map((doc) => (
                <View key={doc.id} style={styles.mediaItemCard}>
                  <View style={styles.mediaItemIconCircle}>
                    <PaperclipDocIcon size={18} color="#006CFF" />
                  </View>
                  <View style={styles.mediaItemInfo}>
                    <Text style={styles.mediaItemTitle} numberOfLines={1} ellipsizeMode="middle">
                      {doc.name}
                    </Text>
                    <Text style={styles.mediaItemSubtitle}>
                      {doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : 'Document File'}
                    </Text>
                  </View>
                  <Pressable
                    style={styles.removeMediaButton}
                    onPress={() => removeDocument(doc.id)}
                    accessibilityRole="button"
                    accessibilityLabel="Remove document"
                  >
                    <Text style={styles.removePhotoText}>✕</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}

          <Pressable
            style={({ pressed }) => [styles.actionUploadCard, pressed && styles.cardPressed]}
            onPress={handleAddFile}
          >
            <View style={styles.uploadIconCircle}>
              <PaperclipDocIcon size={22} color="#006CFF" />
            </View>
            <Text style={styles.uploadCardTitle}>Add File</Text>
            <Text style={styles.uploadCardSubtitle}>Upload PDF, Excel or other files</Text>
          </Pressable>
        </View>

        {/* Info Callout Card */}
        <View style={styles.infoCallout}>
          <View style={styles.infoIconBox}>
            <InfoCircleIcon size={20} color="#006CFF" />
          </View>
          <Text style={styles.infoCalloutText}>
            Evidence helps in faster review and compliance tracking. Please ensure the photos are clear and relevant.
          </Text>
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
  subtitleBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9F1FC',
  },
  subtitleText: {
    fontSize: 11.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
  },
  evidenceSection: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.navy,
    marginLeft: 8,
  },
  requiredAsterisk: {
    color: '#D93025',
    fontWeight: '800',
  },
  counterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navy,
  },
  thumbnailsScrollView: {
    marginBottom: 10,
  },
  thumbnailsScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  thumbnailWrapper: {
    width: 78,
    height: 78,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DFECFA',
    position: 'relative',
    backgroundColor: '#EEF4FC',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  removePhotoText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#07115B',
  },
  mediaList: {
    marginBottom: 10,
    gap: 8,
  },
  mediaItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 10,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  mediaItemIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EAF2FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  mediaItemInfo: {
    flex: 1,
  },
  mediaItemTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 2,
  },
  mediaItemSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  removeMediaButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionUploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#BFD7F5',
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPressed: {
    backgroundColor: '#F0F6FF',
  },
  uploadIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF2FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  uploadCardTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 2,
  },
  uploadCardSubtitle: {
    fontSize: 10.5,
    color: colors.textMuted,
  },
  infoCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF2FC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D2E3F7',
    padding: 12,
    marginTop: 4,
    marginBottom: 10,
  },
  infoIconBox: {
    marginRight: 10,
  },
  infoCalloutText: {
    flex: 1,
    fontSize: 11,
    color: '#1C4A8D',
    lineHeight: 15.5,
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
