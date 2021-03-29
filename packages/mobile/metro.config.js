/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    extraNodeModules: new Proxy(
      {
        react: path.resolve(__dirname, '../../node_modules/react'),
        'react-native': path.resolve(__dirname, 'node_modules/react-native'),
        'styled-components': path.resolve(
          __dirname,
          '../../node_modules/styled-components',
        ),
      },
      {
        get: (target, name) => {
          return path.join(__dirname, `node_modules/${name}`);
        },
      },
    ),
  },
  watchFolders: [path.resolve(__dirname, '../..')],
};
