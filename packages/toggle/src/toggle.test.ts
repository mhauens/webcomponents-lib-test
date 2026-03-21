import { describe, expect, it, vi } from 'vitest';
import { ToggleElement } from './toggle';

describe('ToggleElement', () => {
  it('renders the provided label and starts unchecked by default', () => {
    const element = new ToggleElement();
    element.label = 'Email alerts';
    document.body.appendChild(element);

    const button = element.shadowRoot?.querySelector('button');

    expect(button?.getAttribute('aria-checked')).toBe('false');
    expect(element.shadowRoot?.textContent).toContain('Email alerts');
  });

  it('toggles checked state and emits a change event when clicked', () => {
    const element = document.createElement('wc-toggle') as ToggleElement;
    const handleChange = vi.fn();

    element.addEventListener('change', handleChange);
    document.body.appendChild(element);

    const button = element.shadowRoot?.querySelector('button');
    button?.click();

    expect(element.checked).toBe(true);
    expect(button?.getAttribute('aria-checked')).toBe('true');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not toggle when disabled', () => {
    const element = document.createElement('wc-toggle') as ToggleElement;
    element.disabled = true;
    document.body.appendChild(element);

    const button = element.shadowRoot?.querySelector('button');
    button?.click();

    expect(element.checked).toBe(false);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });
});