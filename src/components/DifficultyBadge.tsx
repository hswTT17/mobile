import { StyleSheet, Text, View } from 'react-native';
import { getDifficulty } from '@/lib/difficulty';
import { radius, typography } from '@/theme/tokens';

interface DifficultyBadgeProps {
  earnSteps: string[];
}

export function DifficultyBadge({ earnSteps }: DifficultyBadgeProps) {
  const difficulty = getDifficulty(earnSteps);
  return (
    <View style={[styles.badge, { backgroundColor: difficulty.backgroundColor }]}>
      <Text style={[styles.label, { color: difficulty.color }]}>난이도 {difficulty.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.labelSm,
  },
});
