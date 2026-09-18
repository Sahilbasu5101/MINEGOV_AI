import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { colors } from '../constants/theme';

interface HeaderBarProps {
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
  rightComponent?: React.ReactNode;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentLanguage = 'English',
  onLanguageChange,
  rightComponent,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [modalVisible, setModalVisible] = useState(false);

  const languages = ['English', 'हिन्दी (Hindi)'];

  const handleSelectLanguage = (lang: string) => {
    setSelectedLanguage(lang.split(' ')[0]);
    setModalVisible(false);
    onLanguageChange?.(lang.split(' ')[0]);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftRow}>
        <Image
          source={require('../../assets/images/emblem_india.png')}
          style={styles.emblem}
          resizeMode="contain"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.ministryTitle}>Ministry of Coal</Text>
          <Text style={styles.govtSubtitle}>Government of India</Text>
        </View>
      </View>

      {rightComponent ? (
        rightComponent
      ) : (
        <>
          <TouchableOpacity
            style={styles.langPill}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Select Language"
          >
            <Text style={styles.globeIcon}>🌐</Text>
            <Text style={styles.langText}>{selectedLanguage}</Text>
            <Text style={styles.chevronIcon}>▾</Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.modalCard}>
                <Text style={styles.modalHeader}>Select Language / भाषा चुनें</Text>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    style={[
                      styles.langOption,
                      selectedLanguage === lang.split(' ')[0] && styles.langOptionSelected,
                    ]}
                    onPress={() => handleSelectLanguage(lang)}
                  >
                    <Text
                      style={[
                        styles.langOptionText,
                        selectedLanguage === lang.split(' ')[0] && styles.langOptionTextSelected,
                      ]}
                    >
                      {lang}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: 'transparent',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emblem: {
    width: 38,
    height: 48,
    marginRight: 8,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  ministryTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.navy,
    letterSpacing: -0.2,
  },
  govtSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textMuted,
    marginTop: 1,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4E2F5',
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  globeIcon: {
    fontSize: 13,
    marginRight: 5,
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.navy,
    marginRight: 4,
  },
  chevronIcon: {
    fontSize: 10,
    color: colors.navy,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 17, 91, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '80%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  modalHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navy,
    marginBottom: 16,
    textAlign: 'center',
  },
  langOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: '#F7FBFF',
  },
  langOptionSelected: {
    backgroundColor: '#E7F1FF',
    borderWidth: 1,
    borderColor: colors.blue,
  },
  langOptionText: {
    fontSize: 14,
    color: colors.navy,
    fontWeight: '500',
    textAlign: 'center',
  },
  langOptionTextSelected: {
    color: colors.blue,
    fontWeight: '700',
  },
});
