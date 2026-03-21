import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './toggle';

const meta: Meta = {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    description: { control: 'text' }
  },
  render: ({ label, checked, disabled, description }) => {
    const toggle = document.createElement('wc-toggle');
    toggle.setAttribute('label', label);

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
};

export default meta;
type Story = StoryObj<{ label: string; checked: boolean; disabled: boolean; description: string }>;

export const Default: Story = {
  args: {
    label: 'Email alerts',
    checked: false,
    disabled: false,
    description: 'Receive weekly product updates and account notifications.'
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
  }
};