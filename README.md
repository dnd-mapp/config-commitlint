# @dnd-mapp/config-commitlint

[![push main](https://github.com/dnd-mapp/config-commitlint/actions/workflows/push-main.yaml/badge.svg?branch=main)](https://github.com/dnd-mapp/config-commitlint/actions/workflows/push-main.yaml)
[![npm version](https://img.shields.io/npm/v/@dnd-mapp/config-commitlint)](https://www.npmjs.com/package/@dnd-mapp/config-commitlint)
[![license](https://img.shields.io/npm/l/@dnd-mapp/config-commitlint)](LICENSE)

Shared commitlint config that extends [`@commitlint/config-conventional`](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional), which enforces [Conventional Commits](https://www.conventionalcommits.org/).

## Requirements

- `@commitlint/cli` 21 is a peer dependency and must be installed in your project.

## Installation

```bash
pnpm add --save-dev @commitlint/cli @dnd-mapp/config-commitlint
```

## Usage

Re-export the config from a `commitlint.config.js` file in your project root.

```js
export { default } from '@dnd-mapp/config-commitlint';
```

To add your own rules, spread the config into your own.

```js
import config from '@dnd-mapp/config-commitlint';

export default {
    ...config,
    rules: {
        ...config.rules,
        'scope-enum': [2, 'always', ['api', 'web']],
    },
};
```

The config ships with type declarations. It is typed as a commitlint `UserConfig`, so it works in a `commitlint.config.ts` file.

## Rules

The config uses every rule from `@commitlint/config-conventional` with two changes.

| Rule                   | Setting | Reason                                       |
|:-----------------------|:--------|:---------------------------------------------|
| `header-max-length`    | `72`    | Keeps subject lines readable in `git log`    |
| `body-max-line-length` | `72`    | Follows the common Git convention for bodies |

## Git hook

Run commitlint from a `commit-msg` hook to check every commit message. This example uses [Lefthook](https://lefthook.dev/).

```bash
pnpm add --save-dev lefthook
```

Then add a `lefthook.yaml` file to your project root and run `pnpm exec lefthook install`.

```yaml
commit-msg:
  jobs:
    - name: commitlint
      run: pnpm exec commitlint --edit {1}
```
