import { describe, expect, it } from 'vitest';

import { expectLinkedById, getRequiredElement } from '../../../test/accessibility';
import { expectStyleabilityHooks } from '../../../test/styleability';
import { AccordionElement } from './accordion';

describe('AccordionElement', () => {
  it('renders the provided heading and starts closed by default', () => {
    const element = new AccordionElement();
    element.heading = 'Frequently asked question';
    document.body.appendChild(element);

    const button = element.shadowRoot?.querySelector('button');

    expect(button?.textContent).toContain('Frequently asked question');
    expect(button?.getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles open state when the button is clicked', () => {
    const element = document.createElement('wc-accordion') as AccordionElement;
    element.setAttribute('heading', 'Toggle test');
    document.body.appendChild(element);

    const button = element.shadowRoot?.querySelector('button');
    button?.click();

    expect(element.open).toBe(true);
    expect(button?.getAttribute('aria-expanded')).toBe('true');
  });

  it('exposes accessible relationships for the trigger and panel', () => {
    const element = document.createElement('wc-accordion') as AccordionElement;
    element.heading = 'Shipping details';
    document.body.appendChild(element);

    const shadowRoot = element.shadowRoot as ShadowRoot;
    const button = getRequiredElement<HTMLButtonElement>(shadowRoot, 'button');
    const panel = getRequiredElement<HTMLDivElement>(shadowRoot, '.panel');

    expect(button.id).not.toBe('');
    expect(panel.id).not.toBe('');
    expectLinkedById(button, 'aria-controls', panel);
    expect(panel.getAttribute('role')).toBe('region');
    expectLinkedById(panel, 'aria-labelledby', button);
    expect(panel.hidden).toBe(true);

    button.click();

    expect(panel.hidden).toBe(false);
  });

  it('exposes styling hooks for every visible region', () => {
    const element = document.createElement('wc-accordion') as AccordionElement;
    document.body.appendChild(element);

    const shadowRoot = element.shadowRoot as ShadowRoot;
    expectStyleabilityHooks(
      shadowRoot,
      [
        { selector: '.accordion', part: 'base' },
        { selector: 'button', part: 'trigger' },
        { selector: '.heading', part: 'heading' },
        { selector: '.chevron', part: 'icon' },
        { selector: '.panel', part: 'panel' },
        { selector: '.panel-content', part: 'content' },
        { selector: '.panel-inner', part: 'body' },
        { selector: 'slot', part: 'slot' }
      ],
      ['--wc-accordion-trigger-background', '--wc-accordion-panel-padding']
    );
  });
});
