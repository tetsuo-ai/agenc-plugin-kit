# @tetsuo-ai/plugin-kit

Public plugin authoring contract for AgenC hosted extensions.

Phase 2 exposes exactly one hosted extension class: `channel_adapter`.

## Start Here

- [docs/DOCS_INDEX.md](docs/DOCS_INDEX.md) - reading order for developers and AI agents
- [docs/CODEBASE_MAP.md](docs/CODEBASE_MAP.md) - repo structure and shipped-vs-repo-only surfaces
- [docs/PLUGIN_CONTRACT_REFERENCE.md](docs/PLUGIN_CONTRACT_REFERENCE.md) - manifest, runtime, compatibility, and certification contract
- [docs/MAINTAINER_GUIDE.md](docs/MAINTAINER_GUIDE.md) - validation and release workflow

## Install

```bash
npm install @tetsuo-ai/plugin-kit
```

## Repo Layout

```text
agenc-plugin-kit/
  src/                               public package source
  src/__tests__/                     ABI and certification tests
  src/compatibility/                 checked-in compatibility matrix input
  docs/api-baseline/                 API drift snapshot
  scripts/                           baseline and pack-smoke tooling
  templates/channel-adapter-starter/ starter adapter module
  .github/workflows/                 CI and publish automation
```

## Public Contract

This package intentionally exposes only the public authoring boundary. It does not re-export runtime-private gateway, policy, orchestration, or provider internals.

Primary exports:

- manifest constants and validation helpers
- channel runtime contract types
- compatibility matrix helpers
- certification / conformance helpers
- structured error classes

## Compatibility Matrix

The canonical compatibility tuple is published in two stable forms:

- JS wrapper: `@tetsuo-ai/plugin-kit/channel-host-matrix`
- raw JSON artifact: `@tetsuo-ai/plugin-kit/channel-host-matrix.json`

Phase 2 ships one supported tuple:

- `plugin_type: "channel_adapter"`
- `plugin_api_version: "1.0.0"`
- `host_api_version: "1.0.0"`

## Required Module Exports

Plugin modules must expose:

- `manifest`
- `validateConfig`
- `createChannelAdapter`

ESM named exports are the primary contract. CommonJS default-object interop is supported when the default export contains the same properties.

## Shipped Versus Repo-Only

Shipped package surface:

- files selected by `package.json`
- built `dist/` output
- this README

Repo-only support material:

- `templates/`
- `docs/api-baseline/`
- `scripts/`
- tests and workflows

## Repository Contract

This repository is the canonical public owner of:

- the `@tetsuo-ai/plugin-kit` npm package
- the compatibility matrix published at `@tetsuo-ai/plugin-kit/channel-host-matrix`
- the certification harness exported by `@tetsuo-ai/plugin-kit`

The runtime host implementation stays in `agenc-core`.

## Validation

```bash
npm install --no-fund
npm run build
npm run typecheck
npm run test
npm run api:baseline:check
npm run pack:smoke
```

## Starter Template

A minimal public starter for the supported extension class lives at:

- [templates/channel-adapter-starter/README.md](templates/channel-adapter-starter/README.md)

That template is intentionally limited to the current `channel_adapter` boundary and should not be treated as proof of broader plugin-class support.
