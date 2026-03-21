#!/usr/bin/env node

import { mkdtemp, rm, unlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const repoRoot = process.cwd();

function run(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

async function main() {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'agenc-plugin-kit-pack-smoke.'));
  let tarballPath = null;

  try {
    const packOutput = run('npm', ['pack', '--json'], repoRoot);
    const [packed] = JSON.parse(packOutput);
    if (!packed?.filename) {
      throw new Error('npm pack did not return a filename');
    }
    tarballPath = path.join(repoRoot, packed.filename);

    run('npm', ['init', '-y'], tempRoot);
    run('npm', ['install', '--no-fund', '--no-audit', tarballPath], tempRoot);

    const smokeSource = [
      "const pluginKit = require('@tetsuo-ai/plugin-kit');",
      "const matrixModule = require('@tetsuo-ai/plugin-kit/channel-host-matrix');",
      "const matrixJson = require('@tetsuo-ai/plugin-kit/channel-host-matrix.json');",
      "const matrix = matrixModule.default ?? matrixModule.channel_host_matrix ?? matrixModule;",
      "if (typeof pluginKit.certifyChannelAdapterModule !== 'function') throw new Error('missing certifyChannelAdapterModule export');",
      "if (typeof pluginKit.isChannelHostCompatibilitySupported !== 'function') throw new Error('missing compatibility helper export');",
      "if (!Array.isArray(matrix) || matrix.length === 0) throw new Error('missing matrix module export');",
      "if (!Array.isArray(matrixJson) || matrixJson.length === 0) throw new Error('missing matrix json export');",
      "const fixture = {",
      "  manifest: {",
      "    plugin_id: 'com.tetsuo.fixture.channel',",
      "    channel_name: 'fixture-slack',",
      "    plugin_type: 'channel_adapter',",
      "    schema_version: 1,",
      "    version: '0.0.1',",
      "    display_name: 'Fixture Slack Channel',",
      "    plugin_api_version: '1.0.0',",
      "    host_api_version: '1.0.0'",
      "  },",
      "  validateConfig: () => ({ valid: true, errors: [] }),",
      "  createChannelAdapter: () => ({",
      "    name: 'fixture-slack',",
      "    initialize: async () => {},",
      "    start: async () => {},",
      "    stop: async () => {},",
      "    send: async () => undefined,",
      "    isHealthy: () => true",
      "  })",
      "};",
      "const certification = pluginKit.certifyChannelAdapterModule({ moduleExports: fixture, config: {} });",
      "if (!certification.ok) throw new Error(`certification failed: ${certification.issues.map((issue) => issue.message).join('; ')}`);",
      "if (!pluginKit.isChannelHostCompatibilitySupported({ plugin_type: 'channel_adapter', plugin_api_version: '1.0.0', host_api_version: '1.0.0' })) throw new Error('compatibility matrix lookup failed');",
      "console.log('plugin-kit-smoke-ok');",
    ].join(' ');
    const smokeOutput = run('node', ['-e', smokeSource], tempRoot).trim();
    if (smokeOutput !== 'plugin-kit-smoke-ok') {
      throw new Error(`unexpected package smoke output: ${smokeOutput}`);
    }

    process.stdout.write('pack-smoke-ok\n');
  } finally {
    if (tarballPath) {
      try {
        await unlink(tarballPath);
      } catch {}
    }
    await rm(tempRoot, { recursive: true, force: true });
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
