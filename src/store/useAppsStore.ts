import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { AppTechApp } from '@/types';

interface AppsState {
  apps: AppTechApp[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
  fetchApps: () => Promise<void>;
}

export const useAppsStore = create<AppsState>((set, get) => ({
  apps: [],
  loading: false,
  error: null,
  fetched: false,
  fetchApps: async () => {
    if (get().fetched || get().loading) return;
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('daily_max_reward', { ascending: false });
    if (error) {
      set({ loading: false, error: error.message });
      return;
    }
    set({ apps: data ?? [], loading: false, fetched: true });
  },
}));
