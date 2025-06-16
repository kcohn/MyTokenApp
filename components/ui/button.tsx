import * as React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { spacing, borderRadius, borderWidth, units } from '~/lib/tokens';

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

  const textStyle = getTextStyle(variant);

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

const getTextStyle = (variant: ButtonVariant): TextStyle => {
  const baseTextStyle = {
    fontSize: 14, // You can map this to your font size tokens if needed
    fontWeight: '500' as const,
    textAlign: 'center' as const,
  };

  switch (variant) {
    case 'default':
      return { ...baseTextStyle, color: '#fafafa' };
    case 'destructive':
      return { ...baseTextStyle, color: '#fafafa' };
    case 'outline':
      return { ...baseTextStyle, color: '#18181b' };
    case 'secondary':
      return { ...baseTextStyle, color: '#18181b' };
    case 'ghost':
      return { ...baseTextStyle, color: '#18181b' };
    case 'link':
      return { ...baseTextStyle, color: '#2563eb', textDecorationLine: 'underline' };
    default:
      return { ...baseTextStyle, color: '#fafafa' };
  }
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.s,  // 8px from your tokens
    borderWidth: 0,
  },
  defaultSize: {
    height: units[40],              // 40px from your tokens
    paddingHorizontal: spacing.l,   // 16px from your tokens
    paddingVertical: spacing.s,     // 8px from your tokens
  },
  smSize: {
    height: units[32],              // 32px from your tokens
    paddingHorizontal: spacing.m,   // 12px from your tokens
    borderRadius: borderRadius.s,   // 8px from your tokens
  },
  lgSize: {
    height: units[48],              // 48px from your tokens
    paddingHorizontal: spacing['2xl'], // 32px from your tokens
    borderRadius: borderRadius.s,   // 8px from your tokens
  },
  iconSize: {
    height: units[40],              // 40px from your tokens
    width: units[40],               // 40px from your tokens
  },
  default: {
    backgroundColor: '#18181b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  destructive: {
    backgroundColor: '#dc2626',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  outline: {
    borderWidth: borderWidth.xs,    // 1px from your tokens
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
  },
  secondary: {
    backgroundColor: '#f4f4f5',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});

export { Button };
export type { ButtonProps };