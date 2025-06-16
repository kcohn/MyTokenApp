// components/ui/card.tsx - Enhanced with more design tokens
import * as React from 'react';
import { Text, TextProps, View, ViewProps, StyleSheet } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { 
  spacing, 
  borderRadius, 
  borderWidth, 
  typography, 
  fontFamily, 
  fontWeight,
  shadows,
  colors 
} from '~/lib/tokens';

function Card({
  style,
  children,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <View
      style={[styles.card, style]}
      {...props}
    >
      {children}
    </View>
  );
}

function CardHeader({
  style,
  children,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

function CardTitle({
  style,
  children,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
  return (
    <Text
      style={[styles.title, style]}
      {...props}
    >
      {children}
    </Text>
  );
}

function CardDescription({
  style,
  children,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text>;
}) {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
}

function CardContent({
  style,
  children,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <TextClassContext.Provider value={styles.contentText}>
      <View style={[styles.content, style]} {...props}>
        {children}
      </View>
    </TextClassContext.Provider>
  );
}

function CardFooter({
  style,
  children,
  ...props
}: ViewProps & {
  ref?: React.RefObject<View>;
}) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.s,            // 8px from your tokens
    borderWidth: borderWidth.xs,             // 1px from your tokens
    borderColor: colors.border.primary,      // Using your border color tokens
    backgroundColor: colors.background.primary, // Using your background color tokens
    ...shadows.md,                           // Using your medium shadow tokens
  },
  
  header: {
    flexDirection: 'column',
    paddingTop: spacing.xl,                  // 24px from your tokens
    paddingHorizontal: spacing.xl,           // 24px from your tokens
    paddingBottom: spacing.xs,               // 4px from your tokens
  },
  
  title: {
    ...typography.headingS,                  // Using your heading S typography tokens
    fontFamily: fontFamily.rocGrotesk,       // Using your brand font family
    fontWeight: fontWeight.semibold,         // Using your semibold weight token
    color: colors.text.primary,              // Using your primary text color
    marginBottom: spacing.xs,                // 4px from your tokens
  },
  
  description: {
    ...typography.textM,                     // Using your text M typography tokens
    fontFamily: fontFamily.openSans,         // Using Open Sans for body text
    fontWeight: fontWeight.regular,          // Using your regular weight token
    color: colors.text.secondary,            // Using your secondary text color
  },
  
  content: {
    paddingHorizontal: spacing.xl,           // 24px from your tokens
    paddingTop: spacing.s,                   // 8px from your tokens
    paddingBottom: spacing.xl,               // 24px from your tokens
  },
  
  contentText: {
    ...typography.textM,                     // Using your text M typography tokens
    fontFamily: fontFamily.openSans,         // Using Open Sans for content
    fontWeight: fontWeight.regular,          // Using your regular weight token
    color: colors.text.primary,              // Using your primary text color
  },
  
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,                          // 8px gap using your tokens
    paddingHorizontal: spacing.xl,           // 24px from your tokens
    paddingTop: 0,
    paddingBottom: spacing.xl,               // 24px from your tokens
  },
});

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };