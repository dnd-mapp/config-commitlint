# Contributing

Thank you for your interest in contributing to `@dnd-mapp/config-commitlint`.

This package is the shared commitlint config for all D&D Mapp projects. A change here affects every project that extends it, so please keep changes small and deliberate.

## Before you start

Open an [issue](https://github.com/dnd-mapp/config-commitlint/issues) to discuss any change beyond a typo fix before you send a pull request. This avoids work on changes that do not fit the goals of the package.

## Development setup

The required tool versions are enforced through `devEngines` and `engineStrict`, so installing with other versions fails.

- Node `24.21.0`
- pnpm `12.4.2`

Install the dependencies with:

```bash
pnpm install
```

Dependency versions live in the catalogs in `pnpm-workspace.yaml`, which uses `catalogMode: strict`. Add or bump versions there and reference them in `package.json`. Use `catalog:` for the default catalog and a named catalog such as `catalog:commitlint` for a group of tools.

Newly published releases are held back for three days through `minimumReleaseAge`. You may need to wait before you can bump to a very recent version.

## Git hooks

[Lefthook](https://lefthook.dev/) installs the Git hooks when you run `pnpm install`. The hooks are defined in `lefthook.yaml`.

| Hook         | Runs                                    | On                        |
|:-------------|:----------------------------------------|:--------------------------|
| `pre-commit` | Prettier and markdownlint-cli2 checks   | The staged files          |
| `commit-msg` | commitlint with the config of this repo | The message of the commit |

The pre-commit hooks only check files. Run `pnpm run format` to fix formatting issues, and stage the result.

## Changing the config

The config lives in `src/index.ts`. It extends `@commitlint/config-conventional` and overrides only what D&D Mapp projects need. Import other files with the `.ts` extension, because the compiler rewrites it to `.js`.

The `commitlint.config.ts` file in the root re-exports the source, so this repository lints its own commits with the config it publishes.

Keep the config limited to commitlint rules. Do not add options that depend on the project, such as `scope-enum`. Consumers can extend the config in their own commitlint configuration.

`@commitlint/config-conventional` is a dependency, so consumers do not install it. `@commitlint/cli` is a peer dependency. Raise its range when you use a rule that older versions do not know.

The `build` script compiles the sources to JavaScript and type declarations in `dist`. The `prepublishOnly` script runs it, and then runs `prepare-dist` from `@dnd-mapp/package-builder`. That command writes the trimmed `package.json`, copies the files listed in `.prepare-distrc.json`, and checks the `exports`.

When you add or change a rule, update the "Rules" section of the README in the same pull request.

## Building and testing

Tests use Vitest and load the config with `@commitlint/load` and `@commitlint/lint`. Add a test for every rule that you add or change. Coverage must stay above the thresholds in `vitest.config.ts`.

Check and format the repository with these commands. CI runs `format-check`, `lint-md`, `typecheck`, `test-ci`, and `build`. Run them yourself before you open a pull request.

```bash
pnpm run format-check
pnpm run format
pnpm run lint-md
pnpm run typecheck
pnpm run test-ci
pnpm run build
```

The `lint-md` script lints the Markdown files with markdownlint. Use `pnpm test` to run the tests in watch mode with the Vitest UI.

## Changelog and versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Record every notable change for consumers under `[Unreleased]` in `CHANGELOG.md`, using the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

Enabling a stricter rule or lowering a limit can make commits that passed before fail in consumer projects. Treat it as a breaking change and say so in the changelog entry.

## Code style

Follow the rules in `.editorconfig`.

- Use UTF-8 and LF line endings.
- Indent with 4 spaces, or 2 spaces in `package.json` and `pnpm-*.yaml`.
- End every file with a newline and trim trailing whitespace.

Follow these rules for prose, including Markdown files.

- Never hard wrap prose. Write each paragraph or list item on a single line.
- Use US spelling, for example "color" and "behavior".
- Keep every sentence at or under 40 words.
- Pretty print Markdown tables so the columns line up, with alignment markers on every separator line.

## Branches

Create a branch from `main` for each change. Name it `<type>/<short-description>` in lowercase with hyphens between words, for example `feat/add-scope-rule` or `fix/header-length`.

Use the same types as for commits.

## Commits

Write commit messages that follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). The `commit-msg` hook enforces this with the config of this repository.

```text
<type>(<optional scope>): <description>
```

Keep the header and every line of the body at or under 72 characters. Use one of these types.

| Type       | Use for                                           |
|:-----------|:--------------------------------------------------|
| `feat`     | A new rule                                        |
| `fix`      | A correction to an existing rule                  |
| `docs`     | Changes to documentation only                     |
| `refactor` | Changes that do not alter the behavior of configs |
| `test`     | Changes to tests only                             |
| `build`    | Changes to packaging, dependencies, or tooling    |
| `ci`       | Changes to the CI workflows                       |
| `chore`    | Other maintenance that does not fit above         |

Write the description in the imperative mood, such as "add scope rule". Mark a breaking change with `!` after the type or scope, and add a `BREAKING CHANGE:` footer that explains what consumers must do.

## Pull requests

- Keep each pull request to one change.
- Link the issue it addresses.
- Update the changelog and README in the same pull request.
- Use a title that follows the commit convention.

## License

By contributing, you agree that your contributions are licensed under the [MIT license](LICENSE).
