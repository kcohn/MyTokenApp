import * as React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Text } from './text';
import { spacing, borderRadius } from '~/lib/tokens';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success';

interface BadgeProps extends ViewProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

function Badge({ variant = 'default', style, children, ...props }: BadgeProps) {
  const badgeStyle = [
    styles.base,
    styles[variant],
    style,
  ];

  const textStyle = getTextStyle(variant);

  return (
    <View style={badgeStyle} {...props}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}

const getTextStyle = (variant: BadgeVariant) => {
  const baseStyle = {
    fontSize: 12,
    fontWeight: '500' as const,
    textAlign: 'center' as const,
  };

  switch (variant) {
    case 'default':
      return { ...baseStyle, color: '#fafafa' };
    case 'secondary':
      return { ...baseStyle, color: '#18181b' };
    case 'destructive':
      return { ...baseStyle, color: '#fafafa' };
    case 'outline':
      return { ...baseStyle, color: '#18181b' };
    case 'success':
      return { ...baseStyle, color: '#fafafa' };
    default:
      return { ...baseStyle, color: '#fafafa' };
  }
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.xs,    // 4px from your tokens
    paddingHorizontal: spacing.xs,    // 4px from your tokens (tight padding)
    paddingVertical: 2,               // Very tight vertical padding
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: '#18181b',
  },
  secondary: {
    backgroundColor: '#f4f4f5',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  success: {
    backgroundColor: '#22c55e',
  },
});

export { Badge };
export type { BadgeProps };