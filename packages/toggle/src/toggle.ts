const template = document.createElement('template');

let toggleInstanceCount = 0;

template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      width: var(--wc-toggle-width, min(100%, 26rem));
      font-family: var(--wc-toggle-font-family, inherit);
      color: var(--wc-toggle-color, #0f172a);
    }

    .toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--wc-toggle-gap, 1rem);
      padding: var(--wc-toggle-padding, 1rem 1.125rem);
      border: var(--wc-toggle-border, 1px solid #cbd5e1);
      border-radius: var(--wc-toggle-radius, 1rem);
      background: var(--wc-toggle-background, linear-gradient(180deg, #ffffff 0%, #f8fafc 100%));
      box-shadow: var(--wc-toggle-shadow, 0 12px 28px rgba(15, 23, 42, 0.08));
    }

    .copy {
      display: grid;
      gap: var(--wc-toggle-copy-gap, 0.25rem);
      min-width: 0;
    }

    .label {
      font-size: var(--wc-toggle-label-font-size, 0.95rem);
      font-weight: var(--wc-toggle-label-font-weight, 700);
      line-height: var(--wc-toggle-label-line-height, 1.2);
    }

    .description {
      font-size: var(--wc-toggle-description-font-size, 0.875rem);
      line-height: var(--wc-toggle-description-line-height, 1.4);
      color: var(--wc-toggle-description-color, #475569);
    }

    .description:empty {
      display: none;
    }

    button {
      all: unset;
      box-sizing: border-box;
      flex-shrink: 0;
      width: var(--wc-toggle-control-width, 3.5rem);
      height: var(--wc-toggle-control-height, 2rem);
      border-radius: var(--wc-toggle-control-radius, 999px);
      padding: var(--wc-toggle-control-padding, 0.2rem);
      background: var(--wc-toggle-control-background, #cbd5e1);
      cursor: pointer;
      transition:
        var(--wc-toggle-control-transition, background-color 0.2s ease, opacity 0.2s ease);
    }

    button:focus-visible {
      outline: var(--wc-toggle-focus-outline, 3px solid #2563eb);
      outline-offset: var(--wc-toggle-focus-outline-offset, 3px);
    }

    button[aria-checked='true'] {
      background: var(--wc-toggle-control-background-checked, #0f766e);
    }

    button[aria-disabled='true'] {
      opacity: var(--wc-toggle-control-disabled-opacity, 0.55);
      cursor: var(--wc-toggle-control-disabled-cursor, not-allowed);
    }

    .thumb {
      display: block;
      width: var(--wc-toggle-thumb-size, 1.6rem);
      height: var(--wc-toggle-thumb-size, 1.6rem);
      border-radius: var(--wc-toggle-thumb-radius, 50%);
      background: var(--wc-toggle-thumb-background, #ffffff);
      box-shadow: var(--wc-toggle-thumb-shadow, 0 4px 12px rgba(15, 23, 42, 0.16));
      transition: var(--wc-toggle-thumb-transition, transform 0.2s ease);
    }

    button[aria-checked='true'] .thumb {
      transform: var(--wc-toggle-thumb-transform-checked, translateX(1.5rem));
    }
  </style>
  <section class="toggle" part="base">
    <div class="copy" part="copy">
      <span class="label" part="label"></span>
      <span class="description" part="description"><slot part="slot"></slot></span>
    </div>
    <button type="button" role="switch" aria-checked="false" aria-disabled="false" part="control">
      <span class="thumb" part="thumb" aria-hidden="true"></span>
    </button>
  </section>
`;

export class ToggleElement extends HTMLElement {
  private readonly instanceId = ++toggleInstanceCount;

  static get observedAttributes(): string[] {
    return ['label', 'checked', 'disabled'];
  }

  get label(): string {
    return this.getAttribute('label') ?? '';
  }

  set label(value: string) {
    this.setAttribute('label', value);
  }

  get checked(): boolean {
    return this.hasAttribute('checked');
  }

  set checked(value: boolean) {
    if (value) {
      this.setAttribute('checked', '');
      return;
    }

    this.removeAttribute('checked');
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
      return;
    }

    this.removeAttribute('disabled');
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback(): void {
    this.button.addEventListener('click', this.handleToggle);
    this.render();
  }

  disconnectedCallback(): void {
    this.button.removeEventListener('click', this.handleToggle);
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private readonly handleToggle = (): void => {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;
    this.dispatchEvent(new Event('change', { bubbles: true }));
  };

  private get button(): HTMLButtonElement {
    return this.shadowRoot?.querySelector('button') as HTMLButtonElement;
  }

  private get labelElement(): HTMLSpanElement {
    return this.shadowRoot?.querySelector('.label') as HTMLSpanElement;
  }

  private get labelId(): string {
    return `wc-toggle-label-${this.instanceId}`;
  }

  private render(): void {
    this.labelElement.textContent = this.label || 'Toggle';
    this.labelElement.id = this.labelId;
    this.button.setAttribute('aria-labelledby', this.labelId);
    this.button.setAttribute('aria-checked', String(this.checked));
    this.button.setAttribute('aria-disabled', String(this.disabled));
    this.button.disabled = this.disabled;
  }
}

export const registerToggle = (tagName = 'wc-toggle'): void => {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ToggleElement);
  }
};

registerToggle();