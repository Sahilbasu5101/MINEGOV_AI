import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
}

export const RedAlertShieldIcon: React.FC<IconProps> = ({ size = 32 }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Outer soft red rounded square */}
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: '#FEE2E2',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Red triangle */}
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: size * 0.35,
          borderRightWidth: size * 0.35,
          borderBottomWidth: size * 0.6,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#EF4444',
        }}
      />
      {/* Exclamation point */}
      <View style={{ position: 'absolute', top: size * 0.36, alignItems: 'center' }}>
        <View
          style={{
            width: 2.4,
            height: size * 0.24,
            backgroundColor: '#FFFFFF',
            borderRadius: 1.2,
          }}
        />
        <View
          style={{
            width: 2.4,
            height: 2.4,
            backgroundColor: '#FFFFFF',
            borderRadius: 1.2,
            marginTop: 1.5,
          }}
        />
      </View>
    </View>
  </View>
);

export const BlueClipboardIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.4,
        height: 2.5,
        backgroundColor: color,
        borderRadius: 1,
        marginBottom: -1,
        zIndex: 1,
      }}
    />
    <View
      style={{
        width: size * 0.76,
        height: size * 0.82,
        borderRadius: 3,
        borderWidth: 1.6,
        borderColor: color,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: '65%', height: 1.5, backgroundColor: color, marginBottom: 2 }} />
      <View style={{ width: '65%', height: 1.5, backgroundColor: color, marginBottom: 2 }} />
      <View style={{ width: '45%', height: 1.5, backgroundColor: color }} />
    </View>
  </View>
);

export const GpsCrosshairIcon: React.FC<IconProps> = ({ size = 22, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.74,
        height: size * 0.74,
        borderRadius: size * 0.37,
        borderWidth: 1.6,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.26,
          height: size * 0.26,
          borderRadius: size * 0.13,
          backgroundColor: color,
        }}
      />
    </View>
    {/* Top tick */}
    <View style={{ position: 'absolute', top: 0, width: 1.6, height: 3.5, backgroundColor: color }} />
    {/* Bottom tick */}
    <View style={{ position: 'absolute', bottom: 0, width: 1.6, height: 3.5, backgroundColor: color }} />
    {/* Left tick */}
    <View style={{ position: 'absolute', left: 0, height: 1.6, width: 3.5, backgroundColor: color }} />
    {/* Right tick */}
    <View style={{ position: 'absolute', right: 0, height: 1.6, width: 3.5, backgroundColor: color }} />
  </View>
);

export const DocumentNoteIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.72,
        height: size * 0.84,
        borderRadius: 3,
        borderWidth: 1.6,
        borderColor: color,
        padding: 2.5,
        justifyContent: 'space-around',
      }}
    >
      <View style={{ width: '75%', height: 1.5, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: '85%', height: 1.5, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: '50%', height: 1.5, backgroundColor: color, borderRadius: 1 }} />
    </View>
  </View>
);

export const MicAudioIcon: React.FC<IconProps> = ({ size = 16, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.44,
        height: size * 0.58,
        borderRadius: size * 0.22,
        backgroundColor: color,
      }}
    />
    <View
      style={{
        width: size * 0.68,
        height: size * 0.36,
        borderBottomLeftRadius: size * 0.34,
        borderBottomRightRadius: size * 0.34,
        borderWidth: 1.4,
        borderColor: color,
        borderTopWidth: 0,
        marginTop: -size * 0.16,
      }}
    />
    <View style={{ width: 1.5, height: 3, backgroundColor: color }} />
    <View style={{ width: size * 0.4, height: 1.5, backgroundColor: color, borderRadius: 1 }} />
  </View>
);

export const CameraPhotoIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.32,
        height: 2.2,
        backgroundColor: color,
        borderTopLeftRadius: 1.5,
        borderTopRightRadius: 1.5,
        marginBottom: -1,
      }}
    />
    <View
      style={{
        width: size * 0.86,
        height: size * 0.66,
        borderRadius: 3,
        borderWidth: 1.5,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.34,
          height: size * 0.34,
          borderRadius: size * 0.17,
          borderWidth: 1.4,
          borderColor: color,
        }}
      />
    </View>
  </View>
);

export const VideoRecordIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size, flexDirection: 'row' }]}>
    <View
      style={{
        width: size * 0.64,
        height: size * 0.56,
        borderRadius: 2.5,
        borderWidth: 1.5,
        borderColor: color,
      }}
    />
    <View
      style={{
        width: 0,
        height: 0,
        borderTopWidth: size * 0.18,
        borderBottomWidth: size * 0.18,
        borderRightWidth: size * 0.28,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: color,
        transform: [{ rotate: '180deg' }],
        marginLeft: -1,
      }}
    />
  </View>
);

export const PaperclipFileIcon: React.FC<IconProps> = ({ size = 18, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size, transform: [{ rotate: '45deg' }] }]}>
    <View
      style={{
        width: size * 0.44,
        height: size * 0.75,
        borderRadius: size * 0.22,
        borderWidth: 1.6,
        borderColor: color,
        borderBottomWidth: 0,
      }}
    />
  </View>
);

export const SparklesAiIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Main 4-point star */}
    <View
      style={{
        width: size * 0.6,
        height: size * 0.6,
        backgroundColor: color,
        borderRadius: 2,
        transform: [{ rotate: '45deg' }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.7,
        height: size * 0.7,
        borderRadius: size * 0.35,
        borderWidth: 1.2,
        borderColor: '#FFFFFF',
      }}
    />
  </View>
);

export const WrenchToolIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.54,
        height: size * 0.54,
        borderRadius: size * 0.27,
        borderWidth: 1.8,
        borderColor: color,
        borderTopColor: 'transparent',
      }}
    />
    <View
      style={{
        position: 'absolute',
        bottom: 2,
        right: 3,
        width: 2.2,
        height: size * 0.48,
        backgroundColor: color,
        transform: [{ rotate: '45deg' }],
        borderRadius: 1,
      }}
    />
  </View>
);

export const ChatRemarksIcon: React.FC<IconProps> = ({ size = 20, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.78,
        height: size * 0.62,
        borderRadius: 4,
        borderWidth: 1.6,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '60%' }}>
        <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color }} />
        <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color }} />
        <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color }} />
      </View>
    </View>
    <View
      style={{
        position: 'absolute',
        bottom: 1.5,
        left: 3.5,
        width: 0,
        height: 0,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 3.5,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
      }}
    />
  </View>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 16, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.9,
        height: size * 0.9,
        borderRadius: (size * 0.9) / 2,
        borderWidth: 1.4,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 1.8,
          height: 2.2,
          backgroundColor: color,
          borderRadius: 1,
          marginBottom: 1.5,
        }}
      />
      <View
        style={{
          width: 1.8,
          height: size * 0.35,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
    </View>
  </View>
);

export const CloseDeleteIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <View
    style={[
      styles.center,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
      },
    ]}
  >
    <View
      style={{
        position: 'absolute',
        width: size * 0.48,
        height: 1.8,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: size * 0.48,
        height: 1.8,
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
      }}
    />
  </View>
);

export const PlayTriangleIcon: React.FC<IconProps> = ({ size = 16, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: 0,
        height: 0,
        borderTopWidth: size * 0.38,
        borderBottomWidth: size * 0.38,
        borderLeftWidth: size * 0.58,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: color,
        marginLeft: size * 0.1,
      }}
    />
  </View>
);

export const PauseBarsIcon: React.FC<IconProps> = ({ size = 16, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: size * 0.22 }]}>
    <View style={{ width: size * 0.18, height: size * 0.65, backgroundColor: color, borderRadius: 1 }} />
    <View style={{ width: size * 0.18, height: size * 0.65, backgroundColor: color, borderRadius: 1 }} />
  </View>
);

export const PencilEditIcon: React.FC<IconProps> = ({ size = 14, color = '#006CFF' }) => (
  <View style={[styles.center, { width: size, height: size, transform: [{ rotate: '45deg' }] }]}>
    <View style={{ width: size * 0.28, height: size * 0.65, backgroundColor: color, borderRadius: 1 }} />
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.14,
        borderRightWidth: size * 0.14,
        borderTopWidth: size * 0.24,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
      }}
    />
  </View>
);

export const PlusCircleIcon: React.FC<IconProps> = ({ size = 28, color = '#006CFF' }) => (
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
    <View style={{ width: size * 0.5, height: 2, backgroundColor: color, borderRadius: 1 }} />
    <View style={{ position: 'absolute', width: 2, height: size * 0.5, backgroundColor: color, borderRadius: 1 }} />
  </View>
);

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

