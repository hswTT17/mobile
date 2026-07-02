import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { TopBar } from '@/components/TopBar';
import { colors, radius, spacing, typography } from '@/theme/tokens';

// No mockup was provided for this tab in the design folder, so this stays
// a minimal placeholder styled with the shared design tokens.
export default function CommunityScreen() {
  return (
    <View style={styles.flex}>
      <TopBar title="앱테크 허브" leftIcon="grid-view" onLeftPress={() => router.push('/(tabs)/search')} />
      <View style={styles.content}>
        <Card style={styles.card}>
          <View style={styles.iconWrap}>
            <MaterialIcons name="groups" size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>커뮤니티 기능은 준비 중이에요</Text>
          <Text style={styles.subtitle}>
            수익 인증, 꿀팁 공유, 친구 초대 기능이 곧 찾아올 예정입니다.
          </Text>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    paddingTop: 96,
    paddingHorizontal: spacing.containerPadding,
    justifyContent: 'center',
  },
  card: { alignItems: 'center', gap: spacing.stackSm, paddingVertical: spacing.sectionGap },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.stackSm,
  },
  title: { ...typography.headlineMd, color: colors.onSurface, textAlign: 'center' },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: spacing.stackLg,
  },
});
