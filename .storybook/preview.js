import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';

export const decorators = [withBackgrounds];

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1a1a1a' },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};