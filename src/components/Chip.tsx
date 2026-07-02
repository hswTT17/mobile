import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, typography } from '@/theme/tokens';

interface ChipProps {
  label: string;
  tone?: 'primary' | 'secondary' | 'tertiary' | 'error';
}

export function Chip({ label, tone = 'secondary' }: ChipProps) {
  const palette = tones[tone];
  return (
    <View style={[styles.chip, { backgroundColor: palette.bg }]}>
      <Text style={[styles.label, { color: palette.fg }]}>{label}</Text>
    </View>
  );
}

const tones = {
  primary: { bg: colors.primaryFixed, fg: colors.onPrimaryFixedVariant },
  secondary: { bg: colors.secondaryContainer, fg: colors.onSecondaryContainer },
  tertiary: { bg: colors.tertiaryFixed, fg: colors.onTertiaryFixedVariant },
  error: { bg: colors.errorContainer, fg: colors.onErrorContainer },
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.labelSm,
  },
});
