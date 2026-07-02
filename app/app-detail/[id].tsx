import { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TopBar } from '@/components/TopBar';
import { PrimaryButton } from '@/components/PrimaryButton';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { formatWon } from '@/lib/format';
import { useAppsStore } from '@/store/useAppsStore';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function AppDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const apps = useAppsStore((s) => s.apps);
  const fetchApps = useAppsStore((s) => s.fetchApps);
  const app = apps.find((item) => item.id === id);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  if (!app) {
    return (
      <View style={styles.flex}>
        <TopBar title="앱 상세 정보" onBack={() => router.back()} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>앱 정보를 불러오는 중입니다...</Text>
        </View>
      </View>
    );
  }

  const openStore = (url: string | null) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.flex}>
      <TopBar
        title="앱 상세 정보"
        onBack={() => router.back()}
        rightIcon="share"
        onRightPress={() => Share.share({ message: `${app.name} - 앱테크 허브에서 확인해보세요.` })}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.identityRow}>
          <Image source={{ uri: app.icon_url }} style={styles.icon} />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.appName}>{app.name}</Text>
            <Text style={styles.appTagline}>{app.reward_summary}</Text>
            <View style={styles.ratingRow}>
              <MaterialIcons name="star" size={16} color={colors.primary} />
              <Text style={styles.ratingText}>{app.rating.toFixed(1)}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.downloadText}>{app.download_count_label}</Text>
            </View>
            <View style={styles.badgeRow}>
              <DifficultyBadge earnSteps={app.earn_steps} />
            </View>
          </View>
        </View>

        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>일일 최대</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {formatWon(app.daily_max_reward)}
            </Text>
          </View>
          <View style={[styles.statItem, styles.statItemBordered]}>
            <Text style={styles.statLabel}>월 최대</Text>
            <Text style={styles.statValue}>{formatWon(app.monthly_max_reward)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>적립 방식</Text>
            <Text style={[styles.statValue, { color: colors.tertiary }]}>{app.reward_method}</Text>
          </View>
        </View>

        {app.earn_steps.length > 0 && (
          <View style={styles.section}>
            <View style={styles.stepsHeaderRow}>
              <Text style={styles.sectionTitle}>혜택 받는 방법</Text>
              <Text style={styles.stepsCount}>총 {app.earn_steps.length}단계</Text>
            </View>
            <View style={{ gap: spacing.stackMd }}>
              {app.earn_steps.map((step, idx) => (
                <View key={idx} style={styles.stepRow}>
                  <View style={styles.stepNumberWrap}>
                    <Text style={styles.stepNumber}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {app.pros.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>사용자들이 좋아하는 이유</Text>
            <View style={{ gap: spacing.stackMd }}>
              {app.pros.map((pro, idx) => (
                <View key={idx} style={styles.prosRow}>
                  <View style={styles.prosIconWrap}>
                    <MaterialIcons name="bolt" size={18} color={colors.tertiary} />
                  </View>
                  <Text style={styles.prosText}>{pro}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {app.cons.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>주의사항</Text>
            <View style={{ gap: spacing.stackSm }}>
              {app.cons.map((con, idx) => (
                <View key={idx} style={styles.consRow}>
                  <MaterialIcons name="info" size={18} color={colors.error} />
                  <Text style={styles.consText}>{con}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>설명</Text>
          <Text style={styles.description}>{app.description}</Text>
        </View>

        <View style={[styles.section, styles.storeRow]}>
          <View style={{ flex: 1 }}>
            <PrimaryButton label="Google Play" onPress={() => openStore(app.play_store_url)} />
          </View>
          <View style={{ flex: 1 }}>
            <PrimaryButton
              label="App Store"
              variant="outline"
              onPress={() => openStore(app.app_store_url)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { ...typography.bodyMd, color: colors.onSurfaceVariant },
  content: {
    paddingTop: 96,
    paddingBottom: 48,
    paddingHorizontal: spacing.containerPadding,
    gap: spacing.sectionGap,
  },
  identityRow: { flexDirection: 'row', gap: spacing.gutter, alignItems: 'flex-start' },
  icon: { width: 96, height: 96, borderRadius: radius.xl, backgroundColor: colors.surfaceContainer },
  appName: { ...typography.headlineLgMobile, color: colors.onSurface },
  appTagline: { ...typography.bodyMd, color: colors.primary, fontWeight: '500' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  ratingText: { ...typography.labelMd, color: colors.onSurfaceVariant },
  dot: { color: colors.outlineVariant },
  downloadText: { ...typography.labelMd, color: colors.onSurfaceVariant },
  badgeRow: { flexDirection: 'row', marginTop: 8 },
  stepsHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepsCount: { ...typography.labelMd, color: colors.onSurfaceVariant },
  stepRow: { flexDirection: 'row', gap: spacing.stackMd, alignItems: 'flex-start' },
  stepNumberWrap: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: { ...typography.labelMd, color: colors.onPrimary, fontWeight: '700' },
  stepText: { flex: 1, ...typography.bodyMd, color: colors.onSurface, paddingTop: 3 },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '33',
    padding: spacing.stackMd,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statItemBordered: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.outlineVariant + '33' },
  statLabel: { ...typography.labelSm, color: colors.onSecondaryContainer },
  statValue: { ...typography.labelMd, fontWeight: '700', color: colors.onSurface },
  section: { gap: spacing.stackMd },
  sectionTitle: { ...typography.headlineMd, fontSize: 20, color: colors.onSurface },
  prosRow: {
    flexDirection: 'row',
    gap: spacing.stackMd,
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.stackMd,
    borderRadius: radius.md,
    alignItems: 'flex-start',
  },
  prosIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.tertiary + '1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prosText: { flex: 1, ...typography.bodyMd, color: colors.onSurfaceVariant, lineHeight: 22 },
  consRow: { flexDirection: 'row', gap: spacing.stackSm, alignItems: 'center' },
  consText: { flex: 1, ...typography.bodyMd, color: colors.onSurfaceVariant },
  description: { ...typography.bodyMd, color: colors.onSurfaceVariant, lineHeight: 24 },
  storeRow: { flexDirection: 'row', gap: spacing.stackMd },
});
