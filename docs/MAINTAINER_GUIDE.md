# Plugin Kit Maintainer Guide

This file maps the local validation and release flow for `agenc-plugin-kit`.

## Local Setup

```bash
npm install --no-fund
```

## Core Commands

```bash
npm run build
npm run typecheck
npm run test
npm run api:baseline:check
npm run pack:smoke
```

These are the same checks enforced by `.github/workflows/ci.yml` and `publish.yml`.

## API Baseline Workflow

- Check for drift: `npm run api:baseline:check`
- Regenerate after an intentional public API change: `npm run api:baseline:generate`
- Review `docs/api-baseline/plugin-kit.json` before committing

## Pack Smoke

`npm run pack:smoke` verifies the tarball that npm would publish. Use it whenever you change:

- `package.json` exports or files
- build output wiring
- compatibility matrix packaging
- starter/template expectations that are mirrored by the package surface

## Publish Flow

`publish.yml` re-runs the full verification set before publishing:

```bash
npm run build
npm run typecheck
npm run test
npm run api:baseline:check
npm run pack:smoke
```

## Shipped Versus Repo-Only

The published package surface is intentionally small. Repo-only support material includes:

- `templates/`
- `docs/api-baseline/`
- `scripts/`
- tests and workflow files

Document those surfaces for contributors, but do not treat them as npm API.

