const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const __SDK_PACKAGE_VERSION__ = JSON.stringify(
  require('./package.json').version
)

let __VERSION__, __COMMIT_HASH__, __COMMIT_COUNT__

try {
  const gitprocess = require('child_process')
  const commitHash = gitprocess
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim()
  const commitCount = gitprocess
    .execSync('git rev-list --count HEAD')
    .toString()
    .trim()
  const branch = gitprocess.execSync('git rev-parse --abbrev-ref HEAD').toString()
  const version = branch.trim()
  __VERSION__ = JSON.stringify(version)
  __COMMIT_HASH__ = JSON.stringify(commitHash)
  __COMMIT_COUNT__ = JSON.stringify(commitCount)
} catch {
  console.warn("not a git repository");
}

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: __dirname + '/src/index.tsx',
  output: {
    path: __dirname + '/output',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: path.join(__dirname, 'node_modules'),
        include: [path.join(__dirname, '/src/')],
        options: {
          configFile: path.join(__dirname, 'tsconfig.json'),
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html',
      path: './output/',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __VERSION__: __VERSION__,
      __COMMIT_HASH__: __COMMIT_HASH__,
      __COMMIT_COUNT__: __COMMIT_COUNT__,
      __SDK_PACKAGE_VERSION__: __SDK_PACKAGE_VERSION__,
    }),
  ],
  devServer: {
    port: 8800,
    https: true,
    allowedHosts: ['localhost'],
  },
  bail: true,
  node: {
    __dirname: false,
    __filename: false,
  },
}
