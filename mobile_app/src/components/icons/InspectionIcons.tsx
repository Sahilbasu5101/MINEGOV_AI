import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
}

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 22, color = '#07115B' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Stem */}
    <View
      style={{
        position: 'absolute',
        width: size * 0.7,
        height: 2.4,
        backgroundColor: color,
        borderRadius: 1.2,
      }}
    />
    {/* Top arrow barb */}
    <View
      style={{
        position: 'absolute',
        left: 2,
        top: size * 0.28,
        width: size * 0.42,
        height: 2.4,
        backgroundColor: color,
        borderRadius: 1.2,
        transform: [{ rotate: '-45deg' }, { translateX: 2 }],
      }}
    />
    {/* Bottom arrow barb */}
    <View
      style={{
        position: 'absolute',
        left: 2,
        bottom: size * 0.28,
        width: size * 0.42,
        height: 2.4,
        backgroundColor: color,
        borderRadius: 1.2,
        transform: [{ rotate: '45deg' }, { translateX: 2 }],
      }}
    />
  </View>
);

export const CheckmarkIcon: React.FC<IconProps> = ({ size = 16, color = '#0B9E5A' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.3,
        height: size * 0.6,
        borderBottomWidth: 2.4,
        borderRightWidth: 2.4,
        borderColor: color,
        transform: [{ rotate: '45deg' }, { translateY: -size * 0.1 }],
      }}
    />
  </View>
);

export const AlertTriangleOutlineIcon: React.FC<IconProps> = ({ size = 16, color = '#D93025' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.48,
        borderRightWidth: size * 0.48,
        borderBottomWidth: size * 0.82,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }}
    />
    {/* Exclamation point */}
    <View style={{ position: 'absolute', top: size * 0.32, alignItems: 'center' }}>
      <View
        style={{
          width: 2,
          height: size * 0.28,
          backgroundColor: '#FFFFFF',
          borderRadius: 1,
        }}
      />
      <View
        style={{
          width: 2,
          height: 2,
          borderRadius: 1,
          backgroundColor: '#FFFFFF',
          marginTop: 1.5,
        }}
      />
    </View>
  </View>
);

export const MinusCircleIcon: React.FC<IconProps> = ({ size = 16, color = '#456399' }) => (
  <View
    style={[
      styles.center,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.8,
        borderColor: color,
      },
    ]}
  >
    <View
      style={{
        width: size * 0.54,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
  </View>
);

export const LargeClipboardCheckIcon: React.FC<IconProps> = ({ size = 30, color = '#FFFFFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Clip tab */}
    <View
      style={{
        width: size * 0.4,
        height: size * 0.16,
        borderRadius: 2.5,
        backgroundColor: color,
        marginBottom: -2,
        zIndex: 2,
      }}
    />
    {/* Board */}
    <View
      style={{
        width: size * 0.74,
        height: size * 0.84,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 3,
      }}
    >
      <View
        style={{
          width: size * 0.42,
          height: 2.2,
          backgroundColor: color,
          borderRadius: 1.1,
          marginBottom: 3.5,
        }}
      />
      <View
        style={{
          width: size * 0.42,
          height: 2.2,
          backgroundColor: color,
          borderRadius: 1.1,
          marginBottom: 3.5,
        }}
      />
      <View
        style={{
          width: size * 0.28,
          height: 2.2,
          backgroundColor: color,
          borderRadius: 1.1,
        }}
      />
    </View>
  </View>
);

export const ClockTimeIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View
    style={[
      styles.center,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.8,
        borderColor: color,
      },
    ]}
  >
    {/* Center dot */}
    <View
      style={{
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: color,
      }}
    />
    {/* Hour hand */}
    <View
      style={{
        position: 'absolute',
        top: size * 0.25,
        width: 1.8,
        height: size * 0.26,
        backgroundColor: color,
        borderRadius: 0.9,
      }}
    />
    {/* Minute hand */}
    <View
      style={{
        position: 'absolute',
        right: size * 0.23,
        width: size * 0.26,
        height: 1.8,
        backgroundColor: color,
        borderRadius: 0.9,
      }}
    />
  </View>
);

export const MapTargetPinIcon: React.FC<IconProps> = ({ size = 26, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Outer target ring */}
    <View
      style={{
        position: 'absolute',
        width: size * 0.88,
        height: size * 0.88,
        borderRadius: size * 0.44,
        borderWidth: 1.6,
        borderColor: color,
        opacity: 0.45,
      }}
    />
    {/* Pin circle */}
    <View
      style={{
        width: size * 0.52,
        height: size * 0.52,
        borderRadius: size * 0.26,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.2,
          height: size * 0.2,
          borderRadius: size * 0.1,
          backgroundColor: '#FFFFFF',
        }}
      />
    </View>
    {/* Pin point */}
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.16,
        borderRightWidth: size * 0.16,
        borderTopWidth: size * 0.24,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
        marginTop: -1.5,
      }}
    />
  </View>
);

export const MineBuildingIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.8,
        height: size * 0.72,
        borderRadius: 2.5,
        borderWidth: 1.6,
        borderColor: color,
        padding: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'space-around',
      }}
    >
      <View style={{ width: 3, height: 3, backgroundColor: color, borderRadius: 0.5 }} />
      <View style={{ width: 3, height: 3, backgroundColor: color, borderRadius: 0.5 }} />
      <View style={{ width: 3, height: 3, backgroundColor: color, borderRadius: 0.5 }} />
      <View style={{ width: 3, height: 3, backgroundColor: color, borderRadius: 0.5 }} />
    </View>
    <View
      style={{
        width: size * 0.95,
        height: 1.8,
        backgroundColor: color,
        marginTop: 0.5,
        borderRadius: 0.9,
      }}
    />
  </View>
);

export const ShieldCategoryIcon: React.FC<IconProps> = ({ size = 13, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.84,
        height: size * 0.68,
        borderWidth: 1.5,
        borderColor: color,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        borderBottomLeftRadius: size * 0.42,
        borderBottomRightRadius: size * 0.42,
      }}
    />
  </View>
);

export const GearCategoryIcon: React.FC<IconProps> = ({ size = 13, color = '#006CFF' }) => (
  <View
    style={[
      styles.center,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: color,
      },
    ]}
  >
    <View style={{ width: size * 0.32, height: size * 0.32, borderRadius: 1.5, backgroundColor: color }} />
  </View>
);

export const RoadBridgeCategoryIcon: React.FC<IconProps> = ({ size = 13, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.84,
        height: size * 0.6,
        borderWidth: 1.4,
        borderColor: color,
        borderRadius: 2,
        borderBottomWidth: 0,
      }}
    />
    <View
      style={{
        width: size * 0.4,
        height: 1.4,
        backgroundColor: color,
      }}
    />
  </View>
);

export const WrenchCategoryIcon: React.FC<IconProps> = ({ size = 13, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.62,
        height: size * 0.62,
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: size * 0.31,
        borderTopColor: 'transparent',
      }}
    />
    <View
      style={{
        width: 1.6,
        height: size * 0.45,
        backgroundColor: color,
        transform: [{ rotate: '45deg' }],
        position: 'absolute',
        bottom: 0,
        right: 1,
      }}
    />
  </View>
);

export const SaveDiskIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View
    style={[
      styles.center,
      {
        width: size,
        height: size,
        borderRadius: 3.5,
        borderWidth: 1.8,
        borderColor: color,
      },
    ]}
  >
    {/* Metal slider bar */}
    <View
      style={{
        position: 'absolute',
        top: 0,
        width: size * 0.48,
        height: size * 0.32,
        backgroundColor: color,
        borderBottomLeftRadius: 1.5,
        borderBottomRightRadius: 1.5,
      }}
    />
    {/* Label paper */}
    <View
      style={{
        position: 'absolute',
        bottom: 2,
        width: size * 0.58,
        height: size * 0.34,
        borderWidth: 1.2,
        borderColor: color,
        borderRadius: 1.5,
      }}
    />
  </View>
);

export const SirdarAvatarIcon: React.FC<IconProps> = ({ size = 30, color = '#07115B' }) => (
  <View
    style={[
      styles.center,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
      },
    ]}
  >
    {/* Head */}
    <View
      style={{
        width: size * 0.38,
        height: size * 0.38,
        borderRadius: size * 0.19,
        backgroundColor: '#FFFFFF',
        marginBottom: 1,
      }}
    />
    {/* Shoulders */}
    <View
      style={{
        width: size * 0.64,
        height: size * 0.3,
        borderTopLeftRadius: size * 0.3,
        borderTopRightRadius: size * 0.3,
        backgroundColor: '#FFFFFF',
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
