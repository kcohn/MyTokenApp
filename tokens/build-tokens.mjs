// tokens/build-tokens.mjs - Fixed version with proper color reference resolution
import fs from 'fs';

async function buildTokensWithFixedColors() {
  console.log('🎨 Building design tokens with fixed color resolution...');
  
  const tokensData = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));
  const cssVariables = [];
  const jsTokens = {};
  
  // Create a comprehensive reference map
  const referenceMap = new Map();
  
  // First, let's examine the actual structure
  console.log('📋 Token sections found:');
  Object.keys(tokensData).forEach(key => {
    if (!key.startsWith('$')) {
      console.log(`   - ${key}`);
    }
  });
  
  // Step 1: Collect ALL tokens that have actual values (no references)
  function collectAllPrimitives(data, pathArray = []) {
    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('$')) continue;
      
      if (value && typeof value === 'object') {
        if (value.$value !== undefined && value.$type !== undefined) {
          // Check if this is a primitive value (no curly braces)
          if (typeof value.$value === 'string' && !value.$value.includes('{')) {
            const fullPath = [...pathArray, key].join('.');
            const cleanKey = key.replace(/[^a-zA-Z0-9\s]/g, ' ').trim();
            
            // Store multiple variations of the key
            referenceMap.set(fullPath, value.$value);
            referenceMap.set(key, value.$value);
            referenceMap.set(cleanKey, value.$value);
            
            // Store with different casing and spacing
            referenceMap.set(key.replace(/[-\s]/g, ''), value.$value);
            referenceMap.set(key.replace(/[-\s]/g, '.'), value.$value);
            referenceMap.set(cleanKey.replace(/\s+/g, ' '), value.$value);
            
            console.log(`🔹 Primitive found: "${key}" = ${value.$value}`);
            console.log(`   Clean key: "${cleanKey}"`);
          }
        } else {
          // Recurse into nested objects
          collectAllPrimitives(value, [...pathArray, key]);
        }
      }
    }
  }
  
  // Collect primitives from all sections
  for (const [sectionName, sectionData] of Object.entries(tokensData)) {
    if (sectionName.startsWith('$')) continue;
    console.log(`\n🔍 Scanning section: ${sectionName}`);
    collectAllPrimitives(sectionData, [sectionName]);
  }
  
  console.log(`\n📊 Found ${referenceMap.size} primitive values`);
  
  // Step 2: Enhanced reference resolution
  function resolveReference(value, debugContext = '') {
    if (typeof value !== 'string' || !value.includes('{')) {
      return value;
    }
    
    const match = value.match(/\{([^}]+)\}/);
    if (!match) return value;
    
    const reference = match[1].trim();
    console.log(`🔍 [${debugContext}] Resolving: "${reference}"`);
    
    // Try exact match first
    if (referenceMap.has(reference)) {
      const resolved = referenceMap.get(reference);
      console.log(`✅ [${debugContext}] Exact match: "${reference}" → ${resolved}`);
      return resolved;
    }
    
    // Try fuzzy matching
    const referenceClean = reference.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    for (const [key, primitiveValue] of referenceMap.entries()) {
      const keyClean = key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      
      if (keyClean === referenceClean ||
          keyClean.includes(referenceClean) ||
          referenceClean.includes(keyClean)) {
        console.log(`✅ [${debugContext}] Fuzzy match: "${reference}" → "${key}" → ${primitiveValue}`);
        return primitiveValue;
      }
    }
    
    // If it's still a reference, let's try to find it in the color structure
    if (reference.includes('Brand') || reference.includes('Semantic') || reference.includes('Tones')) {
      console.log(`🎨 [${debugContext}] Looking for color reference: ${reference}`);
      
      // Try to find in any section
      for (const [sectionName, sectionData] of Object.entries(tokensData)) {
        if (sectionName.startsWith('$')) continue;
        
        const found = findInSection(sectionData, reference);
        if (found) {
          console.log(`✅ [${debugContext}] Found in ${sectionName}: ${reference} → ${found}`);
          return found;
        }
      }
    }
    
    console.log(`❌ [${debugContext}] Could not resolve: "${reference}"`);
    
    // Return a reasonable fallback based on the reference name
    if (reference.toLowerCase().includes('error')) return '#ef4444';
    if (reference.toLowerCase().includes('success')) return '#22c55e';
    if (reference.toLowerCase().includes('warning')) return '#f59e0b';
    if (reference.toLowerCase().includes('info')) return '#3b82f6';
    if (reference.toLowerCase().includes('white')) return '#ffffff';
    if (reference.toLowerCase().includes('primary') && reference.includes('1')) return '#18181b';
    if (reference.toLowerCase().includes('primary') && reference.includes('2')) return '#3b82f6';
    if (reference.toLowerCase().includes('gray')) return '#71717a';
    
    return value; // Return original if can't resolve
  }
  
  // Helper to search within a section
  function findInSection(section, target) {
    if (!section || typeof section !== 'object') return null;
    
    for (const [key, value] of Object.entries(section)) {
      if (key.startsWith('$')) continue;
      
      if (value && typeof value === 'object') {
        if (value.$value !== undefined && !value.$value.includes('{')) {
          if (key === target || key.replace(/[^a-zA-Z0-9]/g, '') === target.replace(/[^a-zA-Z0-9]/g, '')) {
            return value.$value;
          }
        } else {
          const found = findInSection(value, target);
          if (found) return found;
        }
      }
    }
    return null;
  }
  
  // Step 3: Process all sections with better error handling
  function processSection(sectionData, sectionName) {
    console.log(`\n📦 Processing section: ${sectionName}`);
    
    for (const [groupKey, groupData] of Object.entries(sectionData)) {
      if (groupKey.startsWith('$')) continue;
      
      processGroup(groupData, [sectionName.toLowerCase(), groupKey.toLowerCase()], `${sectionName}/${groupKey}`);
    }
  }
  
  function processGroup(group, pathArray, debugContext) {
    for (const [key, value] of Object.entries(group)) {
      if (value && typeof value === 'object') {
        if (value.$value !== undefined && value.$type !== undefined) {
          const tokenName = [...pathArray, key]
            .map(part => 
              part
                .replace(/\s+/g, '-')
                .replace(/[^a-zA-Z0-9-]/g, '-')
                .toLowerCase()
            )
            .join('-')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '');
          
          const cssVarName = `--${tokenName}`;
          
          // Resolve references with context
          let cssValue = resolveReference(value.$value, `${debugContext}/${key}`);
          
          // Process different token types
          switch (value.$type) {
            case 'color':
              // Ensure it's a valid color
              if (typeof cssValue === 'string' && !cssValue.startsWith('#') && !cssValue.includes('rgb')) {
                console.log(`⚠️ Invalid color value: ${cssValue} for ${tokenName}`);
                cssValue = '#000000'; // Fallback to black
              }
              break;
              
            case 'fontFamilies':
            case 'text':
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
                'Bold': '700'
              };
              cssValue = weightMap[cssValue] || cssValue;
              break;
          }
          
          if (cssValue && cssValue !== 'undefined') {
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
            console.log(`⚠️ Skipping ${tokenName} - undefined value`);
          }
          
        } else {
          processGroup(value, [...pathArray, key.toLowerCase()], debugContext);
        }
      }
    }
  }
  
  // Process all sections
  const sectionsToProcess = [
    'global',
    'Color/Light',
    'Primitive: Type/Mode 1',
    'Spacing/Mode 1',
    'Border/Mode 1',
    'Unit/Mode 1',
    'Layout/Mode 1'
  ];
  
  sectionsToProcess.forEach(sectionName => {
    if (tokensData[sectionName]) {
      processSection(tokensData[sectionName], sectionName);
    }
  });
  
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
  
  // Generate the auto-updating tokens.ts
  await generateSimpleTokensTS();
  
  console.log('\n✅ Fixed tokens with proper color resolution built successfully!');
  console.log(`📊 Generated ${cssVariables.length} CSS variables`);
  console.log('📁 Files created:');
  console.log('   - tokens/build/tokens.css');
  console.log('   - tokens/build/tokens.js');
  console.log('   - lib/tokens.ts (auto-generated)');
  
  // Show color tokens specifically
  console.log('\n🎨 Color tokens generated:');
  cssVariables
    .filter(v => v.includes('color-light'))
    .slice(0, 10)
    .forEach(variable => {
      console.log('   ' + variable.trim());
    });
}

async function generateSimpleTokensTS() {
  console.log('🔄 Generating simple tokens.ts...');
  
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
    if (current.startsWith('"') && current.endsWith('"')) {
      return current.slice(1, -1);
    }
    if (current.endsWith('px')) {
      return parseInt(current.replace('px', ''), 10);
    }
  }
  
  return current || fallback || '';
};

// SPACING TOKENS
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
};

// BORDER TOKENS
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
};

// UNIT TOKENS
export const units = {
  2: getToken('unit.mode.1.unit.2', 2) as number,
  4: getToken('unit.mode.1.unit.4', 4) as number,
  8: getToken('unit.mode.1.unit.8', 8) as number,
  10: getToken('unit.mode.1.unit.10', 10) as number,
  12: getToken('unit.mode.1.unit.12', 12) as number,
  14: getToken('unit.mode.1.unit.14', 14) as number,
  16: getToken('unit.mode.1.unit.16', 16) as number,
  18: getToken('unit.mode.1.unit.18', 18) as number,
  20: getToken('unit.mode.1.unit.20', 20) as number,
  24: getToken('unit.mode.1.unit.24', 24) as number,
  26: getToken('unit.mode.1.unit.26', 26) as number,
  28: getToken('unit.mode.1.unit.28', 28) as number,
  32: getToken('unit.mode.1.unit.32', 32) as number,
  36: getToken('unit.mode.1.unit.36', 36) as number,
  40: getToken('unit.mode.1.unit.40', 40) as number,
  48: getToken('unit.mode.1.unit.48', 48) as number,
  56: getToken('unit.mode.1.unit.56', 56) as number,
  64: getToken('unit.mode.1.unit.64', 64) as number,
  72: getToken('unit.mode.1.unit.72', 72) as number,
  80: getToken('unit.mode.1.unit.80', 80) as number,
  88: getToken('unit.mode.1.unit.88', 88) as number,
  96: getToken('unit.mode.1.unit.96', 96) as number,
  104: getToken('unit.mode.1.unit.104', 104) as number,
  112: getToken('unit.mode.1.unit.112', 112) as number,
  120: getToken('unit.mode.1.unit.120', 120) as number,
};

// TYPOGRAPHY TOKENS
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
};

// BREAKPOINT TOKENS
export const breakpoints = {
  s: getToken('layout.mode.1.breakpoint.s', 393) as number,
  m: getToken('layout.mode.1.breakpoint.m', 768) as number,
  l: getToken('layout.mode.1.breakpoint.l', 1024) as number,
  xl: getToken('layout.mode.1.breakpoint.xl', 1440) as number,
};

// COLOR TOKENS - THIS IS WHERE THE MAGIC HAPPENS! 🎨
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
  
  // Button colors - THE KEY ONE FOR YOUR STUDENT LOAN CARD! 🎯
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
};

// TYPOGRAPHY SCALE
export const typography = {
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
};

// SHADOW TOKENS
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

// Debug: Log available tokens in development
if (__DEV__) {
  console.log('🎨 Design Tokens Loaded Successfully!');
  console.log('Button Primary Color:', colors.button.primary);
}
`;

  fs.writeFileSync('lib/tokens.ts', tokensTemplate);
  console.log('✅ Generated lib/tokens.ts with proper color handling');
}

buildTokensWithFixedColors().catch(console.error);