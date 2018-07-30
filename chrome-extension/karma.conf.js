// Karma configuration
// Generated on Thu Nov 10 2016 21:25:05 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/*/**.js', watched:true, served:false, included:false, nocache:false},
      {pattern: 'test/*/**spec.js',watched:true,served:true,included:true}
      /*parameters*/
          //watched: if autoWatch is true all files that have set watched to true will be watched for changes
          //served: should the files be served by Karma's webserver?
          //included: should the files be included in the browser using <script> tag?
          //nocache: should the files be served from disk on each request by Karma's webserver?
      /*assets*/
          //{pattern: '*.html', watched:true, served:true, included:false}
          //{pattern: 'images/*', watched:false, served:true, included:false}

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './test/*/**spec.js': ['webpack']
    },

    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}