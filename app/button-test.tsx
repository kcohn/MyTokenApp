// app/button-test.tsx
import React, { useState } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { TokenButton, TokenButtonCSS } from '~/components/ui/token-button';

export default function ButtonTest() {
  const [loading, setLoading] = useState(false);

  const handlePress = (buttonType: string) => {
    Alert.alert('Button Pressed', `You pressed the ${buttonType} button!`);
  };

  const handleLoadingTest = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Loading completed!');
    }, 2000);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1e293b' }}>
          Token Studio Button Test
        </Text>
        
        <Text style={{ fontSize: 16, color: '#64748b', marginBottom: 24 }}>
          Buttons using Token Studio design tokens
        </Text>

        {/* Standard Token Button */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1e293b' }}>
            Standard Token Button
          </Text>
          
          <View style={{ gap: 12 }}>
            <TokenButton 
              variant="primary"
              onPress={() => handlePress('Primary')}
            >
              Primary Button
            </TokenButton>

            <TokenButton 
              variant="secondary"
              onPress={() => handlePress('Secondary')}
            >
              Secondary Button
            </TokenButton>

            <TokenButton 
              variant="tertiary"
              onPress={() => handlePress('Tertiary')}
            >
              Tertiary Button
            </TokenButton>

            <TokenButton 
              variant="outline"
              onPress={() => handlePress('Outline')}
            >
              Outline Button
            </TokenButton>

            <TokenButton 
              variant="ghost"
              onPress={() => handlePress('Ghost')}
            >
              Ghost Button
            </TokenButton>
          </View>
        </View>

        {/* CSS Variables Token Button */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1e293b' }}>
            CSS Variables Token Button
          </Text>
          
          <View style={{ gap: 12 }}>
            <TokenButtonCSS 
              variant="primary"
              onPress={() => handlePress('CSS Primary')}
            >
              CSS Variables Button
            </TokenButtonCSS>

            <TokenButtonCSS 
              variant="outline"
              size="lg"
              onPress={() => handlePress('CSS Large Outline')}
            >
              Large Outline Button
            </TokenButtonCSS>
          </View>
        </View>

        {/* Button Sizes */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1e293b' }}>
            Button Sizes
          </Text>
          
          <View style={{ gap: 12 }}>
            <TokenButton size="sm" onPress={() => handlePress('Small')}>
              Small Button
            </TokenButton>
            
            <TokenButton size="md" onPress={() => handlePress('Medium')}>
              Medium Button
            </TokenButton>
            
            <TokenButton size="lg" onPress={() => handlePress('Large')}>
              Large Button
            </TokenButton>
            
            <TokenButton size="xl" onPress={() => handlePress('Extra Large')}>
              Extra Large Button
            </TokenButton>
          </View>
        </View>

        {/* Button States */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1e293b' }}>
            Button States
          </Text>
          
          <View style={{ gap: 12 }}>
            <TokenButton 
              loading={loading}
              onPress={handleLoadingTest}
            >
              {loading ? 'Loading...' : 'Test Loading State'}
            </TokenButton>
            
            <TokenButton 
              disabled
              onPress={() => handlePress('Disabled')}
            >
              Disabled Button
            </TokenButton>
            
            <TokenButton 
              fullWidth
              variant="primary"
              onPress={() => handlePress('Full Width')}
            >
              Full Width Button
            </TokenButton>
          </View>
        </View>

        {/* Token Information */}
        <View style={{ backgroundColor: '#f8fafc', padding: 16, borderRadius: 8, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1e293b' }}>
            Token Studio Integration
          </Text>
          
          <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 20 }}>
            These buttons use CSS variables generated from your Token Studio export:
            {'\n'}• Spacing: var(--spacing-mode-1-space-*)
            {'\n'}• Fonts: var(--global-fontfamilies-*)
            {'\n'}• Font Sizes: var(--global-fontsize-*)
            {'\n'}• Shadows: var(--global-shadow-*)
            {'\n'}• Border Radius: var(--border-mode-1-radius-*)
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}