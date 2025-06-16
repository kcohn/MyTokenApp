import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Alert } from 'react-native';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Text } from './text';
import { Button } from './button';

storiesOf('Card', module)
  .addDecorator((getStory) => (
    <View style={{ padding: 20, backgroundColor: '#f5f5f5', flex: 1 }}>
      {getStory()}
    </View>
  ))
  .add('Default', () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This is the card content area where you can put any content.</Text>
      </CardContent>
      <CardFooter>
        <Button onPress={() => Alert.alert('Card Action', 'Button in card pressed!')}>
          <Text>Action Button</Text>
        </Button>
      </CardFooter>
    </Card>
  ))
  .add('Without Footer', () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>A card without a footer</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Just header and content, no footer buttons.</Text>
      </CardContent>
    </Card>
  ))
  .add('Minimal', () => (
    <Card className="w-full max-w-sm p-4">
      <Text>A minimal card with just padding and border.</Text>
    </Card>
  ))
  .add('Product Card', () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Product Name</CardTitle>
        <CardDescription>$29.99</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This is a sample product description that shows how the card looks with more realistic content.</Text>
      </CardContent>
      <CardFooter className="flex-row gap-2">
        <Button variant="outline" onPress={() => Alert.alert('Added to cart!')}>
          <Text>Add to Cart</Text>
        </Button>
        <Button onPress={() => Alert.alert('Buy now!')}>
          <Text>Buy Now</Text>
        </Button>
      </CardFooter>
    </Card>
  ));