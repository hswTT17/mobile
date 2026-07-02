# AppTech Hub

국내외 앱테크(리워드 앱) 혜택을 한눈에 확인하는 크로스플랫폼 모바일 앱입니다. 사용 중인 앱을 선택하면 일일/월간 최대 리워드 합계를 자동으로 계산해 보여줍니다.

디자인은 `design folder/`에 있는 Tailwind 목업(홈 대시보드, 검색/카테고리, 이벤트, 마이페이지, 앱 상세)을 기준으로 React Native 컴포넌트로 옮겼습니다.

## 기술 스택

- **프레임워크**: Expo (React Native) + TypeScript, [Expo Router](https://docs.expo.dev/router/introduction/) 파일 기반 라우팅
- **백엔드/DB**: Supabase (Auth + Postgres)
- **상태 관리**: Zustand
- **인증**: 이메일/비밀번호 + Google OAuth(Supabase OAuth 플로우)

## 화면 구성

| 화면 | 경로 | 설명 |
| --- | --- | --- |
| 로그인 / 회원가입 | `app/(auth)/login.tsx`, `signup.tsx` | 이메일 인증 + Google 로그인 |
| 홈 (혜택 조회) | `app/(tabs)/index.tsx` | 선택한 앱의 일일/월간 리워드 합계, 선택 앱 리스트, 인기/마감 임박 이벤트 |
| 검색 / 앱 카탈로그 | `app/(tabs)/search.tsx` | 전체 앱 목록 + 카테고리 필터 + 체크박스 다중 선택 (Supabase에 실시간 저장) |
| 이벤트 | `app/(tabs)/events.tsx` | 추천/마감임박 이벤트 목록 (정적 데모 데이터) |
| 커뮤니티 | `app/(tabs)/community.tsx` | 준비 중 안내 화면 (디자인 목업 없음, 최소 구현) |
| 마이페이지 | `app/(tabs)/mypage.tsx` | 프로필, 선택 앱 기준 수익 통계, 알림 설정, 로그아웃 |
| 앱 상세 | `app/app-detail/[id].tsx` | 앱별 리워드 방식, 장단점, 스토어 링크 |

### 원본 기획서와 다른 점 (의도적인 범위 조정)

원래 PRD는 "핵심 기능 2개 + 화면 4개, 통계/이벤트/커뮤니티 등 부가 기능 금지"였지만, 이후 요청으로 `design folder`의 전체 화면(홈/검색/이벤트/마이페이지/앱상세)을 그대로 구현하는 쪽으로 범위를 넓혔습니다. 이 과정에서:

- **이벤트 목록**은 데이터 모델이 정의되어 있지 않아 `src/data/mockEvents.ts`의 정적 데이터를 사용합니다. 실제 이벤트 백엔드가 필요하면 Supabase에 `events` 테이블을 추가하고 이 파일을 교체하세요.
- **커뮤니티 탭**은 디자인 목업이 없어 디자인 토큰만 맞춘 최소 placeholder 화면입니다.
- **마이페이지의 통계**는 실제 트랜잭션 원장이 없으므로, 선택한 앱들의 일일/월간 최대 리워드 합계에서 파생된 값(오늘 예상 수익, 이번 달 예상 수익, 연 환산 예상)과 "앱별 예상 리워드" 목록만 보여줍니다. 디자인의 주간 막대그래프처럼 가짜 히스토리를 만들어 보여주진 않습니다.
- **핵심 기능(일일/월간 리워드 합계 계산, 앱 다중 선택)**은 원본 PRD 그대로 실제 Supabase 데이터로 동작합니다.

## 데이터 모델 (Supabase)

`supabase/schema.sql` 참고:

- `apps`: 앱테크 앱 마스터 데이터 (이름, 아이콘, 리워드 방식, 일일/월간 최대 리워드, 설명, 장단점, 혜택 받는 방법(`earn_steps`), 스토어 링크 등). 난이도(쉬움/보통/어려움)는 별도 컬럼이 아니라 `earn_steps` 배열의 길이에서 자동으로 계산됩니다 (`src/lib/difficulty.ts`) — 과정이 많을수록 난이도가 올라갑니다.
- `user_selected_apps`: 사용자별 선택 앱 (user_id, app_id) — RLS로 본인 데이터만 조회/수정 가능

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

> Expo SDK 57 + React 19 조합에서 `expo-router`가 끌어오는 웹 전용 패키지(`react-dom`) 버전이 살짝 어긋나 있어 `npm install`이 peer dependency 충돌로 실패할 수 있습니다. 이 경우 `npm install --legacy-peer-deps`로 설치하세요. 런타임에는 영향이 없습니다.

### 2. Supabase 프로젝트 설정

1. [supabase.com](https://supabase.com)에서 새 프로젝트를 만듭니다.
2. **SQL Editor**에서 `supabase/schema.sql` 내용을 실행해 `apps`, `user_selected_apps` 테이블과 RLS 정책을 생성합니다.
3. **Authentication > Providers**에서 Email 로그인을 켜고, Google 로그인을 쓰려면 Google Provider를 활성화한 뒤 Client ID/Secret을 등록합니다. Redirect URL은 `apptechhub://auth-callback`을 추가하세요 (앱의 URL scheme, `app.json`의 `expo.scheme` 참고).
4. **Project Settings > API**에서 `Project URL`과 `anon public` 키를 확인합니다.

### 3. 환경 변수 설정

```bash
cp .env.example .env
```

`.env`에 Supabase URL/anon key를 채워 넣습니다. 앱 실행에는 `EXPO_PUBLIC_*` 값만 필요합니다.

### 4. 시드 데이터 삽입

`apps` 테이블에 샘플 앱 10개(캐시워크, 윈워크, 머니팜, 캐시컴퍼니, 마이비, 머니피그, 파블로, 캐시플랜, 달란트, 캐시펫)를 넣습니다. RLS를 우회해야 하므로 **service role 키**가 필요합니다 (`.env`의 `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — Project Settings > API > `service_role`).

```bash
npm run seed
```

값은 예시이며, 이후 Supabase 대시보드(Table Editor)나 SQL로 언제든 수정할 수 있습니다.

### 5. 앱 실행

```bash
npm run start   # Expo 개발 서버, QR코드로 Expo Go에서 실행
npm run ios     # iOS 시뮬레이터 (macOS 필요)
npm run android # Android 에뮬레이터
npm run web     # 웹 브라우저 미리보기
```

로그인하지 않은 상태로 앱을 열면 자동으로 로그인 화면(`/(auth)/login`)으로 이동합니다. 로그인에 성공하면 탭 화면(`/(tabs)`)으로 이동합니다.

### 6. 타입 체크

```bash
npm run typecheck
```

## 프로젝트 구조

```
app/                      # expo-router 화면 (파일 기반 라우팅)
  (auth)/                 # 로그인/회원가입 (비로그인 시 진입)
  (tabs)/                 # 홈/검색/이벤트/커뮤니티/마이페이지 (로그인 필요)
  app-detail/[id].tsx     # 앱 상세 스택 화면
  _layout.tsx             # 루트 레이아웃 (인증 초기화, 스택 구성)
src/
  components/             # 공용 UI 컴포넌트 (Card, TopBar, GlassTabBar 등)
  data/mockEvents.ts       # 이벤트 정적 데모 데이터
  hooks/useSelectionTotals.ts
  lib/                    # supabase 클라이언트, 포맷 유틸
  store/                  # zustand 스토어 (auth, apps, app selection)
  theme/tokens.ts          # design folder/apptech_hub/DESIGN.md에서 옮긴 디자인 토큰
  types/                  # 공용 타입 정의
supabase/
  schema.sql              # 테이블 + RLS 정책
  seed.ts                 # 샘플 앱 10개 시드 스크립트
```

## 디자인 시스템

`src/theme/tokens.ts`에 `design folder/apptech_hub/DESIGN.md`의 색상/타이포그래피/spacing/radius를 그대로 옮겨두었습니다. 디자인을 변경하려면 이 파일만 수정하면 대부분의 화면에 반영됩니다.
