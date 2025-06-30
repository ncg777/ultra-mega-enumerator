const path = require('path');
import type { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production', // or 'development'
  entry: './src/index.ts',
  output: {
    filename: 'index.js', // Output JavaScript file
    path: path.resolve(__dirname, 'dist'), // Output directory
    library: 'ultra-mega-enumerator', // If you want to expose your library
    libraryTarget: 'umd', // Module format
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // For TypeScript files
        use: 'ts-loader', // TypeScript loader
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;
