import { useEffect, useMemo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TopBar } from '@/components/TopBar';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { useSelectionTotals } from '@/hooks/useSelectionTotals';
import { formatWon } from '@/lib/format';
import { useAppSelectionStore } from '@/store/useAppSelectionStore';
import { useAppsStore } from '@/store/useAppsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import type { RewardMethod } from '@/types';

const CATEGORIES: { label: string; value: RewardMethod | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '걷기', value: '걷기' },
  { label: '광고 시청', value: '광고 시청' },
  { label: '설문', value: '설문' },
  { label: '쇼핑', value: '쇼핑' },
  { label: '출석체크', value: '출석체크' },
  { label: '퀴즈', value: '퀴즈' },
];

export default function SearchScreen() {
  const { category: categoryParam } = useLocalSearchParams<{ category?: string }>();
  const user = useAuthStore((s) => s.user);
  const apps = useAppsStore((s) => s.apps);
  const fetchApps = useAppsStore((s) => s.fetchApps);
  const loading = useAppsStore((s) => s.loading);
  const loadSelections = useAppSelectionStore((s) => s.loadSelections);
  const selectedIds = useAppSelectionStore((s) => s.selectedIds);
  const toggle = useAppSelectionStore((s) => s.toggle);
  const { dailyTotal, monthlyTotal } = useSelectionTotals();

  const [query, setQuery] = useState('');
  const initialCategory = CATEGORIES.find((c) => c.value === categoryParam)?.value ?? 'all';
  const [category, setCategory] = useState<RewardMethod | 'all'>(initialCategory);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  useEffect(() => {
    if (user) loadSelections(user.id);
  }, [user, loadSelections]);

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesQuery = app.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory = category === 'all' || app.reward_method === category;
      return matchesQuery && matchesCategory;
    });
  }, [apps, query, category]);

  const handleToggle = (appId: string) => {
    if (!user) return;
    toggle(user.id, appId);
  };

  return (
    <View style={styles.flex}>
      <TopBar title="앱테크 허브" leftIcon="grid-view" onLeftPress={() => router.push('/(tabs)')} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={22} color={colors.outline} />
          <TextInput
            style={styles.searchInput}
            placeholder="앱 이름이나 혜택을 검색하세요"
            placeholderTextColor={colors.outline}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((item) => {
              const active = category === item.value;
              return (
                <Pressable
                  key={item.value}
                  onPress={() => setCategory(item.value)}
                  style={[styles.categoryPill, active && styles.categoryPillActive]}
                >
                  <Text style={[styles.categoryPillLabel, active && styles.categoryPillLabelActive]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.listHeaderRow}>
          <Text style={styles.listTitle}>전체 앱테크 앱</Text>
          <Text style={styles.listCount}>{filteredApps.length}개</Text>
        </View>

        {loading && apps.length === 0 ? (
          <Text style={styles.emptyText}>불러오는 중...</Text>
        ) : (
          <View style={{ gap: spacing.stackMd }}>
            {filteredApps.map((app) => {
              const selected = selectedIds.has(app.id);
              return (
                <View key={app.id} style={styles.appCard}>
                  <Pressable
                    style={styles.appCardTouchable}
                    onPress={() => router.push(`/app-detail/${app.id}`)}
                  >
                    <Image source={{ uri: app.icon_url }} style={styles.appIcon} />
                    <View style={styles.appInfo}>
                      <Text style={styles.appName} numberOfLines={1}>
                        {app.name}
                      </Text>
                      <Text style={styles.appSummary} numberOfLines={1}>
                        {app.reward_summary}
                      </Text>
                      <Text style={styles.appReward}>
                        일일 최대 {formatWon(app.daily_max_reward)} · 월 최대{' '}
                        {formatWon(app.monthly_max_reward)}
                      </Text>
                      <View style={styles.appBadgeRow}>
                        <DifficultyBadge earnSteps={app.earn_steps} />
                      </View>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => handleToggle(app.id)}
                    style={[styles.checkbox, selected && styles.checkboxChecked]}
                    hitSlop={8}
                  >
                    {selected ? (
                      <MaterialIcons name="check" size={18} color={colors.onPrimary} />
                    ) : null}
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>일일 최대 {formatWon(dailyTotal)}</Text>
          <Text style={styles.footerSubLabel}>월 최대 {formatWon(monthlyTotal)}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.footerButton, pressed && styles.pressed]}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.footerButtonLabel}>완료 ({selectedIds.size}개)</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingTop: 96,
    paddingBottom: 120,
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.stackLg,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackSm,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.md,
    paddingHorizontal: spacing.stackMd,
    paddingVertical: 14,
  },
  searchInput: { flex: 1, ...typography.bodyLg, color: colors.onSurface },
  categoryRow: { flexDirection: 'row', gap: spacing.stackSm },
  categoryPill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLow,
  },
  categoryPillActive: { backgroundColor: colors.primary },
  categoryPillLabel: { ...typography.labelMd, color: colors.onSurfaceVariant },
  categoryPillLabelActive: { color: colors.onPrimary, fontWeight: '700' },
  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  listTitle: { ...typography.headlineMd, color: colors.onSurface },
  listCount: { ...typography.labelMd, color: colors.onSurfaceVariant },
  emptyText: { ...typography.bodyMd, color: colors.onSurfaceVariant, textAlign: 'center', paddingVertical: 24 },
  appCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '4d',
    borderRadius: radius.xl,
    padding: spacing.stackMd,
  },
  appCardTouchable: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.stackMd },
  appIcon: { width: 56, height: 56, borderRadius: radius.md, backgroundColor: colors.surfaceContainer },
  appInfo: { flex: 1, gap: 2 },
  appName: { ...typography.bodyLg, fontWeight: '700', color: colors.onSurface },
  appSummary: { ...typography.labelMd, color: colors.onSurfaceVariant },
  appReward: { ...typography.labelSm, color: colors.primary, fontWeight: '700', marginTop: 2 },
  appBadgeRow: { flexDirection: 'row', marginTop: 6 },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.stackMd,
    paddingBottom: 32,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant + '4d',
  },
  footerLabel: { ...typography.bodyMd, fontWeight: '700', color: colors.onSurface },
  footerSubLabel: { ...typography.labelMd, color: colors.onSurfaceVariant },
  footerButton: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: 24, paddingVertical: 14 },
  footerButtonLabel: { ...typography.labelMd, color: colors.onPrimary, fontWeight: '700' },
  pressed: { transform: [{ scale: 0.98 }] },
});
