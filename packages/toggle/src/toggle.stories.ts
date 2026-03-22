import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, fn } from 'storybook/test';

import './toggle';

type ToggleStoryArgs = {
  label: string;
  checked: boolean;
  disabled: boolean;
  description: string;
  onChange: ReturnType<typeof fn>;
};

const meta = {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  args: {
    onChange: fn()
  },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    description: { control: 'text' },
    onChange: { table: { disable: true } }
  },
  render: ({ label, checked, disabled, description, onChange }) => {
    const toggle = document.createElement('wc-toggle');
    toggle.setAttribute('label', label);
    toggle.addEventListener('change', onChange);

    if (checked) {
      toggle.setAttribute('checked', '');
    } else {
      toggle.removeAttribute('checked');
    }

    if (disabled) {
      toggle.setAttribute('disabled', '');
    } else {
      toggle.removeAttribute('disabled');
    }

    toggle.textContent = description;
    return toggle;
  }
} satisfies Meta<ToggleStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email alerts',
    checked: false,
    disabled: false,
    description: 'Receive weekly product updates and account notifications.'
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const toggle = canvasElement.querySelector('wc-toggle');

    if (!(toggle instanceof HTMLElement) || !toggle.shadowRoot) {
      throw new Error('Expected rendered toggle element.');
    }

    const button = toggle.shadowRoot.querySelector('button');

    if (!(button instanceof HTMLButtonElement)) {
      throw new Error('Expected toggle button.');
    }

    await expect(button).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(button);

    await expect(button).toHaveAttribute('aria-checked', 'true');
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  }
};

export const Enabled: Story = {
  args: {
    label: 'Usage analytics',
    checked: true,
    disabled: false,
    description: 'Share anonymous interaction data to improve component ergonomics.'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Security lock',
    checked: true,
    disabled: true,
    description: 'Managed by your workspace administrator.'
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const toggle = canvasElement.querySelector('wc-toggle');

    if (!(toggle instanceof HTMLElement) || !toggle.shadowRoot) {
      throw new Error('Expected rendered toggle element.');
    }

    const button = toggle.shadowRoot.querySelector('button');

    if (!(button instanceof HTMLButtonElement)) {
      throw new Error('Expected toggle button.');
    }

    await userEvent.click(button);

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-checked', 'true');
    await expect(args.onChange).not.toHaveBeenCalled();
  }
};