# Web Components Workspace

pnpm workspace for independently versioned Web Components packages based on Vite, TypeScript, Vitest and Storybook.

## Features

- Custom Elements released as separate workspace packages.
- Storybook for visual documentation.
- Vitest for unit tests.
- ESLint + Prettier for code quality.
- Changesets for component changelogs and versioning.
- GitHub Packages publishing via `pnpm release` or GitHub Actions.

## Workspace Packages

- `packages/accordion` publishes `@mhauens/accordion`.

## Scripts

- `pnpm dev` starts the Vite development server.
- `pnpm build` builds all publishable packages.
- `pnpm build:demo` builds the root demo app.
- `pnpm test` runs the unit tests once.
- `pnpm lint` runs ESLint.
- `pnpm format` formats the repository with Prettier.
- `pnpm storybook` starts Storybook.
- `pnpm build-storybook` builds the static Storybook site.
- `pnpm changeset` creates a new changeset entry.
- `pnpm version-packages` applies pending changesets to package versions.
- `pnpm release` builds all changed packages and publishes them to GitHub Packages.
- `pnpm release:package` runs the full local flow from the standard Changesets prompt to publish.

## Releasing A Single Component Package

1. Add or update the component inside `packages/<component-name>`.
2. Run `pnpm changeset` and select the package to version, for example `@mhauens/accordion`.
3. Run `pnpm version-packages` to apply the version bump locally.
4. Run `pnpm release` to publish only the packages with pending Changesets.

## One-Command Local Release

Use the helper script when you want to create the changeset, version the package, build it, and publish it in one step.

Standard Changesets mode:

```bash
pnpm release:package
```

Dry run:

```bash
pnpm release:package -- dry-run
```

Examples:

```cmd
set NODE_AUTH_TOKEN=<your-github-packages-token>
pnpm release:package
```

```powershell
$env:NODE_AUTH_TOKEN="<your-github-packages-token>"
pnpm release:package
```

Behavior:

1. Starts the normal `changeset` interactive prompt.
2. Reuses `NODE_AUTH_TOKEN` as `GITHUB_TOKEN` if `GITHUB_TOKEN` is not already set.
3. Runs `changeset version`, `pnpm build`, and `changeset publish`.
4. Uses whatever packages and release types you select in the standard Changesets dialog.

Dry-run example:

```bash
pnpm release:package -- dry-run
```

## Publishing to GitHub Packages

### GitHub configuration

1. Create a GitHub personal access token with package publishing permissions.
2. Save the token in the repository secrets as `GITHUB_TOKEN_PACKAGES`.
3. Ensure the package scope matches your GitHub organization or username if you adapt this template.
4. The GitHub Actions workflow uses `GITHUB_TOKEN_PACKAGES` automatically for `GITHUB_TOKEN` and `NODE_AUTH_TOKEN`.

### Local publishing

1. Set `NODE_AUTH_TOKEN` locally for the current shell, or add the GitHub Packages token to your user-level `.npmrc`.
2. Run `pnpm release`.

```bash
export NODE_AUTH_TOKEN="<your-github-packages-token>"
pnpm release
```

On Windows `cmd`:

```cmd
set NODE_AUTH_TOKEN=<your-github-packages-token>
pnpm release
```

On Windows PowerShell:

```powershell
$env:NODE_AUTH_TOKEN="<your-github-packages-token>"
pnpm release
```

For day-to-day development, the repository does not require `NODE_AUTH_TOKEN`; only publishing to GitHub Packages does.
