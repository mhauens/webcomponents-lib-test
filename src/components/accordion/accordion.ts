const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
      width: min(100%, 40rem);
      font-family: Inter, system-ui, sans-serif;
      color: #111827;
    }

    .accordion {
      border: 1px solid #d1d5db;
      border-radius: 0.75rem;
      background: #ffffff;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      overflow: hidden;
    }

    button {
      all: unset;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.25rem;
      cursor: pointer;
      font-weight: 600;
      background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
    }

    button:focus-visible {
      outline: 3px solid #2563eb;
      outline-offset: -3px;
    }

    .chevron {
      transition: transform 0.2s ease;
    }

    .chevron.open {
      transform: rotate(180deg);
    }

    .panel {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.2s ease;
    }

    .panel.open {
      grid-template-rows: 1fr;
    }

    .panel-content {
      overflow: hidden;
    }

    .panel-inner {
      padding: 0 1.25rem 1rem;
      color: #4b5563;
    }
  </style>
  <section class="accordion">
    <button type="button" aria-expanded="false">
      <span class="heading"></span>
      <span class="chevron" aria-hidden="true">⌄</span>
    </button>
    <div class="panel" role="region">
      <div class="panel-content">
        <div class="panel-inner">
          <slot></slot>
        </div>
      </div>
    </div>
  </section>
`;

export class AccordionElement extends HTMLElement {
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

  private get panel(): HTMLDivElement {
    return this.shadowRoot?.querySelector('.panel') as HTMLDivElement;
  }

  private get chevron(): HTMLSpanElement {
    return this.shadowRoot?.querySelector('.chevron') as HTMLSpanElement;
  }

  private render(): void {
    this.headingElement.textContent = this.heading || 'Accordion';
    this.button.setAttribute('aria-expanded', String(this.open));
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
