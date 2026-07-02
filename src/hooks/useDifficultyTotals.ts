import { useMemo } from 'react';
import { getDifficulty, type DifficultyLevel } from '@/lib/difficulty';
import { useAppsStore } from '@/store/useAppsStore';

export interface DifficultyTotal {
  level: DifficultyLevel;
  label: string;
  color: string;
  appCount: number;
  dailyTotal: number;
  monthlyTotal: number;
}

// One representative step-count per tier, just to read off that tier's
// canonical label/color from getDifficulty() without duplicating the
// thresholds defined there.
const LEVEL_SAMPLE_STEPS: Record<DifficultyLevel, string[]> = {
  easy: [],
  medium: ['a', 'b', 'c'],
  hard: ['a', 'b', 'c', 'd', 'e'],
};

const LEVEL_ORDER: DifficultyLevel[] = ['easy', 'medium', 'hard'];

// Totals every catalog app's max reward, grouped by difficulty tier — this
// answers "how much could I earn if I did every app at this difficulty?",
// independent of which apps the user has actually selected.
export function useDifficultyTotals() {
  const apps = useAppsStore((s) => s.apps);

  return useMemo(() => {
    const byLevel = new Map<DifficultyLevel, DifficultyTotal>(
      LEVEL_ORDER.map((level) => {
        const sample = getDifficulty(LEVEL_SAMPLE_STEPS[level]);
        return [
          level,
          { level, label: sample.label, color: sample.color, appCount: 0, dailyTotal: 0, monthlyTotal: 0 },
        ];
      })
    );

    for (const app of apps) {
      const difficulty = getDifficulty(app.earn_steps);
      const bucket = byLevel.get(difficulty.level)!;
      bucket.appCount += 1;
      bucket.dailyTotal += app.daily_max_reward;
      bucket.monthlyTotal += app.monthly_max_reward;
    }

    const tiers = LEVEL_ORDER.map((level) => byLevel.get(level)!);
    const overall: DifficultyTotal = {
      level: 'easy',
      label: '전체',
      color: '',
      appCount: apps.length,
      dailyTotal: apps.reduce((sum, app) => sum + app.daily_max_reward, 0),
      monthlyTotal: apps.reduce((sum, app) => sum + app.monthly_max_reward, 0),
    };

    return { tiers, overall };
  }, [apps]);
}
