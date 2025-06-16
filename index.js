import { registerRootComponent } from 'expo';

// 🎯 TOGGLE BETWEEN APP AND STORYBOOK
// Change this line to switch between your app and Storybook:
const SHOW_STORYBOOK = __DEV__ && true; // 👈 Set to 'true' for Storybook, 'false' for your app

if (SHOW_STORYBOOK) {
  // 📚 STORYBOOK MODE
  console.log('🎨 Loading Storybook v5.3.25...');
  const StorybookUIRoot = require('./.storybook/index.js').default;
  registerRootComponent(StorybookUIRoot);
} else {
  // 📱 MAIN APP MODE
  console.log('📱 Loading main app...');
  const { ExpoRoot } = require('expo-router');
  
  function App() {
    const ctx = require.context('./app');
    return <ExpoRoot context={ctx} />;
  }
  
  registerRootComponent(App);
}