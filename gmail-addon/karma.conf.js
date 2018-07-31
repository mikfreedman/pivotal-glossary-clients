module.exports = function(config) {
  config.set({
    basePath: '',
    exclude: [],
    files: [
      './node_modules/underscore/underscore-min.js',
      {pattern: 'src/*.js', watched:true, served:false, included:false, nocache:false},
      {pattern: 'test/*spec.js',watched:true,served:true,included:true}
      /*parameters*/
          //watched: if autoWatch is true all files that have set watched to true will be watched for changes
          //served: should the files be served by Karma's webserver?
          //included: should the files be included in the browser using <script> tag?
          //nocache: should the files be served from disk on each request by Karma's webserver?
      /*assets*/
          //{pattern: '*.html', watched:true, served:true, included:false}
          //{pattern: 'images/*', watched:false, served:true, included:false}
    ],

    autoWatch: true,
    singleRun:false,
    failOnEmptyTestSuite:false,

    logLevel: config.LOG_WARN, //config.LOG_DISABLE, config.LOG_ERROR, config.LOG_INFO, config.LOG_DEBUG

    frameworks: ['jasmine'],
    browsers: ['ChromeHeadless'],
    reporters: ['spec'],

    client: {
        jasmine:{
            random: false
        }
    },
    preprocessors: {
      './test/*spec.js': ['webpack']
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    }
  });
};
