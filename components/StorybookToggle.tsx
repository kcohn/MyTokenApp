import React from 'react';
import { Button } from './ui/button';
import { Text } from './ui/text';

interface StorybookToggleProps {
  onToggle: () => void;
  isStorybookMode: boolean;
}

export function StorybookToggle({ onToggle, isStorybookMode }: StorybookToggleProps) {
  return (
    <Button 
      variant="outline" 
      className="mt-4"
      onPress={onToggle}
    >
      <Text>
        {isStorybookMode ? '📱 View App' : '📚 View Storybook'}
      </Text>
    </Button>
  );
}