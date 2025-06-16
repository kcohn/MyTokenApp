// lib/tokens.ts - Enhanced with more design tokens
import { tokens } from '../tokens/build/tokens.js';

// Helper function to get token values with fallbacks
export const getToken = (path: string, fallback?: string | number): string | number => {
  const pathArray = path.split('.');
  let current: any = tokens;
  
  for (const key of pathArray) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return fallback || '';
    }
  }
  
  // Remove quotes and px suffix for numeric values where needed
  if (typeof current === 'string') {
    // Remove quotes from font families
    if (current.startsWith('"') && current.endsWith('"')) {
      return current.slice(1, -1);
    }
    // Convert px values to numbers for React Native
    if (current.endsWith('px')) {
      return parseInt(current.replace('px', ''), 10);
    }
  }
  
  return current || fallback || '';
};

// Spacing tokens
export const spacing = {
  '2xs': getToken('spacing.mode.1.space.2xs') as number,   // 2px
  xs: getToken('spacing.mode.1.space.xs') as number,      // 4px
  s: getToken('spacing.mode.1.space.s') as number,        // 8px  
  m: getToken('spacing.mode.1.space.m') as number,        // 12px
  l: getToken('spacing.mode.1.space.l') as number,        // 16px
  xl: getToken('spacing.mode.1.space.xl') as number,      // 24px
  '2xl': getToken('spacing.mode.1.space.2xl') as number,  // 32px
  '3xl': getToken('spacing.mode.1.space.3xl') as number,  // 40px
  '4xl': getToken('spacing.mode.1.space.4xl') as number,  // 48px
  '5xl': getToken('spacing.mode.1.space.5xl') as number,  // 56px
  '6xl': getToken('spacing.mode.1.space.6xl') as number,  // 64px
  '7xl': getToken('spacing.mode.1.space.7xl') as number,  // 72px
  '8xl': getToken('spacing.mode.1.space.8xl') as number,  // 80px
  '9xl': getToken('spacing.mode.1.space.9xl') as number,  // 88px
  '10xl': getToken('spacing.mode.1.space.10xl') as number, // 96px
  '11xl': getToken('spacing.mode.1.space.11xl') as number, // 104px
  '12xl': getToken('spacing.mode.1.space.12xl') as number, // 112px
};

// Border radius tokens
export const borderRadius = {
  xs: getToken('border.mode.1.radius.xs') as number,      // 4px
  s: getToken('border.mode.1.radius.s') as number,       // 8px
  m: getToken('border.mode.1.radius.m') as number,       // 12px
  l: getToken('border.mode.1.radius.l') as number,       // 16px
  circle: getToken('border.mode.1.radius.circle') as number, // 50px
  pill: getToken('border.mode.1.radius.pill') as number,     // 999px
};

// Border width tokens
export const borderWidth = {
  xs: getToken('border.mode.1.width.xs') as number,       // 1px
  s: getToken('border.mode.1.width.s') as number,        // 1.5px
  m: getToken('border.mode.1.width.m') as number,        // 2px
  ml: getToken('border.mode.1.width.ml') as number,      // 3px
  l: getToken('border.mode.1.width.l') as number,        // 4px
  xl: getToken('border.mode.1.width.xl') as number,      // 8px
};

// Unit tokens for precise sizing
export const units = {
  2: getToken('unit.mode.1.unit.2') as number,    // 2px
  4: getToken('unit.mode.1.unit.4') as number,    // 4px
  8: getToken('unit.mode.1.unit.8') as number,    // 8px
  10: getToken('unit.mode.1.unit.10') as number,  // 10px
  12: getToken('unit.mode.1.unit.12') as number,  // 12px
  14: getToken('unit.mode.1.unit.14') as number,  // 14px
  16: getToken('unit.mode.1.unit.16') as number,  // 16px
  18: getToken('unit.mode.1.unit.18') as number,  // 18px
  20: getToken('unit.mode.1.unit.20') as number,  // 20px
  24: getToken('unit.mode.1.unit.24') as number,  // 24px
  26: getToken('unit.mode.1.unit.26') as number,  // 26px
  28: getToken('unit.mode.1.unit.28') as number,  // 28px
  32: getToken('unit.mode.1.unit.32') as number,  // 32px
  36: getToken('unit.mode.1.unit.36') as number,  // 36px
  40: getToken('unit.mode.1.unit.40') as number,  // 40px
  48: getToken('unit.mode.1.unit.48') as number,  // 48px
  56: getToken('unit.mode.1.unit.56') as number,  // 56px
  64: getToken('unit.mode.1.unit.64') as number,  // 64px
  72: getToken('unit.mode.1.unit.72') as number,  // 72px
  80: getToken('unit.mode.1.unit.80') as number,  // 80px
  88: getToken('unit.mode.1.unit.88') as number,  // 88px
  96: getToken('unit.mode.1.unit.96') as number,  // 96px
  104: getToken('unit.mode.1.unit.104') as number, // 104px
  112: getToken('unit.mode.1.unit.112') as number, // 112px
  120: getToken('unit.mode.1.unit.120') as number, // 120px
};

// Typography tokens
export const fontFamily = {
  openSans: getToken('primitive.type.mode.1.family.open.sans') as string,     // "Open Sans"
  rocGrotesk: getToken('primitive.type.mode.1.family.roc.grotesk') as string, // "Roc Grotesk"
  albertSans: getToken('primitive.type.mode.1.family.albert.sans') as string, // "Albert Sans"
};

export const fontWeight = {
  light: getToken('primitive.type.mode.1.weight.light') as string,           // Light
  regular: getToken('primitive.type.mode.1.weight.regular') as string,       // Regular
  medium: '500',  // Using the processed medium weight                       // 500
  semibold: getToken('primitive.type.mode.1.weight.semibold') as string,     // Semibold
  bold: getToken('primitive.type.mode.1.weight.bold') as string,             // Bold
  italic: getToken('primitive.type.mode.1.weight.italic') as string,         // Italic
  lightItalic: getToken('primitive.type.mode.1.weight.light.italic') as string,
  mediumItalic: getToken('primitive.type.mode.1.weight.medium.italic') as string,
  semiboldItalic: getToken('primitive.type.mode.1.weight.semibold.italic') as string,
  boldItalic: getToken('primitive.type.mode.1.weight.bold.italic') as string,
};

export const letterSpacing = {
  none: getToken('primitive.type.mode.1.letter.spacing.none') as number,     // 0px
  xs: getToken('primitive.type.mode.1.letter.spacing.xs') as number,         // -1px
  s: getToken('primitive.type.mode.1.letter.spacing.s') as number,           // -0.5px
};

// Breakpoint tokens
export const breakpoints = {
  s: getToken('layout.mode.1.breakpoint.s') as number,    // 393px
  m: getToken('layout.mode.1.breakpoint.m') as number,    // 768px
  l: getToken('layout.mode.1.breakpoint.l') as number,    // 1024px
  xl: getToken('layout.mode.1.breakpoint.xl') as number,  // 1440px
};

// Typography scale helpers based on your semantic tokens structure
export const typography = {
  // Text styles
  textXS: {
    fontSize: units[10],           // From your primitive size tokens
    lineHeight: units[14],         // From your primitive line height tokens
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.none,
  },
  textS: {
    fontSize: units[12],
    lineHeight: units[16],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.none,
  },
  textM: {
    fontSize: units[14],
    lineHeight: units[20],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.none,
  },
  textL: {
    fontSize: units[16],
    lineHeight: units[24],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.none,
  },
  textXL: {
    fontSize: units[20],
    lineHeight: units[28],
    fontWeight: fontWeight.regular,
    letterSpacing: letterSpacing.none,
  },
  
  // Heading styles
  heading2XS: {
    fontSize: units[14],
    lineHeight: units[20],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.none,
  },
  headingXS: {
    fontSize: units[16],
    lineHeight: units[24],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.s,
  },
  headingS: {
    fontSize: units[20],
    lineHeight: units[28],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.s,
  },
  headingM: {
    fontSize: units[24],
    lineHeight: units[32],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.s,
  },
  headingL: {
    fontSize: units[32],
    lineHeight: units[40],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.xs,
  },
  headingXL: {
    fontSize: units[40],
    lineHeight: units[48],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.xs,
  },
  heading2XL: {
    fontSize: units[48],
    lineHeight: units[56],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.xs,
  },
  heading3XL: {
    fontSize: units[56],
    lineHeight: units[64],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.xs,
  },
  heading4XL: {
    fontSize: units[64],
    lineHeight: units[72],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.xs,
  },
  heading5XL: {
    fontSize: units[72],
    lineHeight: units[80],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.xs,
  },
};

// Shadow tokens (if you add them to your tokens later)
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Color helpers (these would ideally come from your color tokens when you expand them)
export const colors = {
  // Using standard colors for now, but these should be replaced with your actual color tokens
  text: {
    primary: '#18181b',
    secondary: '#71717a',
    tertiary: '#a1a1aa',
    disabled: '#d4d4d8',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f4f4f5',
    tertiary: '#e4e4e7',
  },
  border: {
    primary: '#e4e4e7',
    secondary: '#d4d4d8',
    focus: '#3b82f6',
  },
  brand: {
    primary: '#18181b',
    secondary: '#71717a',
  },
  semantic: {
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#22c55e',
    info: '#3b82f6',
  },
};

// Export all tokens for easy access
export const designTokens = {
  spacing,
  borderRadius,
  borderWidth,
  units,
  fontFamily,
  fontWeight,
  letterSpacing,
  breakpoints,
  typography,
  shadows,
  colors,
};

// Example usage:
// console.log('Spacing L:', spacing.l);              // 16
// console.log('Typography Text M:', typography.textM); // { fontSize: 14, lineHeight: 20, ... }
// console.log('Font Family:', fontFamily.rocGrotesk);  // "Roc Grotesk"