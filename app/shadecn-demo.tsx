// app/shadcn-demo.tsx - Enhanced with more design tokens
import * as React from 'react';
import { ScrollView, View, StyleSheet, Alert as RNAlert } from 'react-native';
import { Stack } from 'expo-router';
import { Text, Heading, Body } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '~/components/ui/alert';
import { Badge } from '~/components/ui/badge';
import { Switch } from '~/components/ui/switch';
import { Checkbox } from '~/components/ui/checkbox';
import { 
  spacing, 
  borderRadius, 
  borderWidth,
  units,
  typography,
  fontFamily,
  fontWeight,
  shadows,
  colors,
  breakpoints
} from '~/lib/tokens';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Heading size="m" style={styles.sectionTitle}>{title}</Heading>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

export default function ShadcnDemoScreen() {
  const [switchValue, setSwitchValue] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <>
      <Stack.Screen options={{ 
        title: '🎨 Design System Showcase',
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#18181b',
      }} />
      <ScrollView style={styles.container}>
        
        {/* Typography Section */}
        <Section title="📝 Typography Scale">
          <View style={styles.typographyGrid}>
            <View style={styles.typographyItem}>
              <Text variant="textXS" color="tertiary">Heading 5XL</Text>
              <Heading size="5xl">The Future</Heading>
            </View>
            <View style={styles.typographyItem}>
              <Text variant="textXS" color="tertiary">Heading 2XL</Text>
              <Heading size="2xl">Design System</Heading>
            </View>
            <View style={styles.typographyItem}>
              <Text variant="textXS" color="tertiary">Heading L</Text>
              <Heading size="l">Component Library</Heading>
            </View>
            <View style={styles.typographyItem}>
              <Text variant="textXS" color="tertiary">Body L</Text>
              <Text variant="textL">This is body large text using your design tokens for consistent typography across the application.</Text>
            </View>
            <View style={styles.typographyItem}>
              <Text variant="textXS" color="tertiary">Body M</Text>
              <Text variant="textM">This is body medium text using Open Sans from your font family tokens.</Text>
            </View>
            <View style={styles.typographyItem}>
              <Text variant="textXS" color="tertiary">Body S</Text>
              <Text variant="textS" color="secondary">This is body small text with secondary color.</Text>
            </View>
          </View>
        </Section>

        {/* Button Variants */}
        <Section title="🔘 Button Variants & Sizes">
          <View style={styles.buttonGrid}>
            <View style={styles.buttonRow}>
              <Text variant="textS" color="tertiary" style={styles.label}>Sizes:</Text>
              <Button size="sm" variant="default">
                <Text>Small</Text>
              </Button>
              <Button size="default" variant="default">
                <Text>Default</Text>
              </Button>
              <Button size="lg" variant="default">
                <Text>Large</Text>
              </Button>
            </View>
            
            <View style={styles.buttonRow}>
              <Text variant="textS" color="tertiary" style={styles.label}>Variants:</Text>
              <Button variant="default">
                <Text>Primary</Text>
              </Button>
              <Button variant="outline">
                <Text>Outline</Text>
              </Button>
              <Button variant="ghost">
                <Text>Ghost</Text>
              </Button>
            </View>
          </View>
        </Section>

        {/* Form Components */}
        <Section title="📋 Form Components">
          <View style={styles.formGrid}>
            <View style={styles.formRow}>
              <Text variant="textS" weight="medium" style={styles.formLabel}>Input Sizes:</Text>
              <Input 
                size="sm" 
                placeholder="Small input" 
                value={inputValue}
                onChangeText={setInputValue}
              />
              <Input 
                size="default" 
                placeholder="Default input using your tokens" 
              />
              <Input 
                size="lg" 
                placeholder="Large input" 
              />
            </View>
            
            <View style={styles.formRow}>
              <Text variant="textS" weight="medium" style={styles.formLabel}>Controls:</Text>
              <View style={styles.controlsRow}>
                <Switch 
                  checked={switchValue} 
                  onCheckedChange={setSwitchValue} 
                />
                <Text variant="textS">Toggle Switch</Text>
              </View>
              <View style={styles.controlsRow}>
                <Checkbox 
                  checked={checkboxValue} 
                  onCheckedChange={setCheckboxValue} 
                />
                <Text variant="textS">Checkbox Control</Text>
              </View>
            </View>
          </View>
        </Section>

        {/* Alerts */}
        <Section title="⚠️ Alert Components">
          <View style={styles.alertGrid}>
            <Alert variant="info">
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This info alert uses your semantic color tokens and spacing.
              </AlertDescription>
            </Alert>
            
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Operation completed successfully using your design system.
              </AlertDescription>
            </Alert>
            
            <Alert variant="warning">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please review this important information.
              </AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Check your input and try again.
              </AlertDescription>
            </Alert>
          </View>
        </Section>

        {/* Badges */}
        <Section title="🏷️ Badge Components">
          <View style={styles.badgeGrid}>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="destructive">Error</Badge>
          </View>
        </Section>

        {/* Cards */}
        <Section title="📋 Card Layouts">
          <Card>
            <CardHeader>
              <CardTitle>Token-Powered Design</CardTitle>
              <CardDescription>
                Components built with your Figma design tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text variant="textM">
                Every component uses your design tokens:
              </Text>
              <View style={styles.tokenList}>
                <Text variant="textS" color="secondary">• Spacing: {spacing.l}px, {spacing.xl}px, {spacing['2xl']}px</Text>
                <Text variant="textS" color="secondary">• Border Radius: {borderRadius.xs}px to {borderRadius.l}px</Text>
                <Text variant="textS" color="secondary">• Typography: {fontFamily.rocGrotesk} & {fontFamily.openSans}</Text>
                <Text variant="textS" color="secondary">• Units: {units[16]}px to {units[96]}px sizing</Text>
              </View>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <Button 
                variant="outline" 
                style={styles.cardButton}
                onPress={() => RNAlert.alert('Token Info', `Using ${Object.keys(spacing).length} spacing tokens!`)}
              >
                <Text>View Token Count</Text>
              </Button>
              <Button 
                style={styles.cardButton}
                onPress={() => RNAlert.alert('Design System', 'Consistent, scalable, maintainable!')}
              >
                <Text>Learn More</Text>
              </Button>
            </CardFooter>
          </Card>
        </Section>

        {/* Design Token Showcase */}
        <Section title="🎨 Design Token Values">
          <View style={styles.tokenShowcase}>
            <Heading size="s" style={styles.showcaseTitle}>Live Token Values</Heading>
            <View style={styles.tokenGrid}>
              <View style={styles.tokenItem}>
                <Text variant="textXS" color="tertiary">Font Family</Text>
                <Text variant="textS" weight="medium">{fontFamily.rocGrotesk}</Text>
              </View>
              <View style={styles.tokenItem}>
                <Text variant="textXS" color="tertiary">Spacing XL</Text>
                <Text variant="textS" weight="medium">{spacing.xl}px</Text>
              </View>
              <View style={styles.tokenItem}>
                <Text variant="textXS" color="tertiary">Border Radius</Text>
                <Text variant="textS" weight="medium">{borderRadius.s}px</Text>
              </View>
              <View style={styles.tokenItem}>
                <Text variant="textXS" color="tertiary">Unit 48</Text>
                <Text variant="textS" weight="medium">{units[48]}px</Text>
              </View>
            </View>
          </View>
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
    padding: spacing.l,
    borderBottomWidth: borderWidth.xs,
    borderBottomColor: '#e4e4e7',
  },
  
  sectionTitle: {
    marginBottom: spacing.l,
    color: '#18181b',
  },
  
  sectionContent: {
    gap: spacing.l,
  },
  
  typographyGrid: {
    gap: spacing.xl,
  },
  
  typographyItem: {
    gap: spacing.xs,
  },
  
  buttonGrid: {
    gap: spacing.l,
  },
  
  buttonRow: {
    gap: spacing.s,
    alignItems: 'center',
  },
  
  label: {
    minWidth: units[64],
  },
  
  formGrid: {
    gap: spacing.l,
  },
  
  formRow: {
    gap: spacing.s,
  },
  
  formLabel: {
    marginBottom: spacing.xs,
    color: '#18181b',
  },
  
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  
  alertGrid: {
    gap: spacing.s,
  },
  
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
  },
  
  cardFooter: {
    flexDirection: 'row',
    gap: spacing.s,
  },
  
  cardButton: {
    flex: 1,
  },
  
  tokenList: {
    marginTop: spacing.s,
    gap: spacing.xs,
  },
  
  tokenShowcase: {
    padding: spacing.l,
    backgroundColor: '#f4f4f5',
    borderRadius: borderRadius.s,
    borderWidth: borderWidth.xs,
    borderColor: '#e4e4e7',
  },
  
  showcaseTitle: {
    textAlign: 'center',
    marginBottom: spacing.l,
    color: '#18181b',
  },
  
  tokenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.l,
    justifyContent: 'space-between',
  },
  
  tokenItem: {
    flex: 1,
    minWidth: units[72],
    alignItems: 'center',
    gap: spacing.xs,
  },
});