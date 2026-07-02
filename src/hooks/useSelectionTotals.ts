import { useMemo } from 'react';
import { useAppsStore } from '@/store/useAppsStore';
import { useAppSelectionStore } from '@/store/useAppSelectionStore';

export function useSelectionTotals() {
  const apps = useAppsStore((s) => s.apps);
  const selectedIds = useAppSelectionStore((s) => s.selectedIds);

  return useMemo(() => {
    const selectedApps = apps.filter((app) => selectedIds.has(app.id));
    const dailyTotal = selectedApps.reduce((sum, app) => sum + app.daily_max_reward, 0);
    const monthlyTotal = selectedApps.reduce((sum, app) => sum + app.monthly_max_reward, 0);
    return { selectedApps, dailyTotal, monthlyTotal };
  }, [apps, selectedIds]);
}
