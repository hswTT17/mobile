import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { TopBar } from '@/components/TopBar';
import { useSelectionTotals } from '@/hooks/useSelectionTotals';
import { formatWon } from '@/lib/format';
import { useAppSelectionStore } from '@/store/useAppSelectionStore';
import { useAppsStore } from '@/store/useAppsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function MyPageScreen() {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const fetchApps = useAppsStore((s) => s.fetchApps);
  const loadSelections = useAppSelectionStore((s) => s.loadSelections);
  const { selectedApps, dailyTotal, monthlyTotal } = useSelectionTotals();
  const [rewardReminder, setRewardReminder] = useState(true);
  const [hotDealAlert, setHotDealAlert] = useState(false);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  useEffect(() => {
    if (user) loadSelections(user.id);
  }, [user, loadSelections]);

  const displayName = user?.email?.split('@')[0] ?? '사용자';
  const yearlyProjection = monthlyTotal * 12;

  return (
    <View style={styles.flex}>
      <TopBar title="앱테크 허브" leftIcon="grid-view" onLeftPress={() => router.push('/(tabs)/search')} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileRow}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={30} color={colors.onSurfaceVariant} />
            </View>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="check-circle" size={12} color={colors.onPrimary} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{displayName}</Text>
            <View style={styles.badgeRow}>
              <Text style={styles.badge}>선택한 앱 {selectedApps.length}개</Text>
            </View>
          </View>
          <Pressable style={styles.settingsButton} onPress={signOut} hitSlop={8}>
            <MaterialIcons name="logout" size={20} color={colors.onSurfaceVariant} />
          </Pressable>
        </View>

        {/* Analytics */}
        <View style={styles.statRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>오늘 예상 수익</Text>
            <Text style={styles.statValuePrimary}>{formatWon(dailyTotal)}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>이번 달 예상 수익</Text>
            <Text style={styles.statValue}>{formatWon(monthlyTotal)}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>연 환산 예상</Text>
            <Text style={styles.statValue}>{formatWon(yearlyProjection)}</Text>
          </Card>
        </View>

        {/* Favorite apps */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>내가 선택한 앱</Text>
            <Pressable onPress={() => router.push('/(tabs)/search')}>
              <Text style={styles.sectionLink}>편집</Text>
            </Pressable>
          </View>
          <View style={styles.favoriteGrid}>
            {selectedApps.slice(0, 3).map((app) => (
              <Pressable
                key={app.id}
                style={styles.favoriteItem}
                onPress={() => router.push(`/app-detail/${app.id}`)}
              >
                <Image source={{ uri: app.icon_url }} style={styles.favoriteIcon} />
                <Text style={styles.favoriteLabel} numberOfLines={1}>
                  {app.name}
                </Text>
              </Pressable>
            ))}
            <Pressable style={styles.favoriteAdd} onPress={() => router.push('/(tabs)/search')}>
              <MaterialIcons name="add" size={22} color={colors.outlineVariant} />
              <Text style={styles.favoriteAddLabel}>추가</Text>
            </Pressable>
          </View>
        </Card>

        {/* Notification settings */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>시스템 알림</Text>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLabelRow}>
              <MaterialIcons name="notifications-active" size={20} color={colors.onSurfaceVariant} />
              <Text style={styles.toggleLabel}>보상 리마인더</Text>
            </View>
            <Switch
              value={rewardReminder}
              onValueChange={setRewardReminder}
              trackColor={{ true: colors.primary, false: colors.surfaceContainerHighest }}
            />
          </View>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLabelRow}>
              <MaterialIcons name="local-fire-department" size={20} color={colors.onSurfaceVariant} />
              <Text style={styles.toggleLabel}>핫딜 알림</Text>
            </View>
            <Switch
              value={hotDealAlert}
              onValueChange={setHotDealAlert}
              trackColor={{ true: colors.primary, false: colors.surfaceContainerHighest }}
            />
          </View>
        </Card>

        {/* Selected apps breakdown ("reward history" style list, backed by real selections) */}
        <Card padded={false} style={styles.sectionCard}>
          <View style={[styles.sectionHeaderRow, styles.listHeaderPad]}>
            <Text style={styles.sectionTitle}>앱별 예상 리워드</Text>
          </View>
          {selectedApps.length === 0 ? (
            <Text style={[styles.emptyText, styles.listHeaderPad]}>선택한 앱이 없어요.</Text>
          ) : (
            selectedApps.map((app) => (
              <View key={app.id} style={styles.historyRow}>
                <View style={styles.historyIconWrap}>
                  <MaterialIcons name="monetization-on" size={20} color={colors.tertiary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.historyTitle}>{app.name}</Text>
                  <Text style={styles.historySub}>{app.reward_summary}</Text>
                </View>
                <Text style={styles.historyAmount}>+ {formatWon(app.daily_max_reward)}</Text>
              </View>
            ))
          )}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingTop: 104,
    paddingBottom: 48,
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.stackLg,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.stackMd },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 2,
    borderColor: colors.primary + '33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: radius.full,
    backgroundColor: colors.tertiary,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { ...typography.headlineLgMobile, fontSize: 20, lineHeight: 26, color: colors.onSurface },
  badgeRow: { flexDirection: 'row', marginTop: 2 },
  badge: { ...typography.labelSm, color: colors.primary, backgroundColor: colors.primaryFixed, paddingHorizontal: 8, paddingVertical: 2, borderRadius: radius.full },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '4d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statRow: { flexDirection: 'row', gap: spacing.stackMd },
  statCard: { flex: 1, gap: spacing.stackSm, justifyContent: 'space-between', minHeight: 100 },
  statLabel: { ...typography.labelMd, color: colors.onSurfaceVariant },
  statValuePrimary: { ...typography.headlineMd, fontSize: 20, color: colors.primary },
  statValue: { ...typography.headlineMd, fontSize: 18, color: colors.onSurface },
  sectionCard: { gap: spacing.stackMd },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { ...typography.headlineMd, fontSize: 18, color: colors.onSurface },
  sectionLink: { ...typography.labelMd, color: colors.primary, fontWeight: '700' },
  favoriteGrid: { flexDirection: 'row', gap: spacing.gutter },
  favoriteItem: { alignItems: 'center', gap: 6, width: 64 },
  favoriteIcon: { width: 48, height: 48, borderRadius: radius.lg, backgroundColor: colors.surfaceContainerHigh },
  favoriteLabel: { ...typography.labelSm, color: colors.onSurfaceVariant },
  favoriteAdd: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  favoriteAddLabel: { ...typography.labelSm, color: colors.outlineVariant, position: 'absolute', bottom: -18 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  toggleLabelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.stackSm },
  toggleLabel: { ...typography.bodyMd, color: colors.onSurface },
  listHeaderPad: { paddingHorizontal: spacing.stackLg, paddingTop: spacing.stackLg },
  emptyText: { ...typography.labelMd, color: colors.onSurfaceVariant, paddingBottom: spacing.stackLg },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
    paddingHorizontal: spacing.stackLg,
    paddingVertical: spacing.stackMd,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant + '1a',
  },
  historyIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.tertiary + '1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyTitle: { ...typography.bodyMd, fontWeight: '600', color: colors.onSurface },
  historySub: { ...typography.labelSm, color: colors.onSurfaceVariant },
  historyAmount: { ...typography.bodyMd, fontWeight: '700', color: colors.tertiary },
});
