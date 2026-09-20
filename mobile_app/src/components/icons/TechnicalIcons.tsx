import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
}

export const BackArrowIcon: React.FC<IconProps> = ({ size = 20, color = '#07115B' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Left stem */}
    <View
      style={{
        position: 'absolute',
        width: size * 0.45,
        height: 2.2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
        top: size * 0.28,
        left: size * 0.15,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.45,
        height: 2.2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
        bottom: size * 0.28,
        left: size * 0.15,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.65,
        height: 2.2,
        backgroundColor: color,
        borderRadius: 1,
        left: size * 0.15,
      }}
    />
  </View>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 16, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.4,
        height: size * 0.4,
        borderTopWidth: 2.2,
        borderRightWidth: 2.2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginLeft: -size * 0.15,
      }}
    />
  </View>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 16, color = '#07115B' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.4,
        height: size * 0.4,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginTop: -size * 0.15,
      }}
    />
  </View>
);

export const GearIcon: React.FC<IconProps> = ({ size = 28, color = '#FFFFFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Outer circle */}
    <View
      style={{
        width: size * 0.8,
        height: size * 0.8,
        borderRadius: size * 0.4,
        borderWidth: size * 0.18,
        borderColor: color,
        backgroundColor: 'transparent',
      }}
    />
    {/* Teeth vertical */}
    <View
      style={{
        position: 'absolute',
        width: size * 0.22,
        height: size,
        backgroundColor: color,
        borderRadius: 2,
      }}
    />
    {/* Teeth horizontal */}
    <View
      style={{
        position: 'absolute',
        width: size,
        height: size * 0.22,
        backgroundColor: color,
        borderRadius: 2,
      }}
    />
    {/* Teeth 45 deg */}
    <View
      style={{
        position: 'absolute',
        width: size * 0.22,
        height: size,
        backgroundColor: color,
        borderRadius: 2,
        transform: [{ rotate: '45deg' }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.22,
        height: size,
        backgroundColor: color,
        borderRadius: 2,
        transform: [{ rotate: '-45deg' }],
      }}
    />
    {/* Center hole */}
    <View
      style={{
        position: 'absolute',
        width: size * 0.36,
        height: size * 0.36,
        borderRadius: size * 0.18,
        backgroundColor: color === '#FFFFFF' ? '#006CFF' : '#F7FBFF',
      }}
    />
  </View>
);

export const WrenchIcon: React.FC<IconProps> = ({ size = 26, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Tool 1 */}
    <View
      style={{
        position: 'absolute',
        width: 3.5,
        height: size * 0.85,
        backgroundColor: color,
        borderRadius: 1.5,
        transform: [{ rotate: '45deg' }],
      }}
    />
    {/* Tool 2 */}
    <View
      style={{
        position: 'absolute',
        width: 3.5,
        height: size * 0.85,
        backgroundColor: color,
        borderRadius: 1.5,
        transform: [{ rotate: '-45deg' }],
      }}
    />
    {/* Screwdriver tip */}
    <View
      style={{
        position: 'absolute',
        width: 7,
        height: 7,
        borderRadius: 3.5,
        borderWidth: 2,
        borderColor: color,
        top: size * 0.1,
        left: size * 0.1,
      }}
    />
    {/* Wrench head */}
    <View
      style={{
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        borderWidth: 2.2,
        borderRightColor: 'transparent',
        borderColor: color,
        top: size * 0.1,
        right: size * 0.1,
      }}
    />
  </View>
);

export const DocLinesIcon: React.FC<IconProps> = ({ size = 26, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.82,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: color,
        paddingTop: size * 0.18,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.38,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          marginBottom: 3,
        }}
      />
      <View
        style={{
          width: size * 0.38,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          marginBottom: 3,
        }}
      />
      <View
        style={{
          width: size * 0.24,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          alignSelf: 'flex-start',
          marginLeft: size * 0.08,
        }}
      />
    </View>
  </View>
);

export const ClipboardCheckIcon: React.FC<IconProps> = ({ size = 26, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Clipboard body */}
    <View
      style={{
        width: size * 0.68,
        height: size * 0.8,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Checkmark */}
      <View
        style={{
          width: size * 0.3,
          height: size * 0.18,
          borderLeftWidth: 2.2,
          borderBottomWidth: 2.2,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
          marginTop: size * 0.08,
        }}
      />
    </View>
    {/* Clip top */}
    <View
      style={{
        position: 'absolute',
        top: size * 0.04,
        width: size * 0.32,
        height: 4,
        borderRadius: 2,
        backgroundColor: color,
      }}
    />
  </View>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 18, color = '#7D98C4' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.65,
        borderRadius: (size * 0.65) / 2,
        borderWidth: 2,
        borderColor: color,
        marginRight: size * 0.15,
        marginBottom: size * 0.15,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.35,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
        bottom: size * 0.12,
        right: size * 0.1,
      }}
    />
  </View>
);

export const FilterIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* 3 slider lines with small handles */}
    <View style={{ width: size * 0.8, height: 1.8, backgroundColor: color, borderRadius: 1, marginBottom: 4 }}>
      <View style={{ position: 'absolute', left: 2, top: -2.5, width: 7, height: 7, borderRadius: 3.5, backgroundColor: color }} />
    </View>
    <View style={{ width: size * 0.8, height: 1.8, backgroundColor: color, borderRadius: 1, marginBottom: 4 }}>
      <View style={{ position: 'absolute', right: 2, top: -2.5, width: 7, height: 7, borderRadius: 3.5, backgroundColor: color }} />
    </View>
    <View style={{ width: size * 0.8, height: 1.8, backgroundColor: color, borderRadius: 1 }}>
      <View style={{ position: 'absolute', left: 4, top: -2.5, width: 7, height: 7, borderRadius: 3.5, backgroundColor: color }} />
    </View>
  </View>
);

export const QrScanIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* 4 corner brackets */}
    <View style={[styles.corner, { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2, borderColor: color }]} />
    <View style={[styles.corner, { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2, borderColor: color }]} />
    <View style={[styles.corner, { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: color }]} />
    <View style={[styles.corner, { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2, borderColor: color }]} />
    {/* Center bar */}
    <View style={{ width: size * 0.5, height: 2, backgroundColor: color, borderRadius: 1 }} />
  </View>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.8,
        height: size * 0.8,
        borderRadius: 4,
        borderWidth: 1.8,
        borderColor: color,
        paddingTop: 4,
      }}
    >
      <View style={{ width: '100%', height: 1.5, backgroundColor: color }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 3 }}>
        <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color }} />
        <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color }} />
      </View>
    </View>
    {/* Top binder rings */}
    <View style={{ position: 'absolute', top: 0, left: 4, width: 2, height: 3, backgroundColor: color, borderRadius: 1 }} />
    <View style={{ position: 'absolute', top: 0, right: 4, width: 2, height: 3, backgroundColor: color, borderRadius: 1 }} />
  </View>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.82,
        height: size * 0.82,
        borderRadius: (size * 0.82) / 2,
        borderWidth: 1.8,
        borderColor: color,
      }}
    >
      {/* Hour hand */}
      <View
        style={{
          position: 'absolute',
          width: 1.6,
          height: size * 0.28,
          backgroundColor: color,
          borderRadius: 1,
          top: size * 0.12,
          left: (size * 0.82) / 2 - 1.6,
        }}
      />
      {/* Minute hand */}
      <View
        style={{
          position: 'absolute',
          width: size * 0.24,
          height: 1.6,
          backgroundColor: color,
          borderRadius: 1,
          top: (size * 0.82) / 2 - 1.6,
          left: (size * 0.82) / 2 - 1.6,
        }}
      />
    </View>
  </View>
);

export const LocationPinIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.58,
        height: size * 0.58,
        borderRadius: (size * 0.58) / 2,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: (size * 0.22) / 2,
          backgroundColor: '#FFFFFF',
        }}
      />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 5,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
        marginTop: -1,
      }}
    />
  </View>
);

export const EquipmentBadgeIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.75,
        height: size * 0.85,
        borderRadius: 4,
        borderWidth: 1.8,
        borderColor: color,
        paddingHorizontal: 2,
        paddingTop: 3,
      }}
    >
      <View style={{ width: size * 0.35, height: 2, backgroundColor: color, borderRadius: 1, marginBottom: 2.5 }} />
      <View style={{ width: size * 0.45, height: 1.5, backgroundColor: color, borderRadius: 1, marginBottom: 2 }} />
      <View style={{ width: size * 0.45, height: 1.5, backgroundColor: color, borderRadius: 1 }} />
    </View>
  </View>
);

export const InfoCircleIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.85,
        height: size * 0.85,
        borderRadius: (size * 0.85) / 2,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ width: 2, height: 2.5, borderRadius: 1.25, backgroundColor: '#FFFFFF', marginBottom: 2 }} />
      <View style={{ width: 2, height: 6, borderRadius: 1, backgroundColor: '#FFFFFF' }} />
    </View>
  </View>
);

export const HomeTabIcon: React.FC<IconProps> = ({ size = 22, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Roof */}
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.4,
        borderRightWidth: size * 0.4,
        borderBottomWidth: size * 0.34,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }}
    />
    {/* Base */}
    <View
      style={{
        width: size * 0.6,
        height: size * 0.4,
        backgroundColor: color,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        marginTop: -1,
      }}
    />
  </View>
);

export const ChecksTabIcon: React.FC<IconProps> = ({ size = 22, color = '#7D98C4' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.75,
        borderRadius: 4,
        borderWidth: 1.8,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.28,
          height: size * 0.16,
          borderLeftWidth: 1.8,
          borderBottomWidth: 1.8,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  </View>
);

export const TasksTabIcon: React.FC<IconProps> = ({ size = 22, color = '#7D98C4' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Briefcase */}
    <View
      style={{
        width: size * 0.72,
        height: size * 0.55,
        borderRadius: 3,
        borderWidth: 1.8,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
    <View
      style={{
        position: 'absolute',
        top: size * 0.1,
        width: size * 0.32,
        height: size * 0.18,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderWidth: 1.6,
        borderBottomWidth: 0,
        borderColor: color,
      }}
    />
  </View>
);

export const BellTabIcon: React.FC<IconProps> = ({ size = 22, color = '#7D98C4' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.58,
        height: size * 0.5,
        borderTopLeftRadius: size * 0.29,
        borderTopRightRadius: size * 0.29,
        borderWidth: 1.8,
        borderColor: color,
      }}
    />
    <View
      style={{
        width: size * 0.75,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
        marginTop: -1,
      }}
    />
  </View>
);

export const ProfileTabIcon: React.FC<IconProps> = ({ size = 22, color = '#7D98C4' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.38,
        height: size * 0.38,
        borderRadius: (size * 0.38) / 2,
        borderWidth: 1.8,
        borderColor: color,
        marginBottom: 2,
      }}
    />
    <View
      style={{
        width: size * 0.68,
        height: size * 0.32,
        borderTopLeftRadius: (size * 0.68) / 2,
        borderTopRightRadius: (size * 0.68) / 2,
        borderWidth: 1.8,
        borderBottomWidth: 0,
        borderColor: color,
      }}
    />
  </View>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size = 16, color = '#07115B' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.4,
        height: size * 0.4,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginTop: size * 0.15,
      }}
    />
  </View>
);

export const CheckboxCheckedIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View
    style={[
      styles.center,
      {
        width: size,
        height: size,
        borderRadius: 5,
        backgroundColor: color,
      },
    ]}
  >
    <View
      style={{
        width: size * 0.45,
        height: size * 0.25,
        borderLeftWidth: 2.2,
        borderBottomWidth: 2.2,
        borderColor: '#FFFFFF',
        transform: [{ rotate: '-45deg' }],
        marginTop: -size * 0.1,
      }}
    />
  </View>
);

export const CheckboxUncheckedIcon: React.FC<IconProps> = ({ size = 20, color = '#C9D9F3' }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: 5,
      borderWidth: 1.8,
      borderColor: color,
      backgroundColor: '#FFFFFF',
    }}
  />
);

export const MicrophoneIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.38,
        height: size * 0.52,
        borderRadius: size * 0.19,
        backgroundColor: color,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.6,
        height: size * 0.4,
        borderBottomLeftRadius: size * 0.3,
        borderBottomRightRadius: size * 0.3,
        borderWidth: 1.8,
        borderTopWidth: 0,
        borderColor: color,
        top: size * 0.2,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: 2,
        height: size * 0.22,
        backgroundColor: color,
        bottom: 0,
      }}
    />
  </View>
);

export const CheckmarkCircleIcon: React.FC<IconProps> = ({ size = 32, color = '#0B9E5A' }) => (
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
    <View
      style={{
        width: size * 0.44,
        height: size * 0.24,
        borderLeftWidth: 2.5,
        borderBottomWidth: 2.5,
        borderColor: '#FFFFFF',
        transform: [{ rotate: '-45deg' }],
        marginTop: -size * 0.08,
      }}
    />
  </View>
);

export const CrossCircleIcon: React.FC<IconProps> = ({ size = 32, color = '#D93025' }) => (
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
    <View
      style={{
        position: 'absolute',
        width: size * 0.48,
        height: 2.5,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.48,
        height: 2.5,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
      }}
    />
  </View>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({ size = 20, color = '#E99000' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.45,
        borderRightWidth: size * 0.45,
        borderBottomWidth: size * 0.78,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: 2,
        height: size * 0.28,
        backgroundColor: '#FFFFFF',
        top: size * 0.28,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: 2.5,
        height: 2.5,
        borderRadius: 1.25,
        backgroundColor: '#FFFFFF',
        bottom: size * 0.16,
      }}
    />
  </View>
);

export const CameraIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.8,
        height: size * 0.6,
        borderRadius: 4,
        borderWidth: 1.8,
        borderColor: color,
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.3,
          height: size * 0.3,
          borderRadius: size * 0.15,
          borderWidth: 1.6,
          borderColor: color,
        }}
      />
    </View>
    {/* Flash/top bump */}
    <View
      style={{
        position: 'absolute',
        top: size * 0.08,
        width: size * 0.28,
        height: 3,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        backgroundColor: color,
      }}
    />
  </View>
);

export const VideoCameraIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.62,
        height: size * 0.52,
        borderRadius: 3,
        borderWidth: 1.8,
        borderColor: color,
        marginRight: size * 0.18,
      }}
    />
    <View
      style={{
        position: 'absolute',
        right: 0,
        width: 0,
        height: 0,
        borderTopWidth: size * 0.2,
        borderBottomWidth: size * 0.2,
        borderRightWidth: size * 0.25,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: color,
      }}
    />
  </View>
);

export const PaperclipDocIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.68,
        height: size * 0.82,
        borderRadius: 3,
        borderWidth: 1.8,
        borderColor: color,
      }}
    >
      <View style={{ width: size * 0.36, height: 2, backgroundColor: color, marginTop: 4, marginLeft: 3, borderRadius: 1 }} />
      <View style={{ width: size * 0.44, height: 2, backgroundColor: color, marginTop: 3, marginLeft: 3, borderRadius: 1 }} />
      <View style={{ width: size * 0.28, height: 2, backgroundColor: color, marginTop: 3, marginLeft: 3, borderRadius: 1 }} />
    </View>
  </View>
);

export const SendIcon: React.FC<IconProps> = ({ size = 18, color = '#FFFFFF' }) => (
  <View style={[styles.center, { width: size, height: size, transform: [{ rotate: '45deg' }] }]}>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.38,
        borderRightWidth: size * 0.38,
        borderBottomWidth: size * 0.75,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: 2,
        height: size * 0.38,
        backgroundColor: '#0B9E5A',
        bottom: 0,
      }}
    />
  </View>
);

export const UserCircleIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.38,
        height: size * 0.38,
        borderRadius: (size * 0.38) / 2,
        backgroundColor: color,
        marginBottom: 1,
      }}
    />
    <View
      style={{
        width: size * 0.72,
        height: size * 0.34,
        borderTopLeftRadius: (size * 0.72) / 2,
        borderTopRightRadius: (size * 0.72) / 2,
        backgroundColor: color,
      }}
    />
  </View>
);

export const BuildingIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.7,
        height: size * 0.78,
        borderRadius: 2,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        paddingTop: 3,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%', marginBottom: 3 }}>
        <View style={{ width: 2.5, height: 2.5, backgroundColor: color, borderRadius: 0.5 }} />
        <View style={{ width: 2.5, height: 2.5, backgroundColor: color, borderRadius: 0.5 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
        <View style={{ width: 2.5, height: 2.5, backgroundColor: color, borderRadius: 0.5 }} />
        <View style={{ width: 2.5, height: 2.5, backgroundColor: color, borderRadius: 0.5 }} />
      </View>
    </View>
  </View>
);

export const ImageSquareIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.8,
        height: size * 0.7,
        borderRadius: 3,
        borderWidth: 1.8,
        borderColor: color,
        overflow: 'hidden',
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: (size * 0.22) / 2,
          backgroundColor: color,
          position: 'absolute',
          top: 2,
          left: 3,
        }}
      />
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: size * 0.35,
          borderRightWidth: size * 0.35,
          borderBottomWidth: size * 0.35,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
        }}
      />
    </View>
  </View>
);

export const LightbulbIcon: React.FC<IconProps> = ({ size = 20, color = '#F59E0B' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.65,
        borderRadius: (size * 0.65) / 2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
    <View
      style={{
        position: 'absolute',
        bottom: size * 0.16,
        width: size * 0.36,
        height: size * 0.28,
        backgroundColor: color,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
      }}
    />
    <View
      style={{
        position: 'absolute',
        bottom: size * 0.04,
        width: size * 0.24,
        height: size * 0.12,
        backgroundColor: '#78350F',
        borderRadius: 2,
      }}
    />
  </View>
);

export const IdBadgeIcon: React.FC<IconProps> = ({ size = 18, color = '#2563EB' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.9,
        height: size * 0.68,
        borderRadius: 3,
        borderWidth: 1.8,
        borderColor: color,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2.5,
      }}
    >
      <View
        style={{
          width: size * 0.28,
          height: size * 0.36,
          backgroundColor: color,
          borderRadius: 1.5,
          marginRight: 2.5,
        }}
      />
      <View style={{ flex: 1 }}>
        <View style={{ width: '100%', height: 1.8, backgroundColor: color, borderRadius: 1, marginBottom: 2 }} />
        <View style={{ width: '75%', height: 1.8, backgroundColor: color, borderRadius: 1, marginBottom: 2 }} />
        <View style={{ width: '50%', height: 1.8, backgroundColor: color, borderRadius: 1 }} />
      </View>
    </View>
  </View>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ size = 18, color = '#2563EB' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.76,
        height: size * 0.85,
        borderWidth: 1.8,
        borderColor: color,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: size * 0.38,
        borderBottomRightRadius: size * 0.38,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.32,
          height: size * 0.18,
          borderLeftWidth: 2,
          borderBottomWidth: 2,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
          marginTop: -2,
        }}
      />
    </View>
  </View>
);

export const UserTieIcon: React.FC<IconProps> = ({ size = 18, color = '#2563EB' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.36,
        height: size * 0.36,
        borderRadius: (size * 0.36) / 2,
        backgroundColor: color,
        marginBottom: 1,
      }}
    />
    <View
      style={{
        width: size * 0.72,
        height: size * 0.34,
        borderTopLeftRadius: (size * 0.72) / 2,
        borderTopRightRadius: (size * 0.72) / 2,
        backgroundColor: color,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 2.2,
          height: size * 0.26,
          backgroundColor: '#FFFFFF',
          marginTop: 1,
        }}
      />
    </View>
  </View>
);

export const PhoneIcon: React.FC<IconProps> = ({ size = 18, color = '#2563EB' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.65,
        borderWidth: 2.2,
        borderColor: color,
        borderTopRightRadius: size * 0.3,
        borderBottomLeftRadius: size * 0.3,
        borderBottomRightRadius: 2,
        borderTopLeftRadius: 2,
        transform: [{ rotate: '-25deg' }],
      }}
    />
  </View>
);

export const MailIcon: React.FC<IconProps> = ({ size = 18, color = '#2563EB' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.85,
        height: size * 0.62,
        borderRadius: 3,
        borderWidth: 1.8,
        borderColor: color,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: size * 0.55,
          height: size * 0.55,
          borderBottomWidth: 1.8,
          borderRightWidth: 1.8,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginTop: -size * 0.32,
        }}
      />
    </View>
  </View>
);

export const LayersIcon: React.FC<IconProps> = ({ size = 18, color = '#2563EB' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Top diamond */}
    <View
      style={{
        width: size * 0.6,
        height: size * 0.32,
        borderWidth: 1.8,
        borderColor: color,
        transform: [{ rotate: '45deg' }, { scaleY: 0.6 }],
        marginBottom: -size * 0.1,
      }}
    />
    {/* Bottom chevron / diamond layer */}
    <View
      style={{
        width: size * 0.6,
        height: size * 0.32,
        borderBottomWidth: 1.8,
        borderRightWidth: 1.8,
        borderColor: color,
        transform: [{ rotate: '45deg' }, { scaleY: 0.6 }],
      }}
    />
  </View>
);

export const PencilIcon: React.FC<IconProps> = ({ size = 16, color = '#FFFFFF' }) => (
  <View style={[styles.center, { width: size, height: size, transform: [{ rotate: '45deg' }] }]}>
    <View
      style={{
        width: size * 0.28,
        height: size * 0.68,
        backgroundColor: color,
        borderRadius: 1.5,
      }}
    />
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.14,
        borderRightWidth: size * 0.14,
        borderTopWidth: size * 0.22,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
      }}
    />
  </View>
);

export const LockIcon: React.FC<IconProps> = ({ size = 16, color = '#FFFFFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.44,
        height: size * 0.34,
        borderTopLeftRadius: size * 0.22,
        borderTopRightRadius: size * 0.22,
        borderWidth: 2,
        borderColor: color,
        borderBottomWidth: 0,
        marginBottom: -1,
      }}
    />
    <View
      style={{
        width: size * 0.62,
        height: size * 0.46,
        borderRadius: 3,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 2.2,
          height: 3.5,
          backgroundColor: '#8B5CF6',
          borderRadius: 1,
        }}
      />
    </View>
  </View>
);

export const LogoutIcon: React.FC<IconProps> = ({ size = 16, color = '#FFFFFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Door frame */}
    <View
      style={{
        position: 'absolute',
        width: size * 0.65,
        height: size * 0.78,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        borderRadius: 2,
        left: 1,
      }}
    />
    {/* Arrow pointing right */}
    <View
      style={{
        position: 'absolute',
        width: size * 0.5,
        height: 2,
        backgroundColor: color,
        right: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.24,
        height: size * 0.24,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        right: 1,
      }}
    />
  </View>
);

export const TruckIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Truck cargo body */}
    <View
      style={{
        position: 'absolute',
        left: 0,
        top: size * 0.22,
        width: size * 0.58,
        height: size * 0.44,
        backgroundColor: color,
        borderRadius: 2,
      }}
    />
    {/* Truck cab */}
    <View
      style={{
        position: 'absolute',
        right: 0,
        top: size * 0.34,
        width: size * 0.36,
        height: size * 0.32,
        backgroundColor: color,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 2,
      }}
    />
    {/* Cab window */}
    <View
      style={{
        position: 'absolute',
        right: 2,
        top: size * 0.38,
        width: size * 0.16,
        height: size * 0.14,
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 2,
      }}
    />
    {/* Left wheel */}
    <View
      style={{
        position: 'absolute',
        left: size * 0.12,
        bottom: size * 0.14,
        width: size * 0.22,
        height: size * 0.22,
        borderRadius: size * 0.11,
        backgroundColor: '#07115B',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
      }}
    />
    {/* Right wheel */}
    <View
      style={{
        position: 'absolute',
        right: size * 0.1,
        bottom: size * 0.14,
        width: size * 0.22,
        height: size * 0.22,
        borderRadius: size * 0.11,
        backgroundColor: '#07115B',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
      }}
    />
  </View>
);

export const FireExtinguisherIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Cylinder tank */}
    <View
      style={{
        width: size * 0.44,
        height: size * 0.65,
        backgroundColor: color,
        borderRadius: size * 0.18,
        marginTop: size * 0.2,
      }}
    />
    {/* Top valve */}
    <View
      style={{
        position: 'absolute',
        top: size * 0.08,
        width: size * 0.16,
        height: size * 0.14,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    {/* Handle / nozzle */}
    <View
      style={{
        position: 'absolute',
        top: size * 0.04,
        right: size * 0.22,
        width: size * 0.32,
        height: 2.2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
  </View>
);

export const FanIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Center hub */}
    <View
      style={{
        width: size * 0.28,
        height: size * 0.28,
        borderRadius: size * 0.14,
        backgroundColor: color,
        zIndex: 2,
      }}
    />
    {/* Blade 1 (top) */}
    <View
      style={{
        position: 'absolute',
        top: size * 0.08,
        width: size * 0.26,
        height: size * 0.42,
        backgroundColor: color,
        borderTopLeftRadius: size * 0.18,
        borderTopRightRadius: size * 0.08,
      }}
    />
    {/* Blade 2 (bottom-right) */}
    <View
      style={{
        position: 'absolute',
        bottom: size * 0.14,
        right: size * 0.12,
        width: size * 0.26,
        height: size * 0.42,
        backgroundColor: color,
        borderTopLeftRadius: size * 0.18,
        borderTopRightRadius: size * 0.08,
        transform: [{ rotate: '120deg' }],
      }}
    />
    {/* Blade 3 (bottom-left) */}
    <View
      style={{
        position: 'absolute',
        bottom: size * 0.14,
        left: size * 0.12,
        width: size * 0.26,
        height: size * 0.42,
        backgroundColor: color,
        borderTopLeftRadius: size * 0.18,
        borderTopRightRadius: size * 0.08,
        transform: [{ rotate: '240deg' }],
      }}
    />
  </View>
);

export const ExclamationCircleIcon: React.FC<IconProps> = ({ size = 20, color = '#DC2626' }) => (
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
    <View
      style={{
        width: 2.2,
        height: size * 0.38,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        marginBottom: 2,
      }}
    />
    <View
      style={{
        width: 2.5,
        height: 2.5,
        borderRadius: 1.25,
        backgroundColor: '#FFFFFF',
      }}
    />
  </View>
);

export const DocumentsTabIcon: React.FC<IconProps> = ({ size = 22, color = '#7D98C4' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.68,
        height: size * 0.82,
        borderRadius: 4,
        borderWidth: 1.8,
        borderColor: color,
        paddingTop: size * 0.16,
        paddingHorizontal: size * 0.1,
      }}
    >
      <View style={{ width: '85%', height: 1.8, backgroundColor: color, borderRadius: 1, marginBottom: 2.5 }} />
      <View style={{ width: '85%', height: 1.8, backgroundColor: color, borderRadius: 1, marginBottom: 2.5 }} />
      <View style={{ width: '55%', height: 1.8, backgroundColor: color, borderRadius: 1 }} />
    </View>
  </View>
);

export const HardHatIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Helmet dome */}
    <View
      style={{
        width: size * 0.72,
        height: size * 0.44,
        borderTopLeftRadius: size * 0.36,
        borderTopRightRadius: size * 0.36,
        backgroundColor: color,
        marginTop: 1,
      }}
    />
    {/* Helmet ridge */}
    <View
      style={{
        position: 'absolute',
        top: size * 0.22,
        width: size * 0.18,
        height: size * 0.28,
        backgroundColor: '#FFFFFF',
        opacity: 0.35,
        borderRadius: 1,
      }}
    />
    {/* Helmet brim */}
    <View
      style={{
        width: size * 0.9,
        height: 2.5,
        backgroundColor: color,
        borderRadius: 1.25,
        marginTop: -1,
      }}
    />
  </View>
);

export const LeafIcon: React.FC<IconProps> = ({ size = 20, color = '#10B981' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.65,
        backgroundColor: color,
        borderTopRightRadius: size * 0.65,
        borderBottomLeftRadius: size * 0.65,
        transform: [{ rotate: '-15deg' }],
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Central vein */}
      <View
        style={{
          width: '75%',
          height: 1.5,
          backgroundColor: '#FFFFFF',
          opacity: 0.5,
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  </View>
);

export const CrossedToolsIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Tool 1 */}
    <View
      style={{
        position: 'absolute',
        width: 2.5,
        height: size * 0.8,
        backgroundColor: color,
        borderRadius: 1.25,
        transform: [{ rotate: '45deg' }],
      }}
    />
    {/* Tool 2 */}
    <View
      style={{
        position: 'absolute',
        width: 2.5,
        height: size * 0.8,
        backgroundColor: color,
        borderRadius: 1.25,
        transform: [{ rotate: '-45deg' }],
      }}
    />
    {/* Head 1 */}
    <View
      style={{
        position: 'absolute',
        top: 2,
        left: 2,
        width: 6,
        height: 6,
        borderRadius: 3,
        borderWidth: 1.6,
        borderColor: color,
      }}
    />
    {/* Head 2 */}
    <View
      style={{
        position: 'absolute',
        top: 2,
        right: 2,
        width: 6,
        height: 6,
        borderRadius: 3,
        borderWidth: 1.6,
        borderColor: color,
      }}
    />
  </View>
);

export const ThreeDotsVerticalIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ width: 3.5, height: 3.5, borderRadius: 1.75, backgroundColor: color, marginBottom: 2.5 }} />
    <View style={{ width: 3.5, height: 3.5, borderRadius: 1.75, backgroundColor: color, marginBottom: 2.5 }} />
    <View style={{ width: 3.5, height: 3.5, borderRadius: 1.75, backgroundColor: color }} />
  </View>
);

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 6,
    height: 6,
  },
});
