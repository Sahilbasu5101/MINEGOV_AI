import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BellIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = '#006CFF',
}) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: 4,
        height: 3,
        borderRadius: 2,
        borderWidth: 1.4,
        borderColor: color,
        marginBottom: -1,
      }}
    />
    <View
      style={{
        width: size * 0.64,
        height: size * 0.52,
        borderTopLeftRadius: size * 0.32,
        borderTopRightRadius: size * 0.32,
        backgroundColor: color,
      }}
    />
    <View
      style={{
        width: size * 0.8,
        height: 2.4,
        borderRadius: 1.2,
        backgroundColor: color,
        marginTop: -0.5,
      }}
    />
    <View
      style={{
        width: 3.5,
        height: 2.5,
        borderBottomLeftRadius: 1.75,
        borderBottomRightRadius: 1.75,
        backgroundColor: color,
        marginTop: 0.5,
      }}
    />
  </View>
);

export const MineIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = '#07115B',
}) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Headgear Tower */}
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.34,
        borderRightWidth: size * 0.34,
        borderBottomWidth: size * 0.58,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }}
    />
    {/* Base structure */}
    <View
      style={{
        width: size * 0.82,
        height: 2.5,
        backgroundColor: color,
        marginTop: 1,
        borderRadius: 1,
      }}
    />
    {/* Mine Shaft Entry */}
    <View
      style={{
        position: 'absolute',
        bottom: 2,
        width: size * 0.36,
        height: 4.5,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderWidth: 1.4,
        borderColor: '#FFFFFF',
        borderBottomWidth: 0,
      }}
    />
  </View>
);

export const CalendarIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = '#07115B',
}) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: size * 0.62,
        marginBottom: -2,
        zIndex: 1,
      }}
    >
      <View style={{ width: 2, height: 3.5, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: 2, height: 3.5, backgroundColor: color, borderRadius: 1 }} />
    </View>
    <View
      style={{
        width: size * 0.84,
        height: size * 0.78,
        borderRadius: 3.5,
        borderWidth: 1.5,
        borderColor: color,
        overflow: 'hidden',
      }}
    >
      <View style={{ height: size * 0.22, backgroundColor: color }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '75%' }}>
          <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color }} />
          <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color }} />
          <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color }} />
        </View>
      </View>
    </View>
  </View>
);

export const PinIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = '#07115B',
}) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.68,
        height: size * 0.68,
        borderRadius: size * 0.34,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.24,
          height: size * 0.24,
          borderRadius: size * 0.12,
          backgroundColor: '#FFFFFF',
        }}
      />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.2,
        borderRightWidth: size * 0.2,
        borderTopWidth: size * 0.32,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
        marginTop: -1,
      }}
    />
  </View>
);

export const ClipboardCheckIcon: React.FC<{
  size?: number;
  color?: string;
  isFilled?: boolean;
}> = ({ size = 26, color = '#FFFFFF' }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    {/* Clip at top */}
    <View
      style={{
        width: size * 0.36,
        height: size * 0.14,
        borderRadius: 2,
        backgroundColor: color,
        marginBottom: -1.5,
        zIndex: 1,
      }}
    />
    {/* Board */}
    <View
      style={{
        width: size * 0.72,
        height: size * 0.82,
        borderRadius: 4,
        borderWidth: 1.8,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 3,
      }}
    >
      {/* Check lines */}
      <View
        style={{
          width: size * 0.42,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          marginBottom: 3,
        }}
      />
      <View
        style={{
          width: size * 0.42,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          marginBottom: 3,
        }}
      />
      <View
        style={{
          width: size * 0.26,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
    </View>
  </View>
);

export const AlertTriangleIcon: React.FC<{
  size?: number;
  color?: string;
  badgeBg?: string;
}> = ({ size = 26, color = '#FFFFFF', badgeBg }) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.44,
        borderRightWidth: size * 0.44,
        borderBottomWidth: size * 0.78,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }}
    />
    <View style={{ position: 'absolute', top: size * 0.34, alignItems: 'center' }}>
      <View
        style={{
          width: 2.2,
          height: size * 0.26,
          backgroundColor: badgeBg || '#E53935',
          borderRadius: 1.1,
        }}
      />
      <View
        style={{
          width: 2.2,
          height: 2.2,
          borderRadius: 1.1,
          backgroundColor: badgeBg || '#E53935',
          marginTop: 1.5,
        }}
      />
    </View>
  </View>
);

export const HomeIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = '#006CFF',
}) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.44,
        borderRightWidth: size * 0.44,
        borderBottomWidth: size * 0.38,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: color,
      }}
    />
    <View
      style={{
        width: size * 0.66,
        height: size * 0.46,
        backgroundColor: color,
        borderBottomLeftRadius: 2.5,
        borderBottomRightRadius: 2.5,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          width: size * 0.24,
          height: size * 0.26,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          backgroundColor: '#FFFFFF',
        }}
      />
    </View>
  </View>
);

export const ReportsIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = '#5A7AAB',
}) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.65,
        height: size * 0.8,
        borderWidth: 1.8,
        borderColor: color,
        borderRadius: 3,
        padding: 2.5,
        justifyContent: 'space-around',
      }}
    >
      <View style={{ width: '70%', height: 1.5, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: '85%', height: 1.5, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: '55%', height: 1.5, backgroundColor: color, borderRadius: 1 }} />
    </View>
  </View>
);

export const SyncTabIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = '#5A7AAB',
}) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <View
        style={{
          width: size * 0.3,
          height: size * 0.3,
          borderRadius: size * 0.15,
          borderWidth: 1.6,
          borderColor: color,
          borderRightWidth: 0,
          marginRight: -size * 0.08,
        }}
      />
      <View
        style={{
          width: size * 0.42,
          height: size * 0.42,
          borderRadius: size * 0.21,
          borderWidth: 1.6,
          borderColor: color,
          borderBottomWidth: 0,
        }}
      />
      <View
        style={{
          width: size * 0.28,
          height: size * 0.28,
          borderRadius: size * 0.14,
          borderWidth: 1.6,
          borderColor: color,
          borderLeftWidth: 0,
          marginLeft: -size * 0.06,
        }}
      />
    </View>
    <View style={{ width: size * 0.68, height: 1.6, backgroundColor: color, marginTop: -1 }} />
    {/* Red dot badge */}
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 6.5,
        height: 6.5,
        borderRadius: 3.25,
        backgroundColor: '#E53935',
      }}
    />
  </View>
);

export const ProfileTabIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 22,
  color = '#5A7AAB',
}) => (
  <View style={[styles.center, { width: size, height: size }]}>
    <View
      style={{
        width: size * 0.38,
        height: size * 0.38,
        borderRadius: size * 0.19,
        borderWidth: 1.8,
        borderColor: color,
        marginBottom: 1,
      }}
    />
    <View
      style={{
        width: size * 0.7,
        height: size * 0.34,
        borderTopLeftRadius: size * 0.35,
        borderTopRightRadius: size * 0.35,
        borderWidth: 1.8,
        borderColor: color,
        borderBottomWidth: 0,
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
