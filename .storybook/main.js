module.exports = {
    stories: ['../components/**/*.stories.?(ts|tsx|js|jsx)'],
    addons: [
      // Start with minimal addons to avoid dependency issues
      '@storybook/addon-ondevice-controls',
    ],
  };