import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};

export default config;
