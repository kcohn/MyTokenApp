import * as React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { borderWidth } from '~/lib/tokens';

interface SeparatorProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
}

function Separator({ 
  orientation = 'horizontal', 
  style, 
  ...props 
}: SeparatorProps) {
  return (
    <View
      style={[
        styles.base,
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#e4e4e7',
  },
  horizontal: {
    height: borderWidth.xs,           // 1px from your tokens
    width: '100%',
  },
  vertical: {
    width: borderWidth.xs,            // 1px from your tokens
    height: '100%',
  },
});

export { Separator };
export type { SeparatorProps };