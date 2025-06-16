import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Alert } from 'react-native';
import { Button } from './button';
import { Text } from './text';

const showAlert = (message) => {
  Alert.alert('Button Pressed', message);
};

storiesOf('Button', module)
  .addDecorator((getStory) => (
    <View style={{ padding: 20, backgroundColor: '#f5f5f5', flex: 1 }}>
      {getStory()}
    </View>
  ))
  .add('Default', () => (
    <Button onPress={() => showAlert('Default button pressed')}>
      <Text>Default Button</Text>
    </Button>
  ))
  .add('All Variants', () => (
    <View style={{ gap: 12 }}>
      <Button onPress={() => showAlert('Default pressed')}>
        <Text>Default</Text>
      </Button>
      <Button variant="destructive" onPress={() => showAlert('Destructive pressed')}>
        <Text>Destructive</Text>
      </Button>
      <Button variant="outline" onPress={() => showAlert('Outline pressed')}>
        <Text>Outline</Text>
      </Button>
      <Button variant="secondary" onPress={() => showAlert('Secondary pressed')}>
        <Text>Secondary</Text>
      </Button>
      <Button variant="ghost" onPress={() => showAlert('Ghost pressed')}>
        <Text>Ghost</Text>
      </Button>
      <Button variant="link" onPress={() => showAlert('Link pressed')}>
        <Text>Link</Text>
      </Button>
    </View>
  ))
  .add('Sizes', () => (
    <View style={{ gap: 12 }}>
      <Button size="sm" onPress={() => showAlert('Small pressed')}>
        <Text>Small</Text>
      </Button>
      <Button size="default" onPress={() => showAlert('Default pressed')}>
        <Text>Default</Text>
      </Button>
      <Button size="lg" onPress={() => showAlert('Large pressed')}>
        <Text>Large</Text>
      </Button>
    </View>
  ))
  .add('Disabled', () => (
    <Button disabled onPress={() => showAlert('This should not fire')}>
      <Text>Disabled Button</Text>
    </Button>
  ));