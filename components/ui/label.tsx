import * as React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface LabelProps extends TextProps {
  required?: boolean;
  disabled?: boolean;
}

function Label({ style, required, disabled, children, ...props }: LabelProps) {
  return (
    <Text
      style={[
        styles.label,
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#18181b',
    lineHeight: 20,
  },
  disabled: {
    color: '#71717a',
    opacity: 0.7,
  },
  required: {
    color: '#ef4444',
    fontWeight: '500',
  },
});

export { Label };
export type { LabelProps };