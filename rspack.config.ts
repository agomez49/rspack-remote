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
    port: 4001,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    onListening: function (devServer: any) {
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
        type: 'asset',
      },
      {
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader"
				]
			},
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
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
      name: 'create_mf_app_host',
      filename: 'remoteEntry.js',
      exposes: {
        "./Toast": "./src/index.toast.ts",
      },
      shared: {
        react: { eager: true },
        'react-dom': { eager: true },
        'react-router-dom': { eager: true },
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
