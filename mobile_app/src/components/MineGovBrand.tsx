import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../constants/theme';

interface MineGovBrandProps {
  compact?: boolean;
}

export const MineGovBrand: React.FC<MineGovBrandProps> = ({ compact = false }) => {
  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      <Image
        source={require('../../assets/images/mountain_logo.png')}
        style={[styles.mountainLogo, compact && styles.mountainLogoCompact]}
        resizeMode="contain"
      />
      <View style={styles.brandTextRow}>
        <Text style={[styles.brandNavy, compact && styles.brandTextCompact]}>
          MineGov
        </Text>
        <Text style={[styles.brandBlue, compact && styles.brandTextCompact]}>
          {' '}AI
        </Text>
      </View>
      <Text style={[styles.sloganText, compact && styles.sloganTextCompact]}>
        Safer Mines   Greener Tomorrow
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  containerCompact: {
    marginTop: 2,
    marginBottom: 4,
  },
  mountainLogo: {
    width: 104,
    height: 44,
    marginBottom: 4,
  },
  mountainLogoCompact: {
    width: 90,
    height: 38,
    marginBottom: 2,
  },
  brandTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandNavy: {
    fontSize: 27,
    fontWeight: '900',
    color: colors.navy,
    letterSpacing: -0.5,
  },
  brandBlue: {
    fontSize: 27,
    fontWeight: '900',
    color: colors.blue,
    letterSpacing: -0.5,
  },
  brandTextCompact: {
    fontSize: 23,
  },
  sloganText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textMuted,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  sloganTextCompact: {
    fontSize: 10.5,
    marginTop: 1,
  },
});
