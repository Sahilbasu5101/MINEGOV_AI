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
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/constants/theme';
import {
  BackArrowIcon,
  ChevronRightIcon,
  SearchIcon,
  FilterIcon,
  InfoCircleIcon,
  GearIcon,
} from '../../../src/components/icons/TechnicalIcons';

interface EquipmentItem {
  id: string;
  name: string;
  prefix: string;
  image?: any;
  isCustomIcon?: boolean;
  route?: string;
}

const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: '1',
    name: 'Dumper / Haul Truck',
    prefix: '(ID prefix: DT)',
    image: require('../../../assets/images/technical/eq_dumper.png'),
    route: '/safety/technical/dumper-details',
  },
  {
    id: '2',
    name: 'Excavator',
    prefix: '(ID prefix: EX)',
    image: require('../../../assets/images/technical/eq_excavator.png'),
  },
  {
    id: '3',
    name: 'Shovel',
    prefix: '(ID prefix: SH)',
    image: require('../../../assets/images/technical/eq_shovel.png'),
  },
  {
    id: '4',
    name: 'Dozer',
    prefix: '(ID prefix: DZ)',
    image: require('../../../assets/images/technical/eq_dozer.png'),
  },
  {
    id: '5',
    name: 'Wheel Loader',
    prefix: '(ID prefix: LD)',
    image: require('../../../assets/images/technical/eq_loader.png'),
  },
  {
    id: '6',
    name: 'Grader',
    prefix: '(ID prefix: GR)',
    image: require('../../../assets/images/technical/eq_grader.png'),
  },
  {
    id: '7',
    name: 'Dragline',
    prefix: '(ID prefix: DR)',
    image: require('../../../assets/images/technical/eq_dragline.png'),
  },
  {
    id: '8',
    name: 'Other Earth-Moving Equipment',
    prefix: '(If not listed)',
    isCustomIcon: true,
  },
];

export default function EarthMovingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = EQUIPMENT_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.prefix.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemPress = (item: EquipmentItem) => {
    if (item.route) {
      router.push(item.route as any);
    } else {
      Alert.alert(
        item.name,
        `Inspection details for ${item.name} are scheduled for the upcoming statutory safety release.`
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Back to Categories"
        >
          <BackArrowIcon size={20} color={colors.navy} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Earth-Moving & Mining Machinery</Text>
          <Text style={styles.headerSubtitle}>Select the equipment to inspect</Text>
        </View>

        {/* Balance back button */}
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <SearchIcon size={18} color="#7D98C4" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search equipment (e.g., Dumper, Excavator)"
            placeholderTextColor="#7D98C4"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          activeOpacity={0.75}
          onPress={() => Alert.alert('Filter', 'Filter equipment by working face, section or model.')}
        >
          <FilterIcon size={18} color="#006CFF" />
        </TouchableOpacity>
      </View>

      {/* Equipment List */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(28, insets.bottom + 20) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.equipmentCard}
            onPress={() => handleItemPress(item)}
            activeOpacity={0.85}
          >
            <View style={styles.equipmentImageContainer}>
              {item.isCustomIcon ? (
                <GearIcon size={28} color="#006CFF" />
              ) : (
                <Image
                  source={item.image}
                  style={styles.equipmentImage}
                  resizeMode="contain"
                />
              )}
            </View>

            <View style={styles.equipmentInfo}>
              <Text style={styles.equipmentName}>{item.name}</Text>
              <Text style={styles.equipmentPrefix}>{item.prefix}</Text>
            </View>

            <View style={styles.chevronWrapper}>
              <ChevronRightIcon size={18} color="#006CFF" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Bottom Info Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.infoIconWrapper}>
            <InfoCircleIcon size={22} color="#006CFF" />
          </View>
          <Text style={styles.infoBannerText}>
            Select the specific equipment type to view its statutory checklist and details.
          </Text>
        </View>
      </ScrollView>
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
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navy,
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#006CFF',
    fontWeight: '500',
    marginTop: 2,
  },
  headerRightSpacer: {
    width: 36,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFECFA',
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 8,
    fontSize: 13,
    color: colors.navy,
    fontWeight: '500',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DFECFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 4,
  },
  equipmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFECFA',
    padding: 12,
    marginBottom: 10,
    shadowColor: '#07115B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  equipmentImageContainer: {
    width: 68,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#F3F7FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  equipmentImage: {
    width: '92%',
    height: '92%',
  },
  equipmentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  equipmentName: {
    fontSize: 14.5,
    fontWeight: '800',
    color: colors.navy,
  },
  equipmentPrefix: {
    fontSize: 11.5,
    color: colors.textMuted,
    fontWeight: '500',
    marginTop: 2,
  },
  chevronWrapper: {
    paddingLeft: 6,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF2FC',
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D2E3F7',
  },
  infoIconWrapper: {
    marginRight: 10,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 11.5,
    color: '#1C4A8D',
    lineHeight: 16,
    fontWeight: '500',
  },
});
