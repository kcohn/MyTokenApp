// tokens/build-tokens.mjs - Enhanced version that auto-generates tokens.ts
import fs from 'fs';
import path from 'path';

async function buildTokensWithAutoGeneration() {
  console.log('🎨 Building design tokens with auto-generation...');
  
  const tokensData = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));
  const cssVariables = [];
  const jsTokens = {};
  
  // First pass: collect all primitive values (no references)
  const primitiveValues = new Map();
  
  function collectPrimitives(data, pathArray = []) {
    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('$')) continue; // Skip metadata
      
      if (value && typeof value === 'object') {
        if (value.$value !== undefined && value.$type !== undefined) {
          // Check if this is a primitive value (no references)
          if (typeof value.$value === 'string' && !value.$value.includes('{')) {
            const fullPath = [...pathArray, key].join('.');
            primitiveValues.set(fullPath, value.$value);
            console.log(`🔹 Primitive: ${fullPath} = ${value.$value}`);
          }
        } else {
          // Recurse into nested objects
          collectPrimitives(value, [...pathArray, key]);
        }
      }
    }
  }
  
  // Collect all primitive values first
  for (const [sectionName, sectionData] of Object.entries(tokensData)) {
    if (sectionName.startsWith('$')) continue;
    collectPrimitives(sectionData, [sectionName]);
  }
  
  // Function to resolve references like {Brand.Primary 1}
  function resolveReference(value) {
    if (typeof value !== 'string' || !value.includes('{')) {
      return value;
    }
    
    // Extract reference like "Brand.Primary 1" from "{Brand.Primary 1}"
    const match = value.match(/\{([^}]+)\}/);
    if (!match) return value;
    
    const reference = match[1];
    console.log(`🔍 Resolving reference: ${reference}`);
    
    // Try to find the reference in our primitive values
    // Look for exact match first
    if (primitiveValues.has(reference)) {
      const resolved = primitiveValues.get(reference);
      console.log(`✅ Resolved ${reference} = ${resolved}`);
      return resolved;
    }
    
    // Try variations of the reference path
    const variations = [
      reference,
      reference.replace(/\s+/g, '.'),
      reference.replace(/\s+/g, '-'),
      reference.toLowerCase().replace(/\s+/g, '.'),
      reference.toLowerCase().replace(/\s+/g, '-'),
    ];
    
    for (const variation of variations) {
      // Try to find in our collected primitives
      for (const [path, primitiveValue] of primitiveValues.entries()) {
        if (path.includes(variation) || 
            path.toLowerCase().includes(variation.toLowerCase()) ||
            path.endsWith(variation) ||
            path.endsWith(variation.toLowerCase())) {
          console.log(`✅ Resolved ${reference} via ${path} = ${primitiveValue}`);
          return primitiveValue;
        }
      }
    }
    
    console.log(`⚠️ Could not resolve reference: ${reference}`);
    return value; // Return original if can't resolve
  }
  
  function processSection(sectionData, sectionName) {
    console.log(`📦 Processing: ${sectionName}`);
    
    for (const [groupKey, groupData] of Object.entries(sectionData)) {
      if (groupKey.startsWith('$')) continue; // Skip metadata
      
      processGroup(groupData, [sectionName.toLowerCase(), groupKey.toLowerCase()]);
    }
  }
  
  function processGroup(group, pathArray) {
    for (const [key, value] of Object.entries(group)) {
      if (value && typeof value === 'object') {
        if (value.$value !== undefined && value.$type !== undefined) {
          // Generate a clean token name
          const tokenName = [...pathArray, key]
            .map(part => 
              part
                .replace(/\s+/g, '-')        // Replace spaces with dashes
                .replace(/[^a-zA-Z0-9-]/g, '-') // Replace special chars but keep letters
                .toLowerCase()               // Convert to lowercase AFTER replacing
            )
            .join('-')
            .replace(/--+/g, '-')            // Replace multiple dashes with single dash
            .replace(/^-+|-+$/g, '');        // Remove leading/trailing dashes
          
          const cssVarName = `--${tokenName}`;
          
          // Resolve any references in the value
          let cssValue = resolveReference(value.$value);
          
          // Process different token types
          switch (value.$type) {
            case 'color':
              // Colors should remain as-is after resolution
              break;
              
            case 'boxShadow':
              if (Array.isArray(cssValue)) {
                cssValue = cssValue.map(shadow => 
                  `${shadow.x || 0}px ${shadow.y || 0}px ${shadow.blur || 0}px ${shadow.spread || 0}px ${shadow.color || '#000000'}`
                ).join(', ');
              }
              break;
              
            case 'fontFamilies':
            case 'text':
              // Add quotes for font families and text values
              if (!cssValue.startsWith('"') && !cssValue.endsWith('"')) {
                cssValue = `"${cssValue}"`;
              }
              break;
              
            case 'dimension':
            case 'spacing':
            case 'fontSizes':
            case 'lineHeights':
              if (typeof cssValue === 'string' && !cssValue.includes('px') && !cssValue.includes('%')) {
                const numValue = parseFloat(cssValue);
                if (!isNaN(numValue)) {
                  cssValue = `${numValue}px`;
                }
              }
              break;
              
            case 'fontWeights':
              const weightMap = {
                'Medium': '500',
                'SemiBold': '600',
                'Semibold': '600',
                'Regular': '400',
                'Light': '300',
                'Bold': '700',
                'Condensed': '400'
              };
              cssValue = weightMap[cssValue] || cssValue;
              break;
          }
          
          cssVariables.push(`  ${cssVarName}: ${cssValue};`);
          
          // Store in JS object
          const keys = tokenName.split('-').filter(k => k.length > 0);
          let current = jsTokens;
          
          try {
            for (let i = 0; i < keys.length - 1; i++) {
              const keyName = keys[i];
              if (!current[keyName] || typeof current[keyName] !== 'object') {
                current[keyName] = {};
              }
              current = current[keyName];
            }
            
            const finalKey = keys[keys.length - 1];
            if (finalKey && typeof current === 'object') {
              current[finalKey] = cssValue;
            }
          } catch (error) {
            console.log(`Warning: Could not create JS structure for ${tokenName}`);
          }
          
        } else {
          // Recurse into nested groups
          processGroup(value, [...pathArray, key.toLowerCase()]);
        }
      }
    }
  }
  
  // Process your main token sections
  if (tokensData.global) {
    processSection(tokensData.global, 'global');
  }
  
  if (tokensData['Color/Light']) {
    processSection(tokensData['Color/Light'], 'color-light');
  }
  
  if (tokensData['Primitive: Type/Mode 1']) {
    processSection(tokensData['Primitive: Type/Mode 1'], 'primitive-type-mode-1');
  }
  
  if (tokensData['Spacing/Mode 1']) {
    processSection(tokensData['Spacing/Mode 1'], 'spacing-mode-1');
  }
  
  if (tokensData['Border/Mode 1']) {
    processSection(tokensData['Border/Mode 1'], 'border-mode-1');
  }
  
  if (tokensData['Unit/Mode 1']) {
    processSection(tokensData['Unit/Mode 1'], 'unit-mode-1');
  }
  
  if (tokensData['Layout/Mode 1']) {
    processSection(tokensData['Layout/Mode 1'], 'layout-mode-1');
  }
  
  // Create build directory
  const buildDir = 'tokens/build';
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  // Generate CSS file
  const cssContent = `:root {
${cssVariables.join('\n')}
}`;
  
  fs.writeFileSync(`${buildDir}/tokens.css`, cssContent);
  
  // Generate JS file
  const jsContent = `export const tokens = ${JSON.stringify(jsTokens, null, 2)};
export default tokens;`;
  
  fs.writeFileSync(`${buildDir}/tokens.js`, jsContent);
  
  // 🚀 NEW: Generate auto-updating tokens.ts
  await generateTokensTS(jsTokens);
  
  console.log('✅ Tokens with auto-generation built successfully!');
  console.log(`📊 Generated ${cssVariables.length} CSS variables`);
  console.log('📁 Files created:');
  console.log('   - tokens/build/tokens.css');
  console.log('   - tokens/build/tokens.js');
  console.log('   - lib/tokens.ts (auto-generated)');
  
  // Show a sample of what was generated
  console.log('\n🎯 Sample generated variables:');
  cssVariables.slice(0, 15).forEach(variable => {
    console.log('   ' + variable.trim());
  });
  if (cssVariables.length > 15) {
    console.log(`   ... and ${cssVariables.length - 15} more`);
  }
}

async function generateTokensTS(jsTokens) {
  console.log('🔄 Auto-generating lib/tokens.ts...');
  
  // Analyze the token structure to generate appropriate exports
  const sections = Object.keys(jsTokens);
  
  const tokensTemplate = `// lib/tokens.ts - AUTO-GENERATED from design tokens
// 🚨 DO NOT EDIT MANUALLY - This file is auto-generated by tokens/build-tokens.mjs
// Last generated: ${new Date().toISOString()}

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

// Helper to safely get all tokens from a category
const getTokenCategory = (basePath: string) => {
  const pathArray = basePath.split('.');
  let current: any = tokens;
  
  for (const key of pathArray) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return {};
    }
  }
  
  return current || {};
};

${generateSpacingExports(jsTokens)}

${generateBorderExports(jsTokens)}

${generateUnitExports(jsTokens)}

${generateTypographyExports(jsTokens)}

${generateColorExports(jsTokens)}

${generateBreakpointExports(jsTokens)}

${generateTypographyScale()}

${generateShadowExports()}

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

// Debug: Log available tokens (remove in production)
if (__DEV__) {
  console.log('🎨 Auto-generated Design Tokens Ready!');
}
`;

  // Write the generated tokens.ts file
  fs.writeFileSync('lib/tokens.ts', tokensTemplate);
  console.log('✅ Auto-generated lib/tokens.ts');
}

function generateSpacingExports(jsTokens) {
  return `// AUTO-GENERATED SPACING TOKENS
export const spacing = {
  '2xs': getToken('spacing.mode.1.space.2xs', 2) as number,
  xs: getToken('spacing.mode.1.space.xs', 4) as number,
  s: getToken('spacing.mode.1.space.s', 8) as number,
  m: getToken('spacing.mode.1.space.m', 12) as number,
  l: getToken('spacing.mode.1.space.l', 16) as number,
  xl: getToken('spacing.mode.1.space.xl', 24) as number,
  '2xl': getToken('spacing.mode.1.space.2xl', 32) as number,
  '3xl': getToken('spacing.mode.1.space.3xl', 40) as number,
  '4xl': getToken('spacing.mode.1.space.4xl', 48) as number,
  '5xl': getToken('spacing.mode.1.space.5xl', 56) as number,
  '6xl': getToken('spacing.mode.1.space.6xl', 64) as number,
  '7xl': getToken('spacing.mode.1.space.7xl', 72) as number,
  '8xl': getToken('spacing.mode.1.space.8xl', 80) as number,
  '9xl': getToken('spacing.mode.1.space.9xl', 88) as number,
  '10xl': getToken('spacing.mode.1.space.10xl', 96) as number,
  '11xl': getToken('spacing.mode.1.space.11xl', 104) as number,
  '12xl': getToken('spacing.mode.1.space.12xl', 112) as number,
};`;
}

function generateBorderExports(jsTokens) {
  return `// AUTO-GENERATED BORDER TOKENS
export const borderRadius = {
  xs: getToken('border.mode.1.radius.xs', 4) as number,
  s: getToken('border.mode.1.radius.s', 8) as number,
  m: getToken('border.mode.1.radius.m', 12) as number,
  l: getToken('border.mode.1.radius.l', 16) as number,
  circle: getToken('border.mode.1.radius.circle', 50) as number,
  pill: getToken('border.mode.1.radius.pill', 999) as number,
};

export const borderWidth = {
  xs: getToken('border.mode.1.width.xs', 1) as number,
  s: getToken('border.mode.1.width.s', 1.5) as number,
  m: getToken('border.mode.1.width.m', 2) as number,
  ml: getToken('border.mode.1.width.ml', 3) as number,
  l: getToken('border.mode.1.width.l', 4) as number,
  xl: getToken('border.mode.1.width.xl', 8) as number,
};`;
}

function generateUnitExports(jsTokens) {
  const unitKeys = [2, 4, 8, 10, 12, 14, 16, 18, 20, 24, 26, 28, 32, 36, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120];
  const unitExports = unitKeys.map(size => `  ${size}: getToken('unit.mode.1.unit.${size}', ${size}) as number,`).join('\n');
  
  return `// AUTO-GENERATED UNIT TOKENS
export const units = {
${unitExports}
};`;
}

function generateTypographyExports(jsTokens) {
  return `// AUTO-GENERATED TYPOGRAPHY TOKENS
export const fontFamily = {
  openSans: getToken('primitive.type.mode.1.family.open.sans', 'Open Sans') as string,
  rocGrotesk: getToken('primitive.type.mode.1.family.roc.grotesk', 'Roc Grotesk') as string,
  albertSans: getToken('primitive.type.mode.1.family.albert.sans', 'Albert Sans') as string,
};

export const fontWeight = {
  light: getToken('primitive.type.mode.1.weight.light', 'Light') as string,
  regular: getToken('primitive.type.mode.1.weight.regular', 'Regular') as string,
  medium: getToken('primitive.type.mode.1.weight.medium', '500') as string,
  semibold: getToken('primitive.type.mode.1.weight.semibold', 'Semibold') as string,
  bold: getToken('primitive.type.mode.1.weight.bold', 'Bold') as string,
  italic: getToken('primitive.type.mode.1.weight.italic', 'Italic') as string,
  lightItalic: getToken('primitive.type.mode.1.weight.light.italic', 'Light Italic') as string,
  mediumItalic: getToken('primitive.type.mode.1.weight.medium.italic', 'Medium Italic') as string,
  semiboldItalic: getToken('primitive.type.mode.1.weight.semibold.italic', 'Semibold Italic') as string,
  boldItalic: getToken('primitive.type.mode.1.weight.bold.italic', 'Bold Italic') as string,
};

export const letterSpacing = {
  none: getToken('primitive.type.mode.1.letter.spacing.none', 0) as number,
  xs: getToken('primitive.type.mode.1.letter.spacing.xs', -1) as number,
  s: getToken('primitive.type.mode.1.letter.spacing.s', -0.5) as number,
};`;
}

function generateColorExports(jsTokens) {
  return `// AUTO-GENERATED COLOR TOKENS
export const colors = {
  // Text colors
  text: {
    primary: getToken('color.light.text.text.header.primary', '#18181b') as string,
    secondary: getToken('color.light.text.text.body.secondary', '#71717a') as string,
    tertiary: getToken('color.light.text.text.body.tertiary', '#a1a1aa') as string,
    disabled: getToken('color.light.text.text.body.disabled', '#d4d4d8') as string,
    white: getToken('color.light.text.text.white', '#ffffff') as string,
    accent: getToken('color.light.text.text.accent', '#3b82f6') as string,
  },
  
  // Button colors - THIS IS THE KEY ONE FOR YOUR ISSUE! 🎯
  button: {
    primary: getToken('color.light.button.button.primary', '#ef4444') as string,
    secondary: getToken('color.light.button.button.secondary', '#18181b') as string,
    tertiary: getToken('color.light.button.button.tertiary', '#3b82f6') as string,
    disabled: getToken('color.light.button.button.disabled', '#f4f4f5') as string,
    textPrimary: getToken('color.light.button.button.text.primary', '#ffffff') as string,
    textDisabled: getToken('color.light.button.button.text.disabled', '#a1a1aa') as string,
  },
  
  // Surface colors
  surface: {
    primary: getToken('color.light.surface.surface', '#ffffff') as string,
    component: getToken('color.light.surface.surface.component', '#f8f9ff') as string,
    disabled: getToken('color.light.surface.surface.disabled', '#f4f4f5') as string,
    info: getToken('color.light.surface.surface.info', '#fef3c7') as string,
  },
  
  // Background colors
  background: {
    primary: getToken('color.light.surface.surface', '#ffffff') as string,
    secondary: '#f4f4f5',
    tertiary: '#e4e4e7',
  },
  
  // Border colors
  border: {
    primary: getToken('color.light.stroke.stroke.component', '#e4e4e7') as string,
    active: getToken('color.light.stroke.stroke.component.active', '#3b82f6') as string,
    disabled: getToken('color.light.stroke.stroke.disabled', '#d4d4d8') as string,
    focus: getToken('color.light.stroke.stroke.focus', '#3b82f6') as string,
  },
  
  // Brand colors
  brand: {
    primary: getToken('color.light.brand.primary.4', '#18181b') as string,
    primary2: getToken('color.light.brand.primary.2', '#3b82f6') as string,
    primary3: getToken('color.light.brand.primary.3', '#6366f1') as string,
    secondary1: getToken('color.light.brand.secondary.1', '#8b5cf6') as string,
    secondary2: getToken('color.light.brand.secondary.2', '#a855f7') as string,
    contrast: getToken('color.light.brand.contrast', '#ffffff') as string,
  },
  
  // Semantic colors
  semantic: {
    error: getToken('color.light.error', '#ef4444') as string,
    success: getToken('color.light.success', '#22c55e') as string,
    warning: getToken('color.light.warning', '#f59e0b') as string,
    info: getToken('color.light.info', '#3b82f6') as string,
    errorTint: getToken('color.light.error.tint', '#fef2f2') as string,
  },
  
  // Icon colors
  icon: {
    primary: getToken('color.light.icon.icon.primary', '#6366f1') as string,
    secondary: getToken('color.light.icon.icon.secondary', '#18181b') as string,
    tertiary: getToken('color.light.icon.icon.tertiary', '#71717a') as string,
    disabled: getToken('color.light.icon.icon.disabled', '#d4d4d8') as string,
    link: getToken('color.light.icon.icon.link', '#3b82f6') as string,
  },
};`;
}

function generateBreakpointExports(jsTokens) {
  return `// AUTO-GENERATED BREAKPOINT TOKENS
export const breakpoints = {
  s: getToken('layout.mode.1.breakpoint.s', 393) as number,
  m: getToken('layout.mode.1.breakpoint.m', 768) as number,
  l: getToken('layout.mode.1.breakpoint.l', 1024) as number,
  xl: getToken('layout.mode.1.breakpoint.xl', 1440) as number,
};`;
}

function generateTypographyScale() {
  return `// AUTO-GENERATED TYPOGRAPHY SCALE
export const typography = {
  // Text styles
  textXS: {
    fontSize: units[10],
    lineHeight: units[14],
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
};`;
}

function generateShadowExports() {
  return `// SHADOW TOKENS (static for now, add to your Figma tokens later)
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
};`;
}

buildTokensWithAutoGeneration().catch(console.error);