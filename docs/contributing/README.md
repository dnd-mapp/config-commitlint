# Contributing to dnd-mapp/config-commitlint

This page adds the details of `dnd-mapp/config-commitlint` to the [shared contributing guide](https://github.com/dnd-mapp/.github/blob/main/CONTRIBUTING.md). Read that guide first.

This package is the shared commitlint config for all D&D Mapp projects. A change here affects every project that extends it, so keep changes small and deliberate.

## Changing the config

The config lives in `src/index.ts`. It extends `@commitlint/config-conventional` and overrides only what D&D Mapp projects need. Import other files with the `.ts` extension, because the compiler rewrites it to `.js`.

The `commitlint.config.ts` file in the root re-exports the source, so this repository lints its own commits with the config it publishes.

Keep the config limited to commitlint rules. Do not add options that depend on the project, such as `scope-enum`. Consumers can extend the config in their own commitlint configuration.

`@commitlint/config-conventional` is a dependency, so consumers do not install it. `@commitlint/cli` is a peer dependency. Raise its range when you use a rule that older versions do not know.

The `build` script compiles the sources to JavaScript and type declarations in `dist`. The `prepublishOnly` script runs it, and then runs `prepare-dist` from `@dnd-mapp/package-builder`. That command writes the trimmed `package.json`, copies the files listed in `.prepare-distrc.json`, and checks the `exports`.

When you add or change a rule, update the "Rules" section of the README in the same pull request.

## Building and testing

Tests use Vitest and load the config with `@commitlint/load` and `@commitlint/lint`. Add a test for every rule that you add or change. Coverage must stay above the thresholds in `vitest.config.ts`. Use `pnpm test` to run the tests in watch mode with the Vitest UI.

## Checks

On top of the [shared checks](https://github.com/dnd-mapp/.github/blob/main/CONTRIBUTING.md#checks), CI runs `lint-ts`, `typecheck`, `test-ci`, and `build`. Run them yourself before you open a pull request.

```bash
pnpm run lint-ts
pnpm run typecheck
pnpm run test-ci
pnpm run build
```

The `lint-ts` script lints the code with ESLint.

## Changelog and versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Record every notable change for consumers under `[Unreleased]` in `CHANGELOG.md`, using the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

Enabling a stricter rule or lowering a limit can make commits that passed before fail in consumer projects. Treat it as a breaking change and say so in the changelog entry.

## Releasing

1. Run the [prepare release workflow](../../.github/workflows/prepare-release.yaml) on `main` with the part of the version to bump, for example `gh workflow run prepare-release.yaml -f bump=minor`. It opens the `chore: release X.Y.Z` pull request with auto-merge on.
2. Review and approve the pull request. Once it merges, the `tag` job of the [push workflow](../../.github/workflows/push-main.yaml) creates the annotated tag `vX.Y.Z` on the merge commit.
3. The [release workflow](../../.github/workflows/release.yaml) runs the CI checks, verifies the tag and the changelog, stages the package on npm, and creates the GitHub Release, which opens a discussion in the Announcements category.
4. Find the staged version with `pnpm stage list` and approve it with `pnpm stage approve <id>` and 2FA.

If the staged version is wrong, reject it with `pnpm stage reject <id>`. The same version cannot be staged again until then.
