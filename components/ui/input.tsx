// components/ui/input.tsx - Enhanced with design tokens
import * as React from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';
import { 
  spacing, 
  borderRadius, 
  borderWidth, 
  units,
  typography, 
  fontFamily, 
  fontWeight,
  colors 
} from '~/lib/tokens';

type InputSize = 'sm' | 'default' | 'lg';

interface InputProps extends TextInputProps {
  error?: boolean;
  disabled?: boolean;
  size?: InputSize;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, error, disabled, size = 'default', ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[
          styles.input,
          styles[`${size}Size`],
          error && styles.error,
          disabled && styles.disabled,
          style,
        ]}
        placeholderTextColor={colors.text.tertiary}
        editable={!disabled}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: borderWidth.xs,             // 1px from your tokens
    borderColor: colors.border.primary,      // Using your border color tokens
    borderRadius: borderRadius.xs,           // 4px from your tokens
    backgroundColor: colors.background.primary, // Using your background tokens
    ...typography.textM,                     // Using your text M typography
    fontFamily: fontFamily.openSans,         // Using your Open Sans font
    fontWeight: fontWeight.regular,          // Using your regular weight
    color: colors.text.primary,              // Using your primary text color
  },
  
  // Size variants using your spacing and unit tokens
  smSize: {
    height: units[32],                       // 32px from your tokens
    paddingHorizontal: spacing.s,            // 8px from your tokens
    paddingVertical: spacing.xs,             // 4px from your tokens
    ...typography.textS,                     // Smaller text for small inputs
  },
  
  defaultSize: {
    height: units[40],                       // 40px from your tokens
    paddingHorizontal: spacing.m,            // 12px from your tokens
    paddingVertical: spacing.s,              // 8px from your tokens
  },
  
  lgSize: {
    height: units[48],                       // 48px from your tokens
    paddingHorizontal: spacing.l,            // 16px from your tokens
    paddingVertical: spacing.m,              // 12px from your tokens
    ...typography.textL,                     // Larger text for large inputs
  },
  
  // States using your color tokens
  error: {
    borderColor: colors.semantic.error,      // Using your error color
    borderWidth: borderWidth.s,              // Slightly thicker border for errors
  },
  
  disabled: {
    backgroundColor: colors.background.secondary, // Using your secondary background
    color: colors.text.disabled,             // Using your disabled text color
    opacity: 0.6,
  },
});

export { Input };
export type { InputProps };