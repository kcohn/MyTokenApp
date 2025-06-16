// components/ui/button.tsx - Enhanced with more design tokens
import * as React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { 
  spacing, 
  borderRadius, 
  borderWidth, 
  units, 
  typography, 
  fontFamily, 
  fontWeight,
  shadows,
  colors 
} from '~/lib/tokens';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

type ButtonProps = React.ComponentProps<typeof Pressable> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string; // Keep for compatibility
};

function Button({ 
  variant = 'default', 
  size = 'default', 
  style, 
  disabled, 
  className,
  ...props 
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant] || styles.default,
    styles[`${size}Size`] || styles.defaultSize,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = getTextStyle(variant, size);

  return (
    <TextClassContext.Provider value={textStyle}>
      <Pressable
        style={({ pressed }) => [
          buttonStyle,
          pressed && styles.pressed,
        ]}
        disabled={disabled}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

const getTextStyle = (variant: ButtonVariant, size: ButtonSize): TextStyle => {
  // Base text style using your typography tokens
  const baseTextStyle = {
    ...typography.textM,                // Uses your font size and line height tokens
    fontFamily: fontFamily.rocGrotesk,  // Uses your Roc Grotesk font family token
    fontWeight: fontWeight.medium,      // Uses your medium font weight token
    textAlign: 'center' as const,
  };

  // Adjust font size based on button size using your units
  let sizeStyle = {};
  switch (size) {
    case 'sm':
      sizeStyle = {
        ...typography.textS,            // Smaller text style from your tokens
      };
      break;
    case 'lg':
      sizeStyle = {
        ...typography.textL,            // Larger text style from your tokens
      };
      break;
    default:
      sizeStyle = {
        ...typography.textM,            // Default text style from your tokens
      };
  }

  // Color based on variant
  let colorStyle = {};
  switch (variant) {
    case 'default':
      colorStyle = { color: colors.background.primary };      // White text
      break;
    case 'destructive':
      colorStyle = { color: colors.background.primary };      // White text
      break;
    case 'outline':
      colorStyle = { color: colors.text.primary };            // Dark text
      break;
    case 'secondary':
      colorStyle = { color: colors.text.primary };            // Dark text
      break;
    case 'ghost':
      colorStyle = { color: colors.text.primary };            // Dark text
      break;
    case 'link':
      colorStyle = { 
        color: colors.semantic.info,                          // Blue text
        textDecorationLine: 'underline' as const,
      };
      break;
    default:
      colorStyle = { color: colors.background.primary };      // White text
  }

  return {
    ...baseTextStyle,
    ...sizeStyle,
    ...colorStyle,
  };
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.s,       // 8px from your tokens
    borderWidth: 0,
    fontFamily: fontFamily.rocGrotesk,  // Your brand font
  },
  
  // Size variants using your spacing and unit tokens
  defaultSize: {
    height: units[40],                  // 40px from your tokens
    paddingHorizontal: spacing.l,       // 16px from your tokens
    paddingVertical: spacing.s,         // 8px from your tokens
    minWidth: units[64],               // Minimum width for better touch targets
  },
  smSize: {
    height: units[32],                  // 32px from your tokens
    paddingHorizontal: spacing.m,       // 12px from your tokens
    paddingVertical: spacing.xs,        // 4px from your tokens
    borderRadius: borderRadius.xs,      // 4px from your tokens (smaller radius for small buttons)
    minWidth: units[48],               // Smaller minimum width
  },
  lgSize: {
    height: units[48],                  // 48px from your tokens
    paddingHorizontal: spacing['2xl'],  // 32px from your tokens
    paddingVertical: spacing.m,         // 12px from your tokens
    borderRadius: borderRadius.m,       // 12px from your tokens (larger radius for large buttons)
    minWidth: units[80],               // Larger minimum width
  },
  iconSize: {
    height: units[40],                  // 40px from your tokens
    width: units[40],                   // 40px from your tokens
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  // Visual variants using your color and shadow tokens
  default: {
    backgroundColor: colors.brand.primary,  // Using your brand primary color
    ...shadows.sm,                          // Using your shadow tokens
  },
  destructive: {
    backgroundColor: colors.semantic.error, // Using your semantic error color
    ...shadows.sm,
  },
  outline: {
    borderWidth: borderWidth.xs,            // 1px from your tokens
    borderColor: colors.border.primary,     // Using your border color
    backgroundColor: colors.background.primary,
  },
  secondary: {
    backgroundColor: colors.background.secondary, // Using your background secondary
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.xs,          // Less padding for links
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],           // Subtle press feedback
  },
});

export { Button };
export type { ButtonProps };