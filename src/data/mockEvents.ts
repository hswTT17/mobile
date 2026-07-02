import type { EventItem } from '@/types';

// Static demo content mirroring the "featured_events" design mock.
// No `events` table was specified in the project's data model, so this
// list is not backed by Supabase — swap for a real query if one is added later.
// time_left_label is always a static snapshot label (e.g. "오늘 마감"), never
// a live HH:MM:SS countdown, since there's no timer actually ticking behind it.
export const mockEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: '신규 가입하고 10,000원 즉시 지급',
    brand: '토스 (Toss)',
    category: '현금형',
    tag: 'Trending',
    reward_label: '₩10,000',
    time_left_label: '오늘만 혜택 2배',
    urgent: false,
    related_app_name: null,
  },
  {
    id: 'evt-2',
    title: '친구 초대하고 스타벅스 쿠폰 받기',
    brand: '캐시워크',
    category: '추첨형',
    tag: 'Gift',
    reward_label: '스타벅스 쿠폰',
    time_left_label: '3명 초대시 100% 당첨',
    urgent: false,
    related_app_name: '캐시워크',
  },
  {
    id: 'evt-3',
    title: '럭키드로우 1,000만 포인트',
    brand: '머니피그',
    category: '추첨형',
    tag: '마감임박',
    reward_label: '최대 1,000만P',
    time_left_label: '오늘 마감',
    urgent: true,
    related_app_name: '머니피그',
  },
  {
    id: 'evt-4',
    title: '브랜드 적립 10% 캐시백',
    brand: '나이키, 애플, 올리브영 외',
    category: '쇼핑',
    tag: '마감임박',
    reward_label: '10% 캐시백',
    time_left_label: '오늘 마감',
    urgent: true,
    related_app_name: null,
  },
  {
    id: 'evt-5',
    title: '첫 결제 시 1만원 페이백',
    brand: '네이버페이',
    category: '현금형',
    tag: '신규 등록',
    reward_label: '₩10,000',
    time_left_label: '7일 남음',
    urgent: false,
    related_app_name: null,
  },
  {
    id: 'evt-6',
    title: '매일 출석하고 포인트 2배',
    brand: '달란트',
    category: '누적형',
    tag: '오늘 마감',
    reward_label: '2배 적립',
    time_left_label: '오늘 마감',
    urgent: true,
    related_app_name: '달란트',
  },
];
