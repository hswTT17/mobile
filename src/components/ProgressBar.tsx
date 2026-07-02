import { StyleSheet, View } from 'react-native';
import { colors, radius } from '@/theme/tokens';

interface ProgressBarProps {
  progress: number; // 0..1
  height?: number;
  trackColor?: string;
  fillColor?: string;
}

export function ProgressBar({
  progress,
  height = 12,
  trackColor = colors.surfaceContainer,
  fillColor = colors.tertiaryContainer,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor, borderRadius: height }]}>
      <View
        style={[
          styles.fill,
          { width: `${clamped * 100}%`, backgroundColor: fillColor, borderRadius: height },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
