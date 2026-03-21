# Plugin Kit Codebase Map

This file maps the full `agenc-plugin-kit` repo for developers and AI agents.

## Top-Level Layout

```text
agenc-plugin-kit/
  src/                               public package source
  src/__tests__/                     ABI and certification tests
  src/compatibility/                 checked-in compatibility JSON source
  docs/api-baseline/                 API drift snapshot
  scripts/                           build, baseline, and pack-smoke tooling
  templates/channel-adapter-starter/ starter module for plugin authors
  .github/workflows/                 CI and publish automation
  README.md
  CHANGELOG.md
  package.json
```

## Public Package Surface

### Root package exports

- `@tetsuo-ai/plugin-kit`
- `@tetsuo-ai/plugin-kit/channel-host-matrix`
- `@tetsuo-ai/plugin-kit/channel-host-matrix.json`

### Source map

- `src/index.ts` - public barrel and default export object
- `src/channel-manifest.ts` - manifest constants, schema fields, and validation helpers
- `src/channel-runtime.ts` - runtime interfaces for adapters and message payloads
- `src/compatibility.ts` - compatibility lookup helpers
- `src/channel-host-matrix.ts` - compatibility-matrix export wrapper
- `src/certification.ts` - certification flow and issue generation
- `src/errors.ts` - package error classes

## Repo-Only Support Surfaces

These are important for maintainers, but they are not part of the published npm package contract:

- `src/__tests__/` - test-only verification
- `docs/api-baseline/` - API-baseline snapshot
- `scripts/` - repo automation
- `templates/channel-adapter-starter/` - authoring starter
- `.github/workflows/` - CI and publish pipelines

Only the package artifacts selected by `package.json` ship to npm.

## Ownership Boundaries

- This repo owns the public plugin authoring ABI.
- The runtime host implementation stays in `agenc-core`.
- Protocol truth stays in `agenc-protocol`.
- SDK truth stays in `agenc-sdk`.
- Prover/admin flows stay in `agenc-prover`.

## Start Here By Change Type

- Manifest or payload shape change: `src/channel-manifest.ts` and `src/channel-runtime.ts`
- Compatibility policy change: `src/compatibility.ts` and `src/compatibility/channel-host-matrix.json`
- Certification rule change: `src/certification.ts` and `src/__tests__/certification.test.ts`
- Publish-surface change: `package.json`, `scripts/`, and [MAINTAINER_GUIDE.md](./MAINTAINER_GUIDE.md)

