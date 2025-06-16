// components/ui/text.tsx - Enhanced with typography tokens
import * as React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { typography, fontFamily, fontWeight, colors } from '~/lib/tokens';

const TextClassContext = React.createContext<TextStyle | undefined>(undefined);

type TextVariant = 
  | 'textXS' | 'textS' | 'textM' | 'textL' | 'textXL'
  | 'heading2XS' | 'headingXS' | 'headingS' | 'headingM' 
  | 'headingL' | 'headingXL' | 'heading2XL' | 'heading3XL' 
  | 'heading4XL' | 'heading5XL';

type TextProps = React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  className?: string;
  variant?: TextVariant;
  color?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  fontFamily?: 'openSans' | 'rocGrotesk' | 'albertSans';
};

function Text({
  style,
  children,
  className,
  variant = 'textM',
  color = 'primary',
  weight,
  fontFamily: customFontFamily,
  ...props
}: TextProps) {
  const textClassStyle = React.useContext(TextClassContext);
  
  // Get base typography style from variant
  const variantStyle = typography[variant] || typography.textM;
  
  // Override font weight if specified
  const weightStyle = weight ? { fontWeight: fontWeight[weight] } : {};
  
  // Override font family if specified
  const fontFamilyStyle = customFontFamily ? { fontFamily: fontFamily[customFontFamily] } : {};
  
  // Get color style
  const colorStyle = getColorStyle(color);
  
  return (
    <RNText
      style={[
        styles.base,
        variantStyle,
        colorStyle,
        weightStyle,
        fontFamilyStyle,
        textClassStyle,
        style
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

const getColorStyle = (color: TextProps['color']): TextStyle => {
  switch (color) {
    case 'primary':
      return { color: colors.text.primary };
    case 'secondary':
      return { color: colors.text.secondary };
    case 'tertiary':
      return { color: colors.text.tertiary };
    case 'disabled':
      return { color: colors.text.disabled };
    default:
      return { color: colors.text.primary };
  }
};

const styles = StyleSheet.create({
  base: {
    fontFamily: fontFamily.openSans,  // Default to Open Sans from your tokens
    color: colors.text.primary,       // Default to primary text color
  },
});

// Convenience components for common text styles
const Heading = React.forwardRef<RNText, Omit<TextProps, 'variant'> & { size?: 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' }>((
  { size = 'm', ...props }, ref) => {
  const variantMap = {
    'xs': 'headingXS',
    's': 'headingS', 
    'm': 'headingM',
    'l': 'headingL',
    'xl': 'headingXL',
    '2xl': 'heading2XL',
    '3xl': 'heading3XL',
    '4xl': 'heading4XL',
    '5xl': 'heading5XL',
  } as const;
  
  return (
    <Text 
      ref={ref}
      variant={variantMap[size]}
      fontFamily="rocGrotesk"
      {...props} 
    />
  );
});

const Body = React.forwardRef<RNText, Omit<TextProps, 'variant'> & { size?: 'xs' | 's' | 'm' | 'l' | 'xl' }>((
  { size = 'm', ...props }, ref) => {
  const variantMap = {
    'xs': 'textXS',
    's': 'textS',
    'm': 'textM', 
    'l': 'textL',
    'xl': 'textXL',
  } as const;
  
  return (
    <Text 
      ref={ref}
      variant={variantMap[size]}
      fontFamily="openSans"
      {...props} 
    />
  );
});

Heading.displayName = 'Heading';
Body.displayName = 'Body';

export { Text, TextClassContext, Heading, Body };
export type { TextProps };