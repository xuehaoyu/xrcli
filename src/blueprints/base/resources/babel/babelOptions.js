'use strict'

const assign = require('object-assign')

const babelBaseOptions = {
  presets: ['react', 'es2015', 'stage-1']
}

const babelClientOptions = assign({}, babelBaseOptions, {
  env: {
    development: {
      presets: ['react-hmre']
    }
  }
})

const babelServerOptions = assign({}, babelBaseOptions, {
  env: {
    development: {
      plugins: [
        [
          'babel-plugin-webpack-loaders',
          {
            config: './resources/webpack/webpack.config.run.js',
            verbose: false
          }
        ]
      ]
    }
  }
})

const babelTestOptions = assign({}, babelBaseOptions, {
  env: {
    test: {
      plugins: [
        [
          'babel-plugin-webpack-loaders',
          {
            config: './resources/webpack/webpack.config.run.js',
            verbose: false
          }
        ]
      ]
    }
  }
})

exports.babelBaseOptions = babelBaseOptions
exports.babelClientOptions = babelClientOptions
exports.babelServerOptions = babelServerOptions
exports.babelTestOptions = babelTestOptions
