// tokens/build-tokens.mjs
import fs from 'fs';

async function buildFixedTokens() {
  console.log('🎨 Building design tokens (fixed version)...');
  
  const tokensData = JSON.parse(fs.readFileSync('tokens/tokens.json', 'utf8'));
  const cssVariables = [];
  const jsTokens = {};
  
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
          // This is a token with direct value (no references)
          if (typeof value.$value === 'string' && value.$value.includes('{')) {
            console.log(`⚠️ Skipping token with reference: ${pathArray.join('.')}.${key}`);
            continue;
          }
          
          // Generate a clean token name - FIXED VERSION
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
          
          let cssValue = value.$value;
          
          // Process different token types
          switch (value.$type) {
            case 'boxShadow':
              if (Array.isArray(cssValue)) {
                cssValue = cssValue.map(shadow => 
                  `${shadow.x || 0}px ${shadow.y || 0}px ${shadow.blur || 0}px ${shadow.spread || 0}px ${shadow.color || '#000000'}`
                ).join(', ');
              }
              break;
              
            case 'fontFamilies':
              cssValue = `"${cssValue}"`;
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
              
            case 'text':
              // For text tokens, keep as-is but add quotes for font families
              if (pathArray.some(part => part.includes('family'))) {
                cssValue = `"${cssValue}"`;
              }
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
  
  console.log('✅ Fixed tokens built successfully!');
  console.log(`📊 Generated ${cssVariables.length} CSS variables`);
  console.log('📁 Files created:');
  console.log('   - tokens/build/tokens.css');
  console.log('   - tokens/build/tokens.js');
  
  // Show a sample of what was generated
  console.log('\n🎯 Sample generated variables:');
  cssVariables.slice(0, 10).forEach(variable => {
    console.log('   ' + variable.trim());
  });
  if (cssVariables.length > 10) {
    console.log(`   ... and ${cssVariables.length - 10} more`);
  }
}

buildFixedTokens().catch(console.error);