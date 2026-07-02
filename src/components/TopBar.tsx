import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme/tokens';

interface TopBarProps {
  title: string;
  onBack?: () => void;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightPress?: () => void;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  onLeftPress?: () => void;
}

export function TopBar({ title, onBack, rightIcon, onRightPress, leftIcon, onLeftPress }: TopBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <BlurView intensity={40} tint="light" style={[styles.wrap, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <View style={styles.side}>
          {onBack ? (
            <Pressable onPress={onBack} hitSlop={8}>
              <MaterialIcons name="chevron-left" size={28} color={colors.primary} />
            </Pressable>
          ) : leftIcon ? (
            <Pressable onPress={onLeftPress} hitSlop={8} disabled={!onLeftPress}>
              <MaterialIcons name={leftIcon} size={24} color={colors.primary} />
            </Pressable>
          ) : null}
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={[styles.side, styles.sideRight]}>
          {rightIcon ? (
            <Pressable onPress={onRightPress} hitSlop={8}>
              <MaterialIcons name={rightIcon} size={24} color={colors.primary} />
            </Pressable>
          ) : null}
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4d',
    backgroundColor: colors.surface + 'cc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.stackMd,
  },
  side: {
    width: 32,
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  title: {
    ...typography.headlineMd,
    fontWeight: '700',
    color: colors.primary,
    flex: 1,
    textAlign: 'center',
  },
});
