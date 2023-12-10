const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      output: {
        filename: 'static/js/[name].js'
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks(chunk) {
            return false
          },
        },
      },
      resolve: {
          fallback: { 
            crypto: false,
            buffer: require.resolve('buffer/')
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
      ]
    }
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[5].options.filename = 'static/css/[name].css';
          return webpackConfig;
        },
      },
      options: {}
    }
  ]
}
