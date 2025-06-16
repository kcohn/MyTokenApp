import * as React from 'react';
import { ScrollView, View, StyleSheet, Alert as RNAlert } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { spacing, borderRadius, borderWidth } from '~/lib/tokens';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

export default function ShadcnDemoScreen() {
  return (
    <>
      <Stack.Screen options={{ 
        title: '🎨 shadcn/ui Components Demo',
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#18181b',
      }} />
      <ScrollView style={styles.container}>
        
        {/* Buttons Section */}
        <Section title="🔘 Buttons">
          <View style={styles.buttonContainer}>
            <Button variant="default">
              <Text>Default</Text>
            </Button>
            <Button variant="destructive">
              <Text>Destructive</Text>
            </Button>
            <Button variant="outline">
              <Text>Outline</Text>
            </Button>
            <Button variant="secondary">
              <Text>Secondary</Text>
            </Button>
            <Button variant="ghost">
              <Text>Ghost</Text>
            </Button>
          </View>
        </Section>

        {/* Cards Section */}
        <Section title="📋 Cards">
          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui Style Components</CardTitle>
              <CardDescription>
                React Native components built with your design tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text>
                These components are styled using your Figma design tokens from Token Studio. 
                All spacing, borders, and sizing come directly from your design system.
              </Text>
            </CardContent>
            <CardFooter style={{ gap: spacing.s }}>
              <Button 
                variant="outline" 
                style={{ flex: 1 }}
                onPress={() => RNAlert.alert('Success', 'Components working!')}
              >
                <Text>Test Alert</Text>
              </Button>
              <Button 
                style={{ flex: 1 }}
                onPress={() => RNAlert.alert('Info', 'Using your design tokens!')}
              >
                <Text>Show Tokens</Text>
              </Button>
            </CardFooter>
          </Card>
        </Section>

        {/* Token Integration Display */}
        <Section title="🎨 Token Integration">
          <View style={styles.tokenDisplay}>
            <Text style={styles.tokenTitle}>Design System Connected</Text>
            <Text style={styles.tokenDescription}>
              ✅ Using your Figma design tokens:
              {'\n'}• Spacing L: {spacing.l}px
              {'\n'}• Spacing XL: {spacing.xl}px
              {'\n'}• Spacing S: {spacing.s}px
              {'\n'}• All values from your Token Studio export
            </Text>
          </View>
        </Section>

        {/* Coming Soon */}
        <Section title="🚀 Coming Soon">
          <Card>
            <CardHeader>
              <CardTitle>More Components</CardTitle>
              <CardDescription>Additional shadcn/ui components coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>
                • Input fields with validation
                {'\n'}• Badges and status indicators  
                {'\n'}• Switches and checkboxes
                {'\n'}• Alert messages
                {'\n'}• Form labels
                {'\n'}• Separators and dividers
              </Text>
            </CardContent>
          </Card>
        </Section>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  section: {
    padding: spacing.l,               // 16px from your tokens
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: spacing.l,          // 16px from your tokens
  },
  sectionContent: {
    gap: spacing.l,                   // 16px from your tokens
  },
  buttonContainer: {
    gap: spacing.s,                   // 8px from your tokens
  },
  tokenDisplay: {
    backgroundColor: '#f8fafc',
    padding: spacing.l,               // 16px from your tokens
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tokenTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: spacing.s,          // 8px from your tokens
  },
  tokenDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});