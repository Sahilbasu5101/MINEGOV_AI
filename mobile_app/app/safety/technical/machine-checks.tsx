import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../../src/constants/theme';
import { BackArrowIcon, ChevronRightIcon } from '../../../src/components/icons/TechnicalIcons';

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  image: any;
  route?: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: '1',
    title: '1. Earth-Moving &\nMining Machinery',
    description: 'Dumpers, excavators, dozers,\nloaders, graders, shovels etc.',
    image: require('../../../assets/images/technical/cat_earthmoving.png'),
    route: '/safety/technical/earth-moving',
  },
  {
    id: '2',
    title: '2. Conveyors &\nMaterial Handling Equipment',
    description: 'Belt conveyors, crushers,\nfeeders, transfer systems etc.',
    image: require('../../../assets/images/technical/cat_conveyor.png'),
  },
  {
    id: '3',
    title: '3. Drilling Equipment',
    description: 'Blast-hole drills, rotary drills,\ndrilling rigs etc.',
    image: require('../../../assets/images/technical/cat_drilling.png'),
  },
  {
    id: '4',
    title: '4. Winding & Hoisting Equipment',
    description: 'Winding engines, ropes, cages,\nskips, guides etc.',
    image: require('../../../assets/images/technical/cat_winding.png'),
  },
  {
    id: '5',
    title: '5. Haulage & Transport Equipment',
    description: 'Locomotives, mine tubs, rope\nhaulage, tracks, winches etc.',
    image: require('../../../assets/images/technical/cat_haulage.png'),
  },
  {
    id: '6',
    title: '6. Lifting Appliances',
    description: 'Cranes, hoists, winches,\nchain blocks, lifting tackles etc.',
    image: require('../../../assets/images/technical/cat_lifting.png'),
  },
  {
    id: '7',
    title: '7. Pumps & Water-Handling\nEquipment',
    description: 'Dewatering pumps, submersible\npumps, drainage pumps etc.',
    image: require('../../../assets/images/technical/cat_pumps.png'),
  },
  {
    id: '8',
    title: '8. Safety-Critical Equipment\n& Devices',
    description: 'Emergency stops, guards, interlocks,\nfire extinguishers, alarms etc.',
    image: require('../../../assets/images/technical/cat_safety.png'),
  },
];

export default function MachineChecksScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleCategoryPress = (item: CategoryItem) => {
    if (item.route) {
      router.push(item.route as any);
    } else {
      Alert.alert(
        item.title.replace('\n', ' '),
        'Inspection checklist for this category will be available in the upcoming statutory safety release.'
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
          accessibilityLabel="Back to Dashboard"
        >
          <BackArrowIcon size={20} color={colors.navy} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Machine & Equipment Checks</Text>
          <Text style={styles.headerSubtitle}>Select a category to proceed</Text>
        </View>

        {/* Balance back button */}
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Category List */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(24, insets.bottom + 16) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(item)}
            activeOpacity={0.85}
          >
            <View style={styles.categoryImageContainer}>
              <Image
                source={item.image}
                style={styles.categoryImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.categoryInfo}>
              <Text style={styles.categoryTitle}>{item.title}</Text>
              <Text style={styles.categoryDescription}>{item.description}</Text>
            </View>

            <View style={styles.chevronWrapper}>
              <ChevronRightIcon size={18} color="#006CFF" />
            </View>
          </TouchableOpacity>
        ))}
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
    fontSize: 16.5,
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
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  categoryCard: {
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
  categoryImageContainer: {
    width: 68,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#F3F7FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '90%',
    height: '90%',
  },
  categoryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: colors.navy,
    lineHeight: 17,
  },
  categoryDescription: {
    fontSize: 10.5,
    color: colors.textMuted,
    lineHeight: 14,
    marginTop: 3,
  },
  chevronWrapper: {
    paddingLeft: 6,
  },
});
