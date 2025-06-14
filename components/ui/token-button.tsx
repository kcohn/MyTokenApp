// components/ui/token-button.tsx
import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';

interface TokenButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  fullWidth?: boolean;
}

export function TokenButton({ 
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  fullWidth = false,
}: TokenButtonProps) {
  
  // Base styles using your Token Studio tokens
  const baseStyles = {
    borderRadius: 8, // Will use var(--border-mode-1-radius-s) when available
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexDirection: 'row' as const,
    gap: 8,
  };

  // Size variants using your Token Studio spacing tokens
  const sizeStyles = {
    sm: {
      paddingVertical: 4,    // var(--spacing-mode-1-space-2xs)
      paddingHorizontal: 8,  // var(--spacing-mode-1-space-xs)
      minHeight: 32,
    },
    md: {
      paddingVertical: 8,    // var(--spacing-mode-1-space-xs)
      paddingHorizontal: 12, // var(--spacing-mode-1-space-s)
      minHeight: 40,
    },
    lg: {
      paddingVertical: 12,   // var(--spacing-mode-1-space-s)
      paddingHorizontal: 16, // var(--spacing-mode-1-space-m)
      minHeight: 48,
    },
    xl: {
      paddingVertical: 16,   // var(--spacing-mode-1-space-m)
      paddingHorizontal: 24, // var(--spacing-mode-1-space-l)
      minHeight: 56,
    },
  };

  // Variant styles - these will use your Token Studio color tokens when generated
  const variantStyles = {
    primary: {
      backgroundColor: '#3b82f6', // Fallback, will be overridden by CSS variables
      borderColor: '#3b82f6',
      // In CSS: background-color: var(--color-light-button-button-primary);
    },
    secondary: {
      backgroundColor: '#64748b',
      borderColor: '#64748b',
    },
    tertiary: {
      backgroundColor: '#f1f5f9',
      borderColor: '#f1f5f9',
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: '#e2e8f0',
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  };

  // Text colors for each variant
  const textColors = {
    primary: '#ffffff',
    secondary: '#ffffff', 
    tertiary: '#1e293b',
    outline: '#1e293b',
    ghost: '#1e293b',
  };

  // Font sizes using your Token Studio typography tokens
  const textSizes = {
    sm: 10,  // var(--global-fontsize-26)
    md: 14,  // var(--global-fontsize-9)
    lg: 16,  // var(--global-fontsize-8)
    xl: 20,  // var(--global-fontsize-7)
  };

  // Disabled styling
  const disabledStyles = {
    backgroundColor: '#f1f5f9',
    borderColor: '#f1f5f9',
    opacity: 0.6,
  };

  const disabledTextColor = '#94a3b8';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        baseStyles,
        sizeStyles[size],
        isDisabled ? disabledStyles : variantStyles[variant],
        fullWidth && { width: '100%' },
        // Add pressed state with Token Studio shadow
        pressed && !isDisabled && {
          opacity: 0.8,
          transform: [{ scale: 0.98 }],
          // Will use: boxShadow: var(--global-shadow-l1)
        },
        style,
      ]}
      disabled={isDisabled}
    >
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={isDisabled ? disabledTextColor : textColors[variant]}
        />
      )}
      
      <Text
        style={{
          fontSize: textSizes[size],
          fontWeight: '600',
          color: isDisabled ? disabledTextColor : textColors[variant],
          // Will use: fontFamily: var(--global-fontfamilies-open-sans)
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

// Enhanced version that uses CSS variables directly
export function TokenButtonCSS({ 
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  fullWidth = false,
}: TokenButtonProps) {
  
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        // Base styles using Token Studio CSS variables
        {
          borderRadius: 'var(--border-mode-1-radius-s, 8px)',
          borderWidth: 1,
          borderColor: 'transparent',
          alignItems: 'center' as const,
          justifyContent: 'center' as const,
          flexDirection: 'row' as const,
          
          // Size-specific styles using Token Studio spacing
          paddingVertical: size === 'sm' ? 'var(--spacing-mode-1-space-2xs, 4px)' :
                          size === 'md' ? 'var(--spacing-mode-1-space-xs, 8px)' :
                          size === 'lg' ? 'var(--spacing-mode-1-space-s, 12px)' :
                          'var(--spacing-mode-1-space-m, 16px)',
          
          paddingHorizontal: size === 'sm' ? 'var(--spacing-mode-1-space-xs, 8px)' :
                            size === 'md' ? 'var(--spacing-mode-1-space-s, 12px)' :
                            size === 'lg' ? 'var(--spacing-mode-1-space-m, 16px)' :
                            'var(--spacing-mode-1-space-l, 24px)',
          
          minHeight: size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 48 : 56,
          
          // Variant-specific background colors (fallbacks until we have actual color tokens)
          backgroundColor: variant === 'primary' ? '#3b82f6' :
                          variant === 'secondary' ? '#64748b' :
                          variant === 'tertiary' ? '#f1f5f9' :
                          'transparent',
          
          borderColor: variant === 'outline' ? '#e2e8f0' :
                      variant === 'ghost' ? 'transparent' :
                      variant === 'primary' ? '#3b82f6' :
                      variant === 'secondary' ? '#64748b' :
                      '#f1f5f9',
        },
        
        // Full width
        fullWidth && { width: '100%' },
        
        // Pressed state with Token Studio shadow
        pressed && !isDisabled && {
          opacity: 0.8,
          transform: [{ scale: 0.98 }],
          boxShadow: 'var(--global-shadow-l1, 0 2px 4px rgba(0,0,0,0.1))',
        },
        
        // Disabled state
        isDisabled && {
          backgroundColor: '#f1f5f9',
          borderColor: '#f1f5f9',
          opacity: 0.6,
        },
        
        style,
      ]}
      disabled={isDisabled}
    >
      {loading && (
        <View style={{ marginRight: 8 }}>
          <ActivityIndicator 
            size="small" 
            color={isDisabled ? '#94a3b8' : variant === 'tertiary' || variant === 'outline' || variant === 'ghost' ? '#1e293b' : '#ffffff'}
          />
        </View>
      )}
      
      <Text
        style={{
          fontSize: size === 'sm' ? 'var(--global-fontsize-26, 10px)' :
                   size === 'md' ? 'var(--global-fontsize-9, 14px)' :
                   size === 'lg' ? 'var(--global-fontsize-8, 16px)' :
                   'var(--global-fontsize-7, 20px)',
          
          fontFamily: 'var(--global-fontfamilies-open-sans, system-ui)',
          fontWeight: '600',
          
          color: isDisabled ? '#94a3b8' :
                variant === 'tertiary' || variant === 'outline' || variant === 'ghost' ? '#1e293b' :
                '#ffffff',
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}