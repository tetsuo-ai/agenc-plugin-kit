import type {
  ChannelAdapter,
  ChannelAdapterManifest,
  ChannelConfigValidationResult,
} from "@tetsuo-ai/plugin-kit";

export const manifest: ChannelAdapterManifest = {
  plugin_id: "com.example.channel.starter",
  channel_name: "starter-channel",
  plugin_type: "channel_adapter",
  schema_version: 1,
  version: "0.1.0",
  display_name: "Starter Channel",
  plugin_api_version: "1.0.0",
  host_api_version: "1.0.0",
};

export function validateConfig(config: unknown): ChannelConfigValidationResult {
  void config;
  return { valid: true, errors: [] };
}

export function createChannelAdapter(): ChannelAdapter {
  return {
    name: manifest.channel_name,
    async initialize() {},
    async start() {},
    async stop() {},
    async send() {
      return undefined;
    },
    isHealthy() {
      return true;
    },
  };
}
