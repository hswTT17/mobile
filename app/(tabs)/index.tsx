import { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card } from '@/components/Card';
import { DifficultyAmountExplorer } from '@/components/DifficultyAmountExplorer';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { ProgressBar } from '@/components/ProgressBar';
import { TopBar } from '@/components/TopBar';
import { mockEvents } from '@/data/mockEvents';
import { useSelectionTotals } from '@/hooks/useSelectionTotals';
import { formatWon } from '@/lib/format';
import { useAppSelectionStore } from '@/store/useAppSelectionStore';
import { useAppsStore } from '@/store/useAppsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import type { RewardMethod } from '@/types';

// Each tile filters the Search tab by its matching reward method — dropped
// the design mock's 카드혜택/은행 이벤트 tiles since those aren't a
// reward_method our data model supports, so there's nothing real to link to.
const CATEGORY_ICONS: { icon: keyof typeof MaterialIcons.glyphMap; label: string; method: RewardMethod }[] = [
  { icon: 'event-available', label: '출석체크', method: '출석체크' },
  { icon: 'play-circle-filled', label: '광고보기', method: '광고 시청' },
  { icon: 'directions-walk', label: '걷기', method: '걷기' },
  { icon: 'assignment', label: '설문조사', method: '설문' },
  { icon: 'quiz', label: '퀴즈', method: '퀴즈' },
  { icon: 'shopping-bag', label: '쇼핑', method: '쇼핑' },
];

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const fetchApps = useAppsStore((s) => s.fetchApps);
  const loadSelections = useAppSelectionStore((s) => s.loadSelections);
  const { selectedApps, dailyTotal, monthlyTotal } = useSelectionTotals();

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  useEffect(() => {
    if (user) loadSelections(user.id);
  }, [user, loadSelections]);

  const missionTarget = Math.max(selectedApps.length, 1) * 3;
  const missionProgress = selectedApps.length ? selectedApps.length / missionTarget : 0;

  return (
    <View style={styles.flex}>
      <TopBar title="앱테크 허브" leftIcon="grid-view" onLeftPress={() => router.push('/(tabs)/search')} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero: 오늘 받을 수 있는 혜택 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>오늘 받을 수 있는 혜택</Text>
          <Card style={styles.heroCard}>
            <Text style={styles.heroLabel}>오늘 예상 수익 (선택한 앱 {selectedApps.length}개)</Text>
            <Text style={styles.heroValue}>{formatWon(dailyTotal)}</Text>
            <Text style={styles.heroSubLabel}>이번 달 예상 수익 {formatWon(monthlyTotal)}</Text>

            <View style={styles.progressWrap}>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>선택한 앱 {selectedApps.length}개</Text>
                <Text style={styles.progressPercent}>
                  {Math.round(missionProgress * 100)}%
                </Text>
              </View>
              <ProgressBar progress={missionProgress} />
            </View>

            <Pressable
              style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
              onPress={() => router.push('/(tabs)/search')}
            >
              <MaterialIcons name="edit" size={16} color={colors.onPrimary} />
              <Text style={styles.editButtonLabel}>앱 추가/편집</Text>
            </Pressable>
          </Card>
        </View>

        {/* 난이도별 받을 수 있는 금액 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>난이도별 받을 수 있는 금액</Text>
          <Card>
            <DifficultyAmountExplorer />
          </Card>
        </View>

        {/* Category grid — taps into Search filtered by reward method */}
        <View style={styles.categoryGrid}>
          {CATEGORY_ICONS.map((item) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [styles.categoryItem, pressed && styles.pressed]}
              onPress={() => router.push(`/(tabs)/search?category=${encodeURIComponent(item.method)}`)}
            >
              <View style={styles.categoryIconWrap}>
                <MaterialIcons name={item.icon} size={26} color={colors.primary} />
              </View>
              <Text style={styles.categoryLabel} numberOfLines={1}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 내가 선택한 앱 */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>내가 선택한 앱</Text>
            <Pressable onPress={() => router.push('/(tabs)/search')}>
              <Text style={styles.sectionLink}>추가/편집</Text>
            </Pressable>
          </View>
          {selectedApps.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>아직 선택한 앱이 없어요.</Text>
              <Text style={styles.emptySubText}>검색 탭에서 사용 중인 앱테크 앱을 선택해보세요.</Text>
            </Card>
          ) : (
            <View style={{ gap: spacing.stackSm }}>
              {selectedApps.map((app) => (
                <Pressable
                  key={app.id}
                  style={({ pressed }) => [styles.appRow, pressed && styles.pressed]}
                  onPress={() => router.push(`/app-detail/${app.id}`)}
                >
                  <Image source={{ uri: app.icon_url }} style={styles.appIcon} />
                  <View style={styles.appRowInfo}>
                    <Text style={styles.appRowName}>{app.name}</Text>
                    <Text style={styles.appRowMeta}>
                      일일 최대 {formatWon(app.daily_max_reward)} / 월 최대{' '}
                      {formatWon(app.monthly_max_reward)}
                    </Text>
                    <View style={styles.appRowBadgeRow}>
                      <DifficultyBadge earnSteps={app.earn_steps} />
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={22} color={colors.outlineVariant} />
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* 실시간 인기 이벤트 */}
        <View style={styles.section}>
          <Pressable style={styles.sectionHeaderRow} onPress={() => router.push('/(tabs)/events')}>
            <Text style={styles.sectionTitle}>실시간 인기 이벤트</Text>
            <MaterialIcons name="chevron-right" size={20} color={colors.onSurfaceVariant} />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -spacing.containerPadding }}>
            <View style={styles.eventScrollRow}>
              {mockEvents.slice(0, 3).map((event, idx) => (
                <Pressable
                  key={event.id}
                  style={({ pressed }) => [
                    styles.eventPromoCard,
                    { backgroundColor: [colors.primaryContainer, colors.tertiaryContainer, colors.onSurfaceVariant][idx % 3] },
                    pressed && styles.pressed,
                  ]}
                  onPress={() => router.push('/(tabs)/events')}
                >
                  <Text style={styles.eventPromoTag}>{event.tag}</Text>
                  <Text style={styles.eventPromoTitle}>{event.title}</Text>
                  <Text style={styles.eventPromoSub}>{event.time_left_label}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 오늘 종료되는 이벤트 */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>오늘 종료되는 이벤트</Text>
          <View style={{ gap: spacing.gutter }}>
            {mockEvents.filter((e) => e.urgent).map((event) => (
              <Pressable
                key={event.id}
                style={({ pressed }) => [styles.endingRow, pressed && styles.pressed]}
                onPress={() => router.push('/(tabs)/events')}
              >
                <View style={styles.endingThumb}>
                  <MaterialIcons name="local-fire-department" size={24} color={colors.primary} />
                </View>
                <View style={styles.appRowInfo}>
                  <View style={styles.endingBadgeRow}>
                    <Text style={styles.endingBadge}>{event.tag}</Text>
                    <Text style={styles.endingTime}>{event.time_left_label}</Text>
                  </View>
                  <Text style={styles.appRowName}>{event.title}</Text>
                  <Text style={styles.appRowMeta}>{event.brand}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={22} color={colors.outlineVariant} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingTop: 96,
    paddingBottom: 48,
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.sectionGap,
  },
  section: { gap: spacing.stackMd },
  lastSection: { marginBottom: 0 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { ...typography.headlineMd, color: colors.onSurface },
  sectionLink: { ...typography.labelMd, color: colors.primary, fontWeight: '700' },
  heroCard: { position: 'relative', overflow: 'hidden', gap: spacing.stackSm, padding: 24 },
  heroLabel: { ...typography.labelMd, color: colors.onSurfaceVariant },
  heroValue: { ...typography.displayLg, color: colors.primary },
  heroSubLabel: { ...typography.labelMd, color: colors.onSurfaceVariant },
  progressWrap: { marginTop: spacing.stackSm, gap: spacing.stackSm },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { ...typography.labelMd, color: colors.onSurfaceVariant },
  progressPercent: { ...typography.labelMd, color: colors.tertiary, fontWeight: '700' },
  editButton: {
    marginTop: spacing.stackMd,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 12,
  },
  editButtonLabel: { ...typography.labelMd, color: colors.onPrimary, fontWeight: '700' },
  pressed: { transform: [{ scale: 0.98 }] },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.gutter,
  },
  categoryItem: { width: '21%', alignItems: 'center', gap: 6 },
  categoryIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: { ...typography.labelSm, color: colors.onSurface, textAlign: 'center' },
  emptyCard: { alignItems: 'center', gap: 4, paddingVertical: spacing.stackLg },
  emptyText: { ...typography.bodyMd, color: colors.onSurface, fontWeight: '600' },
  emptySubText: { ...typography.labelMd, color: colors.onSurfaceVariant },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '4d',
    padding: spacing.stackMd,
  },
  appIcon: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.surfaceContainer },
  appRowInfo: { flex: 1, gap: 2 },
  appRowName: { ...typography.bodyMd, fontWeight: '700', color: colors.onSurface },
  appRowMeta: { ...typography.labelMd, color: colors.onSurfaceVariant },
  appRowBadgeRow: { flexDirection: 'row', marginTop: 6 },
  eventScrollRow: { flexDirection: 'row', gap: spacing.gutter, paddingHorizontal: spacing.containerPadding },
  eventPromoCard: { width: 260, height: 160, borderRadius: radius.xl, padding: 20, justifyContent: 'flex-end', gap: 4 },
  eventPromoTag: {
    ...typography.labelSm,
    color: colors.onPrimary,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  eventPromoTitle: { ...typography.bodyLg, color: colors.onPrimary, fontWeight: '700' },
  eventPromoSub: { ...typography.labelSm, color: 'rgba(255,255,255,0.75)' },
  endingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.stackMd,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '33',
    padding: spacing.stackMd,
  },
  endingThumb: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endingBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  endingBadge: {
    ...typography.labelSm,
    color: colors.error,
    borderWidth: 1,
    borderColor: colors.error,
    paddingHorizontal: 4,
    borderRadius: 4,
    textTransform: 'uppercase',
  },
  endingTime: { ...typography.labelSm, color: colors.error, fontWeight: '700' },
});
