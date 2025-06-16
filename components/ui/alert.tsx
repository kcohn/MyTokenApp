import * as React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Text } from './text';
import { spacing, borderRadius, borderWidth } from '~/lib/tokens';

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning';

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
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
}

function AlertDescription({ children, style }: AlertDescriptionProps) {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.s,     // 8px from your tokens
    borderWidth: borderWidth.xs,      // 1px from your tokens
    padding: spacing.l,               // 16px from your tokens
    gap: spacing.xs,                  // 4px from your tokens
  },
  default: {
    backgroundColor: '#ffffff',
    borderColor: '#e4e4e7',
  },
  destructive: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  success: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  warning: {
    backgroundColor: '#fffbeb',
    borderColor: '#fed7aa',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#18181b',
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },
});

export { Alert, AlertTitle, AlertDescription };
export type { AlertProps };