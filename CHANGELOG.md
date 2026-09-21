# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Commitlint config, available as `@dnd-mapp/config-commitlint`. It extends `@commitlint/config-conventional` and limits the header and every body line to 72 characters.
- Type declarations for the config. It is typed as a commitlint `UserConfig`.
- `@commitlint/cli` 21 as a peer dependency. `@commitlint/config-conventional` is a regular dependency, so consumers do not install it.
