module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify'],
    files: [
      'test/**/*.js'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.js': 'browserify'
    },
    browserify: {
      debug: true,
      transform: [
        ['babelify', {plugins: ['babel-plugin-espower']}]
      ]
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity
  })
}