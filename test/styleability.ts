import { expect } from 'vitest';

import { getRequiredElement } from './accessibility';

type StylePartExpectation = {
  selector: string;
  part: string;
};

export const expectStyleabilityHooks = (
  shadowRoot: ShadowRoot,
  parts: StylePartExpectation[],
  cssCustomProperties: string[]
): void => {
  const style = getRequiredElement<HTMLStyleElement>(shadowRoot, 'style');

  for (const { selector, part } of parts) {
    const element = getRequiredElement<HTMLElement>(shadowRoot, selector);
    expect(element.getAttribute('part')).toBe(part);
  }

  for (const cssCustomProperty of cssCustomProperties) {
    expect(style.textContent).toContain(cssCustomProperty);
  }
};