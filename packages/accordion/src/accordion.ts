const template = document.createElement('template');

let accordionInstanceCount = 0;

template.innerHTML = `
  <style>
    :host {
      display: block;
      width: var(--wc-accordion-width, min(100%, 40rem));
      font-family: var(--wc-accordion-font-family, inherit);
      color: var(--wc-accordion-color, #111827);
    }

    .accordion {
      border: var(--wc-accordion-border, 1px solid #d1d5db);
      border-radius: var(--wc-accordion-radius, 0.75rem);
      background: var(--wc-accordion-background, #ffffff);
      box-shadow: var(--wc-accordion-shadow, 0 10px 30px rgba(15, 23, 42, 0.08));
      overflow: var(--wc-accordion-overflow, hidden);
    }

    button {
      all: unset;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--wc-accordion-trigger-gap, 1rem);
      padding: var(--wc-accordion-trigger-padding, 1rem 1.25rem);
      cursor: pointer;
      font-weight: var(--wc-accordion-trigger-font-weight, 600);
      color: var(--wc-accordion-trigger-color, inherit);
      background: var(--wc-accordion-trigger-background, linear-gradient(180deg, #ffffff 0%, #f9fafb 100%));
    }

    button:focus-visible {
      outline: var(--wc-accordion-focus-outline, 3px solid #2563eb);
      outline-offset: var(--wc-accordion-focus-outline-offset, -3px);
    }

    .chevron {
      color: var(--wc-accordion-icon-color, currentColor);
      transition: var(--wc-accordion-icon-transition, transform 0.2s ease);
    }

    .chevron.open {
      transform: var(--wc-accordion-icon-open-transform, rotate(180deg));
    }

    .panel {
      display: grid;
      grid-template-rows: 0fr;
      background: var(--wc-accordion-panel-background, transparent);
      transition: var(--wc-accordion-panel-transition, grid-template-rows 0.2s ease);
    }

    .panel.open {
      grid-template-rows: 1fr;
    }

    .panel-content {
      overflow: hidden;
    }

    .panel-inner {
      padding: var(--wc-accordion-panel-padding, 0 1.25rem 1rem);
      color: var(--wc-accordion-panel-color, #4b5563);
    }
  </style>
  <section class="accordion" part="base">
    <button type="button" aria-expanded="false" part="trigger">
      <span class="heading" part="heading"></span>
      <span class="chevron" part="icon" aria-hidden="true">⌄</span>
    </button>
    <div class="panel" role="region" part="panel">
      <div class="panel-content" part="content">
        <div class="panel-inner" part="body">
          <slot part="slot"></slot>
        </div>
      </div>
    </div>
  </section>
`;

export class AccordionElement extends HTMLElement {
  private readonly instanceId = ++accordionInstanceCount;

  static get observedAttributes(): string[] {
    return ['heading', 'open'];
  }

  get heading(): string {
    return this.getAttribute('heading') ?? '';
  }

  set heading(value: string) {
    this.setAttribute('heading', value);
  }

  get open(): boolean {
    return this.hasAttribute('open');
  }

  set open(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
      return;
    }

    this.removeAttribute('open');
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
    this.open = !this.open;
  };

  private get button(): HTMLButtonElement {
    return this.shadowRoot?.querySelector('button') as HTMLButtonElement;
  }

  private get headingElement(): HTMLSpanElement {
    return this.shadowRoot?.querySelector('.heading') as HTMLSpanElement;
  }

  private get panelId(): string {
    return `wc-accordion-panel-${this.instanceId}`;
  }

  private get buttonId(): string {
    return `wc-accordion-button-${this.instanceId}`;
  }

  private get panel(): HTMLDivElement {
    return this.shadowRoot?.querySelector('.panel') as HTMLDivElement;
  }

  private get chevron(): HTMLSpanElement {
    return this.shadowRoot?.querySelector('.chevron') as HTMLSpanElement;
  }

  private render(): void {
    this.headingElement.textContent = this.heading || 'Accordion';
    this.button.id = this.buttonId;
    this.button.setAttribute('aria-expanded', String(this.open));
    this.button.setAttribute('aria-controls', this.panelId);
    this.panel.id = this.panelId;
    this.panel.setAttribute('aria-labelledby', this.buttonId);
    this.panel.hidden = !this.open;
    this.panel.classList.toggle('open', this.open);
    this.chevron.classList.toggle('open', this.open);
  }
}

export const registerAccordion = (tagName = 'wc-accordion'): void => {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, AccordionElement);
  }
};

registerAccordion();
