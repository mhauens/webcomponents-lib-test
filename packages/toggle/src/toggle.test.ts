import { describe, expect, it, vi } from 'vitest';

import { expectLinkedById, getRequiredElement } from '../../../test/accessibility';
import { expectStyleabilityHooks } from '../../../test/styleability';
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

  it('associates the switch with its visible label', () => {
    const element = document.createElement('wc-toggle') as ToggleElement;
    element.label = 'Marketing notifications';
    document.body.appendChild(element);

    const shadowRoot = element.shadowRoot as ShadowRoot;
    const button = getRequiredElement<HTMLButtonElement>(shadowRoot, 'button');
    const label = getRequiredElement<HTMLSpanElement>(shadowRoot, '.label');

    expect(label.id).not.toBe('');
    expectLinkedById(button, 'aria-labelledby', label);
  });

  it('uses native disabled semantics when unavailable', () => {
    const element = document.createElement('wc-toggle') as ToggleElement;
    element.disabled = true;
    document.body.appendChild(element);

    const button = getRequiredElement<HTMLButtonElement>(element.shadowRoot as ShadowRoot, 'button');

    expect(button).toBeDisabled();
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('exposes styling hooks for every visible region', () => {
    const element = document.createElement('wc-toggle') as ToggleElement;
    document.body.appendChild(element);

    const shadowRoot = element.shadowRoot as ShadowRoot;
    expectStyleabilityHooks(
      shadowRoot,
      [
        { selector: '.toggle', part: 'base' },
        { selector: '.copy', part: 'copy' },
        { selector: '.label', part: 'label' },
        { selector: '.description', part: 'description' },
        { selector: 'slot', part: 'slot' },
        { selector: 'button', part: 'control' },
        { selector: '.thumb', part: 'thumb' }
      ],
      ['--wc-toggle-background', '--wc-toggle-thumb-transform-checked']
    );
  });
});