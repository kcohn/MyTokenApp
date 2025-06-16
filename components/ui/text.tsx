import * as React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

const TextClassContext = React.createContext<TextStyle | undefined>(undefined);

function Text({
  style,
  children,
  className, // Keep for compatibility
  ...props
}: React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  className?: string;
}) {
  const textClassStyle = React.useContext(TextClassContext);
  
  return (
    <RNText
      style={[styles.base, textClassStyle, style]}
      {...props}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    color: '#18181b',
    lineHeight: 24,
  },
});

export { Text, TextClassContext };