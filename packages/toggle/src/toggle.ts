const template = document.createElement('template');

let toggleInstanceCount = 0;

template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      width: min(100%, 26rem);
      font-family: Inter, system-ui, sans-serif;
      color: #0f172a;
    }

    .toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.125rem;
      border: 1px solid #cbd5e1;
      border-radius: 1rem;
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
    }

    .copy {
      display: grid;
      gap: 0.25rem;
      min-width: 0;
    }

    .label {
      font-size: 0.95rem;
      font-weight: 700;
      line-height: 1.2;
    }

    .description {
      font-size: 0.875rem;
      line-height: 1.4;
      color: #475569;
    }

    .description:empty {
      display: none;
    }

    button {
      all: unset;
      box-sizing: border-box;
      flex-shrink: 0;
      width: 3.5rem;
      height: 2rem;
      border-radius: 999px;
      padding: 0.2rem;
      background: #cbd5e1;
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        opacity 0.2s ease;
    }

    button:focus-visible {
      outline: 3px solid #2563eb;
      outline-offset: 3px;
    }

    button[aria-checked='true'] {
      background: #0f766e;
    }

    button[aria-disabled='true'] {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .thumb {
      display: block;
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.16);
      transition: transform 0.2s ease;
    }

    button[aria-checked='true'] .thumb {
      transform: translateX(1.5rem);
    }
  </style>
  <section class="toggle">
    <div class="copy">
      <span class="label"></span>
      <span class="description"><slot></slot></span>
    </div>
    <button type="button" role="switch" aria-checked="false" aria-disabled="false">
      <span class="thumb" aria-hidden="true"></span>
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