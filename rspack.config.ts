const rspack = require('@rspack/core')
const refreshPlugin = require('@rspack/plugin-react-refresh')
const isDev = process.env.NODE_ENV === 'development'
const path = require('path');
const { withZephyr } = require('zephyr-webpack-plugin')

const printCompilationMessage = require('./compilation.config.js');

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = withZephyr()({
  context: __dirname,
  entry: {
    main: './src/index.ts',
  },

  devServer: {
    port: 8080,
    historyApiFallback: true, // Allow SPA routing
    watchFiles: [path.resolve(__dirname, 'src')], // Watch for changes in the src directory to compile automatically
    onListening: function (devServer: any) { // Custom function to handle the dev server listening event
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats: any) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset', // Use asset module for SVG files
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // Use style-loader to inject CSS into the DOM
          "css-loader", // Use css-loader to handle CSS imports
          "postcss-loader" // Use postcss-loader for processing CSS with PostCSS (Tailwind CSS)
        ]
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [ // Use SWC loader for JavaScript and TypeScript files
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.container.ModuleFederationPlugin({
      name: 'remoteToast', // Name of the remote module
      filename: 'remoteEntry.js', // Output file name for the remote module
      exposes: { // Components to expose to the host application
        './Toast': './src/Toast.tsx',
      },
      shared: { // Shared dependencies to avoid duplication
        react: { eager: true },
        'react-dom': { eager: true },
        clsx: { singleton: true },
      },
    }),
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new rspack.ProgressPlugin({}),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    isDev ? new refreshPlugin() : null,
  ].filter(Boolean),
})
