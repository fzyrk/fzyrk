/** Fzyrk brand color tokens as TypeScript constants */
export const COLORS = {
  accent:        '#6366f1',
  accentHover:   '#818cf8',
  accentActive:  '#4f46e5',
  accentGlow:    'rgba(99, 102, 241, 0.15)',
  accent2:       '#a855f7',
  success:       '#22c55e',
  warning:       '#f59e0b',
  error:         '#ef4444',
  info:          '#3b82f6',

  bgDeep:        '#080810',
  bgBase:        '#0f0f1a',
  bgSurface:     '#13132a',
  bgElevated:    'rgba(30, 30, 56, 0.6)',
  bgGlass:       'rgba(20, 20, 40, 0.7)',
  bgOverlay:     'rgba(0, 0, 0, 0.6)',

  textPrimary:   '#f0f0fa',
  textSecondary: '#a0a0c0',
  textMuted:     '#5c5c80',
  textInverse:   '#0f0f1a',
  textAccent:    '#818cf8',

  border:        'rgba(100, 100, 180, 0.15)',
  borderStrong:  'rgba(100, 100, 180, 0.3)',
  borderGlow:    'rgba(99, 102, 241, 0.4)',
} as const;

export type ColorToken = keyof typeof COLORS;
