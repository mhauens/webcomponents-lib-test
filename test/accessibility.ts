import { expect } from 'vitest';

export const getRequiredElement = <T extends Element>(
  root: ParentNode,
  selector: string
): T => {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Expected element matching selector: ${selector}`);
  }

  return element;
};

export const expectLinkedById = (
  source: Element,
  attributeName: string,
  target: Element
): void => {
  const value = source.getAttribute(attributeName);

  if (!value) {
    throw new Error(`Expected ${attributeName} to be present on ${source.tagName.toLowerCase()}`);
  }

  expect(value).toBe(target.id);
};