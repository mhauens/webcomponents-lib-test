import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './accordion';

const meta: Meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    open: { control: 'boolean' },
    content: { control: 'text' }
  },
  render: ({ heading, open, content }) => {
    const accordion = document.createElement('wc-accordion');
    accordion.setAttribute('heading', heading);

    if (open) {
      accordion.setAttribute('open', '');
    } else {
      accordion.removeAttribute('open');
    }

    accordion.innerHTML = `<p>${content}</p>`;
    return accordion;
  }
};

export default meta;
type Story = StoryObj<{ heading: string; open: boolean; content: string }>;

export const Default: Story = {
  args: {
    heading: 'Why should I use this accordion?',
    open: false,
    content:
      'It ships as a standards-based custom element, includes tests, and is documented in Storybook.'
  }
};

export const Expanded: Story = {
  args: {
    heading: 'What is included in the setup?',
    open: true,
    content:
      'Vite, TypeScript, Vitest, Storybook, ESLint, Prettier and Changesets are all preconfigured.'
  }
};
