import { colors } from '@/theme/tokens';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Difficulty {
  level: DifficultyLevel;
  label: string;
  color: string;
  backgroundColor: string;
}

// Difficulty is derived purely from how many steps it takes to earn the
// reward — more steps in the process means a higher difficulty.
export function getDifficulty(earnSteps: string[]): Difficulty {
  const stepCount = earnSteps.length;

  if (stepCount <= 2) {
    return { level: 'easy', label: '쉬움', color: colors.tertiary, backgroundColor: colors.tertiaryFixed + '4d' };
  }
  if (stepCount <= 4) {
    return { level: 'medium', label: '보통', color: colors.onPrimaryFixedVariant, backgroundColor: colors.primaryFixed };
  }
  return { level: 'hard', label: '어려움', color: colors.onErrorContainer, backgroundColor: colors.errorContainer };
}
