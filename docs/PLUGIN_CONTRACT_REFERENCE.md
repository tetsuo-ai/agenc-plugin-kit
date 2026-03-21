# Plugin Contract Reference

This file describes the live public authoring contract exported by `@tetsuo-ai/plugin-kit`.

## Supported Plugin Class

Phase 2 supports exactly one hosted extension class:

- `plugin_type: "channel_adapter"`

No broader plugin class should be inferred from this repo.

## Required Module Exports

Plugin modules must export:

- `manifest`
- `validateConfig`
- `createChannelAdapter`

ESM named exports are the canonical contract. CommonJS default-object interop is supported when the default export exposes the same fields.

## Manifest Contract

The manifest is defined in `src/channel-manifest.ts`. Important fields include:

- `plugin_id`
- `channel_name`
- `plugin_type`
- `schema_version`
- `version`
- `display_name`
- `plugin_api_version`
- `host_api_version`

The public serialized ABI is snake_case.

## Runtime Interface

The adapter runtime is defined in `src/channel-runtime.ts`.

Required adapter methods:

- `initialize(context): Promise<void>`
- `start(): Promise<void>`
- `stop(): Promise<void>`
- `send(message): Promise<void>`
- `isHealthy(): boolean`

`isHealthy()` is synchronous. A starter or fixture should not model it as an async method.

## Payload Shapes

### Inbound message

- identity: `id`, `channel`, `sender_id`, `sender_name`
- scope/session: `session_id`, `scope`
- content: `content`
- optional metadata: `timestamp`, `metadata`, `attachments`

### Outbound message

- required: `session_id`, `content`
- optional: `attachments`, `is_partial`, `tts`, `metadata`

Attachments use the shared `ChannelInboundAttachment` structure.

## Compatibility Matrix

The canonical compatibility tuple is published in two stable forms:

- `@tetsuo-ai/plugin-kit/channel-host-matrix`
- `@tetsuo-ai/plugin-kit/channel-host-matrix.json`

The matrix schema supports:

- `supported`
- `deprecated`
- `unsupported`
- optional operator notes

Current live support is the single Phase 2 tuple documented in the README.

## Certification Flow

`certifyChannelAdapterModule(...)` validates that:

- required exports exist
- the manifest shape is valid
- compatibility metadata resolves cleanly
- the adapter runtime shape matches the contract

Certification returns structured results. Error classes exist for callers that want explicit exceptions, but the main certification helper is result-oriented.

