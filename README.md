# Web Components Library

Initial setup for a Web Components library based on Vite, TypeScript, Vitest and Storybook.

## Features

- Custom Elements built as a reusable library bundle.
- Storybook for visual documentation.
- Vitest for unit tests.
- ESLint + Prettier for code quality.
- Changesets for component changelogs and versioning.
- GitHub Packages publishing via `pnpm release` or GitHub Actions.

## Scripts

- `pnpm dev` starts the Vite development server.
- `pnpm build` creates the distributable library in `dist/`.
- `pnpm test` runs the unit tests once.
- `pnpm lint` runs ESLint.
- `pnpm format` formats the repository with Prettier.
- `pnpm storybook` starts Storybook.
- `pnpm build-storybook` builds the static Storybook site.
- `pnpm changeset` creates a new changeset entry.
- `pnpm version-packages` applies pending changesets to package versions.
- `pnpm release` builds the package and publishes it to GitHub Packages.

## Publishing to GitHub Packages

### GitHub configuration

1. Create a GitHub personal access token with package publishing permissions.
2. Save the token in the repository secrets as `GITHUB_TOKEN_PACKAGES`.
3. Ensure the package scope matches your GitHub organization or username if you adapt this template.
4. The GitHub Actions workflow uses `GITHUB_TOKEN_PACKAGES` automatically for `GITHUB_TOKEN` and `NODE_AUTH_TOKEN`.

### Local publishing

1. Export the same token locally as `NODE_AUTH_TOKEN`.
2. Run `pnpm release`.

```bash
export NODE_AUTH_TOKEN="<your-github-packages-token>"
pnpm release
```
