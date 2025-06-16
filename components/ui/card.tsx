import * as React from 'react';
import { Text, TextProps, View, ViewProps, StyleSheet } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { spacing, borderRadius, borderWidth } from '~/lib/tokens';

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
    borderRadius: borderRadius.s,    // 8px from your tokens
    borderWidth: borderWidth.xs,     // 1px from your tokens
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'column',
    paddingTop: spacing.xl,          // 24px from your tokens
    paddingHorizontal: spacing.xl,   // 24px from your tokens
    paddingBottom: spacing.xs,       // 4px from your tokens (reduced spacing)
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#18181b',
    lineHeight: 24,
    marginBottom: spacing.xs,        // 4px from your tokens
  },
  description: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: spacing.xl,   // 24px from your tokens
    paddingTop: 0,
    paddingBottom: spacing.xl,       // 24px from your tokens
  },
  contentText: {
    color: '#18181b',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,   // 24px from your tokens
    paddingTop: 0,
    paddingBottom: spacing.xl,       // 24px from your tokens
  },
});

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };