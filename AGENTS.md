# AGENTS.md

## Purpose

This repository is a pnpm workspace for reusable Web Components.
Each component should live in its own package under `packages/<component-name>`.

## Component Rules

When creating a new component in this repository, always follow these rules:

1. The component must be implemented as a Web Component based on Custom Elements.
2. The component must be created as a separate package inside `packages/<component-name>`.
3. The package must be structured so it can be built and published independently.
4. The package must be publishable as a separate GitHub Package.
5. Every new component must include a Storybook story.
6. Every new component must include at least one Vitest test file.

## Required Package Contents

Each new component package should include at least:

- `package.json`
- `README.md`
- `CHANGELOG.md`
- `tsconfig.json`
- `tsconfig.build.json`
- `vite.config.ts`
- `src/index.ts`
- `src/<component-name>.ts`
- `src/<component-name>.stories.ts`
- `src/<component-name>.test.ts`

## Implementation Expectations

- Export the component and its registration helper from `src/index.ts`.
- Register the Custom Element with a stable tag name.
- Keep the component compatible with the existing Vite, TypeScript, Vitest, and Storybook setup.
- Update root exports when the component should be consumable from the workspace entry point.
- Add or update the demo entry when a visual example in the root app is useful.

## Release Expectations

- The package configuration must support independent build output in `dist`.
- The package should expose ESM, CJS, and type definitions when following the existing package pattern.
- Publishing should remain compatible with GitHub Packages and the existing release workflow.

## Quality Bar

- Do not add a component without its Storybook story.
- Do not add a component without its Vitest coverage.
- Do not implement framework-specific components where a standard Web Component is expected.