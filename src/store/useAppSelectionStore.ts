import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface AppSelectionState {
  selectedIds: Set<string>;
  loading: boolean;
  loadedForUser: string | null;
  loadSelections: (userId: string) => Promise<void>;
  toggle: (userId: string, appId: string) => Promise<void>;
  reset: () => void;
}

export const useAppSelectionStore = create<AppSelectionState>((set, get) => ({
  selectedIds: new Set(),
  loading: false,
  loadedForUser: null,
  loadSelections: async (userId) => {
    if (get().loadedForUser === userId) return;
    set({ loading: true });
    const { data, error } = await supabase
      .from('user_selected_apps')
      .select('app_id')
      .eq('user_id', userId);
    if (!error) {
      set({
        selectedIds: new Set((data ?? []).map((row) => row.app_id as string)),
        loadedForUser: userId,
      });
    }
    set({ loading: false });
  },
  toggle: async (userId, appId) => {
    const current = get().selectedIds;
    const next = new Set(current);
    const wasSelected = next.has(appId);
    if (wasSelected) {
      next.delete(appId);
    } else {
      next.add(appId);
    }
    set({ selectedIds: next });

    if (wasSelected) {
      const { error } = await supabase
        .from('user_selected_apps')
        .delete()
        .eq('user_id', userId)
        .eq('app_id', appId);
      if (error) set({ selectedIds: current });
    } else {
      const { error } = await supabase
        .from('user_selected_apps')
        .insert({ user_id: userId, app_id: appId });
      if (error) set({ selectedIds: current });
    }
  },
  reset: () => set({ selectedIds: new Set(), loadedForUser: null }),
}));
