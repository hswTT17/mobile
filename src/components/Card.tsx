import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, radius, shadow, spacing } from '@/theme/tokens';

interface CardProps extends ViewProps {
  padded?: boolean;
}

export function Card({ style, padded = true, ...rest }: CardProps) {
  return <View style={[styles.card, padded && styles.padded, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '33',
    ...shadow.card,
  },
  padded: {
    padding: spacing.stackMd,
  },
});
