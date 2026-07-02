// Design tokens transcribed 1:1 from `design folder/apptech_hub/DESIGN.md`.
export const colors = {
  surface: '#f8f9fc',
  surfaceDim: '#d9dadd',
  surfaceBright: '#f8f9fc',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f2f3f6',
  surfaceContainer: '#edeef1',
  surfaceContainerHigh: '#e7e8eb',
  surfaceContainerHighest: '#e1e2e5',
  onSurface: '#191c1e',
  onSurfaceVariant: '#434654',
  inverseSurface: '#2e3133',
  inverseOnSurface: '#f0f1f4',
  outline: '#737686',
  outlineVariant: '#c3c5d7',
  primary: '#1550d3',
  onPrimary: '#ffffff',
  primaryContainer: '#3c6bed',
  onPrimaryContainer: '#fffbff',
  primaryFixed: '#dce1ff',
  primaryFixedDim: '#b5c4ff',
  onPrimaryFixedVariant: '#003cad',
  secondary: '#585f68',
  onSecondary: '#ffffff',
  secondaryContainer: '#dde3ee',
  onSecondaryContainer: '#5e656e',
  secondaryFixed: '#dde3ee',
  secondaryFixedDim: '#c1c7d1',
  tertiary: '#006b2d',
  onTertiary: '#ffffff',
  tertiaryContainer: '#00873b',
  onTertiaryContainer: '#f7fff3',
  tertiaryFixed: '#6bff8f',
  tertiaryFixedDim: '#4ae176',
  onTertiaryFixedVariant: '#005321',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  background: '#f8f9fc',
  onBackground: '#191c1e',
  surfaceVariant: '#e1e2e5',
} as const;

export const typography = {
  displayLg: { fontSize: 48, lineHeight: 56, fontWeight: '700' as const, letterSpacing: -0.9 },
  headlineLg: { fontSize: 32, lineHeight: 40, fontWeight: '700' as const, letterSpacing: -0.3 },
  headlineLgMobile: { fontSize: 26, lineHeight: 32, fontWeight: '700' as const },
  headlineMd: { fontSize: 24, lineHeight: 32, fontWeight: '600' as const },
  bodyLg: { fontSize: 18, lineHeight: 28, fontWeight: '400' as const },
  bodyMd: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  labelMd: { fontSize: 14, lineHeight: 20, fontWeight: '500' as const, letterSpacing: 0.14 },
  labelSm: { fontSize: 12, lineHeight: 16, fontWeight: '600' as const, letterSpacing: 0.36 },
} as const;

export const radius = {
  sm: 4,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 24,
  full: 9999,
} as const;

export const spacing = {
  unit: 4,
  containerPadding: 20,
  gutter: 16,
  stackSm: 8,
  stackMd: 16,
  stackLg: 32,
  sectionGap: 48,
} as const;

// Ambient elevation, tinted with primary blue per DESIGN.md "Elevation & Depth".
export const shadow = {
  card: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  soft: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
} as const;
