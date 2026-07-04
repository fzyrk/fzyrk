/** Fzyrk typography tokens as TypeScript constants */
export const TYPOGRAPHY = {
  fontPrimary:  "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  fontDisplay:  "'Plus Jakarta Sans', var(--fz-font-primary)",
  fontMono:     "'Source Code Pro', 'Fira Code', monospace",

  textXs:   '0.75rem',
  textSm:   '0.875rem',
  textBase: '1rem',
  textLg:   '1.125rem',
  textXl:   '1.25rem',
  text2xl:  '1.5rem',
  text3xl:  '1.875rem',
  text4xl:  '2.25rem',
  text5xl:  '3rem',
  text6xl:  '3.75rem',
  text7xl:  '4.5rem',

  leadingTight:   1.2,
  leadingNormal:  1.5,
  leadingRelaxed: 1.7,

  weightLight:     300,
  weightRegular:   400,
  weightMedium:    500,
  weightSemibold:  600,
  weightBold:      700,
  weightExtrabold: 800,
} as const;
