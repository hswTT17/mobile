import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDifficultyTotals } from '@/hooks/useDifficultyTotals';
import { formatWon } from '@/lib/format';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type FilterKey = 'all' | 'easy' | 'medium' | 'hard';

export function DifficultyAmountExplorer() {
  const { tiers, overall } = useDifficultyTotals();
  const [filter, setFilter] = useState<FilterKey>('all');

  const selected = useMemo(() => {
    if (filter === 'all') return overall;
    return tiers.find((tier) => tier.level === filter) ?? overall;
  }, [filter, tiers, overall]);

  const maxDaily = Math.max(1, ...tiers.map((tier) => tier.dailyTotal));

  return (
    <View style={styles.wrap}>
      <View style={styles.chipRow}>
        <FilterChip label="전체" active={filter === 'all'} onPress={() => setFilter('all')} />
        {tiers.map((tier) => (
          <FilterChip
            key={tier.level}
            label={tier.label}
            active={filter === tier.level}
            color={tier.color}
            onPress={() => setFilter(tier.level)}
          />
        ))}
      </View>

      <View style={styles.amountBlock}>
        <Text style={styles.amountLabel}>
          {filter === 'all' ? '전체' : selected.label} 난이도로 받을 수 있는 금액 ({selected.appCount}개 앱)
        </Text>
        <Text style={styles.amountValue}>{formatWon(selected.dailyTotal)}</Text>
        <Text style={styles.amountSub}>일일 최대 · 월 최대 {formatWon(selected.monthlyTotal)}</Text>
      </View>

      <View style={styles.barChart}>
        {tiers.map((tier) => {
          const active = filter === tier.level;
          const widthPct = (tier.dailyTotal / maxDaily) * 100;
          return (
            <Pressable key={tier.level} style={styles.barRow} onPress={() => setFilter(tier.level)}>
              <Text style={[styles.barLabel, active && { color: tier.color, fontWeight: '700' }]}>
                {tier.label}
              </Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${Math.max(widthPct, 4)}%`,
                      backgroundColor: tier.color || colors.outlineVariant,
                      opacity: active || filter === 'all' ? 1 : 0.35,
                    },
                  ]}
                />
              </View>
              <Text style={styles.barValue}>{formatWon(tier.dailyTotal)}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function FilterChip({
  label,
  active,
  color,
  onPress,
}: {
  label: string;
  active: boolean;
  color?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active && { backgroundColor: color || colors.primary, borderColor: color || colors.primary },
      ]}
    >
      <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.stackMd },
  chipRow: { flexDirection: 'row', gap: spacing.stackSm, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  chipLabel: { ...typography.labelMd, color: colors.onSurfaceVariant },
  chipLabelActive: { color: colors.onPrimary, fontWeight: '700' },
  amountBlock: { gap: 4 },
  amountLabel: { ...typography.labelMd, color: colors.onSurfaceVariant },
  amountValue: { ...typography.headlineLg, fontSize: 34, color: colors.primary },
  amountSub: { ...typography.labelMd, color: colors.onSurfaceVariant },
  barChart: { gap: spacing.stackSm },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.stackSm },
  barLabel: { ...typography.labelMd, color: colors.onSurfaceVariant, width: 44 },
  barTrack: {
    flex: 1,
    height: 14,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainer,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: radius.full },
  barValue: { ...typography.labelSm, color: colors.onSurfaceVariant, width: 72, textAlign: 'right' },
});
