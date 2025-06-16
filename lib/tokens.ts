// Import your built tokens
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

// Specific token getters for common use cases
export const spacing = {
  xs: getToken('spacing.mode.1.space.xs') as number,      // 4px
  s: getToken('spacing.mode.1.space.s') as number,       // 8px  
  m: getToken('spacing.mode.1.space.m') as number,       // 12px
  l: getToken('spacing.mode.1.space.l') as number,       // 16px
  xl: getToken('spacing.mode.1.space.xl') as number,     // 24px
  '2xl': getToken('spacing.mode.1.space.2xl') as number, // 32px
  '3xl': getToken('spacing.mode.1.space.3xl') as number, // 40px
  '4xl': getToken('spacing.mode.1.space.4xl') as number, // 48px
  '5xl': getToken('spacing.mode.1.space.5xl') as number, // 56px
  '6xl': getToken('spacing.mode.1.space.6xl') as number, // 64px
};

export const borderRadius = {
  xs: getToken('border.mode.1.radius.xs') as number,     // 4px
  s: getToken('border.mode.1.radius.s') as number,      // 8px
  m: getToken('border.mode.1.radius.m') as number,      // 12px
  l: getToken('border.mode.1.radius.l') as number,      // 16px
  circle: getToken('border.mode.1.radius.circle') as number, // 50px
  pill: getToken('border.mode.1.radius.pill') as number,     // 999px
};

export const borderWidth = {
  xs: getToken('border.mode.1.width.xs') as number,      // 1px
  s: getToken('border.mode.1.width.s') as number,       // 1.5px
  m: getToken('border.mode.1.width.m') as number,       // 2px
  l: getToken('border.mode.1.width.l') as number,       // 4px
  xl: getToken('border.mode.1.width.xl') as number,     // 8px
};

export const units = {
  2: getToken('unit.mode.1.unit.2') as number,   // 2px
  4: getToken('unit.mode.1.unit.4') as number,   // 4px
  8: getToken('unit.mode.1.unit.8') as number,   // 8px
  16: getToken('unit.mode.1.unit.16') as number, // 16px
  24: getToken('unit.mode.1.unit.24') as number, // 24px
  32: getToken('unit.mode.1.unit.32') as number, // 32px
  40: getToken('unit.mode.1.unit.40') as number, // 40px
  48: getToken('unit.mode.1.unit.48') as number, // 48px
  56: getToken('unit.mode.1.unit.56') as number, // 56px
  64: getToken('unit.mode.1.unit.64') as number, // 64px
};

export const fontFamily = {
  openSans: getToken('primitive.type.mode.1.family.open.sans') as string,    // "Open Sans"
  rocGrotesk: getToken('primitive.type.mode.1.family.roc.grotesk') as string, // "Roc Grotesk"
  albertSans: getToken('primitive.type.mode.1.family.albert.sans') as string, // "Albert Sans"
};

// Example: console.log('Spacing L:', spacing.l); // Should log 16
// Example: console.log('Border Radius S:', borderRadius.s); // Should log 8