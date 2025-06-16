// components/ui/alert.tsx - Enhanced with design tokens
import * as React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Text, Body } from './text';
import { 
  spacing, 
  borderRadius, 
  borderWidth,
  typography,
  fontFamily,
  fontWeight,
  colors 
} from '~/lib/tokens';

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

interface AlertProps extends ViewProps {
  variant?: AlertVariant;
  children: React.ReactNode;
}

interface AlertTitleProps {
  children: React.ReactNode;
  style?: any;
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  style?: any;
}

function Alert({ variant = 'default', style, children, ...props }: AlertProps) {
  return (
    <View
      style={[
        styles.base,
        styles[variant],
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

function AlertTitle({ children, style }: AlertTitleProps) {
  return (
    <Text 
      variant="textM"
      weight="semibold"
      fontFamily="rocGrotesk"
      style={[styles.title, style]}
    >
      {children}
    </Text>
  );
}

function AlertDescription({ children, style }: AlertDescriptionProps) {
  return (
    <Body 
      size="s" 
      color="secondary"
      style={[styles.description, style]}
    >
      {children}
    </Body>
  );
}

const getVariantStyles = (variant: AlertVariant) => {
  switch (variant) {
    case 'destructive':
      return {
        backgroundColor: colors.semantic.error + '10', // Adding transparency
        borderColor: colors.semantic.error + '40',
      };
    case 'success':
      return {
        backgroundColor: colors.semantic.success + '10',
        borderColor: colors.semantic.success + '40',
      };
    case 'warning':
      return {
        backgroundColor: colors.semantic.warning + '10',
        borderColor: colors.semantic.warning + '40',
      };
    case 'info':
      return {
        backgroundColor: colors.semantic.info + '10',
        borderColor: colors.semantic.info + '40',
      };
    default:
      return {
        backgroundColor: colors.background.primary,
        borderColor: colors.border.primary,
      };
  }
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.s,        // 8px from your tokens
    borderWidth: borderWidth.xs,         // 1px from your tokens
    padding: spacing.l,                  // 16px from your tokens
    gap: spacing.xs,                     // 4px from your tokens
  },
  
  default: getVariantStyles('default'),
  destructive: getVariantStyles('destructive'),
  success: getVariantStyles('success'),
  warning: getVariantStyles('warning'),
  info: getVariantStyles('info'),
  
  title: {
    marginBottom: spacing.xs,            // 4px from your tokens
  },
  
  description: {
    // Description styles handled by Body component
  },
});

export { Alert, AlertTitle, AlertDescription };
export type { AlertProps };