import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect } from 'storybook/test';

import './accordion';

type AccordionStoryArgs = {
  heading: string;
  open: boolean;
  content: string;
};

const meta = {
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
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Why should I use this accordion?',
    open: false,
    content:
      'It ships as a standards-based custom element, includes tests, and is documented in Storybook.'
  },
  play: async ({ canvasElement, userEvent }) => {
    const accordion = canvasElement.querySelector('wc-accordion');

    if (!(accordion instanceof HTMLElement) || !accordion.shadowRoot) {
      throw new Error('Expected rendered accordion element.');
    }

    const button = accordion.shadowRoot.querySelector('button');
    const panel = accordion.shadowRoot.querySelector('.panel');

    if (!(button instanceof HTMLButtonElement) || !(panel instanceof HTMLDivElement)) {
      throw new Error('Expected accordion button and panel.');
    }

    await expect(button).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(button);

    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(panel.hidden).toBe(false);
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
