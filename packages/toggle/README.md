# @mhauens/toggle

Toggle web component published from the workspace as its own package.

## Usage

```ts
import '@mhauens/toggle';
```

## Styling

The component is designed to be styled from outside the shadow root.

- Host state selectors: `wc-toggle[checked]`, `wc-toggle[disabled]`
- Parts: `base`, `copy`, `label`, `description`, `slot`, `control`, `thumb`
- CSS custom properties:
	- `--wc-toggle-width`
	- `--wc-toggle-font-family`
	- `--wc-toggle-color`
	- `--wc-toggle-gap`
	- `--wc-toggle-padding`
	- `--wc-toggle-border`
	- `--wc-toggle-radius`
	- `--wc-toggle-background`
	- `--wc-toggle-shadow`
	- `--wc-toggle-copy-gap`
	- `--wc-toggle-label-font-size`
	- `--wc-toggle-label-font-weight`
	- `--wc-toggle-label-line-height`
	- `--wc-toggle-description-font-size`
	- `--wc-toggle-description-line-height`
	- `--wc-toggle-description-color`
	- `--wc-toggle-control-width`
	- `--wc-toggle-control-height`
	- `--wc-toggle-control-radius`
	- `--wc-toggle-control-padding`
	- `--wc-toggle-control-background`
	- `--wc-toggle-control-transition`
	- `--wc-toggle-control-background-checked`
	- `--wc-toggle-control-disabled-opacity`
	- `--wc-toggle-control-disabled-cursor`
	- `--wc-toggle-focus-outline`
	- `--wc-toggle-focus-outline-offset`
	- `--wc-toggle-thumb-size`
	- `--wc-toggle-thumb-radius`
	- `--wc-toggle-thumb-background`
	- `--wc-toggle-thumb-shadow`
	- `--wc-toggle-thumb-transition`
	- `--wc-toggle-thumb-transform-checked`

```css
wc-toggle {
	--wc-toggle-background: #0f172a;
	--wc-toggle-color: #f8fafc;
	--wc-toggle-control-background: #334155;
	--wc-toggle-control-background-checked: #22c55e;
	--wc-toggle-description-color: #cbd5e1;
}

wc-toggle::part(control) {
	border: 2px solid #94a3b8;
}

wc-toggle[checked]::part(thumb) {
	background: #052e16;
}
```