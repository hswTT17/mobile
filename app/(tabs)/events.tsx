import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Chip } from '@/components/Chip';
import { TopBar } from '@/components/TopBar';
import { mockEvents } from '@/data/mockEvents';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const FILTERS = ['전체', '오늘 종료', '신규', '고수익'] as const;

export default function EventsScreen() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('전체');

  const events = mockEvents.filter((event) => {
    if (filter === '전체') return true;
    if (filter === '오늘 종료') return event.urgent;
    if (filter === '신규') return event.tag === '신규 등록' || event.tag === 'Gift';
    if (filter === '고수익') return event.reward_label.includes('10,000') || event.reward_label.includes('만');
    return true;
  });

  return (
    <View style={styles.flex}>
      <TopBar title="앱테크 허브" leftIcon="grid-view" rightIcon="notifications" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Chip label="Hot Benefit" tone="primary" />
          <Text style={styles.heroTitle}>놓치면 아쉬운{'\n'}오늘의 황금 리워드</Text>
          <Text style={styles.heroSub}>현재 {mockEvents.length * 24}개의 새로운 이벤트가 시작되었습니다.</Text>
          <MaterialIcons
            name="redeem"
            size={120}
            color="rgba(255,255,255,0.18)"
            style={styles.heroIcon}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {FILTERS.map((item) => {
              const active = filter === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setFilter(item)}
                  style={[styles.filterPill, active && styles.filterPillActive]}
                >
                  <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.grid}>
          {events.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventCardHeader}>
                <View style={styles.eventIconWrap}>
                  <MaterialIcons name="card-giftcard" size={26} color={colors.primary} />
                </View>
                <View style={[styles.timeBadge, event.urgent && styles.timeBadgeUrgent]}>
                  <MaterialIcons
                    name="timer"
                    size={14}
                    color={event.urgent ? colors.onErrorContainer : colors.onSurfaceVariant}
                  />
                  <Text style={[styles.timeBadgeLabel, event.urgent && styles.timeBadgeLabelUrgent]}>
                    {event.time_left_label}
                  </Text>
                </View>
              </View>
              <View style={styles.eventCardBody}>
                <View style={styles.eventTagRow}>
                  <Chip label={event.category} />
                  <Text style={styles.eventBrand}>{event.brand}</Text>
                </View>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventReward}>{event.reward_label}</Text>
              </View>
              <View style={[styles.eventButton, event.urgent && styles.eventButtonOutline]}>
                <Text
                  style={[styles.eventButtonLabel, event.urgent && styles.eventButtonLabelOutline]}
                >
                  {event.urgent ? '지금 바로 참여' : '참여하고 혜택 받기'}
                </Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={16}
                  color={event.urgent ? colors.primary : colors.onPrimary}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  hero: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 32,
    padding: spacing.stackLg,
    gap: spacing.stackSm,
    overflow: 'hidden',
  },
  heroTitle: { ...typography.headlineLgMobile, color: colors.onPrimary },
  heroSub: { ...typography.labelMd, color: 'rgba(255,255,255,0.9)' },
  heroIcon: { position: 'absolute', right: 8, bottom: 8, transform: [{ rotate: '12deg' }] },
  filterRow: { flexDirection: 'row', gap: spacing.stackSm },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '4d',
  },
  filterPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterLabel: { ...typography.labelMd, color: colors.onSurfaceVariant },
  filterLabelActive: { color: colors.onPrimary, fontWeight: '700' },
  grid: { gap: spacing.gutter },
  eventCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '33',
    padding: spacing.containerPadding,
    gap: spacing.stackMd,
  },
  eventCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  eventIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHigh,
  },
  timeBadgeUrgent: { backgroundColor: colors.errorContainer },
  timeBadgeLabel: { ...typography.labelSm, color: colors.onSurfaceVariant },
  timeBadgeLabelUrgent: { color: colors.onErrorContainer },
  eventCardBody: { gap: 4 },
  eventTagRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eventBrand: { ...typography.labelSm, color: colors.onSurfaceVariant },
  eventTitle: { ...typography.headlineMd, fontSize: 20, lineHeight: 26, color: colors.onSurface },
  eventReward: { ...typography.bodyMd, color: colors.onSurfaceVariant },
  eventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
  },
  eventButtonOutline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.primary },
  eventButtonLabel: { ...typography.labelMd, color: colors.onPrimary, fontWeight: '700' },
  eventButtonLabelOutline: { color: colors.primary },
});
