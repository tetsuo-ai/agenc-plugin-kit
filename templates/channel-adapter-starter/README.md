# channel-adapter starter

This starter shows the minimum public module shape for a Phase 2
`channel_adapter`.

It is intentionally narrow:

- `manifest`
- `validateConfig`
- `createChannelAdapter`

Broader plugin classes are not part of the public contract yet.

## Usage

1. Install `@tetsuo-ai/plugin-kit`.
2. Copy `src/index.ts` into your plugin package.
3. Replace the manifest metadata and adapter behavior with your real channel.
4. Run the certification helper from `@tetsuo-ai/plugin-kit` against your
   module before attempting host integration.
