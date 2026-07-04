/** Fzyrk spacing scale as TypeScript constants (in px) */
export const SPACING = {
  space1:  4,
  space2:  8,
  space3:  12,
  space4:  16,
  space5:  20,
  space6:  24,
  space8:  32,
  space10: 40,
  space12: 48,
  space16: 64,
  space20: 80,
  space24: 96,
  space32: 128,
} as const;

export type SpacingToken = keyof typeof SPACING;
