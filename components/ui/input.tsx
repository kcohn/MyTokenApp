import * as React from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';
import { spacing, borderRadius, borderWidth } from '~/lib/tokens';

interface InputProps extends TextInputProps {
  error?: boolean;
  disabled?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, error, disabled, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[
          styles.input,
          error && styles.error,
          disabled && styles.disabled,
          style,
        ]}
        placeholderTextColor="#71717a"
        editable={!disabled}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    height: 40,                      // Using units[40] equivalent
    width: '100%',
    borderWidth: borderWidth.xs,     // 1px from your tokens
    borderColor: '#e4e4e7',
    borderRadius: borderRadius.xs,   // 4px from your tokens
    backgroundColor: '#ffffff',
    paddingHorizontal: spacing.m,    // 12px from your tokens
    paddingVertical: spacing.s,      // 8px from your tokens
    fontSize: 14,
    color: '#18181b',
    lineHeight: 20,
  },
  error: {
    borderColor: '#ef4444',
  },
  disabled: {
    backgroundColor: '#f4f4f5',
    color: '#71717a',
    opacity: 0.5,
  },
});

export { Input };
export type { InputProps };