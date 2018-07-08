#! /usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;
var jsonfile = require('jsonfile');

var manifestFile = 'manifest.json';
var distDir = './dist/';
var buildDir = './build/';

if (!fs.existsSync(distDir)){
  fs.mkdirSync(distDir);
}

fs.readFile(manifestFile, 'UTF-8', function (err, data) {
  if (err) {
    console.log('Error!', err);
  }
  var manifest = JSON.parse(data);

  if(process.env.CIRCLE_BUILD_NUM) {
    manifest.version = manifest.version + '.' + process.env.CIRCLE_BUILD_NUM;
  }

  jsonfile.writeFile(buildDir + manifestFile, manifest);

  var zipFile = '../' + distDir + manifest.short_name + '-' + manifest.version + '.zip';

  var cmd = `zip -r ${zipFile} ./*`

  exec(cmd, { cwd: buildDir}, function(error, stdout, stderr) {
    if (error) {
      console.log('Error!', error, stderr);
    } else {
      console.log('All good! Chrome extension packaged into\n', zipFile);
    }
  });
});
