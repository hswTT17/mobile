import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  index: 'home',
  events: 'redeem',
  search: 'search',
  community: 'groups',
  mypage: 'person',
};

const LABELS: Record<string, string> = {
  index: '홈',
  events: '이벤트',
  search: '검색',
  community: '커뮤니티',
  mypage: '마이',
};

interface MinimalTabBarProps {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: { navigate: (name: string) => void };
}

export function GlassTabBar({ state, navigation }: MinimalTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <BlurView intensity={40} tint="light" style={[styles.wrap, { paddingBottom: insets.bottom || spacing.stackSm }]}>
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const icon = ICONS[route.name] ?? 'circle';
          const label = LABELS[route.name] ?? route.name;
          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.item}
              hitSlop={8}
            >
              <MaterialIcons
                name={icon}
                size={24}
                color={focused ? colors.primary : colors.onSecondaryContainer}
              />
              <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
              {focused ? <View style={styles.indicator} /> : null}
            </Pressable>
          );
        })}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant + '33',
    backgroundColor: colors.surface + 'cc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: spacing.stackSm,
    paddingHorizontal: spacing.stackSm,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
    minWidth: 56,
  },
  label: {
    ...typography.labelSm,
    color: colors.onSecondaryContainer,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    bottom: -8,
    height: 3,
    width: 20,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
});
