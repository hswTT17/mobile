export type RewardMethod = '걷기' | '광고 시청' | '설문' | '쇼핑' | '출석체크' | '퀴즈';

export interface AppTechApp {
  id: string;
  name: string;
  icon_url: string;
  reward_method: RewardMethod;
  reward_summary: string;
  daily_max_reward: number;
  monthly_max_reward: number;
  description: string;
  pros: string[];
  cons: string[];
  earn_steps: string[];
  play_store_url: string | null;
  app_store_url: string | null;
  rating: number;
  download_count_label: string;
  created_at: string;
}

export interface UserSelectedApp {
  user_id: string;
  app_id: string;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  brand: string;
  category: string;
  tag: string;
  reward_label: string;
  time_left_label: string;
  urgent: boolean;
}
