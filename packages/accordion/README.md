# @mhauens/accordion

Accordion web component published from the workspace as its own package.

## Usage

```ts
import '@mhauens/accordion';
```

## Styling

The component is designed to be styled from outside the shadow root.

- Host state selector: `wc-accordion[open]`
- Parts: `base`, `trigger`, `heading`, `icon`, `panel`, `content`, `body`, `slot`
- CSS custom properties:
	- `--wc-accordion-width`
	- `--wc-accordion-font-family`
	- `--wc-accordion-color`
	- `--wc-accordion-border`
	- `--wc-accordion-radius`
	- `--wc-accordion-background`
	- `--wc-accordion-shadow`
	- `--wc-accordion-overflow`
	- `--wc-accordion-trigger-gap`
	- `--wc-accordion-trigger-padding`
	- `--wc-accordion-trigger-font-weight`
	- `--wc-accordion-trigger-color`
	- `--wc-accordion-trigger-background`
	- `--wc-accordion-focus-outline`
	- `--wc-accordion-focus-outline-offset`
	- `--wc-accordion-icon-color`
	- `--wc-accordion-icon-transition`
	- `--wc-accordion-icon-open-transform`
	- `--wc-accordion-panel-background`
	- `--wc-accordion-panel-transition`
	- `--wc-accordion-panel-padding`
	- `--wc-accordion-panel-color`

```css
wc-accordion {
	--wc-accordion-border: 2px solid #0f172a;
	--wc-accordion-radius: 1.25rem;
	--wc-accordion-trigger-background: #e0f2fe;
	--wc-accordion-panel-color: #0f172a;
}

wc-accordion::part(trigger) {
	letter-spacing: 0.04em;
}

wc-accordion[open]::part(icon) {
	color: #0369a1;
}
```
