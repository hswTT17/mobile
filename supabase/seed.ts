// Seeds the `apps` table with the 10 sample app-tech apps from the project brief.
// Requires the Supabase *service role* key (bypasses RLS) — never ship this key in the app.
//
// Usage:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run seed
// or create a `.env` with those two vars and just `npm run seed`.

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.EXPO_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    'Missing SUPABASE_URL (or EXPO_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY.\n' +
      'Set them in your environment or a .env file before running `npm run seed`.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function avatarFor(seed: string, bg: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(seed)}&background=${bg}&color=fff&bold=true&size=128`;
}

const apps = [
  {
    name: '캐시워크',
    icon_url: avatarFor('CW', '1550D3'),
    reward_method: '걷기',
    reward_summary: '걸음 수에 따라 캐시 적립',
    daily_max_reward: 100,
    monthly_max_reward: 3000,
    description: '매일 걷는 만큼 포인트가 쌓이는 국내 대표 만보기 앱테크 앱입니다.',
    pros: ['배터리 소모 걱정 없이 백그라운드에서 동작', '적립 포인트를 커피/편의점 상품으로 즉시 교환'],
    cons: ['일일 최대 만보까지만 적립', '포인트 교환 시 광고가 노출될 수 있음'],
    play_store_url: 'https://play.google.com/store/apps/details?id=kr.co.psynet',
    app_store_url: 'https://apps.apple.com/kr/app/cashwalk/id1069676874',
    rating: 4.6,
    download_count_label: '1,000만+ 다운로드',
  },
  {
    name: '윈워크',
    icon_url: avatarFor('WW', '3C6BED'),
    reward_method: '걷기',
    reward_summary: '걸으면서 포인트 적립 + 럭키드로우',
    daily_max_reward: 100,
    monthly_max_reward: 3000,
    description: '걸음 수 기반 적립과 매일 럭키드로우 응모권을 함께 제공하는 앱입니다.',
    pros: ['매일 럭키드로우 응모 기회 제공', '친구 초대 보너스'],
    cons: ['걸음 수 동기화가 느릴 수 있음'],
    play_store_url: 'https://play.google.com/store/apps',
    app_store_url: 'https://apps.apple.com/app',
    rating: 4.3,
    download_count_label: '500만+ 다운로드',
  },
  {
    name: '머니팜',
    icon_url: avatarFor('MF', '00873B'),
    reward_method: '걷기',
    reward_summary: '걷기로 0.1원 단위 소액 적립',
    daily_max_reward: 10,
    monthly_max_reward: 300,
    description: '작지만 꾸준히 쌓이는 소액 적립형 걷기 리워드 앱입니다.',
    pros: ['가벼운 앱 용량', '간단한 UI'],
    cons: ['적립 단가가 낮음', '출금까지 시간이 오래 걸릴 수 있음'],
    play_store_url: 'https://play.google.com/store/apps',
    app_store_url: null,
    rating: 4.0,
    download_count_label: '100만+ 다운로드',
  },
  {
    name: '캐시컴퍼니',
    icon_url: avatarFor('CC', '585F68'),
    reward_method: '걷기',
    reward_summary: '걷기 + 미니게임 리워드',
    daily_max_reward: 30,
    monthly_max_reward: 900,
    description: '걷기 리워드에 미니게임 요소를 더해 재미있게 적립할 수 있는 앱입니다.',
    pros: ['미니게임으로 추가 적립 가능', '주간 랭킹 이벤트'],
    cons: ['광고 시청이 잦은 편'],
    play_store_url: 'https://play.google.com/store/apps',
    app_store_url: 'https://apps.apple.com/app',
    rating: 4.1,
    download_count_label: '50만+ 다운로드',
  },
  {
    name: '마이비',
    icon_url: avatarFor('MB', '1550D3'),
    reward_method: '광고 시청',
    reward_summary: '광고 시청으로 캐시 적립',
    daily_max_reward: 1200,
    monthly_max_reward: 36000,
    description: '짧은 광고를 시청하고 캐시를 받는 광고형 리워드 앱입니다.',
    pros: ['적립 단가가 높은 편', '즉시 출금 가능한 낮은 최소 금액'],
    cons: ['광고 시청 시간이 누적되면 지칠 수 있음'],
    play_store_url: 'https://play.google.com/store/apps',
    app_store_url: 'https://apps.apple.com/app',
    rating: 4.4,
    download_count_label: '300만+ 다운로드',
  },
  {
    name: '머니피그',
    icon_url: avatarFor('MP', 'BA1A1A'),
    reward_method: '광고 시청',
    reward_summary: '돼지 저금통 컨셉의 광고 리워드',
    daily_max_reward: 1000,
    monthly_max_reward: 30000,
    description: '저금통에 캐시를 모으는 컨셉의 광고 시청형 앱테크 앱입니다.',
    pros: ['저금통 애니메이션으로 성취감 제공', '주기적인 2배 적립 이벤트'],
    cons: ['광고 로딩 시간이 길 때가 있음'],
    play_store_url: 'https://play.google.com/store/apps',
    app_store_url: null,
    rating: 4.2,
    download_count_label: '200만+ 다운로드',
  },
  {
    name: '파블로',
    icon_url: avatarFor('PB', '006B2D'),
    reward_method: '광고 시청',
    reward_summary: '퍼즐 + 광고 시청 리워드',
    daily_max_reward: 500,
    monthly_max_reward: 15000,
    description: '퍼즐을 풀면서 광고 리워드를 받는 캐주얼 게임형 앱테크입니다.',
    pros: ['게임 요소로 지루하지 않음', '친구와 함께하는 랭킹전'],
    cons: ['적립 한도가 낮은 편'],
    play_store_url: 'https://play.google.com/store/apps',
    app_store_url: 'https://apps.apple.com/app',
    rating: 4.0,
    download_count_label: '80만+ 다운로드',
  },
  {
    name: '캐시플랜',
    icon_url: avatarFor('CP', '3C6BED'),
    reward_method: '걷기',
    reward_summary: '걷기 기반 소액 캐시 적립',
    daily_max_reward: 30,
    monthly_max_reward: 900,
    description: '심플한 UI로 걷기 리워드만 집중적으로 제공하는 앱입니다.',
    pros: ['가입 절차가 간단함', '위젯으로 걸음 수 확인 가능'],
    cons: ['이벤트가 자주 없는 편'],
    play_store_url: 'https://play.google.com/store/apps',
    app_store_url: null,
    rating: 3.9,
    download_count_label: '30만+ 다운로드',
  },
  {
    name: '달란트',
    icon_url: avatarFor('DT', '585F68'),
    reward_method: '설문',
    reward_summary: '설문조사 참여로 포인트 적립',
    daily_max_reward: 30,
    monthly_max_reward: 900,
    description: '짧은 설문에 참여하고 포인트를 받는 설문조사형 앱테크 앱입니다.',
    pros: ['설문 하나당 보상이 명확함', '다양한 주제의 설문 제공'],
    cons: ['설문 자격 조건에 따라 참여가 제한될 수 있음'],
    play_store_url: 'https://play.google.com/store/apps',
    app_store_url: 'https://apps.apple.com/app',
    rating: 4.3,
    download_count_label: '20만+ 다운로드',
  },
  {
    name: '캐시펫',
    icon_url: avatarFor('CT', 'BA1A1A'),
    reward_method: '걷기',
    reward_summary: '반려동물 키우기 + 걷기 리워드',
    daily_max_reward: 50,
    monthly_max_reward: 1500,
    description: '가상 반려동물을 키우며 걷기 리워드를 받는 앱테크 앱입니다.',
    pros: ['귀여운 캐릭터 육성 요소', '매일 출석 보너스'],
    cons: ['캐릭터 육성에 시간이 필요함'],
    play_store_url: 'https://play.google.com/store/apps',
    app_store_url: null,
    rating: 4.1,
    download_count_label: '40만+ 다운로드',
  },
];

async function main() {
  console.log(`Seeding ${apps.length} apps...`);
  const { error } = await supabase.from('apps').upsert(apps, { onConflict: 'name' });
  if (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
  console.log('Seed complete.');
}

main();
