const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { createHash } = require('node:crypto');
const { existsSync, readFileSync } = require('node:fs');

const getCacheVersion = (values) =>
  values
    .filter(Boolean)
    .reduce(
      (hash, value) => hash.update('\0', 'utf8').update(value || '', 'utf8'),
      createHash('md5'),
    )
    .digest('hex');

const config = getDefaultConfig(__dirname);

// Detect lock file based on package manager
let lockFile = null;
if (existsSync('./yarn.lock')) {
  lockFile = readFileSync('./yarn.lock', 'utf8');
} else if (existsSync('./pnpm-lock.yaml')) {
  lockFile = readFileSync('./pnpm-lock.yaml', 'utf8');
} else if (existsSync('./package-lock.json')) {
  lockFile = readFileSync('./package-lock.json', 'utf8');
}

module.exports = withNativeWind(
  {
    ...config,
    cacheVersion: getCacheVersion([
      config.cacheVersion,
      lockFile,
      readFileSync('./package.json', 'utf8'),
      readFileSync('./tailwind.config.ts', 'utf8'),
      existsSync('./.env') && readFileSync('./.env', 'utf8'),
      existsSync('./.env.local') && readFileSync('./.env.local', 'utf8'),
    ]),
    resolver: {
      ...config.resolver,
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
      assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...config.resolver.sourceExts, 'svg'],
    },
    transformer: {
      ...config.transformer,
      babelTransformerPath: require.resolve(
        'react-native-svg-transformer/expo',
      ),
    },
  },
  {
    inlineRem: 16,
    input: './global.css',
  },
);
