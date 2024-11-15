import path from "node:path";
import {__dirname} from "./webpack.path-utils.mjs";

import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.mjs';
import entries from './webpack.entries.mjs';

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    ...entries.getStaticEntryPoints(),
    ...entries.getJsEntryPoints(),
    ...entries.getComponentEntryPoints(),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, './src/scss'),
    },
  },
  mode: isProduction ? 'production' : 'development',
  optimization: isProduction ? {
    minimize: true,
  } : {},
  devtool: isProduction ? false : 'source-map',
  performance: isProduction ? false : undefined,
};

export default merge(commonConfig, config);
